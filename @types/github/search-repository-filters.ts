export interface SearchRepositoryFilters {
  query: string;
  language?: string;
  sort?: 'stars' | 'forks' | 'updated';
  order?: 'asc' | 'desc';
}
