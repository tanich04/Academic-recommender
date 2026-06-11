import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mgxcyegpqifudelmwpbc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveSubmission(formData, recommendation) {
  const { data, error } = await supabase
    .from('submissions')
    .insert([
      {
        full_name: formData.fullName,
        email: formData.email,
        highest_qualification: formData.highestQualification,
        years_experience: formData.yearsExperience,
        current_profession: formData.currentProfession,
        career_goal: formData.careerGoal,
        recommendation: recommendation,
      },
    ])
    .select();

  if (error) throw error;
  return data;
}

export async function fetchAllSubmissions() {
  const { data, error } = await supabase
    .from('submissions')
    .select('full_name, email, career_goal, recommendation, created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}