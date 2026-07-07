import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/v2/chrome/Reveal";

/**
 * Gallery 1 (`/gallery-1-1`) — migrated into the (v2) dark shell.
 *
 * CONTENT LOCK: the live Squarespace page is an unpublished template stub — a
 * single 300×300 placeholder thumbnail and Squarespace's default "It all begins
 * with an idea…" filler paragraph. It never had real gallery photos, so there
 * are no galleries to index. Per the zero-content-drift rule the exact stub copy
 * and the single placeholder image are carried over VERBATIM; only the skin is
 * re-language'd to v2 (mono kicker, Space Grotesk display, clean photo).
 */
export const metadata: Metadata = {
  title: "Gallery 1 — ERIC ESCAPES",
  description:
    "It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something more.",
  // Placeholder stub with no real gallery content — stays reachable by URL but
  // kept out of search indexes (and the sitemap) until Eric populates it.
  robots: { index: false, follow: true },
};

const MUTED = "#8B8F86";
const TEXT = "#F2EFE6";

export default function GalleryOnePage() {
  return (
    <div
      className="ee-gutter"
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 720,
        margin: "0 auto",
        paddingTop: 88,
        paddingBottom: 130,
      }}
    >
      <Reveal>
        <span
          style={{
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          Gallery
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
          Gallery 1
        </h1>
      </Reveal>

      <Reveal style={{ marginTop: 48 }}>
        <div
          style={{
            position: "relative",
            width: 300,
            maxWidth: "100%",
            aspectRatio: "1 / 1",
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/gallery/gallery-1-1/01.jpg"
            alt="Gallery 1 placeholder image"
            fill
            sizes="300px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </Reveal>

      <Reveal style={{ marginTop: 40 }}>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: TEXT, maxWidth: "58ch" }}>
          It all begins with an idea. Maybe you want to launch a business. Maybe
          you want to turn a hobby into something more. Or maybe you have a
          creative project to share with the world. Whatever it is, the way you
          tell your story online can make all the difference.
        </p>
      </Reveal>
    </div>
  );
}
