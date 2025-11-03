import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCommunityPrompts, forkPrompt } from '@/services/community';
import { toast } from 'sonner';

export const useCommunityPrompts = ({ filter = 'latest', searchQuery = '' }) => {
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['community-prompts', filter, searchQuery],
    queryFn: () => getCommunityPrompts({ filter, searchQuery }),
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export const useForkPrompt = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: forkPrompt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompts'] });
      toast.success('Prompt forked successfully!');
    },
    onError: (error) => {
      console.error('Error forking prompt:', error);
      toast.error('Failed to fork prompt');
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
