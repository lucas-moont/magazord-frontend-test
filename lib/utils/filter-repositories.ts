import type { Repository, RepositoryFilters } from '@/@types/github';

export function filterRepositories(repositories: Repository[], filters: RepositoryFilters): Repository[] {
  let filteredRepos = [...repositories];

  // Apply custom type filters
  if (filters.type && filters.type.length > 0 && !filters.type.includes('all')) {
    filteredRepos = filteredRepos.filter((repo) => {
      return filters.type!.some((type) => {
        switch (type) {
          case 'sources':
            return !repo.isFork;
          case 'forks':
            return repo.isFork;
          case 'archived':
            return repo.isArchived;
          case 'mirrors':
            return !!repo.mirrorUrl;
          default:
            return false;
        }
      });
    });
  }

  // Apply language filter
  if (filters.language && filters.language.length > 0 && !filters.language.includes('all')) {
    filteredRepos = filteredRepos.filter((repo) => {
      if (!repo.language) return false;
      return filters.language!.some((lang) => lang.toLowerCase() === repo.language!.toLowerCase());
    });
  }

  return filteredRepos;
}
