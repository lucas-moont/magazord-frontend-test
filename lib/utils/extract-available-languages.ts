import type { Repository } from '@/@types/github';

export function extractAvailableLanguages(
  repositories: Repository[]
): { value: string; label: string }[] {
  return Array.from(
    new Set(
      repositories
        .map((repo) => repo.language)
        .filter((lang): lang is string => lang !== null)
    )
  ).map((lang) => ({ value: lang, label: lang }));
}

