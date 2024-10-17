const regex = /^(?:https?:\/\/)?([^:/\n]+)/i;
const domain = regex.exec(process.env.NEXT_PUBLIC_STRAPI_API_URL)[1];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'https://ship.link/' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
  crossOrigin: 'anonymous',
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    instrumentationHook: true,
  },
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
    NEXT_PUBLIC_SEAMETRIX_MAP_KEY: process.env.NEXT_PUBLIC_SEAMETRIX_MAP_KEY || '',
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY || '',
    NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL || '',
    NEXT_PUBLIC_RT_URL: process.env.NEXT_PUBLIC_RT_URL || '',
    BACKEND_API_URL: process.env.BACKEND_API_URL || '',
    IDENTITY_API_URL: process.env.IDENTITY_API_URL || '',
    NEXT_PUBLIC_FILE_API_URL: process.env.NEXT_PUBLIC_FILE_API_URL || '',
    NEXT_PUBLIC_SEAMETRIX_API_URL: process.env.NEXT_PUBLIC_SEAMETRIX_API_URL || '',
    NEXT_PUBLIC_SEAMETRIX_KEY: process.env.NEXT_PUBLIC_SEAMETRIX_KEY || '',
    NEXT_PUBLIC_MAINTENANCE_MODE: process.env.NEXT_PUBLIC_MAINTENANCE_MODE || '',
    IDENTITY_API_CLIENT_ID: process.env.IDENTITY_API_CLIENT_ID || '',
    IDENTITY_API_CLIENT_SECRET: process.env.IDENTITY_API_CLIENT_SECRET || '',
    IDENTITY_API_GRANT_TYPE: process.env.IDENTITY_API_GRANT_TYPE || '',
    IDENTITY_TOKEN_GRANT_TYPE: process.env.IDENTITY_TOKEN_GRANT_TYPE || '',
    IDENTITY_NEW_RELIC_APP_NAME: process.env.IDENTITY_NEW_RELIC_APP_NAME || '',
    IDENTITY_NEW_RELIC_LICENSE_KEY: process.env.IDENTITY_NEW_RELIC_LICENSE_KEY || '',
    PREVIEW_SECRET: process.env.PREVIEW_SECRET || '',
    OTEL_EXPORTER_OTLP_ENDPOINT: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || '',
  },
  images: {
    unoptimized: false, // true for `yarn export`
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        hostname: domain,
      },
    ],
    deviceSizes: [340, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [20, 21, 24, 37, 40, 67, 77, 140, 160, 280, 320, 549, 557, 558, 865, 1920],
  },
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.wav$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next/static/',
              outputPath: 'static/',
              name: '[name].[hash].[ext]',
              esModule: false,
            },
          },
        ],
      }
    );
    return config;
  },
};

module.exports = nextConfig;
