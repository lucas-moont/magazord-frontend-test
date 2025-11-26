import type { AxiosInstance } from 'axios';
import type { User } from '@/@types/github';
import { GitHubMapper } from '@/mappers/github.mapper';
import { GITHUB_USERNAME } from '@/domain/github/const';
import { Logger } from '@/lib/logger';
import { DomainError } from '@/domain/errors';

export async function fetchUser(httpClient: AxiosInstance): Promise<User> {
  try {
    const response = await httpClient.get(`/users/${GITHUB_USERNAME}`);
    return GitHubMapper.toUser(response.data);
  } catch (error) {
    Logger.error('Failed to fetch user', error);
    throw new DomainError('Failed to fetch user', error);
  }
}
