'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState, startTransition } from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface ThemeSwitchProps {
  floating?: boolean;
  className?: string;
}

export function ThemeSwitch({ floating = false, className }: ThemeSwitchProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          'relative h-8 w-16 rounded-full bg-gray-300',
          floating && 'fixed right-4 bottom-4 z-50 shadow-lg md:hidden',
          className,
        )}
      >
        <div className="absolute top-1 left-1 h-6 w-6 rounded-full bg-white" />
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'relative h-8 w-16 rounded-full transition-colors duration-300 ease-in-out',
        floating && 'fixed right-4 bottom-4 z-50 shadow-lg md:hidden',
        isDark ? 'bg-gray-800' : 'bg-gray-300',
        className,
      )}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          x: isDark ? 36 : 4,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
        className="absolute top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md"
      >
        {isDark ? (
          <Icon icon="mdi:moon-waning-crescent" width={14} height={14} className="text-gray-800" />
        ) : (
          <Icon icon="mdi:white-balance-sunny" width={14} height={14} className="text-yellow-500" />
        )}
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-between px-2">
        <Icon
          icon="mdi:white-balance-sunny"
          width={14}
          height={14}
          className={cn('text-yellow-600 transition-opacity', isDark ? 'opacity-0' : 'opacity-50')}
        />
        <Icon
          icon="mdi:moon-waning-crescent"
          width={14}
          height={14}
          className={cn('text-white transition-opacity', isDark ? 'opacity-50' : 'opacity-0')}
        />
      </div>
    </button>
  );
}
