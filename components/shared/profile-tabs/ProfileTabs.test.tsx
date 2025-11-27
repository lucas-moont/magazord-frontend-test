import { render, screen, fireEvent } from '@testing-library/react';
import { ProfileTabs } from './index';
import { describe, it, expect, vi } from 'vitest';

const mockTabs = [
  { id: 'repositories', label: 'Repositories', count: 10 },
  { id: 'starred', label: 'Starred', count: 5 },
];

describe('ProfileTabs', () => {
  it('renders all tabs', () => {
    render(
      <ProfileTabs
        tabs={mockTabs}
        activeTab="repositories"
        onTabChange={() => { }}
      />
    );

    expect(screen.getByText('Repositories')).toBeInTheDocument();
    expect(screen.getByText('Starred')).toBeInTheDocument();
  });

  it('renders tab counts', () => {
    render(
      <ProfileTabs
        tabs={mockTabs}
        activeTab="repositories"
        onTabChange={() => { }}
      />
    );

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onTabChange when tab is clicked', () => {
    const handleTabChange = vi.fn();
    render(
      <ProfileTabs
        tabs={mockTabs}
        activeTab="repositories"
        onTabChange={handleTabChange}
      />
    );

    fireEvent.click(screen.getByText('Starred'));
    expect(handleTabChange).toHaveBeenCalledWith('starred');
  });

  it('applies active styles to active tab', () => {
    render(
      <ProfileTabs
        tabs={mockTabs}
        activeTab="repositories"
        onTabChange={() => { }}
      />
    );

    const activeTab = screen.getByText('Repositories').closest('button');
    expect(activeTab).toHaveClass('border-tab-active-border');
  });

  it('does not apply active styles to inactive tab', () => {
    render(
      <ProfileTabs
        tabs={mockTabs}
        activeTab="repositories"
        onTabChange={() => { }}
      />
    );

    const inactiveTab = screen.getByText('Starred').closest('button');
    expect(inactiveTab).toHaveClass('border-transparent');
  });
});
