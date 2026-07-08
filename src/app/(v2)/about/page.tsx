import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
  title: "About — ERIC ESCAPES",
  description:
    "Travel and street photographer from Sydney. About Eric Escapes, this visual diary, and why the camera came back out.",
};

const MUTED = "#8B8F86";
const TEXT = "#F2EFE6";

const CONTACT_LINKS = [
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
  {
    label: "My gear ↗",
    href: "/my-gear",
    external: false,
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
            I photograph how places feel.
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
            {CONTACT_LINKS.map((link) => {
              const linkStyle = {
                color: MUTED,
                textDecoration: "none",
                transition: "color 120ms ease",
              } as const;
              return link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="ee-social"
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="ee-social"
                  style={linkStyle}
                >
                  {link.label}
                </Link>
              );
            })}
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

    </div>
  );
}
