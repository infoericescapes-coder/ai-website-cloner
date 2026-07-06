import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/v2/chrome/Reveal";
import LedDot from "@/components/v2/chrome/LedDot";

/**
 * THROWAWAY smoke page — verifies the design-v2 shell + every chrome component
 * + token swatches + type scale in isolation. Renders inside the (v2) dark
 * shell layout (Nav, Footer, ScrollProgress, GrainOverlay, BackdropDust all
 * come from the layout). DELETE before merge.
 */
export const metadata: Metadata = {
  title: "design-v2 preview",
  robots: { index: false, follow: false },
};

const SWATCHES: { name: string; token: string; value: string }[] = [
  { name: "canvas", token: "--ee-canvas", value: "#050605" },
  { name: "panel", token: "--ee-panel", value: "#0B0D0B" },
  { name: "mount", token: "--ee-mount", value: "#2B2D2C" },
  { name: "text", token: "--ee-text", value: "#F2EFE6" },
  { name: "muted", token: "--ee-muted", value: "#8B8F86" },
  { name: "accent", token: "--ee-accent", value: "#5FB53C" },
  { name: "live", token: "--ee-live", value: "#6BFF4A" },
  { name: "pressed", token: "--ee-pressed", value: "#1F7A2E" },
];

const TYPE_ROWS: { label: string; size: number; weight: number; ls: string; sample: string }[] = [
  { label: "Gallery place title · 72", size: 72, weight: 600, ls: "0.01em", sample: "Kamakura" },
  { label: "Big title · 56", size: 56, weight: 600, ls: "-0.01em", sample: "Visual Diaries" },
  { label: "Hero statement · 44", size: 44, weight: 500, ls: "-0.015em", sample: "Frames from the road" },
  { label: "Section title · 28", size: 28, weight: 500, ls: "-0.005em", sample: "Latest diaries" },
  { label: "Diary title · 24", size: 24, weight: 500, ls: "0", sample: "Shibuya after dark" },
  { label: "Prev/next · 20", size: 20, weight: 500, ls: "0", sample: "Next entry" },
];

const LABELS: { text: string; size: number; ls: string }[] = [
  { text: "INDEX · BY PLACE", size: 12, ls: "0.18em" },
  { text: "06 PLACES · 263 FRAMES", size: 11, ls: "0.18em" },
  { text: "HOME · VISUAL DIARIES · SHOP", size: 11.5, ls: "0.16em" },
  { text: "GET THE PACK →", size: 12.5, ls: "0.2em" },
];

