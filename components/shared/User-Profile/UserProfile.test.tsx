import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserProfile } from './index';
import { describe, it, expect, vi } from 'vitest';
import type { User } from '@/@types/github';

// Mock next/image
/* eslint-disable @next/next/no-img-element */
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: React.ComponentProps<'img'>) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock AdditionalInfo to avoid next-intl issues
vi.mock('@/components/shared/Additional-Info', () => ({
  AdditionalInfo: ({ children }: { children: React.ReactNode }) => <div data-testid="additional-info">{children}</div>,
}));

const mockUser: User = {
  login: 'testuser',
  name: 'Test User',
  avatarUrl: 'https://example.com/avatar.jpg',
  bio: 'A test user bio',
  company: '@testcompany',
  location: 'Test City',
  blog: 'https://testblog.com',
  publicRepos: 10,
  followers: 100,
  following: 50,
};

describe('UserProfile', () => {
  it('renders user name', () => {
    render(<UserProfile user={mockUser} />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('renders user avatar', () => {
    render(<UserProfile user={mockUser} />);
    const avatar = screen.getByAltText('Test User');
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('renders user bio', () => {
    render(<UserProfile user={mockUser} />);
    expect(screen.getByText('A test user bio')).toBeInTheDocument();
  });

  it('renders company with link', () => {
    render(<UserProfile user={mockUser} />);
    const companyLink = screen.getByText('@testcompany').closest('a');
    expect(companyLink).toHaveAttribute('href', 'https://github.com/testcompany');
  });

  it('renders location', () => {
    render(<UserProfile user={mockUser} />);
    expect(screen.getByText('Test City')).toBeInTheDocument();
  });

  it('renders blog link', () => {
    render(<UserProfile user={mockUser} />);
    const blogLink = screen.getByText('https://testblog.com').closest('a');
    expect(blogLink).toHaveAttribute('href', 'https://testblog.com');
  });

  it('renders GitHub profile link', () => {
    render(<UserProfile user={mockUser} />);
    const githubLink = screen.getByText('testuser').closest('a');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/testuser');
  });

  it('does not render bio if not provided', () => {
    const userWithoutBio = { ...mockUser, bio: '' };
    render(<UserProfile user={userWithoutBio} />);
    expect(screen.queryByText('A test user bio')).not.toBeInTheDocument();
  });

  it('does not render additional info section if no company, location, or blog', () => {
    const minimalUser = {
      ...mockUser,
      company: '',
      location: '',
      blog: ''
    };
    render(<UserProfile user={minimalUser} />);
    // Should only render the GitHub link, not the AdditionalInfo wrapper
    expect(screen.queryByText('Test City')).not.toBeInTheDocument();
  });

  it('handles blog URL without http prefix', () => {
    const userWithSimpleBlog = { ...mockUser, blog: 'testblog.com' };
    render(<UserProfile user={userWithSimpleBlog} />);
    const blogLink = screen.getByText('testblog.com').closest('a');
    expect(blogLink).toHaveAttribute('href', 'https://testblog.com');
  });
});
