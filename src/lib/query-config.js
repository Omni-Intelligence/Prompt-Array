export const QUERY_CONFIG = {
  live: {
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  },
  normal: {
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  },
  static: {
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  },
};
