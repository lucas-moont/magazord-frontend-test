import { describe, it, expect } from 'vitest';
import { GitHubMapper } from '@/mappers/github.mapper';
import type { GitHubUserDTO, GitHubRepositoryDTO } from '@/interfaces/github';

describe('GitHubMapper', () => {
  describe('toUser', () => {
    it('should map GitHub API user DTO to User domain model', () => {
      const dto = {
        login: 'lucas-moont',
        name: 'Lucas Moont',
        avatar_url: 'https://avatars.githubusercontent.com/u/123456',
        bio: 'Software Engineer',
        company: 'Magazord',
        location: 'Brazil',
        blog: 'https://lucas-moont.dev',
        public_repos: 42,
        followers: 100,
        following: 50,
      };

      const user = GitHubMapper.toUser(dto as unknown as GitHubUserDTO);

      expect(user).toEqual({
        login: 'lucas-moont',
        name: 'Lucas Moont',
        avatarUrl: 'https://avatars.githubusercontent.com/u/123456',
        bio: 'Software Engineer',
        company: 'Magazord',
        location: 'Brazil',
        blog: 'https://lucas-moont.dev',
        publicRepos: 42,
        followers: 100,
        following: 50,
      });
    });

    it('should use login as name when name is null', () => {
      const dto = {
        login: 'testuser',
        name: null,
        avatar_url: 'https://example.com/avatar.png',
        bio: null,
        company: null,
        location: null,
        blog: null,
        public_repos: 0,
        followers: 0,
        following: 0,
      };

      const user = GitHubMapper.toUser(dto as unknown as GitHubUserDTO);

      expect(user.name).toBe('testuser');
    });
  });

  describe('toRepository', () => {
    it('should map GitHub API repository DTO to Repository domain model', () => {
      const dto = {
        id: 123,
        name: 'test-repo',
        full_name: 'lucas-moont/test-repo',
        description: 'A test repository',
        html_url: 'https://github.com/lucas-moont/test-repo',
        homepage: 'https://test-repo.dev',
        language: 'TypeScript',
        stargazers_count: 42,
        forks_count: 10,
        watchers_count: 5,
        open_issues_count: 2,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-12-01T00:00:00Z',
        pushed_at: '2023-12-01T12:00:00Z',
        size: 1024,
        default_branch: 'main',
        topics: ['typescript', 'react'],
        visibility: 'public',
        private: false,
        fork: false,
        archived: false,
        mirror_url: null,
      };

      const repository = GitHubMapper.toRepository(dto as unknown as GitHubRepositoryDTO);

      expect(repository).toEqual({
        id: 123,
        name: 'test-repo',
        fullName: 'lucas-moont/test-repo',
        description: 'A test repository',
        htmlUrl: 'https://github.com/lucas-moont/test-repo',
        homepage: 'https://test-repo.dev',
        language: 'TypeScript',
        stargazersCount: 42,
        forksCount: 10,
        watchersCount: 5,
        openIssuesCount: 2,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-12-01T00:00:00Z',
        pushedAt: '2023-12-01T12:00:00Z',
        size: 1024,
        defaultBranch: 'main',
        topics: ['typescript', 'react'],
        visibility: 'public',
        isPrivate: false,
        isFork: false,
        isArchived: false,
        mirrorUrl: null,
      });
    });

    it('should handle missing optional fields', () => {
      const dto = {
        id: 456,
        name: 'minimal-repo',
        full_name: 'user/minimal-repo',
        description: null,
        html_url: 'https://github.com/user/minimal-repo',
        homepage: null,
        language: null,
        stargazers_count: 0,
        forks_count: 0,
        watchers_count: 0,
        open_issues_count: 0,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        pushed_at: '2024-01-01T00:00:00Z',
        size: 0,
        default_branch: 'main',
        topics: null,
        visibility: 'public',
        private: false,
        fork: false,
        archived: false,
        mirror_url: null,
      };

      const repository = GitHubMapper.toRepository(dto as unknown as GitHubRepositoryDTO);

      expect(repository.description).toBeNull();
      expect(repository.homepage).toBeNull();
      expect(repository.language).toBeNull();
      expect(repository.topics).toEqual([]);
    });
  });

  describe('toRepositories', () => {
    it('should map array of repository DTOs', () => {
      const dtos = [
        {
          id: 1,
          name: 'repo1',
          full_name: 'user/repo1',
          description: 'First repo',
          html_url: 'https://github.com/user/repo1',
          homepage: null,
          language: 'JavaScript',
          stargazers_count: 10,
          forks_count: 2,
          watchers_count: 1,
          open_issues_count: 0,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          pushed_at: '2024-01-01T00:00:00Z',
          size: 100,
          default_branch: 'main',
          topics: [],
          visibility: 'public',
          private: false,
          fork: false,
          archived: false,
          mirror_url: null,
        },
        {
          id: 2,
          name: 'repo2',
          full_name: 'user/repo2',
          description: 'Second repo',
          html_url: 'https://github.com/user/repo2',
          homepage: null,
          language: 'TypeScript',
          stargazers_count: 20,
          forks_count: 4,
          watchers_count: 2,
          open_issues_count: 1,
          created_at: '2024-02-01T00:00:00Z',
          updated_at: '2024-02-01T00:00:00Z',
          pushed_at: '2024-02-01T00:00:00Z',
          size: 200,
          default_branch: 'main',
          topics: [],
          visibility: 'public',
          private: false,
          fork: false,
          archived: false,
          mirror_url: null,
        },
      ];

      const repositories = GitHubMapper.toRepositories(dtos as unknown as GitHubRepositoryDTO[]);

      expect(repositories).toHaveLength(2);
      expect(repositories[0].name).toBe('repo1');
      expect(repositories[1].name).toBe('repo2');
    });

    it('should return empty array for empty input', () => {
      const repositories = GitHubMapper.toRepositories([]);
      expect(repositories).toEqual([]);
    });
  });
});
