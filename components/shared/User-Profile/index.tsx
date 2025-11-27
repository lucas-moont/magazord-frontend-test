'use client';

import { useState } from 'react';
import { User } from '@/@types/github';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils/cn';

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  const t = useTranslations('profile');
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState(false);

  const hasAdditionalInfo = user.company || user.location || user.blog;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-4">
        <Image
          src={user.avatarUrl}
          alt={user.name}
          width={150}
          height={150}
          className="w-[104px] h-[104px] md:w-[104px] md:h-[104px] lg:w-[150px] lg:h-[150px] rounded-[50%] object-cover"
          priority
        />
        <div className="absolute bottom-0 right-0 md:bottom-0 md:right-0 lg:bottom-2 lg:right-2 w-[27px] h-[27px] md:w-[27px] md:h-[27px] lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-white">
          <span className="text-[12px] md:text-[12px] lg:text-lg">😎</span>
        </div>
      </div>

      <h1 className="text-xl font-bold text-gray-900 dark:text-foreground mb-1">
        {user.name}
      </h1>

      {user.bio && (
        <p className="text-gray-c3 dark:text-muted-foreground text-xs sm:text-sm mb-6 max-w-xs text-center">
          {user.bio}
        </p>
      )}

      {hasAdditionalInfo && (
        <>
          <button
            onClick={() => setIsAdditionalInfoOpen(!isAdditionalInfoOpen)}
            className="md:hidden flex flex-col items-center gap-0.5 text-link-color mb-4"
          >
            <span className="text-sm">{t('additionalInfo')}</span>
            <Icon
              icon="mdi:chevron-down"
              className={cn(
                "w-6 h-6 transition-transform duration-200",
                isAdditionalInfoOpen && "rotate-180"
              )}
            />
          </button>

          <div
            className={cn(
              "flex flex-col gap-2 items-start w-full max-w-xs text-sm",
              !isAdditionalInfoOpen ? "hidden md:flex" : "md:flex rounded-lg p-4 md:rounded-none md:p-0 md:bg-transparent"
            )}
            style={isAdditionalInfoOpen ? { backgroundColor: 'var(--additional-info-bg)' } : undefined}
          >
            {user.company && (
              <a
                href={`https://github.com/${user.company.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-link-color hover:underline text-sm"
              >
                <Icon icon="lucide:building-2" className="w-4 h-4 text-link-color" />
                <span>{user.company}</span>
              </a>
            )}

            {user.location && (
              <div className="flex items-center gap-2 text-gray-c3 dark:text-muted-foreground text-sm">
                <Icon icon="lucide:map-pin" className="w-4 h-4" />
                <span>{user.location}</span>
              </div>
            )}

            {user.blog && (
              <a
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-link-color hover:underline text-sm"
              >
                <Icon icon="lucide:link" className="w-4 h-4 text-link-color" />
                <span>{user.blog}</span>
              </a>
            )}

            <a
              href={`https://github.com/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-link-color hover:underline text-sm"
            >
              <Icon icon="lucide:github" className="w-4 h-4 text-link-color" />
              <span>{user.login}</span>
            </a>
          </div>
        </>
      )}
    </div>
  );
}

