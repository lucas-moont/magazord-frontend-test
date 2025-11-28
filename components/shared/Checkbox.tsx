import { cn } from '@/lib/utils/cn';

interface CheckboxProps {
  checked: boolean;
  className?: string;
}

export function Checkbox({ checked, className }: CheckboxProps) {
  return (
    <div
      className={cn(
        'flex h-4 w-4 items-center justify-center rounded border transition-colors',
        checked ? 'border-blue-500 bg-blue-500' : 'border-gray-400 bg-white',
        className,
      )}
    >
      {checked && (
        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  );
}
