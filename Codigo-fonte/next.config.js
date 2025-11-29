/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    TURSO_TOKEN: process.env.TURSO_TOKEN,
  },
  webpack: (config, { isServer }) => {
    // Exclude files that shouldn't be processed by webpack
    config.module.rules.push({
      test: /\.md$/,
      use: 'ignore-loader',
    });

    config.module.rules.push({
      test: /LICENSE$/,
      use: 'ignore-loader',
    });

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    return config;
  },
}

module.exports = nextConfig
