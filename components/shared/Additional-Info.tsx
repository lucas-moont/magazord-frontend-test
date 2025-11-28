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
          className="text-link-color mb-4 flex flex-col items-center gap-1 md:hidden"
        >
          <span className="text-sm">{displayTitle}</span>
          <Icon
            icon="mdi:chevron-down"
            className={cn('h-6 w-6 transition-transform duration-200', isOpen && 'rotate-180')}
          />
        </button>
      )}

      <div
        className={cn(
          'flex w-full max-w-xs flex-col items-start gap-2 text-sm',
          collapsibleOnMobile && !isOpen && 'hidden md:flex',
          collapsibleOnMobile &&
            isOpen &&
            'bg-additional-info-bg rounded-lg p-4 md:flex md:rounded-none md:bg-transparent md:p-0',
          !collapsibleOnMobile && 'flex',
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}
