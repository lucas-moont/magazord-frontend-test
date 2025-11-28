import { render, screen } from '@testing-library/react';
import { RepositoryCard } from './Repository-Card';
import { describe, it, expect, vi } from 'vitest';
import type { Repository } from '@/@types/github';

// Mock next-intl
vi.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

const mockRepository: Repository = {
  id: 1,
  name: 'test-repo',
  fullName: 'testuser/test-repo',
  description: 'A test repository',
  htmlUrl: 'https://github.com/testuser/test-repo',
  homepage: null,
  language: 'TypeScript',
  stargazersCount: 150,
  forksCount: 25,
  watchersCount: 150,
  openIssuesCount: 10,
  topics: ['react', 'typescript', 'testing', 'vitest', 'jest'],
  createdAt: '2021-01-01T00:00:00Z',
  updatedAt: '2021-01-02T00:00:00Z',
  pushedAt: '2021-01-02T00:00:00Z',
  size: 2000,
  defaultBranch: 'main',
  visibility: 'public',
  isPrivate: false,
  isFork: false,
  isArchived: false,
  mirrorUrl: null,
};

describe('RepositoryCard', () => {
  it('renders repository name and owner', () => {
    render(<RepositoryCard repository={mockRepository} />);
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('test-repo')).toBeInTheDocument();
  });

  it('renders repository description', () => {
    render(<RepositoryCard repository={mockRepository} />);
    expect(screen.getByText('A test repository')).toBeInTheDocument();
  });

  it('renders repository language', () => {
    render(<RepositoryCard repository={mockRepository} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders stars and forks count', () => {
    render(<RepositoryCard repository={mockRepository} />);
    expect(screen.getByText('150')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('renders topics (max 5)', () => {
    render(<RepositoryCard repository={mockRepository} />);
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('typescript')).toBeInTheDocument();
    expect(screen.getByText('testing')).toBeInTheDocument();
    expect(screen.getByText('vitest')).toBeInTheDocument();
    expect(screen.getByText('jest')).toBeInTheDocument();
  });

  it('renders link to repository', () => {
    render(<RepositoryCard repository={mockRepository} />);
    const link = screen.getByRole('link', { name: 'test-repo' });
    expect(link).toHaveAttribute('href', 'https://github.com/testuser/test-repo');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('does not render description if not provided', () => {
    const repoWithoutDesc = { ...mockRepository, description: '' };
    render(<RepositoryCard repository={repoWithoutDesc} />);
    expect(screen.queryByText('A test repository')).not.toBeInTheDocument();
  });

  it('does not render topics section if no topics', () => {
    const repoWithoutTopics = { ...mockRepository, topics: [] };
    const { container } = render(<RepositoryCard repository={repoWithoutTopics} />);
    expect(container.querySelector('.flex.flex-wrap.gap-2.mt-3')).not.toBeInTheDocument();
  });
});
