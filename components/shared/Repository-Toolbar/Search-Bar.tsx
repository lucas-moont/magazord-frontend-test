'use client';

import { KeyboardEvent } from 'react';
import { Icon } from '@iconify/react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = 'Search Here',
}: SearchBarProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(value);
    }
  };

  return (
    <div className="relative flex items-center">
      <Icon icon="mdi:magnify" width={24} height={24} className="absolute right-0 md:right-auto md:left-0 text-gray-c3" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full pr-10 md:pr-0 md:pl-10 py-2 bg-transparent text-gray-900 placeholder:text-gray-c3 text-sm md:text-lg border-b border-separator md:border-separator focus:outline-none focus:border-gray-400 transition-colors dark:text-foreground dark:placeholder:text-gray-c3"
      />
    </div>
  );
}
