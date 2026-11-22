import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  devIndicators: false,
  async redirects() {
    return [
      // Old single-file routes → new directory intro pages
      {
        source: '/research/ai-drug-discovery',
        destination: '/research/ai-analysis/ai-drug/intro',
        permanent: true,
      },
      {
        source: '/research/medical-llms',
        destination: '/research/ai-analysis/ai-llm/intro',
        permanent: true,
      },
      {
        source: '/research/medical-imaging',
        destination: '/research/ai-analysis/ai-imaging/intro',
        permanent: true,
      },
      {
        source: '/research/agentic-ai-clinical',
        destination: '/research/ai-analysis/ai-agent/intro',
        permanent: true,
      },
      {
        source: '/research/protein-engineering',
        destination: '/research/ai-analysis/ai-protein/intro',
        permanent: true,
      },
      // Old protein-prediction paths → new ai-protein paths
      {
        source: '/research/protein-prediction/boltz-deployment-guide',
        destination: '/research/ai-analysis/ai-protein/tools/boltz-deployment-guide',
        permanent: true,
      },
      {
        source: '/research/protein-prediction/:path*',
        destination: '/research/ai-analysis/ai-protein/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
