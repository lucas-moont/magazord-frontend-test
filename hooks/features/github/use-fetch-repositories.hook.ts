'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchRepositories } from '@/domain/github';
import type { Repository, RepositoryFilters } from '@/@types/github';
import { httpClient } from '@/lib/http';

interface UseFetchRepositoriesOptions {
  enabled?: boolean;
}

interface UseFetchRepositoriesReturn {
  repositories: Repository[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useFetchRepositories(
  filters: RepositoryFilters,
  options?: UseFetchRepositoriesOptions
): UseFetchRepositoriesReturn {
  const { enabled = true } = options || {};

  const query = useQuery<Repository[], Error>({
    queryKey: ['github', 'repositories', filters],
    queryFn: () => fetchRepositories(filters, httpClient),
    enabled,
    staleTime: Infinity,
  });

  return {
    repositories: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
