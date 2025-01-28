import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_BASE_URL: "http://localhost:3000/api/server",
    NEXTAUTH_URL: "http://localhost:3000",
    MONGODB_URI:
      "mongodb+srv://ahmadnajy5:yAwrg1yHZ2dHkJX9@cluster0.wn73p.mongodb.net/connectdb",
    JWT_SECRET:
      "006e5bb70278e226f52f97acd7fd04579a8e622998fdd27d8a1e7a949785e9288aadba07cd9b8fe09b54919dfd6ab3e05d87ebc3239909fb7b28e0142f0d886d",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.mos.cms.futurecdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "alhaddadshop.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.modamizbir.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
};

export default nextConfig;
