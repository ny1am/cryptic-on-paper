import bundleAnalyzer from '@next/bundle-analyzer';

const withAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = withAnalyzer({
  reactStrictMode: true,
  transpilePackages: ['@cop/*'],
  output: 'standalone',
});

export default nextConfig;
