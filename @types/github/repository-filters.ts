export interface RepositoryFilters {
  type?: 'all' | 'owner' | 'member' | 'public' | 'private';
  language?: string;
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  direction?: 'asc' | 'desc';
}
