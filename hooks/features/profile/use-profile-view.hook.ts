import { useProfileViewStore } from '@/lib/stores/features/profile/profile-view.store';

export function useProfileView() {
  const activeTab = useProfileViewStore((state) => state.activeTab);
  const searchQuery = useProfileViewStore((state) => state.searchQuery);
  const currentPage = useProfileViewStore((state) => state.currentPage);
  const setActiveTab = useProfileViewStore((state) => state.setActiveTab);
  const setSearchQuery = useProfileViewStore((state) => state.setSearchQuery);
  const setCurrentPage = useProfileViewStore((state) => state.setCurrentPage);

  return {
    activeTab,
    searchQuery,
    currentPage,
    setActiveTab,
    setSearchQuery,
    setCurrentPage,
  };
}
