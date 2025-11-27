import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  content: number | string;
  className?: string;
}

export function Badge({ content, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "ml-1 px-3 py-1 bg-gray-bg border border-solid border-gray-c5 text-gray-c3 rounded-full text-sm font-medium",
        className
      )}
    >
      {content}
    </span>
  );
}
