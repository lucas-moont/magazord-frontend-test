'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/shared/Button';
import { ChevronIcon } from '@/components/shared/ChevronIcon';
import { DropdownMenu } from '@/components/shared/DropdownMenu';
import { DropdownMenuItem } from '@/components/shared/DropdownMenu/DropdownMenuItem';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  value: string[];
  options: FilterOption[];
  onChange: (value: string[]) => void;
}

export function FilterDropdown({ label, value = [], options, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    if (optionValue === 'all') {
      onChange(['all']);
      return;
    }

    let newValue = [...(value || [])];

    if (newValue.includes('all')) {
      newValue = [];
    }

    if (newValue.includes(optionValue)) {
      newValue = newValue.filter((v) => v !== optionValue);
    } else {
      newValue.push(optionValue);
    }

    if (newValue.length === 0) {
      newValue = ['all'];
    }

    onChange(newValue);
  };

  const displayLabel = (value || []).includes('all') ? label : `${label} (${(value || []).length})`;

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 hidden bg-black/20 md:block" onClick={() => setIsOpen(false)} />}
      <div className={cn('relative', isOpen ? 'z-[100]' : 'z-10', 'md:z-50')} ref={dropdownRef}>
        <Button onClick={() => setIsOpen(!isOpen)} icon={<ChevronIcon isOpen={isOpen} />}>
          {displayLabel}
        </Button>

        <DropdownMenu isOpen={isOpen} title={label} onClose={() => setIsOpen(false)}>
          <DropdownMenuItem label="All" checked={(value || []).includes('all')} onClick={() => handleSelect('all')} />
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              label={option.label}
              checked={(value || []).includes(option.value)}
              onClick={() => handleSelect(option.value)}
            />
          ))}
        </DropdownMenu>
      </div>
    </>
  );
}
