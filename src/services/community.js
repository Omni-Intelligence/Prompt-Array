import { supabase } from '@/lib/supabase';

// Prompt Central user ID from migration
const PROMPT_CENTRAL_USER_ID = 'e52e5b4a-00a3-4385-b315-00f0a8d3e000';

export const getCommunityPrompts = async ({ filter = 'latest', searchQuery = '' }) => {
  try {
    console.log('Fetching community prompts with:', { filter, searchQuery });

    // Get public prompts - simplified query without user_profiles join
    let query = supabase
      .from('prompts')
      .select(`
        id,
        title,
        content,
        description,
        tags,
        is_public,
        is_template,
        template_category,
        version,
        created_at,
        updated_at,
        user_id
      `)
      .eq('is_public', true)
      .is('deleted_at', null);

    // Apply filter
    switch (filter) {
      case 'latest':
        query = query.order('created_at', { ascending: false });
        break;
      case 'oldest':
        query = query.order('created_at', { ascending: true });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    const { data: prompts, error } = await query;

    if (error) {
      console.error('Error fetching community prompts:', error);
      throw error;
    }

    // Filter by search query if provided
    let filteredPrompts = prompts;
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filteredPrompts = prompts.filter(prompt =>
        prompt.title?.toLowerCase().includes(searchLower) ||
        prompt.description?.toLowerCase().includes(searchLower)
      );
    }

    return filteredPrompts.map(prompt => ({
      ...prompt,
      author: {
        id: prompt.user_id,
        full_name: prompt.user_id === PROMPT_CENTRAL_USER_ID ? 'Prompt Array' : 'Anonymous',
        avatar_url: prompt.user_id === PROMPT_CENTRAL_USER_ID ? 'https://promptarray.com/logo.png' : null
      }
    }));
  } catch (error) {
    console.error('Error in getCommunityPrompts:', error);
    throw error;
  }
};

export const forkPrompt = async (promptId) => {
  try {
    // First, get the prompt data
    const { data: promptData, error: promptError } = await supabase
      .from('prompts')
      .select('*')
      .eq('id', promptId)
      .single();

    if (promptError) throw promptError;

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    // Create a new prompt as a fork
    const { data, error } = await supabase
      .from('prompts')
      .insert([
        {
          title: promptData.title,
          description: promptData.description,
          content: promptData.content,
          user_id: user.id,
          is_public: false, // Set to private by default
          forked_from: promptId
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in forkPrompt:', error);
    throw error;
  }
};
