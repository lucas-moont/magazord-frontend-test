import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './Search-Bar';
import { describe, it, expect, vi } from 'vitest';

describe('SearchBar', () => {
  it('renders with placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} onSearch={() => {}} placeholder="Search repositories" />);
    expect(screen.getByPlaceholderText('Search repositories')).toBeInTheDocument();
  });

  it('renders with default placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} onSearch={() => {}} />);
    expect(screen.getByPlaceholderText('Search Here')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} onSearch={() => {}} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledWith('test');
  });

  it('calls onSearch when Enter key is pressed', () => {
    const handleSearch = vi.fn();
    render(<SearchBar value="test query" onChange={() => {}} onSearch={handleSearch} />);

    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(handleSearch).toHaveBeenCalledWith('test query');
  });

  it('displays current value', () => {
    render(<SearchBar value="current value" onChange={() => {}} onSearch={() => {}} />);

    expect(screen.getByDisplayValue('current value')).toBeInTheDocument();
  });
});
