"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";

/**
 * GalleryV2 — design-v2 location gallery (specs/gallery.md).
 *
 * Mounted masonry + CRT-hover frames + a black-canvas lightbox with keyboard
 * nav, focus trap and reduced-motion safety. Applied to ALL gallery routes via
 * the (v2) dark shell. Data-only re-skin: it takes the same real image list the
 * old GalleryGrid did, plus header meta (place / years / code / coords).
 *
 * Motion: the CRT hover overlay (eeCrt) + the single pulsing years LED are the
 * only moving parts (motion.md doctrine). The global `.ee-root` reduced-motion
 * kill-switch neutralises every animation/transition; the lightbox keyboard and
 * click handlers keep working regardless.
 */

export type GalleryImage = {
  src: string;
  alt: string;
};

type GalleryV2Props = {
  images: GalleryImage[];
  /** Display place name, e.g. "JAPAN" (rendered uppercase). */
  place: string;
  /** ISO-ish code for the meta line, e.g. "JPN". Mapped places only. */
  code?: string;
  /** Coordinate string, e.g. "35.68°N 139.69°E". NEVER invented. */
  coords?: string;
  /** Year range, e.g. "2023–2026". */
  years?: string;
  /** Desktop masonry columns (2–4). Defaults to 3. */
  columns?: number;
  /** Frame treatment. "mounted" = grey mount + padding + hairline border. */
  frames?: "full-bleed" | "mounted";
};

const MOUNT_BG = "#2B2D2C";
const MUTED = "#8B8F86";
const TEXT = "#F2EFE6";
const ACCENT = "var(--ee-accent)";

