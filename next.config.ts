import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "skillup-project-s3-bucket.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.skillup.com",
        pathname: "/**",
      },
    ],
  },
  staticGeneration: {
    timeout: 180, // 60초 → 180초 (3분)
  },
};

export default nextConfig;
