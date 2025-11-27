'use client';

import { useFetchUser } from '@/hooks/features/github/use-fetch-user.hook';
import { useFetchRepositories } from '@/hooks/features/github/use-fetch-repositories.hook';
import { useFetchStarred } from '@/hooks/features/github/use-fetch-starred.hook';
import { useSearchRepositories } from '@/hooks/features/github/use-search-repositories.hook';
import { useProfileView } from '@/hooks/features/profile/use-profile-view.hook';
import { useRepositoryFilters } from '@/hooks/features/repositories/use-repository-filters.hook';
import { UserProfile } from '@/components/shared/user-profile';
import { ProfileTabs } from '@/components/shared/profile-tabs';
import { RepositoryToolbar } from '@/components/shared/repository-toolbar';
import { RepositoryList } from '@/components/shared/repository-list';
import { Header } from '@/components/shared/header';
import { useTranslations } from 'next-intl';
import { filterRepositories } from '@/lib/utils/filter-repositories';

import { Pagination } from '@/components/shared/pagination';

export default function ProfilePage() {
  const t = useTranslations('profile');

  const { activeTab, searchQuery, currentPage, setActiveTab, setSearchQuery, setCurrentPage } = useProfileView();
  const { type, language, setType, setLanguage } = useRepositoryFilters();

  const { user, isLoading: isLoadingUser } = useFetchUser();

  const { repositories, isLoading: isLoadingRepos } = useFetchRepositories({
    type,
    // Don't filter by language in the hook so we can calculate available languages from all repos
  });

  const { starred, isLoading: isLoadingStarred } = useFetchStarred();

  const { repositories: searchResults, isLoading: isSearching } = useSearchRepositories({
    query: searchQuery,
    language: language || undefined,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const isLoading =
    activeTab === 'repositories'
      ? searchQuery
        ? isSearching
        : isLoadingRepos
      : isLoadingStarred;

  // Filter repositories by language locally using the utility
  // We pass empty type array because types are already filtered by the use case
  const filteredRepositories = filterRepositories(repositories || [], {
    language: language || undefined,
    type: [],
  });

  const displayedRepositories =
    activeTab === 'repositories'
      ? searchQuery
        ? searchResults || []
        : filteredRepositories
      : starred || [];

  // Pagination logic
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(displayedRepositories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedRepositories = displayedRepositories.slice(startIndex, endIndex);

  const availableLanguages = Array.from(
    new Set(
      (repositories || [])
        .map((repo) => repo.language)
        .filter((lang): lang is string => lang !== null)
    )
  ).map((lang) => ({ value: lang, label: lang }));

  const tabs = [
    {
      id: 'repositories',
      label: t('tabs.repositories'),
      count: repositories?.length || 0,
    },
    {
      id: 'starred',
      label: t('tabs.starred'),
      count: starred?.length || 0,
    },
  ];

  if (isLoadingUser) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-lg text-gray-600">{t('loading')}</div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-lg text-red-600">{t('error')}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
            <aside className="lg:col-span-1">
              <UserProfile user={user} />
            </aside>

            <main className="lg:col-span-3">
              <ProfileTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={(tabId) => setActiveTab(tabId as 'repositories' | 'starred')}
                className="mb-15"
              />

              <RepositoryToolbar
                className="mb-4"
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSearchSubmit={handleSearch}
                searchPlaceholder={t('search.placeholder')}
                showFilters={activeTab === 'repositories'}
                typeLabel={t('filters.type')}
                typeFilter={type || ['all']}
                onTypeFilterChange={(value) => setType(value as any)}
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
                <div className="text-center py-12 text-gray-600">
                  {t('loading')}
                </div>
              ) : displayedRepositories.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  {t('search.noResults')}
                </div>
              ) : (
                <>
                  <RepositoryList repositories={paginatedRepositories} />
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
