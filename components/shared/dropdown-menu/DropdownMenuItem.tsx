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
      className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-gray-900 hover:bg-blue-50 transition-colors"
    >
      <Checkbox checked={checked} />
      {label}
    </button>
  );
}
