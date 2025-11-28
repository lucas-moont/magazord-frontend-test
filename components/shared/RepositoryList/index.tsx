'use client';

import type { Repository } from '@/@types/github';
import { RepositoryCard } from './Repository-Card';
import { useTranslations } from 'next-intl';

interface RepositoryListProps {
  repositories: Repository[];
}

export function RepositoryList({ repositories }: RepositoryListProps) {
  const t = useTranslations('profile');

  if (repositories.length === 0) {
    return <div className="py-12 text-center text-gray-500">{t('search.noResults')}</div>;
  }

  return (
    <div>
      {repositories.map((repository, index) => (
        <div key={repository.id}>
          <RepositoryCard repository={repository} />
          {index < repositories.length - 1 && <div className="bg-separator my-6 h-px sm:my-8" />}
        </div>
      ))}
    </div>
  );
}
