import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/v2/chrome/Reveal";
import LedDot from "@/components/v2/chrome/LedDot";
import PresetPackFormV2 from "@/components/v2/PresetPackFormV2";
import GearRow from "@/components/v2/GearRow";
import InstaStrip from "@/components/v2/InstaStrip";

/**
 * Free (`/free-1`) — migrated into the (v2) dark shell.
 *
 * CONTENT + WIRING LOCK: the signup keeps the EXACT MailerLite/Gumroad wiring
 * via PresetPackFormV2 (same form id + Gumroad redirect as the retired v1
 * page). Gear hrefs and IG feed are carried over verbatim. Only the skin is
 * re-language'd to v2: mono kickers, hairlines, Space Grotesk, clean photos.
 */
export const metadata: Metadata = {
  title: "Free — ERIC ESCAPES",
  description:
    "Free Visual Diary Preset Pack — drop your email and get the Visual Diary Collection free.",
};

const MUTED = "#8B8F86";

const GEAR = [
  {
    kicker: "EDC Camera",
    name: "Fujifilm X-T5",
    image: "/images/free/camera-xt5.jpg",
    href: "https://amzn.to/4u2HNEg",
  },
  {
    kicker: "Establishing Lens",
    name: "Fujifilm 23mm F2.8 WRX",
    image: "/images/free/lens-23mm.jpg",
    href: "https://amzn.to/4sll44M",
  },
  {
    kicker: "Detail Lens",
    name: "Fujifilm XF 50mm F/2",
    image: "/images/free/lens-50f2.jpg",
    href: "https://amzn.to/4clcQVu",
  },
] as const;

export default function FreePage() {
  return (
    <>
      {/* ── 1. Offer panel over the after-dark frame ────────────────────── */}
      <section
        className="ee-gutter"
        style={{ maxWidth: 1120, margin: "0 auto", paddingTop: 72, paddingBottom: 40 }}
      >
        <Reveal>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              minHeight: 520,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/images/free/afterdark-after.jpg"
              alt="After dark street scene"
              fill
              priority
              sizes="1120px"
              style={{ objectFit: "cover" }}
            />
            {/* Offer card floats over the photo */}
            <div
              className="ee-gutter"
              style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                maxWidth: 520,
                margin: "48px auto",
                background: "rgba(5,6,5,0.92)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(242,239,230,0.09)",
                padding: "40px 34px",
              }}
            >
              <div className="flex items-center" style={{ gap: 10, marginBottom: 22 }}>
                <LedDot size={6} />
                <span
                  style={{
                    fontSize: 11.5,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: MUTED,
                  }}
                >
                  Free · Lightroom + Mobile
                </span>
              </div>
              <h1
                style={{
                  fontSize: 30,
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                Free Visual Diary Preset Pack
              </h1>
              <p style={{ margin: "16px 0 30px", fontSize: 15, lineHeight: 1.6, color: MUTED }}>
                Drop your email and get the Visual Diary Collection free.
              </p>
              <PresetPackFormV2 />
              <p
                style={{
                  marginTop: 22,
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: MUTED,
                }}
              >
                No spam. Just photography.
              </p>
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
