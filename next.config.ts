import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Disabled for Vercel (enables Server Actions)
  // basePath: "/SinFloW.SaaS", // Disabled for Vercel (deploys to root)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
