/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist',
  output: 'export',
  webpack(config) {
    config.resolve.fallback = {
      'pino-pretty': false,
      encoding: false,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
  images: { unoptimized: true },
};
export default nextConfig;
