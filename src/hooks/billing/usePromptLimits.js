import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

// No subscription limits - unlimited prompts for all users
const PROMPT_LIMIT = Infinity;

async function getPromptCount(userId) {
  if (!userId) return 0;

  const { count, error } = await supabase
    .from('prompts')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching prompt count:', error);
    return 0;
  }

  return count || 0;
}

export const usePromptLimits = () => {
  const { user } = useAuth();

  const {
    data: promptCount = 0,
    isLoading,
  } = useQuery({
    queryKey: ['prompt-count', user?.id],
    queryFn: () => getPromptCount(user?.id),
    enabled: !!user?.id,
    staleTime: 1 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const promptLimit = PROMPT_LIMIT;
  const canCreatePrompt = true; // Always allow creating prompts
  const isSubscribed = false; // No subscriptions

  return {
    promptCount,
    promptLimit,
    canCreatePrompt,
    isSubscribed,
    isLoading,
  };
};
