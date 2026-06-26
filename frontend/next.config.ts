import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Docker production build (multi-stage Dockerfile)
  output: "standalone",

  // Environment variables exposed to the browser
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080",
  },
};

export default nextConfig;
