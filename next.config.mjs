/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",
  output: "export",
  webpack(config) {
    config.resolve.fallback = { "pino-pretty": false, encoding: false };
    return config;
  },
};
export default nextConfig;
