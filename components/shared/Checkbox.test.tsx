import { render } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { describe, it, expect } from 'vitest';

describe('Checkbox', () => {
  it('renders unchecked state correctly', () => {
    const { container } = render(<Checkbox checked={false} />);
    const checkboxDiv = container.firstChild;
    expect(checkboxDiv).toHaveClass('border-gray-400');
    expect(checkboxDiv).not.toHaveClass('bg-blue-500');
  });

  it('renders checked state correctly', () => {
    const { container } = render(<Checkbox checked={true} />);
    const checkboxDiv = container.firstChild;
    expect(checkboxDiv).toHaveClass('bg-blue-500');
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Checkbox checked={false} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
