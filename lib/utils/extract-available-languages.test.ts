import { describe, it, expect } from 'vitest';
import { extractAvailableLanguages } from './extract-available-languages';
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

describe('extractAvailableLanguages', () => {
  it('should extract unique languages from repositories', () => {
    const repos = [
      createRepo({ language: 'TypeScript' }),
      createRepo({ language: 'JavaScript' }),
      createRepo({ language: 'TypeScript' }),
      createRepo({ language: 'Go' }),
    ];

    const result = extractAvailableLanguages(repos);

    expect(result).toHaveLength(3);
    expect(result).toEqual([
      { value: 'TypeScript', label: 'TypeScript' },
      { value: 'JavaScript', label: 'JavaScript' },
      { value: 'Go', label: 'Go' },
    ]);
  });

  it('should filter out null languages', () => {
    const repos = [
      createRepo({ language: 'TypeScript' }),
      createRepo({ language: null }),
      createRepo({ language: 'JavaScript' }),
      createRepo({ language: null }),
    ];

    const result = extractAvailableLanguages(repos);

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { value: 'TypeScript', label: 'TypeScript' },
      { value: 'JavaScript', label: 'JavaScript' },
    ]);
  });

  it('should return empty array for empty repositories', () => {
    const result = extractAvailableLanguages([]);
    expect(result).toEqual([]);
  });

  it('should return empty array when all repositories have null language', () => {
    const repos = [createRepo({ language: null }), createRepo({ language: null })];

    const result = extractAvailableLanguages(repos);
    expect(result).toEqual([]);
  });

  it('should preserve order of first occurrence', () => {
    const repos = [
      createRepo({ language: 'Go' }),
      createRepo({ language: 'TypeScript' }),
      createRepo({ language: 'Go' }),
      createRepo({ language: 'JavaScript' }),
      createRepo({ language: 'TypeScript' }),
    ];

    const result = extractAvailableLanguages(repos);

    expect(result).toEqual([
      { value: 'Go', label: 'Go' },
      { value: 'TypeScript', label: 'TypeScript' },
      { value: 'JavaScript', label: 'JavaScript' },
    ]);
  });
});
