import { supabase } from './supabase';

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

export async function getAllRegistrations() {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all registrations:', error);
    return null;
  }
  return data;
}

export async function createRegistration(regData: Record<string, unknown>) {
  // Map form fields to DB columns
  const dbData = {
    user_id: regData.user_id,
    registration_number: regData.registration_number,
    jenjang: regData.jenjang,
    status: regData.status || 'Pending',
    student_name: regData.full_name,
    parent_name: `${regData.father_name || ''} / ${regData.mother_name || ''}`,
    phone_number: regData.father_phone || regData.mother_phone,
    gender: regData.gender,
    pob: regData.pob,
    dob: regData.dob,
    nik_father: regData.nik_father,
    father_name: regData.father_name,
    father_phone: regData.father_phone,
    father_job: regData.father_job,
    nik_mother: regData.nik_mother,
    mother_name: regData.mother_name,
    mother_phone: regData.mother_phone,
    mother_job: regData.mother_job,
    address: regData.address,
    district: regData.district,
    postal_code: regData.postal_code,
  };

  const { data, error } = await supabase
    .from('registrations')
    .insert([dbData])
    .select();

  if (error) {
    console.error('Error creating registration:', error);
    throw error;
  }
  return data;
}

export async function updateRegistrationStatus(id: string, status: string, rejectReason?: string) {
  const updateData: Record<string, unknown> = { status, updated_at: new Date().toISOString() };
  if (rejectReason) updateData.reject_reason = rejectReason;

  const { error } = await supabase
    .from('registrations')
    .update(updateData)
    .eq('id', id);

  if (error) {
    console.error('Error updating registration:', error);
    throw error;
  }
}

export async function deleteRegistration(id: string) {
  const { error } = await supabase
    .from('registrations')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting registration:', error);
    throw error;
  }
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

export async function createAnnouncement(annData: Record<string, unknown>) {
  const { data, error } = await supabase
    .from('announcements')
    .insert([annData])
    .select();

  if (error) {
    console.error('Error creating announcement:', error);
    throw error;
  }
  return data;
}

export async function deleteAnnouncement(id: string) {
  const { error } = await supabase
    .from('announcements')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting announcement:', error);
    throw error;
  }
}

// ============ GALLERY ============

export async function getGallery() {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching gallery:', error);
    return null;
  }
  return data;
}

export async function createGalleryItem(item: Record<string, unknown>) {
  const { data, error } = await supabase
    .from('gallery')
    .insert([item])
    .select();

  if (error) {
    console.error('Error creating gallery item:', error);
    throw error;
  }
  return data;
}

export async function deleteGalleryItem(id: string) {
  const { error } = await supabase
    .from('gallery')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting gallery item:', error);
    throw error;
  }
}
