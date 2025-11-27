import type { AxiosInstance } from 'axios';
import type { RepositoryFilters } from '@/@types/github';
import type { GitHubRepositoryDTO } from '@/interfaces/github';
import { GITHUB_USERNAME } from '@/domain/github/const';
import { Logger } from '@/lib/logger';
import { DomainError } from '@/domain/errors';

export async function fetchRepositories(
  filters: RepositoryFilters,
  httpClient: AxiosInstance
): Promise<GitHubRepositoryDTO[]> {
  try {
    const params: Record<string, string | number> = {
      per_page: 100,
      sort: filters.sort || 'updated',
      direction: filters.direction || 'desc',
      type: 'all',
    };

    const response = await httpClient.get(`/users/${GITHUB_USERNAME}/repos`, {
      params,
    });

    return response.data;
  } catch (error) {
    Logger.error('Failed to fetch repositories', error);
    throw new DomainError('Failed to fetch repositories', error);
  }
}
