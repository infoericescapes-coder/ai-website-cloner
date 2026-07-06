import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/v2/chrome/Reveal";

/**
 * Prints (`/prints-1`) — migrated into the (v2) dark shell.
 *
 * CONTENT LOCK: the live page is an unbuilt Squarespace stub ("coming soon").
 * All copy ("Currently In The Works", "The print shop is coming soon", the
 * paragraph) and the Gumroad preset link are carried over VERBATIM from the
 * retired v1 page. Only the presentation is re-skinned to v2.
 */
export const metadata: Metadata = {
  title: "Prints — ERIC ESCAPES",
  description:
    "Fine art prints from Eric Escapes — street and travel photography, printed on request.",
};

const MUTED = "#8B8F86";
const TEXT = "#F2EFE6";

const GUMROAD_PRESET_URL = "https://ericescape.gumroad.com/l/jetyik";

export default function PrintsPage() {
  return (
    <div
      className="ee-gutter"
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 860,
        margin: "0 auto",
        paddingTop: 76,
        paddingBottom: 130,
      }}
    >
      {/* ── 1. Header ───────────────────────────────────────────────────── */}
      <Reveal>
        <span
          style={{
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          Fine Art Prints
        </span>
        <h1
          className="text-[34px] md:text-[56px]"
          style={{
            margin: "20px 0 0",
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}
        >
          Prints
        </h1>
      </Reveal>

      {/* ── 2. Hero ─────────────────────────────────────────────────────── */}
      <Reveal style={{ marginTop: 48 }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/prints/hero-print-frame.jpg"
            alt="Framed print from the Eric Escapes collection"
            fill
            priority
            sizes="860px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </Reveal>

      {/* ── 3. Coming soon ──────────────────────────────────────────────── */}
      <Reveal style={{ marginTop: 64 }}>
        <div
          style={{
            paddingBottom: 16,
            borderBottom: "1px solid var(--ee-hairline-strong)",
            fontSize: 11.5,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          Currently In The Works
        </div>
        <h2
          style={{
            margin: "28px 0 0",
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: "-0.005em",
          }}
        >
          The print shop is coming soon
        </h2>
        <p
          style={{
            margin: "18px 0 0",
            fontSize: 17,
            lineHeight: 1.7,
            color: TEXT,
            maxWidth: "58ch",
          }}
        >
          I&apos;m putting together a collection of fine art prints from the
          road: street frames, travel scenes, and a few favourites from the
          archive. Check back soon, or grab the free preset pack below while you
          wait.
        </p>
        <a
          href={GUMROAD_PRESET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-[120ms] hover:bg-[var(--ee-text)] hover:text-black"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: 52,
            marginTop: 34,
            padding: "0 34px",
            border: "1px solid var(--ee-text)",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: TEXT,
            textDecoration: "none",
          }}
        >
          Get the Free Preset Pack
        </a>
      </Reveal>

      {/* ── 4. Want to know first ───────────────────────────────────────── */}
      <Reveal style={{ marginTop: 72 }}>
        <div
          style={{
            paddingBottom: 16,
            borderBottom: "1px solid var(--ee-hairline-strong)",
            fontSize: 11.5,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          Want To Know First?
        </div>
        <p
          style={{
            margin: "22px 0 0",
            fontSize: 17,
            lineHeight: 1.7,
            color: TEXT,
            maxWidth: "58ch",
          }}
        >
          Follow along on Instagram for previews as the print shop comes
          together.
        </p>
        <a
          href="https://www.instagram.com/ericescapes"
          target="_blank"
          rel="noopener noreferrer"
          className="ee-social"
          style={{
            display: "inline-block",
            marginTop: 18,
            fontSize: 11.5,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: MUTED,
            textDecoration: "none",
            transition: "color 120ms ease",
          }}
        >
          @ericescapes on Instagram ↗
        </a>
      </Reveal>
    </div>
  );
}