export default function DesignPreviewPage() {
  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "72px 40px 120px" }}>
      {/* Header block */}
      <Reveal>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <LedDot size={6} />
          <span
            style={{
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ee-muted)",
            }}
          >
            Design v2 · smoke test
          </span>
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1 }}>
          Shell &amp; chrome
        </h1>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.7,
            color: "var(--ee-muted)",
            maxWidth: 620,
            marginTop: 18,
          }}
        >
          Throwaway page. Verifies the dark shell, Space Grotesk, the token
          swatches, the type scale, and every motion primitive in isolation. No
          em dashes, middle dots for separators, quiet prose.
        </p>
      </Reveal>

      {/* Hero image + CRT reveal */}
      <Reveal
        className="mt-16"
        style={{ position: "relative", aspectRatio: "16 / 9", overflow: "hidden" }}
      >
        <Image
          src="/images/home/hero-v2.jpeg"
          alt="Hero preview frame"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1180px"
          style={{ objectFit: "cover" }}
        />
        <span
          style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "var(--ee-text)",
            textShadow: "0 1px 6px rgba(0,0,0,0.8)",
          }}
        >
          001
          <span
            style={{
              display: "inline-block",
              width: 3,
              height: 12,
              marginLeft: 6,
              background: "var(--ee-accent)",
              boxShadow: "0 0 9px var(--ee-accent)",
              animation: "eeBlink 1.15s steps(1) infinite",
              verticalAlign: "middle",
            }}
            aria-hidden
          />
        </span>
      </Reveal>

      {/* Swatches */}
      <Reveal className="mt-20">
        <h2 style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.005em", marginBottom: 20 }}>
          Colour tokens
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: 2,
          }}
        >
          {SWATCHES.map((s) => (
            <div
              key={s.token}
              style={{
                background: "var(--ee-panel)",
                border: "1px solid var(--ee-hairline)",
                padding: 14,
              }}
            >
              <div
                style={{
                  height: 56,
                  background: s.value,
                  border: "1px solid var(--ee-hairline)",
                  marginBottom: 10,
                }}
              />
              <div style={{ fontSize: 12, fontWeight: 600 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: "var(--ee-muted)", letterSpacing: "0.04em" }}>
                {s.token}
              </div>
              <div style={{ fontSize: 11, color: "var(--ee-muted)" }}>{s.value}</div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Type scale */}
      <Reveal className="mt-20">
        <h2 style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.005em", marginBottom: 24 }}>
          Type scale
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {TYPE_ROWS.map((r) => (
            <div
              key={r.label}
              style={{ borderBottom: "1px solid var(--ee-hairline)", paddingBottom: 20 }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--ee-muted)",
                  marginBottom: 10,
                }}
              >
                {r.label}
              </div>
              <div
                style={{
                  fontSize: r.size,
                  fontWeight: r.weight,
                  letterSpacing: r.ls,
                  lineHeight: 1.05,
                }}
              >
                {r.sample}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Labels / data lines */}
      <Reveal className="mt-20">
        <h2 style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.005em", marginBottom: 24 }}>
          Labels &amp; data lines
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {LABELS.map((l) => (
            <div
              key={l.text}
              style={{
                fontSize: l.size,
                letterSpacing: l.ls,
                textTransform: "uppercase",
                color: "var(--ee-muted)",
              }}
            >
              {l.text}
            </div>
          ))}
        </div>
      </Reveal>

      {/* Motion primitives */}
      <Reveal className="mt-20">
        <h2 style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.005em", marginBottom: 24 }}>
          Motion primitives
        </h2>
        <ul style={{ display: "flex", flexDirection: "column", gap: 12, color: "var(--ee-muted)", fontSize: 15, lineHeight: 1.6 }}>
          <li style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <LedDot size={6} />
            <span>eePulse LED · glow dot (this is the one glowing element)</span>
          </li>
          <li>ScrollProgress · scroll the page, watch the 2px top bar fill</li>
          <li>Reveal · every block on this page fades+rises on entry (view-timeline or IO fallback)</li>
          <li>BackdropDust · fixed dust canvas behind everything (static on mobile / reduced-motion)</li>
          <li>GrainOverlay · ~2.8% grain + eeScan sweep line</li>
          <li>WordmarkFlicker · reload once per session to see the nav wordmark flicker</li>
          <li>eeBlink caret · the accent caret after the hero counter</li>
        </ul>
      </Reveal>

      {/* Panel with corner brackets */}
      <Reveal className="mt-20">
        <div
          style={{
            position: "relative",
            background: "var(--ee-panel)",
            border: "1px solid rgba(242,239,230,0.07)",
            padding: "40px 56px",
          }}
        >
          {(
            [
              { top: -1, left: -1, bt: true, bl: true },
              { top: -1, right: -1, bt: true, br: true },
              { bottom: -1, left: -1, bb: true, bl: true },
              { bottom: -1, right: -1, bb: true, br: true },
            ] as const
          ).map((c, i) => (
            <span
              key={i}
              aria-hidden
              style={{
                position: "absolute",
                width: 14,
                height: 14,
                top: "top" in c ? c.top : undefined,
                bottom: "bottom" in c ? c.bottom : undefined,
                left: "left" in c ? c.left : undefined,
                right: "right" in c ? c.right : undefined,
                borderTop: "bt" in c && c.bt ? "1px solid rgba(242,239,230,0.45)" : undefined,
                borderBottom: "bb" in c && c.bb ? "1px solid rgba(242,239,230,0.45)" : undefined,
                borderLeft: "bl" in c && c.bl ? "1px solid rgba(242,239,230,0.45)" : undefined,
                borderRight: "br" in c && c.br ? "1px solid rgba(242,239,230,0.45)" : undefined,
              }}
            />
          ))}
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.24em" }}>
            JOURNAL UPDATES{" "}
            <span style={{ color: "var(--ee-accent)" }}>+ FREE PRESET PACK</span>
          </div>
          <div
            style={{
              fontSize: 12.5,
              letterSpacing: "0.06em",
              lineHeight: 1.75,
              color: "var(--ee-muted)",
              marginTop: 13,
            }}
          >
            Panel + corner brackets specimen. Subscribe-bar treatment.
          </div>
        </div>
      </Reveal>
    </div>
  );
}
