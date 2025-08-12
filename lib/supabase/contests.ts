import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Contest, ContestSkill, ContestApplication, ContestFeedback } from '@/types/database.types';

const supabase = createClientComponentClient();

export const ContestsAPI = {
  // Contest CRUD operations
  async create(contestData: Omit<Contest, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('contests')
      .insert(contestData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('contests')
      .select(`
        *,
        contest_skills (*),
        contest_applications (
          *,
          contest_feedback (*)
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async getByEmployerId(employerId: string) {
    const { data, error } = await supabase
      .from('contests')
      .select(`
        *,
        contest_skills (*),
        contest_applications (count)
      `)
      .eq('employer_id', employerId);

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Contest>) {
    const { data, error } = await supabase
      .from('contests')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('contests')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Contest Skills operations
  async addSkills(skills: Omit<ContestSkill, 'id' | 'created_at'>[]) {
    const { data, error } = await supabase
      .from('contest_skills')
      .insert(skills)
      .select();

    if (error) throw error;
    return data;
  },

  async updateSkill(id: string, updates: Partial<ContestSkill>) {
    const { data, error } = await supabase
      .from('contest_skills')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteSkill(id: string) {
    const { error } = await supabase
      .from('contest_skills')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Contest Applications operations
  async submitApplication(application: Omit<ContestApplication, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('contest_applications')
      .insert(application)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateApplication(id: string, updates: Partial<ContestApplication>) {
    const { data, error } = await supabase
      .from('contest_applications')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Contest Feedback operations
  async addFeedback(feedback: Omit<ContestFeedback, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('contest_feedback')
      .insert(feedback)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Utility functions
  async getActiveContests() {
    const { data, error } = await supabase
      .from('contests')
      .select(`
        *,
        contest_skills (*)
      `)
      .eq('status', 'ACTIVE')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getFeaturedContests() {
    const { data, error } = await supabase
      .from('contests')
      .select(`
        *,
        contest_skills (*)
      `)
      .eq('status', 'ACTIVE')
      .eq('is_featured', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getUrgentContests() {
    const { data, error } = await supabase
      .from('contests')
      .select(`
        *,
        contest_skills (*)
      `)
      .eq('status', 'ACTIVE')
      .eq('is_urgent', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};