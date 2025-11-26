'use client';

import { useQuery } from '@tanstack/react-query';
import { searchRepositories } from '@/domain/github';
import type { Repository, SearchRepositoryFilters } from '@/@types/github';
import { httpClient } from '@/lib/http';

interface UseSearchRepositoriesOptions {
  enabled?: boolean;
}

interface UseSearchRepositoriesReturn {
  repositories: Repository[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useSearchRepositories(
  filters: SearchRepositoryFilters,
  options?: UseSearchRepositoriesOptions
): UseSearchRepositoriesReturn {
  const { enabled = true } = options || {};

  const query = useQuery<Repository[], Error>({
    queryKey: ['github', 'search', filters],
    queryFn: () => searchRepositories(filters, httpClient),
    enabled: enabled && !!filters.query,
    staleTime: Infinity,
  });

  return {
    repositories: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
