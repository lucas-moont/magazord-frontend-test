import type { AxiosInstance } from 'axios';
import type { Repository, SearchRepositoryFilters } from '@/@types/github';
import { GitHubMapper } from '@/mappers/github.mapper';
import { GITHUB_USERNAME } from '@/domain/github/const';
import { Logger } from '@/lib/logger';
import { DomainError } from '@/domain/errors';
import { filterRepositories } from '@/lib/utils/filter-repositories';

export async function searchRepositories(
  filters: SearchRepositoryFilters,
  httpClient: AxiosInstance
): Promise<Repository[]> {
  try {
    const queryParts = [`user:${GITHUB_USERNAME}`, filters.query];

    // We don't add language to queryParts because we filter client-side 
    // to support multiple languages with OR logic

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

    const repositories = GitHubMapper.toRepositories(response.data.items || []);

    // Filter client-side to support multiple languages (OR logic)
    return filterRepositories(repositories, {
      language: filters.language,
      type: [],
    });
  } catch (error) {
    Logger.error('Failed to search repositories', error);
    throw new DomainError('Failed to search repositories', error);
  }
}
