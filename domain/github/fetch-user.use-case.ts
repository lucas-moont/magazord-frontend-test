import type { AxiosInstance } from 'axios';
import type { GitHubUserDTO } from '@/interfaces/github';
import { GITHUB_USERNAME } from '@/domain/github/const';
import { Logger } from '@/lib/logger';
import { DomainError } from '@/domain/errors';

export async function fetchUser(httpClient: AxiosInstance): Promise<GitHubUserDTO> {
  try {
    const response = await httpClient.get(`/users/${GITHUB_USERNAME}`);
    return response.data;
  } catch (error) {
    Logger.error('Failed to fetch user', error);
    throw new DomainError('Failed to fetch user', error);
  }
}
