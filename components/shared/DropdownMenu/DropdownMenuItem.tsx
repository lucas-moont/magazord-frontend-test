import { ReactNode } from 'react';
import { Checkbox } from '@/components/shared/Checkbox';

interface DropdownMenuItemProps {
  label: ReactNode;
  checked: boolean;
  onClick: () => void;
}

export function DropdownMenuItem({ label, checked, onClick }: DropdownMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="dark:text-foreground hover:bg-dropdown-hover flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gray-900 transition-colors"
    >
      <Checkbox checked={checked} />
      {label}
    </button>
  );
}
