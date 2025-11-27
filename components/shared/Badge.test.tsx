import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';
import { describe, it, expect } from 'vitest';

describe('Badge', () => {
  it('renders content correctly', () => {
    render(<Badge content={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders string content correctly', () => {
    render(<Badge content="New" />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Badge content={1} className="custom-class" />);
    const badge = screen.getByText('1');
    expect(badge).toHaveClass('custom-class');
  });
});
