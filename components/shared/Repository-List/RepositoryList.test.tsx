import { render, screen } from '@testing-library/react';
import { RepositoryList } from './index';
import { describe, it, expect, vi } from 'vitest';
import type { Repository } from '@/@types/github';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} alt={props.alt} />,
}));

const mockRepository: Repository = {
  id: 1,
  name: 'test-repo',
  fullName: 'user/test-repo',
  description: 'Test description',
  htmlUrl: 'https://github.com/user/test-repo',
  homepage: null,
  language: 'TypeScript',
  stargazersCount: 100,
  forksCount: 20,
  watchersCount: 100,
  openIssuesCount: 5,
  topics: ['react', 'typescript'],
  createdAt: '2021-01-01T00:00:00Z',
  updatedAt: '2021-01-02T00:00:00Z',
  pushedAt: '2021-01-02T00:00:00Z',
  size: 1000,
  defaultBranch: 'main',
  visibility: 'public',
  isPrivate: false,
  isFork: false,
  isArchived: false,
  mirrorUrl: null,
};

describe('RepositoryList', () => {
  it('renders no results message when repositories array is empty', () => {
    render(<RepositoryList repositories={[]} />);
    expect(screen.getByText('search.noResults')).toBeInTheDocument();
  });

  it('renders repository cards when repositories are provided', () => {
    render(<RepositoryList repositories={[mockRepository]} />);
    expect(screen.getByText('test-repo')).toBeInTheDocument();
  });

  it('renders separators between repositories', () => {
    const { container } = render(
      <RepositoryList repositories={[mockRepository, { ...mockRepository, id: 2 }]} />
    );
    const separators = container.querySelectorAll('.bg-separator');
    expect(separators.length).toBe(1);
  });

  it('does not render separator after last repository', () => {
    const { container } = render(
      <RepositoryList repositories={[mockRepository]} />
    );
    const separators = container.querySelectorAll('.bg-separator');
    expect(separators.length).toBe(0);
  });
});
