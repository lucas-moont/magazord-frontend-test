import { describe, it, expect } from 'vitest';
import { calculateRepositoryCounts } from './calculate-repository-counts';
import type { Repository } from '@/@types/github';

const createRepo = (overrides: Partial<Repository> = {}): Repository => ({
  id: 1,
  name: 'repo',
  fullName: 'user/repo',
  description: 'desc',
  htmlUrl: 'url',
  homepage: null,
  language: 'TypeScript',
  stargazersCount: 0,
  forksCount: 0,
  watchersCount: 0,
  openIssuesCount: 0,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  pushedAt: '2024-01-01',
  size: 100,
  defaultBranch: 'main',
  topics: [],
  visibility: 'public',
  isPrivate: false,
  isFork: false,
  isArchived: false,
  mirrorUrl: null,
  ...overrides,
});

describe('calculateRepositoryCounts', () => {
  const displayedRepos = [createRepo({ id: 1 }), createRepo({ id: 2 }), createRepo({ id: 3 })];

  const totalRepos = [
    createRepo({ id: 1 }),
    createRepo({ id: 2 }),
    createRepo({ id: 3 }),
    createRepo({ id: 4 }),
    createRepo({ id: 5 }),
  ];

  const totalStarred = [createRepo({ id: 10 }), createRepo({ id: 11 })];

  describe('when activeTab is repositories', () => {
    it('should return displayed count for repositories and total count for starred', () => {
      const result = calculateRepositoryCounts({
        activeTab: 'repositories',
        displayedRepositories: displayedRepos,
        totalRepositories: totalRepos,
        totalStarred,
      });

      expect(result.repositoriesCount).toBe(3);
      expect(result.starredCount).toBe(2);
    });

    it('should handle undefined totalRepositories', () => {
      const result = calculateRepositoryCounts({
        activeTab: 'repositories',
        displayedRepositories: displayedRepos,
        totalRepositories: undefined,
        totalStarred,
      });

      expect(result.repositoriesCount).toBe(3);
      expect(result.starredCount).toBe(2);
    });

    it('should handle undefined totalStarred', () => {
      const result = calculateRepositoryCounts({
        activeTab: 'repositories',
        displayedRepositories: displayedRepos,
        totalRepositories: totalRepos,
        totalStarred: undefined,
      });

      expect(result.repositoriesCount).toBe(3);
      expect(result.starredCount).toBe(0);
    });
  });

  describe('when activeTab is starred', () => {
    it('should return total count for repositories and displayed count for starred', () => {
      const result = calculateRepositoryCounts({
        activeTab: 'starred',
        displayedRepositories: displayedRepos,
        totalRepositories: totalRepos,
        totalStarred,
      });

      expect(result.repositoriesCount).toBe(5);
      expect(result.starredCount).toBe(3);
    });

    it('should handle undefined totalRepositories', () => {
      const result = calculateRepositoryCounts({
        activeTab: 'starred',
        displayedRepositories: displayedRepos,
        totalRepositories: undefined,
        totalStarred,
      });

      expect(result.repositoriesCount).toBe(0);
      expect(result.starredCount).toBe(3);
    });

    it('should handle undefined totalStarred', () => {
      const result = calculateRepositoryCounts({
        activeTab: 'starred',
        displayedRepositories: displayedRepos,
        totalRepositories: totalRepos,
        totalStarred: undefined,
      });

      expect(result.repositoriesCount).toBe(5);
      expect(result.starredCount).toBe(3);
    });
  });

  it('should handle empty displayed repositories', () => {
    const result = calculateRepositoryCounts({
      activeTab: 'repositories',
      displayedRepositories: [],
      totalRepositories: totalRepos,
      totalStarred,
    });

    expect(result.repositoriesCount).toBe(0);
    expect(result.starredCount).toBe(2);
  });

  it('should handle empty total repositories', () => {
    const result = calculateRepositoryCounts({
      activeTab: 'repositories',
      displayedRepositories: displayedRepos,
      totalRepositories: [],
      totalStarred: [],
    });

    expect(result.repositoriesCount).toBe(3);
    expect(result.starredCount).toBe(0);
  });
});
