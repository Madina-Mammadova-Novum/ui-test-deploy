const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: false, // true for `yarn export`
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    domains: ['localhost'],
    deviceSizes: [340, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [20, 21, 24, 37, 40, 67, 77, 140, 160, 280, 320, 549, 557, 558, 865, 1920],
  },
  i18n,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;
