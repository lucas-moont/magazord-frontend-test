import { describe, it, expect } from 'vitest';
import { useRepositoryFiltersStore } from './repository-filters.store';

describe('RepositoryFiltersStore', () => {
  it('should have default values', () => {
    const state = useRepositoryFiltersStore.getState();

    expect(state.type).toEqual(['all']);
    expect(state.language).toEqual(['all']);
  });

  it('should update type filter', () => {
    const { setType } = useRepositoryFiltersStore.getState();

    setType(['forks']);

    expect(useRepositoryFiltersStore.getState().type).toEqual(['forks']);
  });

  it('should update language filter', () => {
    const { setLanguage } = useRepositoryFiltersStore.getState();

    setLanguage(['TypeScript']);

    expect(useRepositoryFiltersStore.getState().language).toEqual(['TypeScript']);
  });

  it('should reset filters to default', () => {
    const { setType, setLanguage, resetFilters } = useRepositoryFiltersStore.getState();

    setType(['forks']);
    setLanguage(['JavaScript']);
    resetFilters();

    const state = useRepositoryFiltersStore.getState();
    expect(state.type).toEqual(['all']);
    expect(state.language).toEqual(['all']);
  });
});
