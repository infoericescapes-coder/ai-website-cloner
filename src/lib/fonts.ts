import localFont from "next/font/local";

/**
 * Space Grotesk — self-hosted for the design-v2 (dark) shell.
 *
 * The design mandates the self-hosted woff2 files (offline-safe, exact hinting,
 * no Google request). Do NOT swap to next/font/google. The prototype only uses
 * weights up to 600; 700 is included for completeness (small cost).
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
  preload: true,
});
