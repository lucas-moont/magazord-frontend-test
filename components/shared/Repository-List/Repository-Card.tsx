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
        <span className="dark:text-foreground font-light text-black">{owner}</span>
        <span className="dark:text-foreground mx-1 text-black">/</span>
        <a
          href={repository.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link-color font-semibold hover:underline"
        >
          {repoName}
        </a>
      </div>

      {repository.description && (
        <p className="text-gray-c3 dark:text-muted-foreground mb-3 max-w-3xl text-sm">{repository.description}</p>
      )}

      <div className="dark:text-foreground flex flex-wrap items-center gap-8 text-sm text-black">
        {repository.language && (
          <div className="flex items-center gap-1.5">
            {languageColor && <span className="h-3 w-3 rounded-full" style={{ backgroundColor: languageColor }}></span>}
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
        <div className="mt-3 flex flex-wrap gap-2">
          {repository.topics.slice(0, 5).map((topic: string) => (
            <span
              key={topic}
              className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
            >
              {topic}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
