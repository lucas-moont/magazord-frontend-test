import { create } from 'zustand';

type ActiveTab = 'repositories' | 'starred';

interface ProfileViewState {
  activeTab: ActiveTab;
  searchQuery: string;
  currentPage: number;
  setActiveTab: (tab: ActiveTab) => void;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
}

export const useProfileViewStore = create<ProfileViewState>((set) => ({
  activeTab: 'repositories',
  searchQuery: '',
  currentPage: 1,
  setActiveTab: (tab) => set({ activeTab: tab, currentPage: 1 }), // Reset page on tab change
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }), // Reset page on search
  setCurrentPage: (page) => set({ currentPage: page }),
}));
