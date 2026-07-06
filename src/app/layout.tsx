import type { Metadata } from "next";
import { Poppins, Open_Sans, DM_Mono } from "next/font/google";
import { spaceGrotesk } from "@/lib/fonts";
import "./globals.css";

/**
 * ROOT layout — deliberately BARE.
 *
 * Page chrome lives in the route-group layouts:
 *   - `(v1)/layout.tsx` → old site shell (Header/Footer, padded <main>, font-body)
 *   - `(v2)/layout.tsx` → design-v2 dark shell (.ee-root, Nav/Footer, overlays)
 * Nothing here may render visible chrome or constrain page width, otherwise it
 * bleeds into every route group (the double-nav/double-footer bug).
 *
 * WHY THE FONT `.variable` CLASSES STAY ON <html>:
 * `next/font` `.variable` classes only DEFINE CSS custom properties (e.g.
 * `--font-poppins`, `--font-space-grotesk`) — they apply no font themselves.
 * Tailwind v4 emits every `@theme` font token (`--font-body`, `--font-grotesk`,
 * …) on `:root`, and custom properties substitute their inner `var()` refs at
 * computed-value time ON THE ELEMENT THAT DECLARES THEM (`:root`). If a
 * `.variable` class sits lower in the tree (as `spaceGrotesk.variable` did on
 * `.ee-root`), the `:root` token computes to guaranteed-invalid, the dependent
 * `font-family` collapses to `inherit`, and the font silently never applies —
 * that was the "Space Grotesk renders as Open Sans" bug. So: ALL font variable
 * classes bind here, on <html>, where the `@theme` tokens can see them.
 */

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ericescapes.com"),
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
      className={`${poppins.variable} ${openSans.variable} ${dmMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
