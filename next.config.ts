import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // NOTE: `output: "standalone"` intentionally removed for the Netlify deploy —
  // the @netlify/plugin-nextjs (OpenNext) adapter provides its own serverless
  // packaging and standalone output conflicts with it. Next.js is supported
  // natively on Netlify, so no `output` mode is set.
  images: {
    // Serve modern formats first (AVIF, then WebP, then the source falls back).
    formats: ["image/avif", "image/webp"],
    // Cap the largest generated width at 2048. Next's default deviceSizes runs
    // up to 3840, which made the lightbox request a 2x-DPR WebP wider than the
    // source JPEG (a 300KB WebP re-encode LARGER than the original at w>=1920).
    // 2048 covers retina laptops without upscaling past the source assets.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      // Forward-compat for the planned Cloudflare R2 image offload. Harmless
      // while unused (no <Image> currently references this host); pre-authorising
      // it now avoids a build-time change when the R2 cutover lands.
      {
        protocol: "https",
        hostname: "images.ericescapes.com",
        pathname: "/**",
      },
    ],
  },
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
