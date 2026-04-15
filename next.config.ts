import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Reverse-Engineering",
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
