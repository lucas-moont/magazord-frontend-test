export interface RepositoryFilters {
  type?: 'all' | 'public' | 'private' | 'sources' | 'forks' | 'archived' | 'mirrors';
  language?: string;
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  direction?: 'asc' | 'desc';
}
