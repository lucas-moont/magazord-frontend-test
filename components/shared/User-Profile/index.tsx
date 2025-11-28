import { User } from '@/@types/github';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { AdditionalInfo } from '@/components/shared/Additional-Info';

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  const hasAdditionalInfo = user.company || user.location || user.blog;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-4">
        <Image
          src={user.avatarUrl}
          alt={user.name}
          width={150}
          height={150}
          className="h-[104px] w-[104px] rounded-[50%] object-cover md:h-[104px] md:w-[104px] lg:h-[150px] lg:w-[150px]"
          priority
        />
        <div className="absolute right-0 bottom-0 flex h-[27px] w-[27px] items-center justify-center rounded-full border-4 border-white bg-white shadow-md md:right-0 md:bottom-0 md:h-[27px] md:w-[27px] lg:right-2 lg:bottom-2 lg:h-10 lg:w-10">
          <span className="text-[12px] md:text-[12px] lg:text-lg">😎</span>
        </div>
      </div>

      <h1 className="dark:text-foreground mb-1 text-xl font-bold text-gray-900">{user.name}</h1>

      {user.bio && (
        <p className="text-gray-c3 dark:text-muted-foreground mb-6 max-w-xs text-center text-xs sm:text-sm">
          {user.bio}
        </p>
      )}

      {hasAdditionalInfo && (
        <AdditionalInfo>
          {user.company && (
            <a
              href={`https://github.com/${user.company.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link-color flex items-center gap-2 text-sm hover:underline"
            >
              <Icon icon="lucide:building-2" className="text-link-color h-4 w-4" />
              <span>{user.company}</span>
            </a>
          )}

          {user.location && (
            <div className="text-gray-c3 dark:text-muted-foreground flex items-center gap-2 text-sm">
              <Icon icon="lucide:map-pin" className="h-4 w-4" />
              <span>{user.location}</span>
            </div>
          )}

          {user.blog && (
            <a
              href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link-color flex items-center gap-2 text-sm hover:underline"
            >
              <Icon icon="lucide:link" className="text-link-color h-4 w-4" />
              <span>{user.blog}</span>
            </a>
          )}

          <a
            href={`https://github.com/${user.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link-color flex items-center gap-2 text-sm hover:underline"
          >
            <Icon icon="lucide:github" className="text-link-color h-4 w-4" />
            <span>{user.login}</span>
          </a>
        </AdditionalInfo>
      )}
    </div>
  );
}
