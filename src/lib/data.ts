import { supabase } from './supabase';

export async function getJenjangSettings() {
  const { data, error } = await supabase
    .from('ppdb_settings')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
  return data;
}

export async function getRegistrations(userId: string) {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching registrations:', error);
    return null;
  }
  return data;
}

export async function createRegistration(regData: any) {
  const { data, error } = await supabase
    .from('registrations')
    .insert([regData])
    .select();

  if (error) {
    console.error('Error creating registration:', error);
    throw error;
  }
  return data;
}

export async function getAnnouncements() {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching announcements:', error);
    return null;
  }
  return data;
}
