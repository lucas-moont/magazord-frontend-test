'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/domain/github';
import type { User } from '@/@types/github';
import { httpClient } from '@/lib/http';
import { GitHubMapper } from '@/mappers/github.mapper';

interface UseFetchUserOptions {
  enabled?: boolean;
}

interface UseFetchUserReturn {
  user: User | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useFetchUser(options?: UseFetchUserOptions): UseFetchUserReturn {
  const { enabled = true } = options || {};

  const query = useQuery<User, Error>({
    queryKey: ['github', 'user'],
    queryFn: async () => {
      const dto = await fetchUser(httpClient);
      return GitHubMapper.toUser(dto);
    },
    enabled,
    staleTime: Infinity,
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
