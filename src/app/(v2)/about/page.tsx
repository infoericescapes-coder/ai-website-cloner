import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/v2/chrome/Reveal";
import { designConfig } from "@/lib/design-config";

/**
 * About & identity — specs/about.md. Two-column intro (statement + portrait)
 * over the six-card identity board ("marks & fragments"). Copy: designed
 * statement/paragraphs from the spec plus one paragraph adapted from the
 * previous /about bio (no invented copy). Metadata carried over from the old
 * page; OG inherits from the (v2) layout.
 */
export const metadata: Metadata = {
  title: "About — Eric Escapes",
  description:
    "Travel and street photographer from Sydney. About Eric Escapes, this visual diary, and why the camera came back out.",
};

const MUTED = "#8B8F86";
const TEXT = "#F2EFE6";

/** Inline EE monogram — verbatim path set from specs/shell.md §3. */
function Monogram({
  size,
  stroke,
  strokeWidth = 1.5,
  opacity,
}: {
  size: number;
  stroke: string;
  strokeWidth?: number;
  opacity?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      style={opacity !== undefined ? { opacity } : undefined}
      aria-hidden
    >
      <path
        d="M14 4 H4 V14 M34 4 H44 V14 M44 34 V44 H34 M14 44 H4 V34"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <path
        d="M21 16 H13 V32 H21 M13 24 H19"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <path
        d="M27 16 H35 V32 H27 M35 24 H29"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

/** One identity-board card: 96px-tall centred specimen + label/index row. */
function IdentityCard({
  label,
  index,
  children,
}: {
  label: string;
  index: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal
      style={{
        background: "#0B0D0B",
        border: "1px solid rgba(242,239,230,0.08)",
        padding: 34,
        display: "flex",
        flexDirection: "column",
        gap: 30,
      }}
    >
      <div
        style={{
          height: 96,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 10.5,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: MUTED,
        }}
      >
        <span>{label}</span>
        <span>{index}</span>
      </div>
    </Reveal>
  );
}

/** 14px accent L-bracket for the fragment specimen (card 04). */
function FragmentBracket({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const pos: React.CSSProperties =
    corner === "tl"
      ? { top: 0, left: 0, borderTop: "1px solid var(--ee-accent)", borderLeft: "1px solid var(--ee-accent)" }
      : corner === "tr"
        ? { top: 0, right: 0, borderTop: "1px solid var(--ee-accent)", borderRight: "1px solid var(--ee-accent)" }
        : corner === "bl"
          ? { bottom: 0, left: 0, borderBottom: "1px solid var(--ee-accent)", borderLeft: "1px solid var(--ee-accent)" }
          : { bottom: 0, right: 0, borderBottom: "1px solid var(--ee-accent)", borderRight: "1px solid var(--ee-accent)" };
  return (
    <span
      style={{ position: "absolute", width: 14, height: 14, ...pos }}
      aria-hidden
    />
  );
}

const CONTACT_LINKS = [
  {
    label: "info.ericescapes@gmail.com ↗",
    href: "mailto:info.ericescapes@gmail.com",
    external: false,
  },
  {
    label: "Instagram ↗",
    href: "https://www.instagram.com/ericescapes",
    external: true,
  },
  {
    label: "Substack ↗",
    href: "https://ericescapes.substack.com",
    external: true,
  },
] as const;

export default function AboutPage() {
  const mounted = designConfig.frames === "mounted";

  return (
    <div
      className="ee-gutter"
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1280,
        margin: "0 auto",
        paddingTop: 76,
        paddingBottom: 110,
      }}
    >
      {/* ── 1. Two-column intro ─────────────────────────────────────────── */}
      <Reveal className="grid grid-cols-1 items-start gap-[44px] md:grid-cols-[1.2fr_0.8fr] md:gap-[88px]">
        <div>
          <span
            style={{
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            About · the person behind the archive
          </span>
          <h1
            className="ee-hero-statement"
            style={{
              margin: "26px 0 0",
              fontWeight: 500,
              lineHeight: 1.14,
              letterSpacing: "-0.015em",
              textWrap: "pretty",
            }}
          >
            I photograph the version of a city that exists just before everyone
            looks up.
          </h1>
          <p
            style={{
              margin: "36px 0 0",
              fontSize: 17,
              lineHeight: 1.7,
              color: TEXT,
              maxWidth: "58ch",
            }}
          >
            Eric Escapes is the working archive of Eric, a street and travel
            photographer based in Sydney. Since 2019 the frames have been filed
            by place rather than by date, because memory works in places, not
            months. Seven countries in the index so far; the darkroom queue is
            longer.
          </p>
          <p
            style={{
              margin: "22px 0 0",
              fontSize: 17,
              lineHeight: 1.7,
              color: TEXT,
              maxWidth: "58ch",
            }}
          >
            The pictures are about the in-between: station platforms, food
            windows, last light on ordinary streets. If a frame needs a caption
            to matter, it doesn&rsquo;t go in.
          </p>
          <p
            style={{
              margin: "22px 0 0",
              fontSize: 17,
              lineHeight: 1.7,
              color: TEXT,
              maxWidth: "58ch",
            }}
          >
            Photography started as a childhood curiosity, then sat on the back
            burner for years. It came back after the world got turned upside
            down, and it hasn&rsquo;t been put down since. No chasing
            perfection or trends, just what it actually feels like to be in a
            place.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 34,
              marginTop: 40,
              fontSize: 11.5,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="ee-social"
                style={{
                  color: MUTED,
                  textDecoration: "none",
                  transition: "color 120ms ease",
                }}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right column — portrait */}
        <div>
          <div
            style={{
              background: mounted ? "#2B2D2C" : "transparent",
              border: mounted
                ? "1px solid rgba(242,239,230,0.16)"
                : "1px solid transparent",
              padding: mounted ? 12 : 0,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 5",
              }}
            >
              <Image
                src="/images/about/portrait.jpg"
                alt="Eric on the road"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                style={{ objectFit: "cover", objectPosition: "72% 40%" }}
                priority
              />
            </div>
          </div>
          <div
            style={{
              marginTop: 10,
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            Self · on the road
          </div>
        </div>
      </Reveal>

      {/* ── 2. Identity board — marks & fragments ───────────────────────── */}
      <div style={{ marginTop: 100 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 20,
            paddingBottom: 16,
            borderBottom: "1px solid rgba(242,239,230,0.13)",
          }}
        >
          <span
            style={{
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            Identity · marks &amp; fragments
          </span>
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            Registry plate · adopted from 1d
          </span>
        </div>

        <div className="mt-[2px] grid grid-cols-1 gap-[2px] md:grid-cols-3">
          {/* 01 — Wordmark · registry plate */}
          <IdentityCard label="Wordmark · registry plate" index="01">
            <div
              style={{
                borderTop: "1px solid rgba(242,239,230,0.18)",
                borderBottom: "1px solid rgba(242,239,230,0.18)",
                padding: "14px 2px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Monogram size={20} stroke={TEXT} />
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    color: TEXT,
                  }}
                >
                  ERIC ESCAPES
                </span>
              </div>
              <span
                style={{
                  fontSize: 8.5,
                  fontWeight: 500,
                  letterSpacing: "0.28em",
                  color: MUTED,
                }}
              >
                VISUAL ARCHIVE · EST. 2019
              </span>
            </div>
          </IdentityCard>

          {/* 02 — Monogram · thin line */}
          <IdentityCard label="Monogram · thin line" index="02">
            <Monogram size={56} stroke={TEXT} />
          </IdentityCard>

          {/* 03 — Active state */}
          <IdentityCard label="Active state" index="03">
            <Monogram size={56} stroke="var(--ee-accent)" />
          </IdentityCard>

          {/* 04 — Fragment · hover frame */}
          <IdentityCard label="Fragment · hover frame" index="04">
            <div style={{ position: "relative", width: 74, height: 74 }}>
              <Image
                src="/images/gallery/japan/01.jpg"
                alt=""
                width={116}
                height={116}
                style={{
                  position: "absolute",
                  inset: 8,
                  width: 58,
                  height: 58,
                  objectFit: "cover",
                  objectPosition: "60% 40%",
                }}
              />
              <FragmentBracket corner="tl" />
              <FragmentBracket corner="tr" />
              <FragmentBracket corner="bl" />
              <FragmentBracket corner="br" />
            </div>
          </IdentityCard>

          {/* 05 — Favicon · current → derived */}
          <IdentityCard label="Favicon · current → derived" index="05">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  width: 34,
                  height: 34,
                  background: "#FFFFFF",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- .ico specimen, next/image adds nothing */}
                <img
                  src="/favicon.ico"
                  alt="Current favicon"
                  width={20}
                  height={20}
                  style={{ imageRendering: "pixelated" }}
                />
              </span>
              <span style={{ color: MUTED }}>→</span>
              <span
                style={{
                  width: 34,
                  height: 34,
                  background: "#050605",
                  border: "1px solid rgba(242,239,230,0.14)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Monogram size={20} stroke={TEXT} strokeWidth={3} />
              </span>
            </div>
          </IdentityCard>

          {/* 06 — Loading mark (the one 1.6s pulse — motion.md §1) */}
          <IdentityCard label="Loading mark" index="06">
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Monogram size={26} stroke={TEXT} opacity={0.85} />
              <span
                className="ee-led"
                style={{
                  width: 5,
                  height: 5,
                  display: "inline-block",
                  animation: "eePulse 1.6s ease-in-out infinite",
                }}
                aria-hidden
              />
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  color: MUTED,
                }}
              >
                LOADING ARCHIVE
              </span>
            </div>
          </IdentityCard>
        </div>
      </div>
    </div>
  );
}
