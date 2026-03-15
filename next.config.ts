import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  devIndicators: false,
};

export default nextConfig;
