import { create } from 'zustand';

type ActiveTab = 'repositories' | 'starred';

interface ProfileViewState {
  activeTab: ActiveTab;
  searchQuery: string;
  selectedRepositoryId: number | null;
  setActiveTab: (tab: ActiveTab) => void;
  setSearchQuery: (query: string) => void;
  setSelectedRepositoryId: (id: number | null) => void;
}

export const useProfileViewStore = create<ProfileViewState>((set) => ({
  activeTab: 'repositories',
  searchQuery: '',
  selectedRepositoryId: null,
  setActiveTab: (activeTab) => set({ activeTab, searchQuery: '' }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedRepositoryId: (selectedRepositoryId) => set({ selectedRepositoryId }),
}));
