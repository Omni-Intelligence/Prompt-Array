import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

async function getUserPrompts(userId) {
  if (!userId) return [];

  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
}

export const usePrompts = () => {
  const { user } = useAuth();

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['prompts', user?.id],
    queryFn: () => getUserPrompts(user?.id),
    enabled: !!user?.id,
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
