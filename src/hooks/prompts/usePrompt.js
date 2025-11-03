import { useQuery } from '@tanstack/react-query';
import { getPrompt } from '@/services/prompts';

export const usePrompt = (promptId) => {
  return useQuery({
    queryKey: ['prompt', promptId],
    queryFn: () => getPrompt(promptId),
    enabled: !!promptId,
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Cache data for 30 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
};
