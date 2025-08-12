-- Drop existing tables and policies
DROP TABLE IF EXISTS contest_feedback CASCADE;
DROP TABLE IF EXISTS contest_applications CASCADE;
DROP TABLE IF EXISTS contest_skills CASCADE;
DROP TABLE IF EXISTS contests CASCADE;

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create contests table
CREATE TABLE contests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    employer_id UUID REFERENCES employer_profiles(id) ON DELETE CASCADE,
    job_title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    detailed_description TEXT,
    location_type TEXT NOT NULL CHECK (location_type IN ('REMOTE', 'HYBRID', 'ON-SITE')),
    location_city TEXT,
    location_state TEXT,
    location_country TEXT,
    employment_type TEXT NOT NULL CHECK (employment_type IN ('Full-time', 'Part-time', 'Contract', 'Freelance')),
    experience_min NUMERIC(4,1) NOT NULL CHECK (experience_min >= 0),
    experience_max NUMERIC(4,1) NOT NULL CHECK (experience_max >= experience_min),
    budget_min NUMERIC(12,2) NOT NULL CHECK (budget_min >= 0),
    budget_max NUMERIC(12,2) NOT NULL CHECK (budget_max >= budget_min),
    freelancer_fee NUMERIC(12,2) NOT NULL CHECK (freelancer_fee >= 0),
    vendor_fee NUMERIC(12,2) NOT NULL CHECK (vendor_fee >= 0),
    status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'ACTIVE', 'ON-HOLD', 'COMPLETED')),
    shortlisting_count INTEGER DEFAULT 0 CHECK (shortlisting_count >= 0),
    l1_count INTEGER DEFAULT 0 CHECK (l1_count >= 0),
    l2_count INTEGER DEFAULT 0 CHECK (l2_count >= 0),
    l3_count INTEGER DEFAULT 0 CHECK (l3_count >= 0),
    offered_count INTEGER DEFAULT 0 CHECK (offered_count >= 0),
    submitted_count INTEGER DEFAULT 0 CHECK (submitted_count >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    drive_date DATE,
    drive_start_time TIME,
    drive_end_time TIME,
    drive_timezone TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_urgent BOOLEAN DEFAULT false,
    application_deadline DATE
);

-- Create contest skills table
CREATE TABLE contest_skills (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    contest_id UUID REFERENCES contests(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    experience_years NUMERIC(4,1),
    is_mandatory BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contest applications table
CREATE TABLE contest_applications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    contest_id UUID REFERENCES contests(id) ON DELETE CASCADE,
    applicant_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('SUBMITTED', 'SHORTLISTED', 'L1', 'L2', 'L3', 'OFFERED', 'REJECTED')),
    current_ctc NUMERIC(12,2),
    expected_ctc NUMERIC(12,2),
    notice_period INTEGER,
    resume_url TEXT,
    cover_letter TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contest feedback table
CREATE TABLE contest_feedback (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    application_id UUID REFERENCES contest_applications(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    stage TEXT NOT NULL CHECK (stage IN ('SHORTLISTING', 'L1', 'L2', 'L3')),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    decision TEXT CHECK (decision IN ('PASS', 'FAIL', 'ON-HOLD')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_contests_employer_id ON contests(employer_id);
CREATE INDEX idx_contests_status ON contests(status);
CREATE INDEX idx_contest_skills_contest_id ON contest_skills(contest_id);
CREATE INDEX idx_contest_applications_contest_id ON contest_applications(contest_id);
CREATE INDEX idx_contest_applications_applicant_id ON contest_applications(applicant_id);
CREATE INDEX idx_contest_applications_status ON contest_applications(status);
CREATE INDEX idx_contest_feedback_application_id ON contest_feedback(application_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_contests_updated_at
    BEFORE UPDATE ON contests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contest_applications_updated_at
    BEFORE UPDATE ON contest_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE contests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contest_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE contest_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contest_feedback ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for contests
CREATE POLICY "Contests are viewable by everyone"
ON contests FOR SELECT
USING (true);

CREATE POLICY "Employers can create contests"
ON contests FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM employer_profiles
        WHERE id = auth.uid()
    )
);

CREATE POLICY "Employers can update their own contests"
ON contests FOR UPDATE
USING (employer_id = auth.uid());

-- Create RLS policies for contest skills
CREATE POLICY "Contest skills are viewable by everyone"
ON contest_skills FOR SELECT
USING (true);

CREATE POLICY "Contest skills can be managed by contest owner"
ON contest_skills FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM contests
        WHERE id = contest_id
        AND employer_id = auth.uid()
    )
);

-- Create RLS policies for contest applications
CREATE POLICY "Applications are viewable by contest owner and applicant"
ON contest_applications FOR SELECT
USING (
    applicant_id = auth.uid()
    OR EXISTS (
        SELECT 1 FROM contests
        WHERE id = contest_id
        AND employer_id = auth.uid()
    )
);

CREATE POLICY "Users can create their own applications"
ON contest_applications FOR INSERT
WITH CHECK (applicant_id = auth.uid());

CREATE POLICY "Users can update their own applications"
ON contest_applications FOR UPDATE
USING (applicant_id = auth.uid());

-- Create RLS policies for contest feedback
CREATE POLICY "Feedback is viewable by contest owner and applicant"
ON contest_feedback FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM contest_applications a
        JOIN contests c ON a.contest_id = c.id
        WHERE a.id = application_id
        AND (a.applicant_id = auth.uid() OR c.employer_id = auth.uid())
    )
);

CREATE POLICY "Employers can create feedback"
ON contest_feedback FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM contest_applications a
        JOIN contests c ON a.contest_id = c.id
        WHERE a.id = application_id
        AND c.employer_id = auth.uid()
    )
);

-- Grant necessary permissions
GRANT ALL ON contests TO authenticated;
GRANT ALL ON contest_skills TO authenticated;
GRANT ALL ON contest_applications TO authenticated;
GRANT ALL ON contest_feedback TO authenticated;
GRANT ALL ON contests TO anon;
GRANT ALL ON contest_skills TO anon;
GRANT ALL ON contest_applications TO anon;
GRANT ALL ON contest_feedback TO anon;
GRANT ALL ON contests TO service_role;
GRANT ALL ON contest_skills TO service_role;
GRANT ALL ON contest_applications TO service_role;
GRANT ALL ON contest_feedback TO service_role;

-- Grant schema usage
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO service_role;

-- Grant sequence usage
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO service_role;