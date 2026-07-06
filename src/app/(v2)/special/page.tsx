import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/v2/chrome/Reveal";
import GearRow from "@/components/v2/GearRow";
import InstaStrip from "@/components/v2/InstaStrip";

/**
 * Special (`/special`) — migrated into the (v2) dark shell.
 *
 * CONTENT LOCK: the thank-you note, the Gumroad download link, the IG/Substack
 * social links, and the "Currently Shooting With" gear hrefs are all carried
 * over verbatim from the retired v1 page (special's gear hrefs differ from
 * free-1's — kept exactly). Only the presentation is re-skinned to v2.
 */
export const metadata: Metadata = {
  title: "Special — ERIC ESCAPES",
};

const MUTED = "#8B8F86";
const TEXT = "#F2EFE6";

const GUMROAD_PRESET_PACK_URL = "https://ericescape.gumroad.com/l/jetyik";

const GEAR = [
  {
    kicker: "EDC Camera",
    name: "Fujifilm X-T5",
    image: "/images/home/camera-xt5.jpg",
    href: "https://amzn.to/3GWNkoC",
  },
  {
    kicker: "Establishing Lens",
    name: "Fujifilm XF 23mm f/2",
    image: "/images/home/lens-23mm.jpg",
    href: "https://amzn.to/48wjm6A",
  },
  {
    kicker: "Detail Lens",
    name: "Fujifilm XF 50mm f/2",
    image: "/images/home/lens-50f2.jpg",
    href: "https://amzn.to/47hZT8w",
  },
] as const;

export default function SpecialPage() {
  return (
    <>
      {/* ── 1. Thank-you note over the dusk frame ───────────────────────── */}
      <section
        className="ee-gutter"
        style={{ maxWidth: 1120, margin: "0 auto", paddingTop: 72, paddingBottom: 40 }}
      >
        <Reveal>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              minHeight: 560,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/images/special/hero-preset-pack.jpg"
              alt="Street photography scene at dusk"
              fill
              priority
              sizes="1120px"
              style={{ objectFit: "cover", opacity: 0.6 }}
            />
            <div
              className="ee-gutter"
              style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                maxWidth: 560,
                margin: "56px auto",
                textAlign: "center",
                color: TEXT,
              }}
            >
              <p style={{ fontSize: 18, lineHeight: 1.7, fontWeight: 600 }}>Hey!</p>
              <p style={{ margin: "20px 0 0", fontSize: 18, lineHeight: 1.7, fontWeight: 600 }}>
                Thank you for your continued support. Below you will find a link
                to some Lightroom presets I have put together. Hit me up over on
                Instagram if you have any questions or general feedback.
              </p>
              <p style={{ margin: "20px 0 0", fontSize: 18, lineHeight: 1.7, fontWeight: 600 }}>
                Cheers,
              </p>
              <p style={{ margin: "20px 0 0", fontSize: 18, lineHeight: 1.7, fontWeight: 600 }}>
                Eric
              </p>

              <a
                href={GUMROAD_PRESET_PACK_URL}
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
                Download Free Presets
              </a>

              <nav
                className="flex items-center justify-center"
                style={{ gap: 24, marginTop: 30 }}
              >
                <a
                  href="https://www.instagram.com/ericescapes"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="transition-colors duration-[120ms] hover:text-[var(--ee-accent)]"
                  style={{ color: MUTED }}
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5.01-4.73.07-.97.04-1.5.21-1.85.34-.46.18-.79.39-1.14.74-.35.35-.56.68-.74 1.14-.13.35-.3.88-.34 1.85C3.13 8.5 3.12 8.85 3.12 12s.01 3.5.07 4.73c.04.97.21 1.5.34 1.85.18.46.39.79.74 1.14.35.35.68.56 1.14.74.35.13.88.3 1.85.34 1.23.06 1.58.07 4.73.07s3.5-.01 4.73-.07c.97-.04 1.5-.21 1.85-.34.46-.18.79-.39 1.14-.74.35-.35.56-.68.74-1.14.13-.35.3-.88.34-1.85.06-1.23.07-1.58.07-4.73s-.01-3.5-.07-4.73c-.04-.97-.21-1.5-.34-1.85a3.06 3.06 0 0 0-.74-1.14 3.06 3.06 0 0 0-1.14-.74c-.35-.13-.88-.3-1.85-.34C15.5 4.01 15.15 4 12 4Zm0 3.65a4.35 4.35 0 1 1 0 8.7 4.35 4.35 0 0 1 0-8.7Zm0 1.8a2.55 2.55 0 1 0 0 5.1 2.55 2.55 0 0 0 0-5.1Zm4.54-2a1.02 1.02 0 1 1 0 2.04 1.02 1.02 0 0 1 0-2.04Z" />
                  </svg>
                </a>
                <a
                  href="https://ericescapes.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Substack"
                  className="transition-colors duration-[120ms] hover:text-[var(--ee-accent)]"
                  style={{ color: MUTED }}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                    <path d="M21.5 3.5h-19v3.4h19V3.5Zm0 5.6h-19V12h19V9.1ZM2.5 14.3v6.2L12 15.1l9.5 5.4v-6.2H2.5Z" />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── 2. Live on Instagram ────────────────────────────────────────── */}
      <InstaStrip />

      {/* ── 3. Currently Shooting With ──────────────────────────────────── */}
      <section
        className="ee-gutter"
        style={{ maxWidth: 720, margin: "0 auto", paddingBottom: 130 }}
      >
        <Reveal>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
              paddingBottom: 16,
              borderBottom: "1px solid var(--ee-hairline-strong)",
              fontSize: 11.5,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            <span>Currently Shooting With</span>
            <span style={{ fontSize: 10.5 }}>KIT</span>
          </div>
          <div style={{ marginTop: 8 }}>
            {GEAR.map((g) => (
              <GearRow key={g.href + g.name} {...g} />
            ))}
          </div>
          <Link
            href="/my-gear"
            className="ee-social"
            style={{
              display: "inline-block",
              marginTop: 26,
              fontSize: 11.5,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: MUTED,
              textDecoration: "none",
              transition: "color 120ms ease",
            }}
          >
            Full Kit →
          </Link>
        </Reveal>
      </section>
    </>
  );
}
