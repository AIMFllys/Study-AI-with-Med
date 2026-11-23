import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nextConfig from './next.config';

const repoRoot = path.dirname(fileURLToPath(import.meta.url));

type Redirect = {
  source: string;
  destination: string;
};

function destinationFor(redirects: Redirect[], pathname: string) {
  for (const redirect of redirects) {
    if (redirect.source === pathname) {
      return redirect.destination;
    }

    const wildcardSuffix = '/:path*';
    if (redirect.source.endsWith(wildcardSuffix)) {
      const prefix = redirect.source.slice(0, -wildcardSuffix.length);
      if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
        const pathParam = pathname.slice(prefix.length).replace(/^\//, '');
        return redirect.destination.replace(':path*', pathParam);
      }
    }
  }

  return null;
}

function contentPathForResearchPath(pathname: string) {
  const slug = pathname.replace(/^\/research\//, '').replace(/\/$/, '');
  const directPath = path.join(repoRoot, 'content', `${slug}.mdx`);
  const indexPath = path.join(repoRoot, 'content', slug, 'index.mdx');
  return fs.existsSync(directPath) ? directPath : indexPath;
}

describe('legacy research redirects', () => {
  it('resolve to existing content', async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];

    const cases = [
      ['/research/ai-drug-discovery', '/research/ai-analysis/ai-drug/intro'],
      ['/research/medical-llms', '/research/ai-analysis/ai-llm/intro'],
      ['/research/medical-imaging', '/research/ai-analysis/ai-imaging/intro'],
      ['/research/agentic-ai-clinical', '/research/ai-analysis/ai-agent/intro'],
      ['/research/protein-engineering', '/research/ai-analysis/ai-protein/intro'],
      [
        '/research/protein-prediction/industry-overview',
        '/research/ai-analysis/ai-protein/industry-overview',
      ],
      [
        '/research/protein-prediction/boltz-deployment-guide',
        '/research/ai-analysis/ai-protein/tools/boltz-deployment-guide',
      ],
      ['/research/ai-news/index', '/research/ai-news'],
    ];

    for (const [source, expectedDestination] of cases) {
      const destination = destinationFor(redirects, source) ?? '';
      expect(destination).toBe(expectedDestination);
      expect(
        fs.existsSync(contentPathForResearchPath(destination)),
        `redirect destination has no content file: ${destination}`
      ).toBe(true);
    }
  });
});
