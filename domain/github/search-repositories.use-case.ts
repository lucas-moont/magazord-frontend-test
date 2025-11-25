import type { AxiosInstance } from 'axios';
import type { Repository, SearchRepositoryFilters } from '@/domain/github/types';
import { GitHubMapper } from '@/mappers/github.mapper';
import { GITHUB_USERNAME } from '@/domain/github/const';
import { Logger } from '@/lib/logger';
import { DomainError } from '@/domain/errors';

export async function searchRepositories(
  filters: SearchRepositoryFilters,
  httpClient: AxiosInstance
): Promise<Repository[]> {
  try {
    const queryParts = [`user:${GITHUB_USERNAME}`, filters.query];

    if (filters.language) {
      queryParts.push(`language:${filters.language}`);
    }

    const params: Record<string, any> = {
      q: queryParts.join(' '),
      per_page: 100,
    };

    if (filters.sort) {
      params.sort = filters.sort;
    }

    if (filters.order) {
      params.order = filters.order;
    }

    const response = await httpClient.get('/search/repositories', { params });

    return GitHubMapper.toRepositories(response.data.items || []);
  } catch (error) {
    Logger.error('Failed to search repositories', error);
    throw new DomainError('Failed to search repositories', error);
  }
}
