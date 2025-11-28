import type { AxiosInstance } from 'axios';
import type { SearchRepositoryFilters } from '@/@types/github';
import type { GitHubRepositoryDTO } from '@/interfaces/github';
import { GITHUB_USERNAME } from '@/domain/github/const';
import { Logger } from '@/lib/logger';
import { DomainError } from '@/domain/errors';

export async function searchRepositories(
  filters: SearchRepositoryFilters,
  httpClient: AxiosInstance,
): Promise<GitHubRepositoryDTO[]> {
  try {
    const queryParts = [`user:${GITHUB_USERNAME}`, filters.query];

    const params: Record<string, string | number> = {
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

    return response.data.items || [];
  } catch (error) {
    Logger.error('Failed to search repositories', error);
    throw new DomainError('Failed to search repositories', error);
  }
}
