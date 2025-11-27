import type { AxiosInstance } from 'axios';
import type { GitHubRepositoryDTO } from '@/interfaces/github';
import { GITHUB_USERNAME } from '@/domain/github/const';
import { Logger } from '@/lib/logger';
import { DomainError } from '@/domain/errors';

export async function fetchStarred(
  httpClient: AxiosInstance
): Promise<GitHubRepositoryDTO[]> {
  try {
    const response = await httpClient.get(`/users/${GITHUB_USERNAME}/starred`, {
      params: {
        per_page: 100,
      },
    });

    return response.data;
  } catch (error) {
    Logger.error('Failed to fetch starred repositories', error);
    throw new DomainError('Failed to fetch starred repositories', error);
  }
}
