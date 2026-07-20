import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/v2/chrome/Reveal";
import PresetPackFormV2 from "@/components/v2/PresetPackFormV2";

/**
 * Preset detail (`/visualdiary`) — the free three-look pack, on-site capture.
 * Structure is carried over verbatim from /chaostocalm (local Column / Bracket
 * / BeforeAfter, ← Shop back-link, section order, text-column-width imagery,
 * no mount boxes / hairline borders around photos). Two deliberate departures:
 *
 *   1. The Gumroad CTA anchor is replaced by the embedded <PresetPackFormV2>
 *      (MailerLite capture → Gumroad delivery). The page stays a server
 *      component; only the form is a client island (see free-1/page.tsx:116).
 *   2. Archive chrome (banner around the h1 + envelope sign-off after the FAQ),
 *      per Eric's rebranded-landing masthead — a small local pattern, in
 *      house style, duplicated on /chaostocalm too.
 *
 * Body copy is Eric's approved voice, taken verbatim from the rebranded
 * landing (scratchpad/visualdiary-rebrand/index.html).
 */
export const metadata: Metadata = {
  title: "Visual Diary Collection — ERIC ESCAPES",
  description:
    "Three looks, built around light. Free. Three film-inspired Lightroom presets — First Light, Quiet Streets, After Dark — with XMP for Lightroom Classic, desktop and Mobile.",
};

const MUTED = "#8B8F86";
const INK = "#F2EFE6";
const DIM = "#666B60";
const MONO = "var(--font-mono)";
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
    name: "First Light",
    tag: "Soft / warm",
    description:
      "Early-morning runs around Sydney. The first-hour palette: warm but soft, a little hazy. Lifted shadows, muted tones, a gentle warmth that does not push. It reminds me of home.",
    caption: "Sydney, early morning.",
    // Opera House upper-mid, seated figure just below centre — keep the band.
    objectPosition: "50% 42%",
    before: {
      src: "/images/visualdiary/firstlight-before.jpg",
      alt: "First Light, before",
    },
    after: {
      src: "/images/visualdiary/firstlight-after.jpg",
      alt: "First Light, after",
    },
  },
  {
    name: "Quiet Streets",
    tag: "Muted / documentary",
    description:
      "Built in Ho Chi Minh City, mostly overcast. Low-contrast and a touch desaturated, so it holds in flat grey light and does not fall apart when the sun cuts through. For walking somewhere unfamiliar.",
    caption: "Ho Chi Minh City.",
    // Scooter rider sits lower-centre — bias the crop down a touch.
    objectPosition: "50% 58%",
    before: {
      src: "/images/visualdiary/quietstreets-before.jpg",
      alt: "Quiet Streets, before",
    },
    after: {
      src: "/images/visualdiary/quietstreets-after.jpg",
      alt: "Quiet Streets, after",
    },
  },
  {
    name: "After Dark",
    tag: "Neon / night",
    description:
      "Tokyo at night. Neon, layered signs, that cyberpunk glow. It holds the atmosphere, the colour and the grain, without crushing the shadows or faking the exposure.",
    caption: "Tokyo, after dark.",
    // Chef in the lit window is right-of-centre, mid-height.
    objectPosition: "52% 45%",
    before: {
      src: "/images/visualdiary/afterdark-before.jpg",
      alt: "After Dark, before",
    },
    after: {
      src: "/images/visualdiary/afterdark-after.jpg",
      alt: "After Dark, after",
    },
  },
] as const;

const PACK_BULLETS: readonly string[] = [
  "Three presets: First Light, Quiet Streets, and After Dark",
  "XMP files for Lightroom Classic, desktop, and Mobile",
  "A plain-English install & usage guide",
  "No spam. Unsubscribe whenever.",
] as const;

type Qa = { q: string; a: string };

