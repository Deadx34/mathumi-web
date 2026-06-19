import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from localhost (dev) and production API server
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        // Production: your backend domain (e.g. api.yourdomain.com)
        protocol: 'https',
        hostname: '**.yourdomain.com',
        pathname: '/uploads/**',
      },
    ],
  },

  // Expose NEXT_PUBLIC_ env vars to the client
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // Enable standalone output for cPanel Node.js App deployment
  output: 'standalone',
};

export default nextConfig;
