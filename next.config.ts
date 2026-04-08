import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placeholder.co",
      },
    ],
  },
};

export default nextConfig;
