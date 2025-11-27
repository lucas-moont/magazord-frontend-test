import { User } from '@/@types/github';
import Image from 'next/image';
import { Icon } from '@iconify/react';

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-4">
        <Image
          src={user.avatarUrl}
          alt={user.name}
          width={150}
          height={150}
          className="rounded-full"
          priority
        />
        <div className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg shadow-md border-4 border-white">
          😎
        </div>
      </div>

      <h1 className="text-2xl font-semibold text-gray-900 dark:text-foreground mb-1">
        {user.name}
      </h1>

      {user.bio && (
        <p className="text-gray-600 dark:text-muted-foreground text-sm mb-6 max-w-xs">
          {user.bio}
        </p>
      )}

      <div className="flex flex-col gap-2 items-start w-full max-w-xs text-sm">
        {user.company && (
          <a
            href={`https://github.com/${user.company.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <Icon icon="lucide:building-2" className="w-4 h-4" />
            <span>{user.company}</span>
          </a>
        )}

        {user.location && (
          <div className="flex items-center gap-2 text-gray-600 dark:text-muted-foreground">
            <Icon icon="lucide:map-pin" className="w-4 h-4" />
            <span>{user.location}</span>
          </div>
        )}

        {user.blog && (
          <a
            href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <Icon icon="lucide:link" className="w-4 h-4" />
            <span>{user.blog}</span>
          </a>
        )}

        <a
          href={`https://github.com/${user.login}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-600 hover:underline"
        >
          <Icon icon="lucide:github" className="w-4 h-4" />
          <span>{user.login}</span>
        </a>
      </div>
    </div>
  );
}

