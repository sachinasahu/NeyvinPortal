export type ContestStatus = 'ACTIVE' | 'ON-HOLD' | 'COMPLETED' | 'DRAFT';
export type LocationType = 'REMOTE' | 'ON-SITE' | 'HYBRID';
export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
export type ApplicationStatus = 'SUBMITTED' | 'SHORTLISTED' | 'L1' | 'L2' | 'L3' | 'OFFERED' | 'REJECTED';
export type FeedbackStage = 'SHORTLISTING' | 'L1' | 'L2' | 'L3';
export type FeedbackDecision = 'PASS' | 'FAIL' | 'ON-HOLD';

export interface Contest {
  id: string;
  employer_id: string;
  job_title: string;
  short_description: string;
  detailed_description?: string;
  location_type: LocationType;
  location_city?: string;
  location_state?: string;
  location_country?: string;
  employment_type: EmploymentType;
  experience_min: number;
  experience_max: number;
  budget_min: number;
  budget_max: number;
  freelancer_fee: number;
  vendor_fee: number;
  status: ContestStatus;
  shortlisting_count: number;
  l1_count: number;
  l2_count: number;
  l3_count: number;
  offered_count: number;
  submitted_count: number;
  created_at: string;
  updated_at: string;
  drive_date?: string;
  drive_start_time?: string;
  drive_end_time?: string;
  drive_timezone?: string;
  is_featured: boolean;
  is_urgent: boolean;
  application_deadline?: string;
}

export interface ContestSkill {
  id: string;
  contest_id: string;
  skill_name: string;
  experience_years?: number;
  is_mandatory: boolean;
  created_at: string;
}

export interface ContestApplication {
  id: string;
  contest_id: string;
  applicant_id: string;
  status: ApplicationStatus;
  current_ctc?: number;
  expected_ctc?: number;
  notice_period?: number;
  resume_url?: string;
  cover_letter?: string;
  created_at: string;
  updated_at: string;
}

export interface ContestFeedback {
  id: string;
  application_id: string;
  reviewer_id: string;
  stage: FeedbackStage;
  rating?: number;
  feedback?: string;
  decision?: FeedbackDecision;
  created_at: string;
}