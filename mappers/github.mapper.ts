import type { User, Repository } from '@/@types/github';
import type { GitHubUserDTO, GitHubRepositoryDTO } from '@/interfaces/github';

export class GitHubMapper {
  static toUser(dto: GitHubUserDTO): User {
    return {
      login: dto.login,
      name: dto.name || dto.login,
      avatarUrl: dto.avatar_url,
      bio: dto.bio,
      company: dto.company,
      location: dto.location,
      blog: dto.blog,
      publicRepos: dto.public_repos,
      followers: dto.followers,
      following: dto.following,
    };
  }

  static toRepository(dto: GitHubRepositoryDTO): Repository {
    return {
      id: dto.id,
      name: dto.name,
      fullName: dto.full_name,
      description: dto.description,
      htmlUrl: dto.html_url,
      homepage: dto.homepage,
      language: dto.language,
      stargazersCount: dto.stargazers_count,
      forksCount: dto.forks_count,
      watchersCount: dto.watchers_count,
      openIssuesCount: dto.open_issues_count,
      createdAt: dto.created_at,
      updatedAt: dto.updated_at,
      pushedAt: dto.pushed_at,
      size: dto.size,
      defaultBranch: dto.default_branch,
      topics: dto.topics || [],
      visibility: dto.visibility,
      isPrivate: dto.private || false,
      isFork: dto.fork || false,
      isArchived: dto.archived || false,
      mirrorUrl: dto.mirror_url || null,
    };
  }

  static toRepositories(dtos: GitHubRepositoryDTO[]): Repository[] {
    return dtos.map((dto) => this.toRepository(dto));
  }
}
