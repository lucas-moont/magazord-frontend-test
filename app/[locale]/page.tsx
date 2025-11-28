'use client';

import { useEffect } from 'react';
import { useFetchUser } from '@/hooks/features/github/use-fetch-user.hook';
import { useFetchRepositories } from '@/hooks/features/github/use-fetch-repositories.hook';
import { useFetchStarred } from '@/hooks/features/github/use-fetch-starred.hook';
import { useSearchRepositories } from '@/hooks/features/github/use-search-repositories.hook';
import { useProfileView } from '@/hooks/features/profile/use-profile-view.hook';
import { useRepositoryFilters } from '@/hooks/features/repositories/use-repository-filters.hook';
import { UserProfile } from '@/components/shared/User-Profile';
import { ProfileTabs } from '@/components/shared/Profile-Tabs';
import { RepositoryToolbar } from '@/components/shared/Repository-Toolbar';
import { RepositoryList } from '@/components/shared/Repository-List';
import { useTranslations } from 'next-intl';
import type { RepositoryFilters } from '@/@types/github';
import { filterRepositories } from '@/lib/utils/filter-repositories';
import { extractAvailableLanguages } from '@/lib/utils/extract-available-languages';
import { calculateRepositoryCounts } from '@/lib/utils/calculate-repository-counts';
import { getDisplayedRepositories } from '@/lib/utils/get-displayed-repositories';
import { calculatePagination } from '@/lib/utils/pagination-calculator';
import { Pagination } from '@/components/shared/Pagination';
import { ITEMS_PER_PAGE } from '@/consts/pagination';

export default function ProfilePage() {
  const t = useTranslations('profile');

  const { activeTab, searchQuery, currentPage, setActiveTab, setSearchQuery, setCurrentPage } = useProfileView();
  const { type, language, setType, setLanguage, resetFilters } = useRepositoryFilters();

  useEffect(() => {
    resetFilters();
    setSearchQuery('');
    setCurrentPage(1);
  }, [activeTab, resetFilters, setSearchQuery, setCurrentPage]);

  const { user, isLoading: isLoadingUser } = useFetchUser();

  const { repositories, isLoading: isLoadingRepos } = useFetchRepositories({
    type,
  });

  const { starred, isLoading: isLoadingStarred } = useFetchStarred();

  const { repositories: searchResults, isLoading: isSearching } = useSearchRepositories({
    query: searchQuery,
    language: language || undefined,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const isLoading = activeTab === 'repositories' ? (searchQuery ? isSearching : isLoadingRepos) : isLoadingStarred;

  const filteredRepositories = filterRepositories(repositories || [], {
    language: language || undefined,
    type: [],
  });

  const filteredStarred = filterRepositories(starred || [], {
    language: language || undefined,
    type: type || undefined,
  });

  const displayedRepositories = getDisplayedRepositories({
    activeTab,
    searchQuery,
    searchResults,
    filteredRepositories,
    filteredStarred,
  });

  const { repositoriesCount, starredCount } = calculateRepositoryCounts({
    activeTab,
    displayedRepositories,
    totalRepositories: repositories,
    totalStarred: starred,
  });

  const { totalPages, startIndex, endIndex } = calculatePagination(
    displayedRepositories.length,
    ITEMS_PER_PAGE,
    currentPage,
  );
  const paginatedRepositories = displayedRepositories.slice(startIndex, endIndex);

  const allReposForLanguages = activeTab === 'repositories' ? repositories || [] : starred || [];
  const availableLanguages = extractAvailableLanguages(allReposForLanguages);

  const tabs = [
    {
      id: 'repositories',
      label: t('tabs.repositories'),
      count: repositoriesCount,
    },
    {
      id: 'starred',
      label: t('tabs.starred'),
      count: starredCount,
    },
  ];

  if (isLoadingUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">{t('loading')}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-lg text-red-600">{t('error')}</div>
      </div>
    );
  }

  return (
    <div className="dark:bg-background min-h-screen bg-white pb-16 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-7 md:gap-8 lg:grid-cols-4 lg:gap-12 xl:gap-16">
          <aside className="md:col-span-2 lg:col-span-1">
            <UserProfile user={user} />
          </aside>

          <main className="md:col-span-5 lg:col-span-3">
            <ProfileTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={(tabId) => setActiveTab(tabId as 'repositories' | 'starred')}
              className="mb-4 sm:mb-6 md:mb-8"
            />

            <RepositoryToolbar
              className="mb-4 sm:mb-6 md:mb-8"
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearchSubmit={handleSearch}
              searchPlaceholder={t('search.placeholder')}
              showFilters={true}
              typeLabel={t('filters.type')}
              typeFilter={type || ['all']}
              onTypeFilterChange={(value) => setType(value as RepositoryFilters['type'])}
              typeOptions={[
                { value: 'sources', label: 'Sources' },
                { value: 'forks', label: 'Forks' },
                { value: 'archived', label: 'Archived' },
                { value: 'mirrors', label: 'Mirrors' },
              ]}
              languageLabel={t('filters.language')}
              languageFilter={language || ['all']}
              onLanguageFilterChange={(values) => setLanguage(values)}
              languageOptions={availableLanguages}
            />

            {isLoading ? (
              <div className="py-12 text-center text-gray-600">{t('loading')}</div>
            ) : displayedRepositories.length === 0 ? (
              <div className="py-12 text-center text-gray-500">{t('search.noResults')}</div>
            ) : (
              <>
                <RepositoryList repositories={paginatedRepositories} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
