'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState, startTransition } from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  if (!mounted) {
    return (
      <div className="w-16 h-8 bg-gray-300 rounded-full relative">
        <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full" />
      </div>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'relative w-16 h-8 rounded-full transition-colors duration-300 ease-in-out',
        isDark ? 'bg-gray-800' : 'bg-gray-300'
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
        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
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
          className={cn(
            'transition-opacity text-yellow-600',
            isDark ? 'opacity-0' : 'opacity-50'
          )}
        />
        <Icon
          icon="mdi:moon-waning-crescent"
          width={14}
          height={14}
          className={cn(
            'transition-opacity text-white',
            isDark ? 'opacity-50' : 'opacity-0'
          )}
        />
      </div>
    </button>
  );
}

