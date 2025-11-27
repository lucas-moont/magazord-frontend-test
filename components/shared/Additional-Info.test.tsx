import { render, screen, fireEvent } from '@testing-library/react';
import { AdditionalInfo } from './Additional-Info';
import { describe, it, expect, vi } from 'vitest';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('AdditionalInfo', () => {
  it('renders children correctly', () => {
    render(
      <AdditionalInfo>
        <div>Content</div>
      </AdditionalInfo>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders default title when no title provided', () => {
    render(
      <AdditionalInfo>
        <div>Content</div>
      </AdditionalInfo>
    );
    // Since we mock useTranslations to return the key
    expect(screen.getByText('additionalInfo')).toBeInTheDocument();
  });

  it('renders custom title', () => {
    render(
      <AdditionalInfo title="Custom Title">
        <div>Content</div>
      </AdditionalInfo>
    );
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('toggles content on mobile when clicked', () => {
    render(
      <AdditionalInfo collapsibleOnMobile={true}>
        <div data-testid="content">Content</div>
      </AdditionalInfo>
    );

    const button = screen.getByRole('button');
    const content = screen.getByTestId('content').parentElement;

    // Initially hidden on mobile (by class) - checking class logic
    expect(content).toHaveClass('hidden');

    fireEvent.click(button);

    expect(content).not.toHaveClass('hidden');
    expect(content).toHaveClass('md:flex');
  });
});
