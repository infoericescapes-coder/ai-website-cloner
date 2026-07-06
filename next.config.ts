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
      // Old Squarespace product URL -> Shop. The redesigned /store is the
      // single digital surface; the product page was retired with the (v2)
      // Shop migration (docs/design-v2/ia-map.md, confirmed-required row).
      {
        source: "/store/p/visual-diary-collection-lightroom-presets",
        destination: "/store",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
