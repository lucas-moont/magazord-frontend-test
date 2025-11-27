'use client';

import type { Repository } from '@/@types/github';
import { Icon } from '@iconify/react';
import { useLocale } from 'next-intl';

interface RepositoryCardProps {
  repository: Repository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const locale = useLocale();
  const [owner, repoName] = repository.fullName.split('/');

  return (
    <div>
      <div className="mb-2 text-xl">
        <span className="font-normal text-black">{owner}</span>
        <span className="text-gray-600 mx-1">/</span>
        <a
          href={repository.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600 hover:underline"
        >
          {repoName}
        </a>
      </div>

      {repository.description && (
        <p className="text-sm text-gray-c3 mb-3 max-w-3xl">
          {repository.description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-8 text-sm text-black">
        {repository.language && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span>{repository.language}</span>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <Icon icon="ant-design:star-filled" width={20} height={20} />
          <span>{repository.stargazersCount.toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Icon icon="fluent:branch-fork-24-regular" width={20} height={20} />
          <span>{repository.forksCount.toLocaleString()}</span>
        </div>
      </div>

      {repository.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {repository.topics.slice(0, 5).map((topic: string) => (
            <span
              key={topic}
              className="px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
