'use client';

import { SearchBar } from './Search-Bar';
import { FilterDropdown } from './Filter-Dropdown';
import { cn } from '@/lib/utils/cn';

interface RepositoryToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (value: string) => void;
  searchPlaceholder: string;

  showFilters?: boolean;

  typeFilter?: string[];
  onTypeFilterChange?: (value: string[]) => void;
  typeLabel?: string;
  typeOptions?: { value: string; label: string }[];

  languageFilter?: string[];
  onLanguageFilterChange?: (value: string[]) => void;
  languageLabel?: string;
  languageOptions?: { value: string; label: string }[];

  className?: string;
}

export function RepositoryToolbar({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  searchPlaceholder,
  showFilters = false,
  typeFilter,
  onTypeFilterChange,
  typeLabel,
  typeOptions = [],
  languageFilter,
  onLanguageFilterChange,
  languageLabel,
  languageOptions = [],
  className,
}: RepositoryToolbarProps) {
  return (
    <div className={cn("flex flex-col md:flex-col lg:flex-row gap-4 md:gap-6", className)}>
      <div className="flex-1 w-full lg:order-first">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          onSearch={onSearchSubmit}
          placeholder={searchPlaceholder}
        />
      </div>

      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-2 md:order-first lg:order-last">
          {typeLabel && onTypeFilterChange && (
            <FilterDropdown
              label={typeLabel}
              value={typeFilter || ['all']}
              options={typeOptions}
              onChange={(value) => onTypeFilterChange(value as string[])}
            />
          )}

          {languageLabel && onLanguageFilterChange && (
            <FilterDropdown
              label={languageLabel}
              value={languageFilter || ['all']}
              options={languageOptions}
              onChange={(value) => onLanguageFilterChange(value as string[])}
            />
          )}
        </div>
      )}
    </div>
  );
}
