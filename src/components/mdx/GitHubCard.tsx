import React from 'react';
import { Github } from 'lucide-react';

interface GitHubCardProps {
  repo: string;
  description?: string;
}

export interface GitHubRepoParts {
  owner?: string;
  name: string;
}

export function parseGitHubRepo(repo: string): GitHubRepoParts {
  const [ownerOrName, name] = repo.trim().split('/').filter(Boolean);
  return name ? { owner: ownerOrName, name } : { name: ownerOrName ?? '' };
}

export default function GitHubCard({ repo, description }: GitHubCardProps) {
  const { owner, name } = parseGitHubRepo(repo);
  const repoPath = owner ? `${owner}/${name}` : name;
  const url = `https://github.com/${repoPath}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block my-4 glass-card p-5 group hover:glow-indigo transition-all duration-300 no-underline"
      style={{ textDecoration: 'none' }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
            color: 'var(--accent)',
          }}
        >
          <Github className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {owner && <span className="text-sm text-[var(--text-secondary)]">{owner}/</span>}
            <span className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
              {name}
            </span>
          </div>
          {description && (
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed m-0">{description}</p>
          )}
          <div className="mt-3 text-xs text-[var(--accent)] font-medium group-hover:translate-x-1 transition-transform">
            View on GitHub →
          </div>
        </div>
      </div>
    </a>
  );
}
