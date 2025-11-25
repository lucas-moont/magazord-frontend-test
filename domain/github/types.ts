export interface User {
  login: string;
  name: string;
  avatarUrl: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  publicRepos: number;
  followers: number;
  following: number;
}

export interface Repository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  watchersCount: number;
  openIssuesCount: number;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  size: number;
  defaultBranch: string;
  topics: string[];
  visibility: string;
  isPrivate: boolean;
  isFork: boolean;
  isArchived: boolean;
}

export interface RepositoryFilters {
  type?: 'all' | 'owner' | 'member' | 'public' | 'private';
  language?: string;
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  direction?: 'asc' | 'desc';
}

export interface SearchRepositoryFilters {
  query: string;
  language?: string;
  sort?: 'stars' | 'forks' | 'updated';
  order?: 'asc' | 'desc';
}
