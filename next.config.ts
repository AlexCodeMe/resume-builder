import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "2okf3rumqnaerhsm.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
