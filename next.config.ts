import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias['@finity/design-system'] = path.resolve(
      __dirname,
      '../finity-design-system/dist/index.mjs'
    );
    return config;
  },
};

export default nextConfig;
