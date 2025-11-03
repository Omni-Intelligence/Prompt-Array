import { supabase } from '@/lib/supabase';

export const getGroups = async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('Authentication error:', userError);
      throw new Error('Authentication required');
    }

    // Get groups where user is the creator OR a member
    const { data, error } = await supabase
      .from('groups')
      .select(`
        id,
        name,
        description,
        created_at,
        updated_at,
        created_by
      `)
      .eq('created_by', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching groups:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getGroups:', error);
    throw error;
  }
};

export const getGroupPrompts = async (groupId) => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('Authentication error:', userError);
      throw new Error('Authentication required');
    }

    console.log('Fetching prompts for group:', groupId);

    // First verify the group exists and user has access
    const { data: groups, error: groupError } = await supabase
      .from('groups')
      .select('id')
      .eq('id', groupId)
      .eq('created_by', user.id);

    if (groupError || !groups || groups.length === 0) {
      console.error('Group not found or access denied:', groupError);
      throw new Error('Group not found or access denied');
    }

    const group = groups[0];

    // Get prompts for this group
    const { data: prompts, error: promptsError } = await supabase
      .from('prompts')
      .select('*')
      .eq('group_id', groupId)
      .eq('user_id', user.id);

    if (promptsError) {
      console.error('Error fetching group prompts:', promptsError);
      throw promptsError;
    }

    console.log('Found prompts:', prompts?.length || 0);
    return prompts || [];

  } catch (error) {
    console.error('Error in getGroupPrompts:', error);
    throw error;
  }
};

export const createGroup = async ({ name, description }) => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('Authentication error:', userError);
      throw new Error('Authentication required');
    }

    console.log('Creating group with:', { name, description, user_id: user.id });

    const { data, error } = await supabase
      .from('groups')
      .insert([{
        name,
        description,
        created_by: user.id
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating group:', error);
      throw error;
    }

    if (!data) {
      throw new Error('No data returned after creating group');
    }

    console.log('Group created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in createGroup:', error);
    throw error;
  }
};

export const updateGroup = async (groupId, { name, description }) => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('Authentication required');
    }

    const { data, error } = await supabase
      .from('groups')
      .update({ name, description })
      .eq('id', groupId)
      .eq('created_by', user.id)
      .select();

    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error('Error in updateGroup:', error);
    throw error;
  }
};

export const deleteGroup = async (groupId) => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('Authentication required');
    }

    const { error } = await supabase
      .from('groups')
      .delete()
      .eq('id', groupId)
      .eq('created_by', user.id);

    if (error) throw error;
  } catch (error) {
    console.error('Error in deleteGroup:', error);
    throw error;
  }
};
