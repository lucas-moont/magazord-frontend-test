import { describe, it, expect } from 'vitest';
import { getDisplayedRepositories } from './get-displayed-repositories';
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

describe('getDisplayedRepositories', () => {
  const filteredRepos = [createRepo({ id: 1, name: 'repo1' }), createRepo({ id: 2, name: 'repo2' })];

  const filteredStarred = [createRepo({ id: 10, name: 'starred1' }), createRepo({ id: 11, name: 'starred2' })];

  const searchResults = [createRepo({ id: 100, name: 'search-result' })];

  describe('when activeTab is repositories', () => {
    it('should return searchResults when searchQuery is provided', () => {
      const result = getDisplayedRepositories({
        activeTab: 'repositories',
        searchQuery: 'test',
        searchResults,
        filteredRepositories: filteredRepos,
        filteredStarred,
      });

      expect(result).toEqual(searchResults);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('search-result');
    });

    it('should return filteredRepositories when searchQuery is empty', () => {
      const result = getDisplayedRepositories({
        activeTab: 'repositories',
        searchQuery: '',
        searchResults: undefined,
        filteredRepositories: filteredRepos,
        filteredStarred,
      });

      expect(result).toEqual(filteredRepos);
      expect(result).toHaveLength(2);
    });

    it('should return empty array when searchResults is undefined and searchQuery is provided', () => {
      const result = getDisplayedRepositories({
        activeTab: 'repositories',
        searchQuery: 'test',
        searchResults: undefined,
        filteredRepositories: filteredRepos,
        filteredStarred,
      });

      expect(result).toEqual([]);
    });
  });

  describe('when activeTab is starred', () => {
    it('should return filteredStarred regardless of searchQuery', () => {
      const resultWithSearch = getDisplayedRepositories({
        activeTab: 'starred',
        searchQuery: 'test',
        searchResults,
        filteredRepositories: filteredRepos,
        filteredStarred,
      });

      expect(resultWithSearch).toEqual(filteredStarred);
      expect(resultWithSearch).toHaveLength(2);
      expect(resultWithSearch[0].name).toBe('starred1');

      const resultWithoutSearch = getDisplayedRepositories({
        activeTab: 'starred',
        searchQuery: '',
        searchResults: undefined,
        filteredRepositories: filteredRepos,
        filteredStarred,
      });

      expect(resultWithoutSearch).toEqual(filteredStarred);
      expect(resultWithoutSearch).toHaveLength(2);
    });
  });

  it('should handle empty filtered repositories', () => {
    const result = getDisplayedRepositories({
      activeTab: 'repositories',
      searchQuery: '',
      searchResults: undefined,
      filteredRepositories: [],
      filteredStarred,
    });

    expect(result).toEqual([]);
  });

  it('should handle empty filtered starred', () => {
    const result = getDisplayedRepositories({
      activeTab: 'starred',
      searchQuery: '',
      searchResults: undefined,
      filteredRepositories: filteredRepos,
      filteredStarred: [],
    });

    expect(result).toEqual([]);
  });
});
