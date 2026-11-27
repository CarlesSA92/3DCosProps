import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Shared UI, types and utilities are maintained in the monorepo root.
  experimental: {
    externalDir: true,
  },
  images: {
    deviceSizes: [640, 768, 1024, 1280, 1536],
  },
};

export default nextConfig;
