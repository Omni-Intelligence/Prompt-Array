import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

const getGroupDetails = async (groupId) => {
  const { data, error } = await supabase
    .from('groups')
    .select(`
      id,
      name,
      description,
      created_at,
      updated_at
    `)
    .eq('id', groupId)
    .single();

  if (error) throw error;
  return data;
};

export const useGroupDetails = (groupId) => {
  const { data: group, isLoading, error } = useQuery({
    queryKey: ['group', groupId],
    queryFn: () => getGroupDetails(groupId),
    enabled: !!groupId
  });

  return { group, isLoading, error };
};