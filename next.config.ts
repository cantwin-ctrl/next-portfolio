import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/next-portfolio",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
