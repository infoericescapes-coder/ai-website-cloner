import type { Metadata } from "next";
import { spaceGrotesk } from "@/lib/fonts";
import "./globals.css";

/**
 * ROOT layout — deliberately BARE.
 *
 * Page chrome lives in the route-group layouts:
 *   - `(v2)/layout.tsx` → design-v2 dark shell (.ee-root, Nav/Footer, overlays)
 * Nothing here may render visible chrome or constrain page width, otherwise it
 * bleeds into every route group (the double-nav/double-footer bug).
 *
 * FONTS: the (v1) route group was deleted, so the old Poppins / Open Sans /
 * DM Mono Google fonts (which only the light v1 shell ever rendered) are gone.
 * They previously shipped ~9 woff2 preloads per page for zero rendered glyphs.
 * The bare `<body>` now falls back to a system stack (globals.css) and every v2
 * page paints Space Grotesk via `.ee-root` (self-hosted, src/lib/fonts.ts).
 *
 * WHY THE `spaceGrotesk.variable` CLASS STAYS ON <html>:
 * `next/font` `.variable` classes only DEFINE a CSS custom property
 * (`--font-space-grotesk`) — they apply no font themselves. Tailwind v4 emits
 * the `@theme` token `--font-grotesk` on `:root`, and custom properties
 * substitute their inner `var()` refs at computed-value time ON THE ELEMENT
 * THAT DECLARES THEM (`:root`). If the `.variable` class sits lower in the tree
 * (as it once did on `.ee-root`), the `:root` token computes to
 * guaranteed-invalid, the dependent `font-family` collapses to `inherit`, and
 * the font silently never applies — that was the "Space Grotesk renders as Open
 * Sans" bug. So the font variable class binds here, on <html>, where the
 * `@theme` token can see it.
 */

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ericescapes.com"),
  // Self-referencing canonical on every route ("./" resolves per-path against
  // metadataBase) — consolidates indexing signals onto www.ericescapes.com.
  alternates: {
    canonical: "./",
  },
  title: "ERIC ESCAPES",
  description:
    "Street and travel photography from Eric Escapes — full-bleed frames, presets, and gear notes from the road.",
  icons: {
    icon: "/seo/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
