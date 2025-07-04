-- Initial Setup for Neyvin Portal
-- Run this SQL in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS employer_profiles CASCADE;
DROP TABLE IF EXISTS vendor_profiles CASCADE;
DROP TABLE IF EXISTS freelancer_profiles CASCADE;
DROP TABLE IF EXISTS contests CASCADE;

-- Drop existing types
DROP TYPE IF EXISTS user_role CASCADE;

-- Create basic types
CREATE TYPE user_role AS ENUM ('employer', 'vendor', 'freelancer');

-- Create basic tables
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    role user_role,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE employer_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    company_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE vendor_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    agency_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE freelancer_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    specialization TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contest-related tables
CREATE TABLE contests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    employer_id UUID REFERENCES employer_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'ON-HOLD', 'COMPLETED')),
    shortlisting_count INTEGER DEFAULT 0,
    l1_count INTEGER DEFAULT 0,
    l2_count INTEGER DEFAULT 0,
    l3_count INTEGER DEFAULT 0,
    offered_count INTEGER DEFAULT 0,
    submitted_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE employer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone"
ON profiles FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- Policies for employer profiles
CREATE POLICY "Employer profiles are viewable by everyone"
ON employer_profiles FOR SELECT
USING (true);

CREATE POLICY "Employers can insert their own profile"
ON employer_profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Employers can update own profile"
ON employer_profiles FOR UPDATE
USING (auth.uid() = id);

-- Policies for vendor profiles
CREATE POLICY "Vendor profiles are viewable by everyone"
ON vendor_profiles FOR SELECT
USING (true);

CREATE POLICY "Vendors can insert their own profile"
ON vendor_profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Vendors can update own profile"
ON vendor_profiles FOR UPDATE
USING (auth.uid() = id);

-- Policies for freelancer profiles
CREATE POLICY "Freelancer profiles are viewable by everyone"
ON freelancer_profiles FOR SELECT
USING (true);

CREATE POLICY "Freelancers can insert their own profile"
ON freelancer_profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Freelancers can update own profile"
ON freelancer_profiles FOR UPDATE
USING (auth.uid() = id);

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

-- Create trigger function for handling new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
begin
  -- Insert into profiles
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    (new.raw_user_meta_data->>'role')::user_role
  );

  -- Insert into role-specific profile
  CASE (new.raw_user_meta_data->>'role')::user_role
    WHEN 'employer' THEN
      INSERT INTO public.employer_profiles (id)
      VALUES (new.id);
    WHEN 'vendor' THEN
      INSERT INTO public.vendor_profiles (id)
      VALUES (new.id);
    WHEN 'freelancer' THEN
      INSERT INTO public.freelancer_profiles (id)
      VALUES (new.id);
    ELSE
      NULL;
  END CASE;

  return new;
end;
$$;

-- Create trigger for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to get role for email
CREATE OR REPLACE FUNCTION get_role_for_email(p_email TEXT)
RETURNS user_role
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
    user_role user_role;
BEGIN
    SELECT role INTO user_role
    FROM profiles
    WHERE id = (
        SELECT id 
        FROM auth.users 
        WHERE email = p_email
        LIMIT 1
    );
    
    RETURN user_role;
END;
$$;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO postgres, anon, authenticated, service_role; 