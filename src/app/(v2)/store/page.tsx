import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/v2/chrome/Reveal";

/**
 * Shop (`/store`) — specs/shop.md, extended per Eric's live-review decision:
 * BOTH digital products ship as cards (the spec's single live row + "Soon"
 * slot becomes a two-card grid that keeps the rhythm — mono data lines,
 * hairlines, mount treatment). Both products link to on-site detail pages
 * (/chaostocalm and /visualdiary — the free pack's page embeds the email
 * capture; its old Squarespace product URL 301s to /store, see
 * next.config.ts). Guides row + Substack line kept from the spec.
 * 2026-11-05: Simple Social (free iOS app) added as card 03 on Eric's ask; it
 * links to its launch page (ericescapes.com.au/simplesocial/), which carries
 * the App Store badge, rather than straight to the App Store. It is a `wide`
 * card: at md+ it spans both grid columns, cover left and text right; the
 * inner gap (56px = 2px grid gap + 2 x 26px padding + 2 x 1px border) puts the
 * cover exactly under card 01's cover and the text column exactly where card
 * 02's text starts. Phone width stays one column, same as the other cards.
 */
export const metadata: Metadata = {
  title: "Store — ERIC ESCAPES",
  description:
    "Digital shop: Lightroom preset packs from the road, Chaos to Calm (pay what you want) and the free Visual Diary Collection, plus Simple Social, a free iOS app for zine-style carousels and stories.",
};

const MUTED = "#8B8F86";

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
  /** Spans both grid columns at md+ (horizontal composition). */
  wide?: boolean;
  /** Optional mono data lines under the blurb, hairline-ruled. */
  specs?: readonly string[];
};

/**
 * Real product data only — copy adapted from the existing /chaostocalm and
 * /store/p/visual-diary-collection-lightroom-presets pages; prices verified
 * against those pages (A$5+ pay-what-you-want / $0.00 free). Simple Social:
 * copy adapted from its launch page; "Free" verified against Apple's App Store
 * lookup for id6779313911 (AU storefront, 2026-11-05); spec lines are the
 * launch page's own claims. Cover: archive envelope EE-04 (EE-03 is Sydney
 * Chrome in the brand kit), built from the EE-03 single-mount source with the
 * launch page's home + editor screens.
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
    action: "VIEW →",
    image: {
      src: "/images/store/visual-diary-cover.jpg",
      alt: "Visual Diary Collection — Lightroom preset pack, Eric Escapes archive cover",
    },
    href: "/visualdiary",
    external: false,
  },
  {
    index: "03",
    kicker: "iOS app · Carousels + stories",
    title: "Simple Social",
    blurb:
      "Zine-style carousels and stories, built by a street photographer. Pick a layout, drop in your shots, crop, export. Your photos never leave your phone.",
    price: "Free",
    action: "VIEW ↗",
    image: {
      src: "/images/store/simple-social-cover.jpg",
      alt: "Simple Social, Eric Escapes archive cover EE-04: the iOS app's home and editor screens",
    },
    href: "https://ericescapes.com.au/simplesocial/",
    external: true,
    wide: true,
    specs: [
      "4:5 posts · 9:16 stories",
      "Up to 10 slides per carousel",
      "No subscription · no watermark",
      "No account · no ads",
    ],
  },
] as const;

/** Card body — shared between the internal <Link> and external <a> wrappers. */
function ProductCardBody({ product }: { product: Product }) {
  return (
    <div
      className={
        product.wide
          ? "flex flex-col md:grid md:grid-cols-2 md:gap-x-[56px]"
          : "flex flex-col"
      }
      style={{
        background: "#0B0D0B",
        border: "1px solid rgba(242,239,230,0.08)",
        padding: 26,
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

      {/* Text column: fills the remaining height so the price row stays at
          the bottom (beside the cover's bottom edge on a wide card). */}
      <div
        className={
          product.wide
            ? "mt-[24px] flex flex-1 flex-col md:mt-0"
            : "mt-[24px] flex flex-1 flex-col"
        }
      >
        {/* Mono data line + index */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
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

        {product.specs && (
          <ul style={{ margin: "22px 0 0", padding: 0, listStyle: "none" }}>
            {product.specs.map((line) => (
              <li
                key={line}
                style={{
                  padding: "11px 0",
                  borderTop: "1px solid rgba(242,239,230,0.09)",
                  fontSize: 11.5,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: MUTED,
                }}
              >
                {line}
              </li>
            ))}
          </ul>
        )}

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
                className={
                  product.wide ? "group block md:col-span-2" : "group block"
                }
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ProductCardBody product={product} />
              </a>
            ) : (
              <Link
                key={product.title}
                href={product.href}
                className={
                  product.wide ? "group block md:col-span-2" : "group block"
                }
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
