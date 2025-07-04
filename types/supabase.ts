export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'employer' | 'vendor' | 'freelancer'

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  company_name: string | null;
  phone: string | null;
  specialization: string | null;
  bio: string | null;
  location: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  portfolio_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;
      };
      contests: {
        Row: {
          id: string
          employer_id: string
          title: string
          description: string
          requirements: string
          registration_fee: number
          currency: string
          location: string
          contest_type: string
          experience_level: string
          skills: string[]
          status: 'active' | 'registration_closed' | 'in_progress' | 'completed' | 'cancelled'
          registration_deadline: string
          l1_start_date: string | null
          l2_start_date: string | null
          final_round_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          employer_id: string
          title: string
          description: string
          requirements: string
          registration_fee: number
          currency?: string
          location: string
          contest_type: string
          experience_level: string
          skills: string[]
          status?: 'active' | 'registration_closed' | 'in_progress' | 'completed' | 'cancelled'
          registration_deadline: string
          l1_start_date?: string | null
          l2_start_date?: string | null
          final_round_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          employer_id?: string
          title?: string
          description?: string
          requirements?: string
          registration_fee?: number
          currency?: string
          location?: string
          contest_type?: string
          experience_level?: string
          skills?: string[]
          status?: 'active' | 'registration_closed' | 'in_progress' | 'completed' | 'cancelled'
          registration_deadline?: string
          l1_start_date?: string | null
          l2_start_date?: string | null
          final_round_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      contest_registrations: {
        Row: {
          id: string
          contest_id: string
          freelancer_id: string
          registration_fee_paid: number
          payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
          registration_date: string
          l1_status: 'not_started' | 'in_progress' | 'completed' | 'failed'
          l2_status: 'not_started' | 'in_progress' | 'completed' | 'failed'
          final_round_status: 'not_started' | 'in_progress' | 'completed' | 'failed'
          overall_status: 'registered' | 'l1_completed' | 'l2_completed' | 'final_completed' | 'winner' | 'eliminated'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          contest_id: string
          freelancer_id: string
          registration_fee_paid: number
          payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'
          registration_date?: string
          l1_status?: 'not_started' | 'in_progress' | 'completed' | 'failed'
          l2_status?: 'not_started' | 'in_progress' | 'completed' | 'failed'
          final_round_status?: 'not_started' | 'in_progress' | 'completed' | 'failed'
          overall_status?: 'registered' | 'l1_completed' | 'l2_completed' | 'final_completed' | 'winner' | 'eliminated'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          contest_id?: string
          freelancer_id?: string
          registration_fee_paid?: number
          payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'
          registration_date?: string
          l1_status?: 'not_started' | 'in_progress' | 'completed' | 'failed'
          l2_status?: 'not_started' | 'in_progress' | 'completed' | 'failed'
          final_round_status?: 'not_started' | 'in_progress' | 'completed' | 'failed'
          overall_status?: 'registered' | 'l1_completed' | 'l2_completed' | 'final_completed' | 'winner' | 'eliminated'
          created_at?: string
          updated_at?: string
        }
      }
      round_submissions: {
        Row: {
          id: string
          contest_id: string
          freelancer_id: string
          round_type: 'l1' | 'l2' | 'final'
          submission_content: string
          submission_file_url: string | null
          submission_date: string
          score: number | null
          feedback: string | null
          status: 'submitted' | 'reviewed' | 'approved' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          contest_id: string
          freelancer_id: string
          round_type: 'l1' | 'l2' | 'final'
          submission_content: string
          submission_file_url?: string | null
          submission_date?: string
          score?: number | null
          feedback?: string | null
          status?: 'submitted' | 'reviewed' | 'approved' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          contest_id?: string
          freelancer_id?: string
          round_type?: 'l1' | 'l2' | 'final'
          submission_content?: string
          submission_file_url?: string | null
          submission_date?: string
          score?: number | null
          feedback?: string | null
          status?: 'submitted' | 'reviewed' | 'approved' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: number
          title: string
          department: string
          location: string
          type: string
          experience: string
          description: string
          created_at: string
          is_active: boolean
        }
        Insert: {
          id?: number
          title: string
          department: string
          location: string
          type: string
          experience: string
          description: string
          created_at?: string
          is_active?: boolean
        }
        Update: {
          id?: number
          title?: string
          department?: string
          location?: string
          type?: string
          experience?: string
          description?: string
          created_at?: string
          is_active?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 