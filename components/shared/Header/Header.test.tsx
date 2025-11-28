import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './index';
import { describe, it, expect, vi } from 'vitest';

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

// Mock next/image
/* eslint-disable @next/next/no-img-element */
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: React.ComponentProps<'img'>) => <img src={src} alt={alt} {...props} />,
}));

// Mock ThemeSwitch
vi.mock('@/components/shared/ThemeSwitch', () => ({
  ThemeSwitch: () => <div data-testid="theme-switch">ThemeSwitch</div>,
}));

describe('Header', () => {
  it('renders logo and links', () => {
    render(<Header />);
    expect(screen.getByAltText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('profile')).toBeInTheDocument(); // translated key
  });

  it('renders ThemeSwitch', () => {
    render(<Header />);
    expect(screen.getByTestId('theme-switch')).toBeInTheDocument();
  });
});
