import { describe, it, expect } from 'vitest';
import { useProfileViewStore } from './profile-view.store';

describe('ProfileViewStore', () => {
  it('should have default values', () => {
    const state = useProfileViewStore.getState();

    expect(state.activeTab).toBe('repositories');
    expect(state.searchQuery).toBe('');
    expect(state.currentPage).toBe(1);
  });

  it('should update active tab', () => {
    const { setActiveTab } = useProfileViewStore.getState();

    setActiveTab('starred');

    expect(useProfileViewStore.getState().activeTab).toBe('starred');
  });

  it('should reset currentPage when changing tabs', () => {
    const { setCurrentPage, setActiveTab } = useProfileViewStore.getState();

    setCurrentPage(5);
    expect(useProfileViewStore.getState().currentPage).toBe(5);

    setActiveTab('starred');
    expect(useProfileViewStore.getState().currentPage).toBe(1);
  });

  it('should update search query', () => {
    const { setSearchQuery } = useProfileViewStore.getState();

    setSearchQuery('react');

    expect(useProfileViewStore.getState().searchQuery).toBe('react');
  });

  it('should reset currentPage when updating search query', () => {
    const { setCurrentPage, setSearchQuery } = useProfileViewStore.getState();

    setCurrentPage(3);
    expect(useProfileViewStore.getState().currentPage).toBe(3);

    setSearchQuery('test');
    expect(useProfileViewStore.getState().currentPage).toBe(1);
  });

  it('should update current page', () => {
    const { setCurrentPage } = useProfileViewStore.getState();

    setCurrentPage(7);

    expect(useProfileViewStore.getState().currentPage).toBe(7);
  });
});
