import { render } from '@testing-library/react';
import { ChevronIcon } from './ChevronIcon';
import { describe, it, expect } from 'vitest';

describe('ChevronIcon', () => {
  it('renders correctly', () => {
    const { container } = render(<ChevronIcon />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('rotates when isOpen is true', () => {
    const { container } = render(<ChevronIcon isOpen={true} />);
    expect(container.querySelector('svg')).toHaveClass('rotate-180');
  });

  it('does not rotate when isOpen is false', () => {
    const { container } = render(<ChevronIcon isOpen={false} />);
    expect(container.querySelector('svg')).not.toHaveClass('rotate-180');
  });

  it('applies custom className', () => {
    const { container } = render(<ChevronIcon className="custom-class" />);
    expect(container.querySelector('svg')).toHaveClass('custom-class');
  });
});
