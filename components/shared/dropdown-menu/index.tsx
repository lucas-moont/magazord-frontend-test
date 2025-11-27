import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface DropdownMenuProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
  position?: 'left' | 'right';
}

export function DropdownMenu({
  isOpen,
  children,
  className,
  position = 'right'
}: DropdownMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "absolute top-full mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden",
        position === 'right' ? 'right-0' : 'left-0',
        className
      )}
    >
      {children}
    </div>
  );
}
