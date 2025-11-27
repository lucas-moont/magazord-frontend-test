import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './index';
import { describe, it, expect, vi } from 'vitest';

describe('Pagination', () => {
  it('does not render when totalPages is 1 or less', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={() => { }} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders page buttons correctly', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={handlePageChange} />
    );

    expect(screen.getByLabelText('Page 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Page 2')).toBeInTheDocument();
  });

  it('calls onPageChange when page button is clicked', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={handlePageChange} />
    );

    fireEvent.click(screen.getByLabelText('Page 2'));
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it('disables previous button on first page', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => { }} />
    );

    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={() => { }} />
    );

    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange with correct page on next button click', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={handlePageChange} />
    );

    fireEvent.click(screen.getByLabelText('Next page'));
    expect(handlePageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange with correct page on previous button click', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />
    );

    fireEvent.click(screen.getByLabelText('Previous page'));
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it('highlights current page', () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={() => { }} />
    );

    const currentPageButton = screen.getByLabelText('Page 3');
    expect(currentPageButton).toHaveClass('bg-blue-600');
  });
});
