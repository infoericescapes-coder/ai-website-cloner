import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/v2/chrome/Reveal";

/**
 * Preset detail (`/chaostocalm`) — specs/preset-detail.md, with Eric's
 * override from the article rounds: the before/after imagery does NOT run
 * full-container — every image sits at TEXT-COLUMN width (max-width 860 +
 * gutter), in line with the prose. Site-wide B3 precedent also applies:
 * no mount boxes, no hairline borders around photos, clean images.
 *
 * All copy, prices, preset names, imagery and the Gumroad link are carried
 * over from the previous /chaostocalm page + the locked spec copy.
 */
export const metadata: Metadata = {
  title: "Chaos to Calm — ERIC ESCAPES",
  description:
    "Two Lightroom preset looks pulled off the streets of Japan: Neon & Grey for after dark, Warm Afternoon for the slow golden-hour days.",
};

const GUMROAD_URL = "https://ericescape.gumroad.com/l/avcmj";
const MUTED = "#8B8F86";
const INK = "#F2EFE6";
const HAIRLINE = "1px solid rgba(242,239,230,0.13)";

/** Shared wrapper: text column (max-width 860 + responsive gutter). */
function Column({
  style,
  children,
}: {
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div className="ee-gutter" style={{ maxWidth: 860, margin: "0 auto", ...style }}>
      {children}
    </div>
  );
}

type Look = {
  name: string;
  tag: string;
  description: string;
  caption: string;
  objectPosition: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
};

const LOOKS: readonly Look[] = [
  {
    name: "Neon & Grey",
    tag: "Cinestill 800T",
    description:
      "Cinestill 800T, shot at street level. Warm neon glow, teal sliding into the shadows, that red halation bleeding around every sign. Reach for it after dark, when the city is lit by its own signage and you want the photo to feel like the place felt.",
    caption: "Shinjuku, after dark. Straight off the camera, then the grade.",
    objectPosition: "50% 40%",
    before: {
      src: "/images/chaostocalm/neon-grey-before.jpg",
      alt: "Neon and Grey, before",
    },
    after: {
      src: "/images/chaostocalm/neon-grey-after.jpg",
      alt: "Neon and Grey, after",
    },
  },
  {
    name: "Warm Afternoon",
    tag: "Warm / Kodak Gold",
    description:
      "Soft golden highlights, cool shadows, contrast kept gentle. Named for the second time I went to Kamakura, the day the light finally showed up. For late afternoons, the slow shots where you have time to wait for the sun.",
    caption: "Kamakura, the Enoden crossing.",
    objectPosition: "50% 55%",
    before: {
      src: "/images/chaostocalm/warm-afternoon-before.jpg",
      alt: "Warm Afternoon, before",
    },
    after: {
      src: "/images/chaostocalm/warm-afternoon-after.jpg",
      alt: "Warm Afternoon, after",
    },
  },
] as const;

const PACK_BULLETS: readonly string[] = [
  "Two presets: Neon & Grey and Warm Afternoon",
  "XMP files for Lightroom Classic, desktop, and Mobile",
  "A plain-English install & usage guide",
  "Free updates, forever",
] as const;

type Qa = { q: string; a: string };

const FAQS: readonly Qa[] = [
  {
    q: "Will this work with my camera and software?",
    a: "Yeah, most likely. The XMP files run in Lightroom Classic, Lightroom desktop, and Lightroom Mobile. They are built for RAW and they work on any brand, so you do not need to shoot Fuji to use them. I have run them on Canon, Sony and Fuji files. JPEGs work too, the colour just shifts a bit differently.",
  },
  {
    q: "Does it work on Lightroom Mobile?",
    a: "Yep. The .xmp files import straight into the Lightroom Mobile app. And if you use the cloud version of Lightroom, presets you add on desktop sync to your phone on their own. Same files, all your devices.",
  },
  {
    q: "What if it looks off on my photos?",
    a: "Set your exposure and white balance first, then apply the preset. That fixes most of it. Each look comes with a note on where to start. And if a file turns up broken or missing on delivery, tell me and I will sort it.",
  },
] as const;

