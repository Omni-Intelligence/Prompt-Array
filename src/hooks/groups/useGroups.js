import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

async function getUserGroups(userId) {
  if (!userId) return [];

  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .eq('created_by', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
}

async function deleteGroupService(groupId) {
  const { error } = await supabase
    .from('groups')
    .delete()
    .eq('id', groupId);

  if (error) {
    throw error;
  }
}

export const useGroups = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: groups,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['groups', user?.id],
    queryFn: () => getUserGroups(user?.id),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const deleteGroupMutation = useMutation({
    mutationFn: deleteGroupService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups', user?.id] });
      toast.success('Group deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting group:', error);
      toast.error('Failed to delete group');
    },
  });

  return {
    groups: groups || [],
    isLoading,
    error,
    deleteGroup: deleteGroupMutation.mutate,
  };
};
