import { create } from 'zustand';

import { RepositoryFilters } from '@/@types/github';

interface RepositoryFiltersState {
  type: RepositoryFilters['type'];
  language: string | null;
  setType: (type: RepositoryFilters['type']) => void;
  setLanguage: (language: string | null) => void;
  resetFilters: () => void;
}

export const useRepositoryFiltersStore = create<RepositoryFiltersState>(
  (set) => ({
    type: ['all'],
    language: null,
    setType: (type) => set({ type }),
    setLanguage: (language) => set({ language }),
    resetFilters: () => set({ type: ['all'], language: null }),
  })
);