/** Corner bracket for the pack panel (spec §4). */
function Bracket({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const c = "rgba(242,239,230,0.45)";
  const base: React.CSSProperties = {
    position: "absolute",
    width: 14,
    height: 14,
    pointerEvents: "none",
  };
  const map: Record<typeof corner, React.CSSProperties> = {
    tl: { top: -1, left: -1, borderTop: `1px solid ${c}`, borderLeft: `1px solid ${c}` },
    tr: { top: -1, right: -1, borderTop: `1px solid ${c}`, borderRight: `1px solid ${c}` },
    bl: { bottom: -1, left: -1, borderBottom: `1px solid ${c}`, borderLeft: `1px solid ${c}` },
    br: { bottom: -1, right: -1, borderBottom: `1px solid ${c}`, borderRight: `1px solid ${c}` },
  };
  return <span aria-hidden style={{ ...base, ...map[corner] }} />;
}

/** Before/after pair — text-column width (Eric override), clean images. */
function BeforeAfter({ look }: { look: Look }) {
  const cells = [
    { label: "BEFORE", img: look.before, accent: false },
    { label: "AFTER", img: look.after, accent: true },
  ] as const;
  return (
    <div style={{ marginTop: 36 }}>
      <div className="grid grid-cols-1 gap-[2px] md:grid-cols-2">
        {cells.map((cell) => (
          <div key={cell.label} style={{ position: "relative" }}>
            <div className="relative h-[32vh] md:h-[52vh]">
              <Image
                src={cell.img.src}
                alt={cell.img.alt}
                fill
                sizes="(min-width: 768px) 390px, 100vw"
                style={{ objectFit: "cover", objectPosition: look.objectPosition }}
              />
            </div>
            <span
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                fontSize: 10.5,
                letterSpacing: "0.2em",
                padding: "4px 8px",
                background: "rgba(5,6,5,0.55)",
                color: cell.accent ? "var(--ee-accent)" : "rgba(242,239,230,0.75)",
              }}
            >
              {cell.label}
            </span>
          </div>
        ))}
      </div>
      <p
        style={{
          marginTop: 13,
          marginBottom: 0,
          textAlign: "center",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: MUTED,
        }}
      >
        {look.caption}
      </p>
    </div>
  );
}

