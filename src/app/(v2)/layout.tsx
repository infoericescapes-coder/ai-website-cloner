import type { Metadata } from "next";
import { spaceGrotesk } from "@/lib/fonts";
import { designConfig } from "@/lib/design-config";
import Nav from "@/components/v2/Nav";
import Footer from "@/components/v2/Footer";
import ScrollProgress from "@/components/v2/chrome/ScrollProgress";
import GrainOverlay from "@/components/v2/chrome/GrainOverlay";
import BackdropDust from "@/components/v2/chrome/BackdropDust";

/**
 * design-v2 route-group layout — the DARK SHELL for the ericescapes.com
 * redesign.
 *
 * ─── ROUTE-GROUP MOVE MECHANICS ───────────────────────────────────────────
 * `(v2)` is a Next.js ROUTE GROUP: the parenthesised segment is organisational
 * only and does NOT appear in the URL. A page at `src/app/(v2)/about/page.tsx`
 * still serves `/about`. That is what lets us migrate pages one at a time
 * without changing a single public URL.
 *
 * To MIGRATE a page into the redesign:
 *   1. Move its folder from `src/app/<route>/` to `src/app/(v2)/<route>/`
 *      (e.g. `src/app/about/` -> `src/app/(v2)/about/`). The URL stays `/about`.
 *   2. Rebuild the page body against the ee-* tokens / v2 components.
 *   3. Delete the old copy. Two folders resolving the same path = a build-time
 *      route collision, so the OLD one must be gone before the app builds.
 *
 * Un-migrated pages stay under the ROOT layout (src/app/layout.tsx), which
 * keeps the old Poppins/Open Sans fonts, the light theme, the 20px root, and
 * the old Header/Footer. The two layouts never both wrap the same page, so the
 * light base and the dark shell coexist cleanly during the transition.
 *
 * NOTE: Next.js does not allow two root layouts. The ROOT layout keeps the
 * <html>/<body> tags; this group layout renders a scoped `.ee-root` wrapper
 * INSIDE that body (it does NOT emit its own <html>/<body>). The wrapper resets
 * font-size to 16px and paints the canvas bg (see globals.css .ee-root), so v2
 * pages don't inherit the 20px light base. The Space Grotesk variable is
 * applied on the wrapper so the font is available to the whole v2 subtree.
 */

const OG = "/brand-v2/social/og-image-1200x630.png";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/brand-v2/logos/ee-favicon.svg", type: "image/svg+xml" },
      { url: "/brand-v2/logos/png/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand-v2/logos/png/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/brand-v2/logos/png/favicon-180.png",
  },
  openGraph: {
    images: [{ url: OG, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG],
  },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`ee-root ${spaceGrotesk.variable}`}>
      {/* Backdrop canvas z-0 (gated: mobile + reduced-motion static) */}
      <BackdropDust mode={designConfig.backdrop} atmosphere={designConfig.atmosphere} />
      {/* Scroll progress z-45 */}
      <ScrollProgress />
      {/* Grain + scan overlays z-89/90 — gated on grain prop */}
      {designConfig.grain && <GrainOverlay />}

      <div style={{ position: "relative", zIndex: 1 }}>
        <Nav />
        <main style={{ animation: "eeViewIn 0.3s ease both" }}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
