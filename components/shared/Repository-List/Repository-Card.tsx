'use client';

import type { Repository } from '@/@types/github';
import { Icon } from '@iconify/react';
import { getLanguageColor } from '@/lib/utils/get-language-color';

interface RepositoryCardProps {
  repository: Repository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const [owner, repoName] = repository.fullName.split('/');
  const languageColor = getLanguageColor(repository.language);

  return (
    <div>
      <div className="mb-2 text-lg">
        <span className="font-light text-black dark:text-foreground">{owner}</span>
        <span className="text-black dark:text-foreground mx-1">/</span>
        <a
          href={repository.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-link-color hover:underline"
        >
          {repoName}
        </a>
      </div>

      {repository.description && (
        <p className="text-sm text-gray-c3 dark:text-muted-foreground mb-3 max-w-3xl">
          {repository.description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-8 text-sm text-black dark:text-foreground">
        {repository.language && (
          <div className="flex items-center gap-1.5">
            {languageColor && (
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: languageColor }}
              ></span>
            )}
            <span>{repository.language}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Icon icon="ant-design:star-filled" width={20} height={20} />
          <span>{repository.stargazersCount.toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-2">
          <Icon icon="fluent:branch-fork-24-regular" width={20} height={20} />
          <span>{repository.forksCount.toLocaleString()}</span>
        </div>
      </div>

      {repository.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {repository.topics.slice(0, 5).map((topic: string) => (
            <span
              key={topic}
              className="px-2.5 py-0.5 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
