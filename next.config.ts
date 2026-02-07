import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "cdn.mycoffee.com",
      },
      {
        protocol: "https",
        hostname: "api.kunjungfamily.site",
      },
    ],
  },
};

export default nextConfig;
