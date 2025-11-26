import type { AxiosInstance } from 'axios';
import type { Repository, RepositoryFilters } from '@/@types/github';
import { GitHubMapper } from '@/mappers/github.mapper';
import { GITHUB_USERNAME } from '@/domain/github/const';
import { Logger } from '@/lib/logger';
import { DomainError } from '@/domain/errors';
import { filterRepositories } from './filter-repositories.util';

export async function fetchRepositories(
  filters: RepositoryFilters,
  httpClient: AxiosInstance
): Promise<Repository[]> {
  try {
    const params: Record<string, any> = {
      per_page: 100,
      sort: filters.sort || 'updated',
      direction: filters.direction || 'desc',
      type: 'all', // Always fetch all, filter client-side
    };

    const response = await httpClient.get(`/users/${GITHUB_USERNAME}/repos`, {
      params,
    });

    const repositories = GitHubMapper.toRepositories(response.data);

    return filterRepositories(repositories, filters);
  } catch (error) {
    Logger.error('Failed to fetch repositories', error);
    throw new DomainError('Failed to fetch repositories', error);
  }
}
