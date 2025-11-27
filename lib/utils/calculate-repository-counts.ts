import type { Repository } from '@/@types/github';

interface CalculateRepositoryCountsParams {
  activeTab: 'repositories' | 'starred';
  displayedRepositories: Repository[];
  totalRepositories: Repository[] | undefined;
  totalStarred: Repository[] | undefined;
}

export function calculateRepositoryCounts({
  activeTab,
  displayedRepositories,
  totalRepositories,
  totalStarred,
}: CalculateRepositoryCountsParams) {
  const repositoriesCount =
    activeTab === 'repositories'
      ? displayedRepositories.length
      : totalRepositories?.length || 0;

  const starredCount =
    activeTab === 'starred'
      ? displayedRepositories.length
      : totalStarred?.length || 0;

  return {
    repositoriesCount,
    starredCount,
  };
}

