import { cn } from '@/lib/utils/cn';

interface ChevronIconProps {
  isOpen?: boolean;
  className?: string;
}

export function ChevronIcon({ isOpen = false, className }: ChevronIconProps) {
  return (
    <svg
      className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180', className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
