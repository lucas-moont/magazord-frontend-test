import { cn } from '@/lib/utils/cn';

interface CheckboxProps {
  checked: boolean;
  className?: string;
}

export function Checkbox({ checked, className }: CheckboxProps) {
  return (
    <div
      className={cn(
        "w-4 h-4 border rounded flex items-center justify-center transition-colors",
        checked ? "bg-blue-500 border-blue-500" : "border-gray-400 bg-white",
        className
      )}
    >
      {checked && (
        <svg
          className="w-3 h-3 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </div>
  );
}
