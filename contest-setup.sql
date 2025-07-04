-- Drop existing contest table if it exists
DROP TABLE IF EXISTS contests CASCADE;

-- Create contest table
CREATE TABLE contests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    employer_id UUID REFERENCES employer_profiles(id) ON DELETE CASCADE,
    
    -- Job Details
    job_title TEXT NOT NULL,
    job_description TEXT,
    job_description_file TEXT,
    employment_type TEXT NOT NULL,
    no_of_positions INTEGER NOT NULL,
    location TEXT NOT NULL,
    budget_min DECIMAL NOT NULL,
    budget_max DECIMAL NOT NULL,
    experience_min INTEGER NOT NULL,
    experience_max INTEGER NOT NULL,
    qualification TEXT NOT NULL,
    hiring_for TEXT NOT NULL CHECK (hiring_for IN ('Self', 'Other')),
    office_timings_start TIME NOT NULL,
    office_timings_end TIME NOT NULL,
    onsite_feasibility TEXT NOT NULL CHECK (onsite_feasibility IN ('Remote', 'Hybrid', 'Onsite')),
    notice_period TEXT NOT NULL,
    must_have_skills TEXT[] NOT NULL DEFAULT '{}',
    good_to_have_skills TEXT[] NOT NULL DEFAULT '{}',
    short_description TEXT NOT NULL,

    -- Drive Details
    drive_availability TEXT NOT NULL CHECK (drive_availability IN ('Yes', 'No')),
    drive_location TEXT CHECK (drive_location IN ('Remote', 'Office')),
    interview_rounds JSONB NOT NULL DEFAULT '[]',

    -- Payment Details
    selected_plan TEXT NOT NULL DEFAULT 'Hiringhood Plus',

    -- Status and Counters
    status TEXT DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'ACTIVE', 'ON-HOLD', 'COMPLETED')),
    shortlisting_count INTEGER DEFAULT 0,
    l1_count INTEGER DEFAULT 0,
    l2_count INTEGER DEFAULT 0,
    l3_count INTEGER DEFAULT 0,
    offered_count INTEGER DEFAULT 0,
    submitted_count INTEGER DEFAULT 0,
    drafted_count INTEGER DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for contests
ALTER TABLE contests ENABLE ROW LEVEL SECURITY;

-- Policies for contests
CREATE POLICY "Employers can view their own contests"
ON contests FOR SELECT
USING (employer_id = auth.uid());

CREATE POLICY "Employers can create contests"
ON contests FOR INSERT
WITH CHECK (employer_id = auth.uid());

CREATE POLICY "Employers can update their own contests"
ON contests FOR UPDATE
USING (employer_id = auth.uid());

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contests_updated_at
    BEFORE UPDATE ON contests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions for the contests table
GRANT ALL ON contests TO postgres, anon, authenticated, service_role; 