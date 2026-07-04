import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  async redirects() {
    return [
      // Legacy Squarespace home alias -> canonical root. The live sitemap
      // lists /home as a distinct URL that renders the homepage; the clone
      // serves the homepage at / and 301s /home to it.
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
