import type { Repository } from '@/@types/github';

interface GetDisplayedRepositoriesParams {
  activeTab: 'repositories' | 'starred';
  searchQuery: string;
  searchResults: Repository[] | undefined;
  filteredRepositories: Repository[];
  filteredStarred: Repository[];
}

export function getDisplayedRepositories({
  activeTab,
  searchQuery,
  searchResults,
  filteredRepositories,
  filteredStarred,
}: GetDisplayedRepositoriesParams): Repository[] {
  if (activeTab === 'repositories') {
    return searchQuery ? searchResults || [] : filteredRepositories;
  }
  return filteredStarred;
}

