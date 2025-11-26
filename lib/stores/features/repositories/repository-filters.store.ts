import { create } from 'zustand';

interface RepositoryFiltersState {
  type: 'all' | 'owner' | 'member' | 'public' | 'private';
  language: string | null;
  setType: (type: 'all' | 'owner' | 'member' | 'public' | 'private') => void;
  setLanguage: (language: string | null) => void;
  resetFilters: () => void;
}

export const useRepositoryFiltersStore = create<RepositoryFiltersState>(
  (set) => ({
    type: 'all',
    language: null,
    setType: (type) => set({ type }),
    setLanguage: (language) => set({ language }),
    resetFilters: () => set({ type: 'all', language: null }),
  })
);
