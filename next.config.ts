import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Disabled to allow Next.js API Routes (Serverless Functions) to work in production
  // basePath: "/SinFloW.SaaS", // Disabled for Vercel (deploys to root)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
