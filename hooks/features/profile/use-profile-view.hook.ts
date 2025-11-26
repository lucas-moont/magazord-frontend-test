import { useProfileViewStore } from '@/lib/stores/features/profile/profile-view.store';

export function useProfileView() {
  const activeTab = useProfileViewStore((state) => state.activeTab);
  const searchQuery = useProfileViewStore((state) => state.searchQuery);
  const selectedRepositoryId = useProfileViewStore(
    (state) => state.selectedRepositoryId
  );
  const setActiveTab = useProfileViewStore((state) => state.setActiveTab);
  const setSearchQuery = useProfileViewStore((state) => state.setSearchQuery);
  const setSelectedRepositoryId = useProfileViewStore(
    (state) => state.setSelectedRepositoryId
  );

  return {
    activeTab,
    searchQuery,
    selectedRepositoryId,
    setActiveTab,
    setSearchQuery,
    setSelectedRepositoryId,
  };
}
