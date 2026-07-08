import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/v2/chrome/Reveal";
import LedDot from "@/components/v2/chrome/LedDot";
import InstaStrip from "@/components/v2/InstaStrip";
import SubscribeBar from "@/components/v2/SubscribeBar";
import { getAllPosts } from "@/lib/blog";
import placeData from "../../../docs/design-v2/place-data.json";

/**
 * Home · The Archive (home-archive.md). "Not a blog roll; a location index."
 *
 * Server component. Data sources:
 *  - Place grid  → place-data.json reconciled_final.primary_tiles (6 tiles,
 *    slot 06 = HONG KONG per Eric's locked 2026-07-06 decision).
 *  - Latest diaries → getAllPosts() (src/lib/blog.ts), 3 newest.
 *  - IG strip / subscribe bar → client components (Behold feed / MailerLite).
 *
 * Hover interactivity (image scale, CRT tint, corner brackets, arrows) is
 * CSS-driven (.ee-tile* rules in globals.css), so the grid stays a server
 * component with no per-tile client boundary.
 */

export const metadata: Metadata = {
  title: "Eric Escapes · Visual Archive",
  description:
    "Street and travel photography from the edges of time. A location index, not a blog roll.",
};

// ── Place grid data (typed from place-data.json) ────────────────────────────
type PrimaryTile = {
  slot: string;
  name: string;
  route: string;
  code: string;
  coords: string;
  years: string;
  frames: number;
  pos: string;
};

const PRIMARY_TILES = placeData.reconciled_final.primary_tiles as PrimaryTile[];

// Tile cover images. Home tiles reuse the existing homepage covers where they
// exist; HONG KONG uses its new gallery cover.
const TILE_COVER: Record<string, string> = {
  "/sydney2": "/images/home/hero-sydneyopera.jpg",
  "/japan": "/images/home/shibuya-night.jpg",
  "/vietnam": "/images/home/saigon-district10.jpg",
  "/austria": "/images/home/hallstatt-morning.jpg",
  "/italy1": "/images/home/venice.jpg",
  "/hongkong": "/images/gallery/hongkong/cover.jpg",
};

const TOTAL_PLACES = PRIMARY_TILES.length;
const TOTAL_FRAMES = PRIMARY_TILES.reduce((sum, t) => sum + t.frames, 0);

// ── Latest diaries ──────────────────────────────────────────────────────────
const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

/** "2026-06-25" -> "25 JUN 2026". Falls back to the raw string if unparseable. */
function formatDiaryDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso.toUpperCase();
  const [, y, mo, d] = m;
  const month = MONTHS[Number(mo) - 1] ?? mo;
  return `${d} ${month} ${y}`;
}