export default function GalleryV2({
  images,
  place,
  code,
  coords,
  years,
  columns = 3,
  frames = "mounted",
}: GalleryV2Props) {
  const total = images.length;
  const [lb, setLb] = useState<number | null>(null);
  const open = lb !== null;

  const closeLb = useCallback(() => setLb(null), []);
  const stepLb = useCallback(
    (d: number) => {
      setLb((cur) => (cur === null ? cur : (cur + d + total) % total));
    },
    [total],
  );

  // Keyboard: Esc closes, arrows navigate (wrap). Listener only while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLb();
      else if (e.key === "ArrowLeft") stepLb(-1);
      else if (e.key === "ArrowRight") stepLb(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeLb, stepLb]);

  // Lock body scroll + trap focus inside the lightbox while open.
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus trap: keep Tab within the overlay's focusables.
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const root = overlayRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    // Move focus into the overlay on open.
    const t = window.setTimeout(() => {
      overlayRef.current
        ?.querySelector<HTMLElement>("[data-lb-close]")
        ?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      lastFocused.current?.focus?.();
    };
  }, [open]);

  const active = lb !== null ? images[lb] : null;

  // Header meta line 1: "{code} · {coords}" when mapped, else "{N} SELECTS".
  const hasCoords = Boolean(code && coords);
  const metaLine1 = hasCoords
    ? `${code} · ${coords}`
    : `${total} ${total === 1 ? "SELECT" : "SELECTS"}`;

  const labelStyle: CSSProperties = {
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: MUTED,
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1560,
          margin: "0 auto",
          padding: "52px var(--ee-gallery-gutter, 40px) 110px",
          animation: "eeViewIn 0.3s ease both",
        }}
      >
        {/* 1 · Back link */}
        <Link
          href="/"
          className="ee-back"
          style={{
            display: "inline-block",
            fontSize: 11.5,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: MUTED,
            transition: "color 120ms ease",
          }}
        >
          ← Index
        </Link>

        {/* 2 · Header */}
        <header
          className="ee-reveal"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            marginTop: 44,
            paddingBottom: 30,
            borderBottom: "1px solid rgba(242,239,230,0.13)",
          }}
        >
          <h1
            style={{
              fontSize: "var(--ee-gallery-title, 72px)",
              fontWeight: 600,
              lineHeight: 0.9,
              letterSpacing: "0.01em",
              margin: 0,
            }}
          >
            {place.toUpperCase()}
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 7,
              alignItems: "flex-end",
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: MUTED }}>{metaLine1}</span>
            {years && (
              <span
                style={{
                  color: TEXT,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  className="ee-led"
                  style={{ width: 5, height: 5, display: "inline-block" }}
                  aria-hidden
                />
                {years}
              </span>
            )}
          </div>
        </header>

        {/* 3 · Sub-bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "18px 0 30px",
            ...labelStyle,
          }}
        >
          <span>Selects</span>
          <span>Click a frame to view</span>
        </div>

        {/* 4 · Masonry */}
        <div
          className="ee-masonry"
          style={{ columnGap: 18 }}
          data-cols={columns}
        >
          {images.map((img, i) => (
            <Frame
              key={`${img.src}-${i}`}
              image={img}
              index={i}
              place={place}
              years={years}
              frames={frames}
              onOpen={() => setLb(i)}
            />
          ))}
        </div>

        {/* 5 · Footer line */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 26,
            paddingTop: 14,
            borderTop: "1px solid rgba(242,239,230,0.09)",
            ...labelStyle,
          }}
        >
          <span>End of selects</span>
          <span aria-hidden />
        </div>
      </div>

      {/* 6 · Lightbox — PORTALED to <body>: the masonry sits inside an
          .ee-reveal wrapper whose eeReveal animation leaves a computed
          transform on it, which makes it the containing block for
          position:fixed descendants (dialog stretched over the 6500px
          section instead of the viewport = "blank lightbox"). A portal
          escapes any transformed ancestor for good. */}
      {open && active && lb !== null && createPortal(
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${place} · frame ${lb + 1} of ${total}`}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 60,
            background: "rgba(5,6,5,0.97)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Top bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 32px",
            }}
          >
            <span aria-hidden />
            <button
              type="button"
              data-lb-close
              onClick={closeLb}
              className="ee-lb-btn"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 11.5,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: MUTED,
                transition: "color 120ms ease",
                fontFamily: "inherit",
              }}
            >
              Close · Esc ✕
            </button>
          </div>

          {/* Center — backdrop click (only on itself) closes */}
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLb();
            }}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 26,
              padding: "0 24px",
              minHeight: 0,
            }}
          >
            <button
              type="button"
              onClick={() => stepLb(-1)}
              aria-label="Previous frame"
              className="ee-lb-arrow"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "24px 20px",
                fontSize: 22,
                color: ACCENT,
                transition: "filter 120ms ease",
                fontFamily: "inherit",
              }}
            >
              ←
            </button>

            <Image
              key={active.src}
              src={active.src}
              alt={active.alt}
              width={1600}
              height={1200}
              priority
              sizes="80vw"
              style={{
                maxWidth: "min(80vw, 1280px)",
                maxHeight: "76vh",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />

            <button
              type="button"
              onClick={() => stepLb(1)}
              aria-label="Next frame"
              className="ee-lb-arrow"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "24px 20px",
                fontSize: 22,
                color: ACCENT,
                transition: "filter 120ms ease",
                fontFamily: "inherit",
              }}
            >
              →
            </button>
          </div>

          {/* Mono footer — NN/TOTAL · PLACE · YEAR (build-order override). */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "18px 32px 26px",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            {String(lb + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
            {" · "}
            {place.toUpperCase()}
            {years ? ` · ${years}` : ""}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

/** A single masonry frame with CRT hover overlay + caption row. */
function Frame({
  image,
  index,
  place,
  years,
  frames,
  onOpen,
}: {
  image: GalleryImage;
  index: number;
  place: string;
  years?: string;
  frames: "full-bleed" | "mounted";
  onOpen: () => void;
}) {
  const mounted = frames === "mounted";

  // Caption: "{NN} · {PLACE} · {YEAR}" — index-based, no fabricated
  // per-frame neighbourhoods. Year = end of the range when known.
  const year = years ? years.slice(-4) : "";
  const caption = `${String(index + 1).padStart(2, "0")} · ${place.toUpperCase()}${
    year ? ` · ${year}` : ""
  }`;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open frame ${index + 1}: ${image.alt}`}
      className="ee-frame"
      data-mounted={mounted ? "" : undefined}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        breakInside: "avoid",
        margin: "0 0 18px",
        background: mounted ? MOUNT_BG : "transparent",
        // Rest hairline; hover/focus accent handled by the .ee-frame CSS rule.
        border: mounted
          ? "1px solid rgba(242,239,230,0.16)"
          : "1px solid transparent",
        padding: mounted ? 10 : 0,
        cursor: "pointer",
        transition: "border-color 120ms ease",
        boxSizing: "border-box",
        fontFamily: "inherit",
      }}
    >
      <span style={{ position: "relative", display: "block" }}>
        <Image
          src={image.src}
          alt={image.alt}
          width={800}
          height={600}
          loading="lazy"
          sizes="(max-width: 760px) 50vw, 33vw"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            objectFit: "cover",
          }}
        />
        {/*
          CRT hover overlay — mirrors the home-tile pattern (.ee-tile-fx).
          The OUTER wrapper carries the hover/focus opacity gate; the INNER
          span carries the eeCrt flicker animation. This split is load-bearing:
          a CSS animation's keyframes set `opacity` and would OVERRIDE an inline
          `opacity:0` on the same element, so gating and animating the same node
          leaks the tint at rest (the original bug). Wrapper stays fully
          pointer-events:none so it never intercepts the frame click.
        */}
        <span aria-hidden className="ee-frame-fx" style={{ position: "absolute", inset: 0 }}>
          <span
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(rgba(var(--ee-accent-rgb),0.10), rgba(var(--ee-accent-rgb),0.10))",
              animation: "eeCrt 2.6s linear infinite",
            }}
          />
        </span>
      </span>

      {/* Caption row — reveals on frame hover/focus (CSS-gated, .ee-frame-cap). */}
      <span
        className="ee-frame-cap"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 9,
          fontSize: 11,
          letterSpacing: "0.13em",
          textTransform: "uppercase",
          color: MUTED,
        }}
      >
        <span>{caption}</span>
        <span style={{ color: "var(--ee-accent)" }}>+</span>
      </span>
    </button>
  );
}
