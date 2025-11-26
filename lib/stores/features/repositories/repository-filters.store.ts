import { create } from 'zustand';

import { RepositoryFilters } from '@/@types/github';

interface RepositoryFiltersState {
  type: RepositoryFilters['type'];
  language: string[];
  setType: (type: RepositoryFilters['type']) => void;
  setLanguage: (language: string[]) => void;
  resetFilters: () => void;
}

export const useRepositoryFiltersStore = create<RepositoryFiltersState>(
  (set) => ({
    type: ['all'],
    language: ['all'],
    setType: (type) => set({ type }),
    setLanguage: (language) => set({ language }),
    resetFilters: () => set({ type: ['all'], language: ['all'] }),
  })
);
