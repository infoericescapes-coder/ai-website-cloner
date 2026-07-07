import localFont from "next/font/local";

/**
 * Space Grotesk — self-hosted for the design-v2 (dark) shell.
 *
 * The design mandates the self-hosted woff2 files (offline-safe, exact hinting,
 * no Google request). Do NOT swap to next/font/google. All four weights stay
 * registered (the shell uses 400/500/600, and 700 for completeness).
 *
 * PRELOAD DISCIPLINE (perf): `preload` is all-or-nothing per `localFont` call,
 * and preloading all four woff2 shipped ~4 font preloads that competed with the
 * real LCP element (the hero IMAGE). The v2 shell renders NO above-the-fold text
 * as its LCP, and every weight uses `display: swap`, so a font never blocks the
 * first paint — it swaps in when it arrives. So `preload` is FALSE: the hero
 * image is the single preloaded resource (fetchpriority=high, set on the
 * next/image in (v2)/page.tsx), and all four Space Grotesk weights load lazily
 * via `@font-face` on first use. This frees the early connection budget for the
 * LCP image. (We deliberately do NOT hand-roll <link rel=preload> for a subset:
 * next/font rewrites each src to a hashed /_next/static/media path, so a manual
 * preload of the raw /public/fonts URL would double-download the file.)
 *
 * Exposes the CSS variable `--font-space-grotesk`. The @theme token
 * `--font-grotesk` in globals.css resolves through this, so both the Tailwind
 * utility `font-grotesk` and the inline `font-family: var(--font-grotesk)` work.
 */
export const spaceGrotesk = localFont({
  src: [
    { path: "../../public/fonts/SpaceGrotesk-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/SpaceGrotesk-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/SpaceGrotesk-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/SpaceGrotesk-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: false,
});
