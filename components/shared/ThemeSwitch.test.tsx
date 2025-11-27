import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeSwitch } from './ThemeSwitch';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock next-themes
const mockSetTheme = vi.fn();
vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: mockSetTheme,
  }),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
  },
}));

describe('ThemeSwitch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly after mount', async () => {
    render(<ThemeSwitch />);
    // Since we use startTransition/useEffect, we might need to wait or rely on the fact that testing-library waits?
    // Actually, in the component, it renders a placeholder if not mounted.
    // But useEffect runs after render.

    // Let's wait for the button to appear
    const button = await screen.findByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it('toggles theme on click', async () => {
    render(<ThemeSwitch />);
    const button = await screen.findByRole('button', { name: /toggle theme/i });

    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
    // Assuming initial theme is light from the mock
  });

  it('applies floating styles', async () => {
    render(<ThemeSwitch floating={true} />);
    const button = await screen.findByRole('button', { name: /toggle theme/i });
    expect(button).toHaveClass('fixed', 'bottom-4', 'right-4');
  });
});
