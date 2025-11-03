import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { getChains } from '@/services/chains';

export const useChains = () => {
  const { user } = useAuth();

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['chains', user?.id],
    queryFn: () => getChains(),
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
