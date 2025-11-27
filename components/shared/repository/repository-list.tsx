'use client';

import type { Repository } from '@/@types/github';
import { RepositoryCard } from './repository-card';
import { useTranslations } from 'next-intl';

interface RepositoryListProps {
  repositories: Repository[];
}

export function RepositoryList({ repositories }: RepositoryListProps) {
  const t = useTranslations('profile');

  if (repositories.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        {t('search.noResults')}
      </div>
    );
  }

  return (
    <div className="space-y-12.5">
      {repositories.map((repository) => (
        <RepositoryCard
          key={repository.id}
          repository={repository}
        />
      ))}
    </div>
  );
}