const FAQS: readonly Qa[] = [
  {
    q: "Will this work with my camera and software?",
    a: "Yeah, most likely. The XMP files run in Lightroom Classic, Lightroom desktop, and Lightroom Mobile. Built for RAW, work on any brand, so you do not need to shoot Fuji. JPEGs work too, the colour just shifts a bit differently.",
  },
  {
    q: "Does it work on Lightroom Mobile?",
    a: "Yep. The .xmp files import straight into the mobile app, and if you use the cloud version, presets you add on desktop sync to your phone on their own.",
  },
  {
    q: "What if it looks off on my photos?",
    a: "Set your exposure and white balance first, then apply the preset. That fixes most of it. The included guide has a note on where to start for each look.",
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

/**
 * Archive chrome — banner (slanted folder tab + registry row + hairline) that
 * frames the h1, plus a matching envelope sign-off (see ArchiveEnvelope).
 * Local, in house style; a near-identical copy lives on /chaostocalm.
 */
function ArchiveBanner({ file, cat }: { file: string; cat: string }) {
  return (
    <div style={{ marginTop: 40 }}>
      {/* Slanted folder tab — bg a touch lighter than the panel, mono label. */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          height: 26,
          background: "#12150F",
          borderTop: HAIRLINE,
          borderLeft: HAIRLINE,
          borderRight: HAIRLINE,
          padding: "0 24px 0 13px",
          clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 100%, 0 100%)",
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "rgba(242,239,230,0.6)",
            whiteSpace: "nowrap",
          }}
        >
          {file}
        </span>
      </div>
      {/* Registry row — sits on the folder top edge. */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 16,
          flexWrap: "wrap",
          borderTop: HAIRLINE,
          paddingTop: 14,
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 10.5,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          Eric Escapes Archive
        </span>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 10.5,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: DIM,
          }}
        >
          {cat}
        </span>
      </div>
      <div style={{ height: 1, background: "rgba(242,239,230,0.09)", marginTop: 14 }} />
    </div>
  );
}

/** Envelope sign-off — hairline + registry row, dim. Paired with ArchiveBanner. */
function ArchiveEnvelope({ envelope }: { envelope: string }) {
  return (
    <div style={{ marginTop: 64, borderTop: HAIRLINE, paddingTop: 22 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 10.5,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          Eric Escapes
        </span>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 10.5,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: DIM,
          }}
        >
          {envelope}
        </span>
      </div>
    </div>
  );
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

export default function VisualDiaryPage() {
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

          {/* Archive banner — frames the title. */}
          <ArchiveBanner file="FILE · EE-02" cat="CAT. EE-VDC-02" />

          <div
            style={{
              marginTop: 26,
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            Lightroom preset pack · 3 looks · free
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 24,
              flexWrap: "wrap",
              marginTop: 18,
            }}
          >
            <h1
              className="text-[34px] md:text-[56px]"
              style={{
                margin: 0,
                fontWeight: 600,
                lineHeight: 1.02,
                letterSpacing: "-0.01em",
                maxWidth: "12ch",
              }}
            >
              Visual Diary Collection
            </h1>
            <span
              style={{
                fontFamily: MONO,
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: DIM,
                lineHeight: 2.1,
                textAlign: "right",
                whiteSpace: "nowrap",
                paddingTop: 6,
              }}
            >
              Conservation copy
              <br />
              Free release
              <br />
              Do not discard
            </span>
          </div>

          <p
            style={{
              margin: "26px 0 0",
              fontSize: 17.5,
              lineHeight: 1.75,
              color: INK,
              maxWidth: "62ch",
            }}
          >
            Three looks, built around light. Free.
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
            The three presets I keep coming back to. Soft, honest, a touch of
            grain. The everyday looks, not the show-off ones. Each one came out
            of a real place.
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
              The pack · 3 presets
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
                Visual Diary Collection
              </h2>
              <span style={{ fontSize: 14, letterSpacing: "0.08em", color: INK }}>
                3 LOOKS · <span style={{ color: "var(--ee-accent)" }}>FREE</span>
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
              Three presets, on me. Drop your email and they land in your inbox.
              They are a starting point, not a one-tap miracle. Set your exposure
              first, then let the look do the rest.
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

            {/* Send-me-the-pack capture (MailerLite → Gumroad delivery). */}
            <div
              style={{
                marginTop: 34,
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: MUTED,
              }}
            >
              Send me the pack
            </div>
            <div style={{ marginTop: 18, maxWidth: 420 }}>
              <PresetPackFormV2 />
            </div>

            <p
              style={{
                margin: "26px 0 0",
                fontSize: 11.5,
                letterSpacing: "0.1em",
                lineHeight: 1.7,
                color: MUTED,
              }}
            >
              No thanks? No worries. Have a look around first. Works with
              Lightroom Classic, Lightroom CC desktop, and Lightroom Mobile.
              Built for RAW, fine on any camera brand.
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
            phone. These three started as adjustments I kept making without
            thinking, the same moves on the same kinds of light, until they
            settled into looks worth keeping.
          </p>
          <p
            style={{
              margin: "14px 0 0",
              fontSize: 16.5,
              lineHeight: 1.75,
              color: MUTED,
              maxWidth: "66ch",
            }}
          >
            They are a starting point. The whole idea is that you make them
            yours.
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

          {/* Archive envelope sign-off. */}
          <ArchiveEnvelope envelope="Archive Envelope / EE-02" />
        </Reveal>
      </Column>
    </div>
  );
}
