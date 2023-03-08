/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@cop/*'],
  output: 'standalone',
};

export default nextConfig;
