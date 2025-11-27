import { render, screen, fireEvent } from '@testing-library/react';
import { DropdownMenu } from './index';
import { describe, it, expect, vi } from 'vitest';

describe('DropdownMenu', () => {
  it('does not render when isOpen is false', () => {
    render(
      <DropdownMenu isOpen={false}>
        <div>Content</div>
      </DropdownMenu>
    );
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('renders content when isOpen is true', () => {
    render(
      <DropdownMenu isOpen={true}>
        <div>Content</div>
      </DropdownMenu>
    );
    // Component renders twice: once for desktop, once for mobile
    const contentElements = screen.getAllByText('Content');
    expect(contentElements.length).toBeGreaterThan(0);
  });

  it('renders title and close button on mobile', () => {
    const handleClose = vi.fn();
    render(
      <DropdownMenu isOpen={true} title="Menu Title" onClose={handleClose}>
        <div>Content</div>
      </DropdownMenu>
    );

    expect(screen.getByText('Menu Title')).toBeInTheDocument();
    const closeButton = screen.getByLabelText('Fechar');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });

  it('applies position classes', () => {
    const { container } = render(
      <DropdownMenu isOpen={true} position="left">
        <div>Content</div>
      </DropdownMenu>
    );
    // The desktop container is the first div
    const desktopContainer = container.querySelector('.absolute');
    expect(desktopContainer).toHaveClass('left-0');
  });
});
