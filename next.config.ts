import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  devIndicators: false,
  async redirects() {
    return [
      // Old single-file routes → new directory intro pages
      {
        source: '/research/ai-drug-discovery',
        destination: '/research/ai-drug/intro',
        permanent: true,
      },
      {
        source: '/research/medical-llms',
        destination: '/research/ai-llm/intro',
        permanent: true,
      },
      {
        source: '/research/medical-imaging',
        destination: '/research/ai-imaging/intro',
        permanent: true,
      },
      {
        source: '/research/agentic-ai-clinical',
        destination: '/research/ai-agent/intro',
        permanent: true,
      },
      // Old protein-prediction paths → new ai-protein paths
      {
        source: '/research/protein-prediction/:path*',
        destination: '/research/ai-protein/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
