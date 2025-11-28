import { describe, it, expect } from 'vitest';
import { filterRepositories } from './filter-repositories';
import type { Repository } from '@/@types/github';

// Mock repository factory
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

describe('filterRepositories', () => {
  const repos = [
    createRepo({ id: 1, name: 'source-ts', isFork: false, language: 'TypeScript' }),
    createRepo({ id: 2, name: 'fork-js', isFork: true, language: 'JavaScript' }),
    createRepo({ id: 3, name: 'archived-go', isArchived: true, language: 'Go' }),
    createRepo({ id: 4, name: 'mirror-py', mirrorUrl: 'http://mirror.com', language: 'Python' }),
  ];

  it('should return all repositories when no filters are active', () => {
    const result = filterRepositories(repos, { type: ['all'], language: ['all'] });
    expect(result).toHaveLength(4);
  });

  describe('Type Filters', () => {
    it('should filter sources (non-forks)', () => {
      const result = filterRepositories(repos, { type: ['sources'] });
      // source-ts, archived-go, mirror-py are not forks
      // fork-js is a fork
      expect(result).toHaveLength(3);
      expect(result.find((r: Repository) => r.name === 'fork-js')).toBeUndefined();
    });

    it('should filter forks', () => {
      const result = filterRepositories(repos, { type: ['forks'] });
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('fork-js');
    });

    it('should filter archived', () => {
      const result = filterRepositories(repos, { type: ['archived'] });
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('archived-go');
    });

    it('should filter mirrors', () => {
      const result = filterRepositories(repos, { type: ['mirrors'] });
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('mirror-py');
    });

    it('should handle multiple type filters (OR logic)', () => {
      // Forks OR Archived
      const result = filterRepositories(repos, { type: ['forks', 'archived'] });
      expect(result).toHaveLength(2);
      expect(result.map((r: Repository) => r.name)).toContain('fork-js');
      expect(result.map((r: Repository) => r.name)).toContain('archived-go');
    });
  });

  describe('Language Filters', () => {
    it('should filter by single language', () => {
      const result = filterRepositories(repos, { language: ['TypeScript'] });
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('source-ts');
    });

    it('should filter by multiple languages (OR logic)', () => {
      const result = filterRepositories(repos, { language: ['TypeScript', 'Go'] });
      expect(result).toHaveLength(2);
      expect(result.map((r: Repository) => r.name)).toContain('source-ts');
      expect(result.map((r: Repository) => r.name)).toContain('archived-go');
    });

    it('should be case insensitive', () => {
      const result = filterRepositories(repos, { language: ['typescript'] });
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('source-ts');
    });
  });

  describe('Combined Filters', () => {
    it('should apply both type and language filters (AND logic between categories)', () => {
      // Type: Sources AND Language: Go
      const result = filterRepositories(repos, {
        type: ['sources'],
        language: ['Go'],
      });
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('archived-go');
    });

    it('should return empty if no match', () => {
      // Type: Forks AND Language: TypeScript (fork is JS)
      const result = filterRepositories(repos, {
        type: ['forks'],
        language: ['TypeScript'],
      });
      expect(result).toHaveLength(0);
    });
  });
});
