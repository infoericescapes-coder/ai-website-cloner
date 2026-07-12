import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/v2/chrome/Reveal";

/**
 * Shop (`/store`) — specs/shop.md, extended per Eric's live-review decision:
 * BOTH digital products ship as cards (the spec's single live row + "Soon"
 * slot becomes a two-card grid that keeps the rhythm — mono data lines,
 * hairlines, mount treatment). Chaos to Calm links to its detail page
 * (/chaostocalm, still v1 this round); the Visual Diary pack is free and
 * links straight to Gumroad (its old product URL 301s to /store — see
 * next.config.ts). Guides row + Substack line kept from the spec.
 */
export const metadata: Metadata = {
  title: "Store — ERIC ESCAPES",
  description:
    "Digital shop — Lightroom preset packs from the road: Chaos to Calm (pay what you want) and the free Visual Diary Collection.",
};

const MUTED = "#8B8F86";

const VISUAL_DIARY_GUMROAD = "https://ericescape.gumroad.com/l/jetyik";

type Product = {
  index: string;
  kicker: string;
  title: string;
  blurb: string;
  price: string;
  action: string;
  image: { src: string; alt: string };
  href: string;
  external: boolean;
};

/**
 * Real product data only — copy adapted from the existing /chaostocalm and
 * /store/p/visual-diary-collection-lightroom-presets pages; prices verified
 * against those pages (A$5+ pay-what-you-want / $0.00 free).
 */
const PRODUCTS: readonly Product[] = [
  {
    index: "01",
    kicker: "Preset pack · 2 looks · Lightroom + Mobile",
    title: "Chaos to Calm",
    blurb:
      "Two looks pulled off the streets of Japan: Neon & Grey for the nights, Warm Afternoon for the slow days.",
    price: "A$5+",
    action: "VIEW →",
    image: {
      src: "/images/store/chaos-to-calm-cover.jpg",
      alt: "Chaos to Calm — Lightroom preset pack, Eric Escapes archive cover",
    },
    href: "/chaostocalm",
    external: false,
  },
  {
    index: "02",
    kicker: "Preset pack · 3 looks · Lightroom + Mobile",
    title: "Visual Diary Collection",
    blurb:
      "Three film-inspired looks for street and travel photographers: First Light, Quiet Street, After Dark.",
    price: "Free",
    action: "GUMROAD ↗",
    image: {
      src: "/images/store/visual-diary-cover.jpg",
      alt: "Visual Diary Collection — Lightroom preset pack, Eric Escapes archive cover",
    },
    href: VISUAL_DIARY_GUMROAD,
    external: true,
  },
] as const;

/** Card body — shared between the internal <Link> and external <a> wrappers. */
function ProductCardBody({ product }: { product: Product }) {
  return (
    <div
      style={{
        background: "#0B0D0B",
        border: "1px solid rgba(242,239,230,0.08)",
        padding: 26,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Clean image, no mount box (Eric, B3 round 3) */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "2 / 3",
          overflow: "hidden",
        }}
      >
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(min-width: 768px) 390px, 100vw"
          className="transition-transform duration-[600ms] ease-linear group-hover:scale-[1.02]"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Mono data line + index */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          marginTop: 24,
          fontSize: 11.5,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: MUTED,
        }}
      >
        <span>{product.kicker}</span>
        <span style={{ fontSize: 10.5 }}>{product.index}</span>
      </div>

      <h2
        style={{
          margin: "12px 0 0",
          fontSize: 28,
          fontWeight: 500,
          letterSpacing: "-0.005em",
        }}
      >
        {product.title}
      </h2>

      <p
        style={{
          margin: "10px 0 0",
          fontSize: 15,
          lineHeight: 1.6,
          color: MUTED,
          maxWidth: "52ch",
        }}
      >
        {product.blurb}
      </p>

      {/* Price / action row — hairline top, arrow 0.55 → 1 on card hover */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 22,
          borderTop: "1px solid rgba(242,239,230,0.09)",
        }}
      >
        <span style={{ fontSize: 20, fontWeight: 500 }}>{product.price}</span>
        <span
          className="opacity-55 transition-opacity duration-[120ms] group-hover:opacity-100"
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.2em",
            color: "var(--ee-accent)",
          }}
        >
          {product.action}
        </span>
      </div>
    </div>
  );
}

export default function StorePage() {
  return (
    <div
      className="ee-gutter"
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 860,
        margin: "0 auto",
        paddingTop: 88,
        paddingBottom: 150,
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
          Digital only · download &amp; shoot
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
          Shop
        </h1>
      </Reveal>

      {/* ── 2. Product cards ────────────────────────────────────────────── */}
      <div
        style={{
          marginTop: 56,
          borderTop: "1px solid rgba(242,239,230,0.13)",
        }}
      >
        <Reveal className="mt-[22px] grid grid-cols-1 gap-[2px] md:grid-cols-2">
          {PRODUCTS.map((product) =>
            product.external ? (
              <a
                key={product.title}
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ProductCardBody product={product} />
              </a>
            ) : (
              <Link
                key={product.title}
                href={product.href}
                className="group block"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ProductCardBody product={product} />
              </Link>
            ),
          )}
        </Reveal>

        {/* Guides row — coming later (spec §2 row 2, not clickable) */}
        <Reveal
          style={{
            opacity: 0.55,
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 40,
            alignItems: "center",
            padding: "34px 0",
            borderBottom: "1px solid rgba(242,239,230,0.09)",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11.5,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: MUTED,
              }}
            >
              Field guides · In the darkroom
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 28,
                fontWeight: 500,
                letterSpacing: "-0.005em",
                color: MUTED,
              }}
            >
              Guides · coming later
            </div>
          </div>
          <span
            style={{
              fontSize: 11.5,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            Soon
          </span>
        </Reveal>
      </div>

      {/* ── 3. Substack line ────────────────────────────────────────────── */}
      <p
        style={{
          margin: "34px 0 0",
          fontSize: 11.5,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: MUTED,
        }}
      >
        First to know when guides land:{" "}
        <a
          href="https://ericescapes.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-[filter] duration-[120ms] hover:brightness-150"
          style={{ color: "var(--ee-accent)", textDecoration: "none" }}
        >
          Substack ↗
        </a>
      </p>
    </div>
  );
}
