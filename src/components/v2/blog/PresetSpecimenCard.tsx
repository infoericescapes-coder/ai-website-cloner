import Link from "next/link";

/**
 * Specimen card — the gear-review → preset cross-link (approved 29 Jul).
 * Renders only on posts whose categories include "Gear" (the 8 reviews that
 * carry nearly all search impressions). Archive vocabulary: corner brackets,
 * mono FILE kicker, one green CTA into /visualdiary. Deliberately quiet; a
 * catalogue note, not a banner.
 */

const MUTED = "#8b8f86";
const HAIRLINE = "rgba(242,239,230,0.13)";
const BRACKET = "rgba(242,239,230,0.45)";

const corner = {
  position: "absolute" as const,
  width: 14,
  height: 14,
};

export default function PresetSpecimenCard() {
  return (
    <div
      style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: "0 var(--ee-gutter, 40px)",
      }}
    >
      <div
        style={{
          position: "relative",
          marginTop: 44,
          border: `1px solid ${HAIRLINE}`,
          background: "var(--ee-panel)",
          padding: "22px 22px 20px",
        }}
      >
        <span
          aria-hidden
          style={{ ...corner, top: -1, left: -1, borderTop: `1px solid ${BRACKET}`, borderLeft: `1px solid ${BRACKET}` }}
        />
        <span
          aria-hidden
          style={{ ...corner, bottom: -1, right: -1, borderBottom: `1px solid ${BRACKET}`, borderRight: `1px solid ${BRACKET}` }}
        />

        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: MUTED,
            marginBottom: 12,
          }}
        >
          From the archive ·{" "}
          <span style={{ color: "var(--ee-accent)" }}>File EE-02 · Free</span>
        </div>

        <div
          style={{
            fontFamily: "var(--font-grotesk)",
            fontWeight: 600,
            fontSize: 19,
            lineHeight: 1.45,
            marginBottom: 6,
          }}
        >
          The looks behind these photos live in the archive too.
        </div>

        <div
          style={{
            fontSize: 13.5,
            color: MUTED,
            lineHeight: 1.6,
            marginBottom: 16,
          }}
        >
          Three of my everyday Lightroom presets: First Light, Quiet Streets,
          After Dark. Free, straight to your inbox.
        </div>

        <Link
          href="/visualdiary"
          className="ee-social"
          style={{
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--ee-accent)",
            textDecoration: "none",
          }}
        >
          Send me the pack →
        </Link>
      </div>
    </div>
  );
}
