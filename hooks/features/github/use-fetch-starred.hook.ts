'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchStarred } from '@/domain/github';
import type { Repository } from '@/@types/github';
import { httpClient } from '@/lib/http';

interface UseFetchStarredOptions {
  enabled?: boolean;
}

interface UseFetchStarredReturn {
  starred: Repository[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useFetchStarred(options?: UseFetchStarredOptions): UseFetchStarredReturn {
  const { enabled = true } = options || {};

  const query = useQuery<Repository[], Error>({
    queryKey: ['github', 'starred'],
    queryFn: () => fetchStarred(httpClient),
    enabled,
    staleTime: Infinity,
  });

  return {
    starred: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
