/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Required for the 'postgres' package in browser environments
    config.externals.push({
      "pg-native": "pg-native",
      "bufferutil": "bufferutil",
      "utf-8-validate": "utf-8-validate",
    });

    return config;
  },
};

export default nextConfig;
