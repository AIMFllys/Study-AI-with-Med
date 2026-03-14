'use client';

import React from 'react';

interface GitHubCardProps {
  repo: string;
  description?: string;
}

export default function GitHubCard({ repo, description }: GitHubCardProps) {
  const [owner, name] = repo.split('/');
  const url = `https://github.com/${repo}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block my-4 glass-card p-5 group hover:glow-indigo transition-all duration-300 no-underline"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xl flex-shrink-0">
          📦
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-medical-slate text-sm">{owner}/</span>
            <span className="font-semibold text-white group-hover:text-medical-cyan transition-colors">
              {name}
            </span>
          </div>
          {description && (
            <p className="text-sm text-medical-slate leading-relaxed m-0">{description}</p>
          )}
          <div className="mt-3 text-xs text-medical-indigo font-medium group-hover:translate-x-1 transition-transform">
            View on GitHub →
          </div>
        </div>
      </div>
    </a>
  );
}
