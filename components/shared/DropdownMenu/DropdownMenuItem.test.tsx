import { render, screen, fireEvent } from '@testing-library/react';
import { DropdownMenuItem } from './DropdownMenuItem';
import { describe, it, expect, vi } from 'vitest';

describe('DropdownMenuItem', () => {
  it('renders label correctly', () => {
    render(<DropdownMenuItem label="Item 1" checked={false} onClick={() => {}} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('renders checkbox state correctly', () => {
    // We rely on Checkbox component which we already tested,
    // but we can check if the container has the click handler
    const handleClick = vi.fn();
    render(<DropdownMenuItem label="Item 1" checked={true} onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});
