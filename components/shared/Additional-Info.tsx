'use client';

import { useState, ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils/cn';

interface AdditionalInfoProps {
  children: ReactNode;
  title?: string;
  defaultOpen?: boolean;
  collapsibleOnMobile?: boolean;
  className?: string;
}

export function AdditionalInfo({
  children,
  title,
  defaultOpen = false,
  collapsibleOnMobile = true,
  className,
}: AdditionalInfoProps) {
  const t = useTranslations('profile');
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const displayTitle = title || t('additionalInfo');

  return (
    <>
      {collapsibleOnMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col items-center gap-1 text-link-color mb-4"
        >
          <span className="text-sm">{displayTitle}</span>
          <Icon
            icon="mdi:chevron-down"
            className={cn(
              "w-6 h-6 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>
      )}

      <div
        className={cn(
          "flex flex-col gap-2 items-start w-full max-w-xs text-sm",
          collapsibleOnMobile && !isOpen && "hidden md:flex",
          collapsibleOnMobile && isOpen && "md:flex rounded-lg p-4 md:rounded-none md:p-0 md:bg-transparent",
          !collapsibleOnMobile && "flex",
          className
        )}
        style={
          collapsibleOnMobile && isOpen
            ? { backgroundColor: 'var(--additional-info-bg)' }
            : undefined
        }
      >
        {children}
      </div>
    </>
  );
}

