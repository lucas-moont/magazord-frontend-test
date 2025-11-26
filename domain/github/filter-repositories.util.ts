import type { Repository, RepositoryFilters } from '@/@types/github';

export function filterRepositories(
  repositories: Repository[],
  filters: RepositoryFilters
): Repository[] {
  let filteredRepos = [...repositories];

  // Apply custom type filters
  if (filters.type) {
    switch (filters.type) {
      case 'sources':
        filteredRepos = filteredRepos.filter((repo) => !repo.isFork);
        break;
      case 'forks':
        filteredRepos = filteredRepos.filter((repo) => repo.isFork);
        break;
      case 'archived':
        filteredRepos = filteredRepos.filter((repo) => repo.isArchived);
        break;
      case 'mirrors':
        filteredRepos = filteredRepos.filter((repo) => !!repo.mirrorUrl);
        break;
    }
  }

  // Apply language filter
  if (filters.language) {
    filteredRepos = filteredRepos.filter(
      (repo) => repo.language?.toLowerCase() === filters.language?.toLowerCase()
    );
  }

  return filteredRepos;
}
