'use client';

import { KeyboardEvent } from 'react';
import { Icon } from '@iconify/react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, onSearch, placeholder = 'Search Here' }: SearchBarProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(value);
    }
  };

  return (
    <div className="relative flex items-center">
      <Icon
        icon="mdi:magnify"
        width={24}
        height={24}
        className="text-gray-c3 absolute right-0 md:right-auto md:left-0"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="placeholder:text-gray-c3 border-separator md:border-separator dark:text-foreground dark:placeholder:text-gray-c3 w-full border-b bg-transparent py-2 pr-10 text-sm text-gray-900 transition-colors focus:border-gray-400 focus:outline-none md:pr-0 md:pl-10 md:text-lg"
      />
    </div>
  );
}
