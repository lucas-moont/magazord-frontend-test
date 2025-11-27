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

export function DropdownMenu({
  isOpen,
  children,
  className,
  position = 'right',
  title,
  onClose,
}: DropdownMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className={cn(
          "absolute top-full mt-2 w-56 rounded-lg shadow-lg overflow-hidden z-50",
          "bg-dropdown-bg border border-dropdown-border",
          "md:block hidden",
          position === 'right' ? 'right-0' : 'left-0',
          className
        )}
      >
        {children}
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[9999] flex flex-col md:hidden",
          "bg-dropdown-bg",
          className
        )}
      >
        {title && onClose && (
          <div className="flex items-center justify-between px-4 py-4 bg-dropdown-bg">
            <h2 className="text-lg font-medium text-gray-900 dark:text-foreground">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Fechar"
            >
              <Icon icon="mdi:close" width={24} height={24} className="text-close-button" />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}