export default function Home() {
  const diaries = getAllPosts().slice(0, 3);

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {/* ═══════════════════ 1 · HERO ═══════════════════ */}
      <Reveal
        className="ee-hero"
        style={{
          position: "relative",
          maxWidth: 1560,
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {/* Background photo — 100% mobile / 62% desktop, right-aligned + masked */}
        <div
          aria-hidden
          className="ee-hero-photo"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <Image
            src="/images/home/hero-v2.jpeg"
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 62vw"
            style={{ objectFit: "cover", objectPosition: "76% 56%" }}
          />
        </div>

        {/* Statement + caret */}
        <h1
          className="ee-hero-statement"
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: 12,
            fontWeight: 500,
            lineHeight: 1.16,
            letterSpacing: "-0.015em",
            maxWidth: 920,
            textWrap: "pretty",
          }}
        >
          Street and travel photography from the edges of time.
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 3,
              height: "0.72em",
              background: "var(--ee-accent)",
              boxShadow: "0 0 9px rgba(var(--ee-accent-rgb), 0.6)",
              marginLeft: 13,
              transform: "translateY(0.06em)",
              animation: "eeBlink 1.15s steps(1) infinite",
            }}
          />
        </h1>

        {/* Frame counter — bottom-right, static */}
        <div
          className="flex items-center"
          style={{
            position: "absolute",
            right: 20,
            bottom: 20,
            gap: 14,
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "#8B8F86",
          }}
        >
          <span style={{ color: "var(--ee-accent)" }}>001</span>
          <span className="flex items-center" style={{ gap: 8 }} aria-hidden>
            {[0.35, 0.18, 0.18, 0.18].map((a, i) => (
              <span
                key={i}
                style={{ width: 18, height: 1, background: `rgba(242,239,230,${a})` }}
              />
            ))}
          </span>
        </div>
      </Reveal>

      {/* ═══════════════════ 2 · INDEX · BY PLACE bar ═══════════════════ */}
      <div
        className="ee-bar flex items-center justify-between"
        style={{
          background: "#000",
          borderTop: "1px solid rgba(242,239,230,0.09)",
          borderBottom: "1px solid rgba(242,239,230,0.09)",
          paddingTop: 13,
          paddingBottom: 13,
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#8B8F86",
        }}
      >
        <span>Index · by place</span>
        <span>
          {String(TOTAL_PLACES).padStart(2, "0")} places · {TOTAL_FRAMES} frames
        </span>
      </div>

      {/* ═══════════════════ 3 · PLACE GRID (6 tiles) ═══════════════════ */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 2,
          background: "#050605",
          paddingTop: 2,
        }}
      >
        {PRIMARY_TILES.map((tile, i) => {
          const cover = TILE_COVER[tile.route];
          const index = String(i + 1).padStart(2, "0");
          return (
            <Reveal
              key={tile.route}
              className="ee-tile ee-tile-span"
              style={{
                aspectRatio: "3 / 4",
                cursor: "pointer",
                overflow: "hidden",
                background: "#0B0D0B",
                position: "relative",
              }}
            >
              <Link
                href={tile.route}
                aria-label={`${tile.name} · ${tile.frames} frames`}
                style={{ position: "absolute", inset: 0, display: "block", zIndex: 5 }}
              >
                <span className="sr-only">{tile.name}</span>
              </Link>

              {/* Cover image — below the fold, so plain lazy. These 3 tiles
                  used to emit priority (rel=preload as=image) and competed with
                  the hero for the LCP connection budget. The hero <Image> above
                  is the SOLE priority image (fetchpriority=high). */}
              {cover && (
                <Image
                  src={cover}
                  alt={`${tile.name} — ${tile.frames} frames`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="ee-tile-img"
                  style={{ objectFit: "cover", objectPosition: tile.pos }}
                />
              )}

              {/* Bottom gradient */}
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(5,6,5,0) 40%, rgba(5,6,5,0.82) 100%)",
                }}
              />

              {/* CRT hover tint */}
              <span
                aria-hidden
                className="ee-tile-fx"
                style={{ position: "absolute", inset: 0 }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(rgba(var(--ee-accent-rgb),0.08), rgba(var(--ee-accent-rgb),0.08))",
                    animation: "eeCrt 2.6s linear infinite",
                  }}
                />
              </span>

              {/* Index number top-left */}
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  top: 18,
                  left: 20,
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  color: "rgba(242,239,230,0.6)",
                }}
              >
                {index}
              </span>

              {/* Corner brackets */}
              <span aria-hidden className="ee-tile-bracket" style={{ position: "absolute", top: 14, left: 14, width: 16, height: 16, borderTop: "1px solid", borderLeft: "1px solid" }} />
              <span aria-hidden className="ee-tile-bracket" style={{ position: "absolute", top: 14, right: 14, width: 16, height: 16, borderTop: "1px solid", borderRight: "1px solid" }} />
              <span aria-hidden className="ee-tile-bracket" style={{ position: "absolute", bottom: 14, left: 14, width: 16, height: 16, borderBottom: "1px solid", borderLeft: "1px solid" }} />
              <span aria-hidden className="ee-tile-bracket" style={{ position: "absolute", bottom: 14, right: 14, width: 16, height: 16, borderBottom: "1px solid", borderRight: "1px solid" }} />

              {/* Place name */}
              <span
                className="ee-tile-name"
                style={{
                  position: "absolute",
                  left: 28,
                  right: 28,
                  bottom: 24,
                  fontWeight: 600,
                  lineHeight: 0.95,
                  letterSpacing: "0.01em",
                  color: "var(--ee-text)",
                }}
              >
                {tile.name}
              </span>

              {/* Arrow bottom-right */}
              <span
                aria-hidden
                className="ee-tile-arrow"
                style={{
                  position: "absolute",
                  right: 26,
                  bottom: 26,
                  fontSize: 16,
                  color: "var(--ee-accent)",
                }}
              >
                →
              </span>
            </Reveal>
          );
        })}
      </div>

      {/* ═══════════════════ 4 · STATUS BAR ═══════════════════ */}
      <div
        className="ee-bar flex items-center"
        style={{
          marginTop: 2,
          background: "#000",
          borderTop: "1px solid rgba(242,239,230,0.09)",
          borderBottom: "1px solid rgba(242,239,230,0.09)",
          paddingTop: 13,
          paddingBottom: 13,
          gap: 12,
        }}
      >
        <LedDot size={6} />
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--ee-text)",
          }}
        >
          Currently filing · Sydney
        </span>
      </div>

      {/* ═══════════════════ 5 · LATEST DIARIES ═══════════════════ */}
      <Reveal
        className="ee-gutter"
        style={{ maxWidth: 1560, margin: "0 auto", paddingTop: 84 }}
      >
        <div
          className="flex justify-between"
          style={{ alignItems: "baseline", marginBottom: 26 }}
        >
          <span
            style={{
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#8B8F86",
            }}
          >
            Latest diaries
          </span>
          <Link
            href="/blog-1"
            className="ee-social"
            style={{
              fontSize: 11.5,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#8B8F86",
              transition: "color 120ms ease",
            }}
          >
            All entries →
          </Link>
        </div>

        {diaries.map((post) => {
          const category = post.categories[0] ?? "Diary";
          const kicker = `Diary · ${category}`;
          return (
            <Reveal
              key={post.slug}
              className="ee-diary-row ee-diary-cols grid"
              style={{
                alignItems: "center",
                gap: 32,
                padding: "24px 0",
                borderTop: "1px solid rgba(242,239,230,0.09)",
                cursor: "pointer",
              }}
            >
              <Link
                href={`/blog-1/${post.slug}`}
                style={{ display: "contents" }}
                aria-label={post.title}
              >
                <span
                  style={{
                    fontSize: 11.5,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#8B8F86",
                  }}
                >
                  {kicker} · {formatDiaryDate(post.date)}
                </span>
                <span
                  className="ee-diary-title"
                  style={{
                    fontSize: 24,
                    fontWeight: 500,
                    letterSpacing: "-0.005em",
                    color: "var(--ee-text)",
                    transition: "color 120ms ease",
                  }}
                >
                  {post.title}
                </span>
                <span
                  aria-hidden
                  className="ee-diary-arrow hidden md:block"
                  style={{ fontSize: 16, color: "var(--ee-accent)", textAlign: "right" }}
                >
                  →
                </span>
              </Link>
            </Reveal>
          );
        })}
        {/* trailing separator */}
        <div style={{ borderTop: "1px solid rgba(242,239,230,0.09)" }} />
      </Reveal>

      {/* ═══════════════════ 6 · @ericescapes strip ═══════════════════ */}
      <InstaStrip />

      {/* ═══════════════════ 7 · SUBSCRIBE (footer comes from the shell) ═══════════════════ */}
      <SubscribeBar />
    </div>
  );
}
