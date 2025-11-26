import { useRepositoryFiltersStore } from '@/lib/stores/features/repositories/repository-filters.store';

export function useRepositoryFilters() {
  const type = useRepositoryFiltersStore((state) => state.type);
  const language = useRepositoryFiltersStore((state) => state.language);
  const setType = useRepositoryFiltersStore((state) => state.setType);
  const setLanguage = useRepositoryFiltersStore((state) => state.setLanguage);
  const resetFilters = useRepositoryFiltersStore((state) => state.resetFilters);

  return {
    type,
    language,
    setType,
    setLanguage,
    resetFilters,
  };
}
