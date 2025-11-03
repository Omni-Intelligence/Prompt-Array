import { useState, useCallback, useEffect } from 'react';

export const useAsync = (asyncFunction, immediate = true) => {
  const [state, setState] = useState({
    status: 'idle',
    data: null,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ status: 'pending', data: null, error: null });
    try {
      const response = await asyncFunction();
      setState({ status: 'success', data: response, error: null });
      return response;
    } catch (error) {
      setState({ status: 'error', data: null, error });
      throw error;
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    execute,
    status: state.status,
    data: state.data,
    error: state.error,
    isLoading: state.status === 'pending',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
  };
};
