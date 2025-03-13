/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Exclude jszip from being processed by Webpack
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        jszip: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;