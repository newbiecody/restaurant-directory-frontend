import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from the API host (adjust domain in later phases)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
