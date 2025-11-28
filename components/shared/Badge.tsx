import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  content: number | string;
  className?: string;
}

export function Badge({ content, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'bg-gray-bg border-gray-c5 text-gray-c3 ml-1 rounded-full border border-solid px-3 py-1 text-sm font-medium',
        className,
      )}
    >
      {content}
    </span>
  );
}
