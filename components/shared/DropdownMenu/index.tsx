import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import { Icon } from '@iconify/react';

interface DropdownMenuProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
  position?: 'left' | 'right';
  title?: string;
  onClose?: () => void;
}

export function DropdownMenu({ isOpen, children, className, position = 'right', title, onClose }: DropdownMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className={cn(
          'absolute top-full z-50 mt-2 w-56 overflow-hidden rounded-lg shadow-lg',
          'bg-dropdown-bg border-dropdown-border border',
          'hidden md:block',
          position === 'right' ? 'right-0' : 'left-0',
          className,
        )}
      >
        {children}
      </div>

      <div className={cn('fixed inset-0 z-[9999] flex flex-col md:hidden', 'bg-dropdown-bg', className)}>
        {title && onClose && (
          <div className="bg-dropdown-bg flex items-center justify-between px-4 py-4">
            <h2 className="dark:text-foreground text-lg font-medium text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Fechar"
            >
              <Icon icon="mdi:close" width={24} height={24} className="text-close-button" />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </>
  );
}
