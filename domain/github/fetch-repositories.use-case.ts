import type { AxiosInstance } from 'axios';
import type { Repository, RepositoryFilters } from '@/@types/github';
import { GitHubMapper } from '@/mappers/github.mapper';
import { GITHUB_USERNAME } from '@/domain/github/const';
import { Logger } from '@/lib/logger';
import { DomainError } from '@/domain/errors';

export async function fetchRepositories(
  filters: RepositoryFilters,
  httpClient: AxiosInstance
): Promise<Repository[]> {
  try {
    const params: Record<string, any> = {
      per_page: 100,
      sort: filters.sort || 'updated',
      direction: filters.direction || 'desc',
    };

    if (filters.type && filters.type !== 'all') {
      params.type = filters.type;
    }

    const response = await httpClient.get(`/users/${GITHUB_USERNAME}/repos`, {
      params,
    });

    let repositories = GitHubMapper.toRepositories(response.data);

    if (filters.language) {
      repositories = repositories.filter(
        (repo) => repo.language?.toLowerCase() === filters.language?.toLowerCase()
      );
    }

    return repositories;
  } catch (error) {
    Logger.error('Failed to fetch repositories', error);
    throw new DomainError('Failed to fetch repositories', error);
  }
}
