import bundleAnalyzer from '@next/bundle-analyzer';

const withAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = withAnalyzer({
  output: 'export',
  reactStrictMode: true,
  transpilePackages: ['@cop/*'],
});

export default nextConfig;
