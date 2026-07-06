import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found — ERIC ESCAPES",
};

const MUTED = "#8B8F86";
const TEXT = "#F2EFE6";

/**
 * Global 404. Renders under the BARE root layout (unmatched URLs never enter a
 * route group), so it can't inherit the (v2) route-group shell. Instead it
 * wraps ITSELF in `.ee-root` — the same class the v2 layout uses — which paints
 * the dark canvas, resets to 16px, and binds Space Grotesk (globals.css). This
 * keeps the 404 on the v2 dark design language WITHOUT V1Shell (which is being
 * torn down this round). Treatment: a mono "lost frame" plate.
 */
export default function NotFound() {
  return (
    <div
      className="ee-root ee-gutter"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: 96,
        paddingBottom: 96,
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
        {/* Mono frame plate */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            paddingBottom: 16,
            borderBottom: "1px solid var(--ee-hairline-strong)",
            fontSize: 11.5,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          <span>Error · 404</span>
          <span>Frame not found</span>
        </div>

        <h1
          className="text-[40px] md:text-[64px]"
          style={{
            margin: "34px 0 0",
            fontWeight: 600,
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
          }}
        >
          This one is off
          <br />
          the map.
        </h1>

        <p
          style={{
            margin: "26px 0 0",
            fontSize: 17,
            lineHeight: 1.7,
            color: TEXT,
            maxWidth: "46ch",
          }}
        >
          The frame you were after has moved or never made the edit. Head back to
          the archive and find your way from there.
        </p>

        <div className="flex flex-wrap" style={{ gap: 28, marginTop: 40 }}>
          <Link
            href="/"
            className="ee-social"
            style={{
              fontSize: 11.5,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: TEXT,
              textDecoration: "none",
              transition: "color 120ms ease",
            }}
          >
            ← Back to the archive
          </Link>
          <Link
            href="/blog-1"
            className="ee-social"
            style={{
              fontSize: 11.5,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: MUTED,
              textDecoration: "none",
              transition: "color 120ms ease",
            }}
          >
            Read the visual diaries →
          </Link>
        </div>
      </div>
    </div>
  );
}
