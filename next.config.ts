import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_BASE_URL: "http://localhost:3000/api/server",
  },
  images: {
    domains: ["localhost"], // اسم الدومين أو المضيف
  },
  output: "standalone",
};

export default nextConfig;
