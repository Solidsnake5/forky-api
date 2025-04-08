import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["forkify-api.herokuapp.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "forkify-api.herokuapp.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "forkify-api.herokuapp.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
}

export default nextConfig
