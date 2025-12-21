import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use Turbopack with empty config to silence warning
  turbopack: {},
  
  // PWA will be configured separately for production
  // For now, we disable PWA in development
};

export default nextConfig;