export default function ChaosToCalmPage() {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {/* ── 1. Header ───────────────────────────────────────────────────── */}
      <Column style={{ paddingTop: 64 }}>
        <Reveal>
          <Link
            href="/store"
            className="ee-artnav-back"
            style={{
              display: "inline-block",
              fontSize: 11.5,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: MUTED,
              textDecoration: "none",
              transition: "color 120ms ease",
            }}
          >
            ← Shop
          </Link>

          <div
            style={{
              marginTop: 42,
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            Lightroom preset pack · 2 looks
          </div>

          <h1
            className="text-[34px] md:text-[56px]"
            style={{
              margin: "18px 0 0",
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: "-0.01em",
            }}
          >
            Chaos to Calm
          </h1>

          <p
            style={{
              margin: "26px 0 0",
              fontSize: 17.5,
              lineHeight: 1.75,
              color: INK,
              maxWidth: "62ch",
            }}
          >
            Two looks, pulled off the streets of Japan. Built on the road, based
            on how the places made me feel.
          </p>
          <p
            style={{
              margin: "14px 0 0",
              fontSize: 17.5,
              lineHeight: 1.75,
              color: MUTED,
              maxWidth: "62ch",
            }}
          >
            No over-cooked HDR, no fake grain cranked to eleven. Just colour
            that respects the place.
          </p>
        </Reveal>
      </Column>

      {/* ── 2. "See the difference" bar ─────────────────────────────────── */}
      <Column style={{ marginTop: 64 }}>
        <Reveal
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 24,
            borderBottom: HAIRLINE,
            paddingBottom: 14,
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
            See the difference
          </span>
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            Drag nothing, just look
          </span>
        </Reveal>
      </Column>

      {/* ── 3. Look sections ────────────────────────────────────────────── */}
      {LOOKS.map((look, i) => (
        <Column key={look.name} style={{ marginTop: i === 0 ? 52 : 72 }}>
          <Reveal>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 500 }}>{look.name}</h2>
              <span
                style={{
                  fontSize: 11.5,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--ee-accent)",
                }}
              >
                {look.tag}
              </span>
            </div>
            <p
              style={{
                margin: "16px 0 0",
                fontSize: 16,
                lineHeight: 1.7,
                color: MUTED,
                maxWidth: "66ch",
              }}
            >
              {look.description}
            </p>
            {/* Text-column-width before/after (Eric override: never wide) */}
            <BeforeAfter look={look} />
          </Reveal>
        </Column>
      ))}

      {/* ── 4. Pack panel ───────────────────────────────────────────────── */}
      <Column style={{ marginTop: 88 }}>
        <Reveal>
          <div
            className="px-[22px] py-[30px] md:px-[60px] md:py-[52px]"
            style={{
              position: "relative",
              background: "#0B0D0B",
              border: "1px solid rgba(242,239,230,0.08)",
            }}
          >
            <Bracket corner="tl" />
            <Bracket corner="tr" />
            <Bracket corner="bl" />
            <Bracket corner="br" />

            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: MUTED,
              }}
            >
              The pack · 2 presets
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 30,
                marginTop: 16,
                flexWrap: "wrap",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 34,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                Chaos to Calm
              </h2>
              <span style={{ fontSize: 14, letterSpacing: "0.08em", color: INK }}>
                A$5+ AUD · <span style={{ color: MUTED }}>pay what you want</span>
              </span>
            </div>

            <p
              style={{
                margin: "22px 0 0",
                fontSize: 16,
                lineHeight: 1.7,
                color: INK,
                maxWidth: "64ch",
              }}
            >
              The two looks I actually reach for, in one pack. Neon &amp; Grey
              for the nights, Warm Afternoon for the slow days. These are a
              starting point, not a one-tap miracle. You will still nudge them
              to fit your shot, and that is kind of the point. Pay what you
              want, from five bucks. You decide what they are worth.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 11,
                marginTop: 26,
              }}
            >
              {PACK_BULLETS.map((bullet) => (
                <div
                  key={bullet}
                  style={{ display: "flex", gap: 12, alignItems: "baseline" }}
                >
                  <span style={{ color: "var(--ee-accent)", fontSize: 11 }}>→</span>
                  <span style={{ fontSize: 15, color: INK }}>{bullet}</span>
                </div>
              ))}
            </div>

            <a
              href={GUMROAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-[filter] duration-[120ms] hover:brightness-[1.15]"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                marginTop: 34,
                background: "var(--ee-accent)",
                color: "#050605",
                fontSize: 12.5,
                fontWeight: 600,
                letterSpacing: "0.2em",
                padding: "15px 26px",
                textDecoration: "none",
              }}
            >
              GET THE PACK →
            </a>

            <p
              style={{
                margin: "26px 0 0",
                fontSize: 11.5,
                letterSpacing: "0.1em",
                lineHeight: 1.7,
                color: MUTED,
              }}
            >
              Works with Lightroom Classic 7.3+, Lightroom CC desktop, and
              Lightroom Mobile. Built for RAW, fine on any camera brand. Not
              one-click magic: set your exposure and white balance first, then
              drop the look on top.
            </p>
          </div>
        </Reveal>
      </Column>

      {/* ── 5. About these ──────────────────────────────────────────────── */}
      <Column style={{ marginTop: 76 }}>
        <Reveal>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: MUTED,
              borderBottom: HAIRLINE,
              paddingBottom: 14,
            }}
          >
            About these
          </div>
          <p
            style={{
              margin: "24px 0 0",
              fontSize: 16.5,
              lineHeight: 1.75,
              color: INK,
              maxWidth: "66ch",
            }}
          >
            I am a street and travel photographer based in Sydney. I shoot Fuji
            mostly, Sony occasionally, a Ricoh in the pocket, sometimes just the
            phone. These two looks came out of three weeks in Japan in 2025,
            then got refined back home at the desk. They are a starting point.
            The whole idea is that you make them yours.
          </p>
        </Reveal>
      </Column>

      {/* ── 6. FAQ ──────────────────────────────────────────────────────── */}
      <Column style={{ marginTop: 76, paddingBottom: 120 }}>
        <Reveal>
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: MUTED,
              borderBottom: HAIRLINE,
              paddingBottom: 14,
            }}
          >
            A few questions
          </div>

          {FAQS.map((item) => (
            <div
              key={item.q}
              style={{
                padding: "26px 0",
                borderBottom: "1px solid rgba(242,239,230,0.09)",
              }}
            >
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>{item.q}</h3>
              <p
                style={{
                  margin: "12px 0 0",
                  fontSize: 15.5,
                  lineHeight: 1.7,
                  color: MUTED,
                  maxWidth: "66ch",
                }}
              >
                {item.a}
              </p>
            </div>
          ))}

          <p
            style={{
              margin: "30px 0 0",
              fontSize: 11.5,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            Questions?{" "}
            <a
              href="mailto:info.ericescapes@gmail.com"
              className="transition-[filter] duration-[120ms] hover:brightness-[1.4]"
              style={{ color: "var(--ee-accent)", textDecoration: "none" }}
            >
              info.ericescapes@gmail.com ↗
            </a>
          </p>
        </Reveal>
      </Column>
    </div>
  );
}
