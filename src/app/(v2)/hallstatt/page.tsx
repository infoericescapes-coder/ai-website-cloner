import type { Metadata } from "next";
import GalleryV2, { type GalleryImage } from "@/components/v2/GalleryV2";
import { resolveGalleryMeta } from "@/lib/gallery-meta";
import { designConfig } from "@/lib/design-config";

export const metadata: Metadata = {
  title: "Hallstatt — ERIC ESCAPES",
  description: "Street and travel photography from Hallstatt, Austria.",
};

const SLUG = "hallstatt";
const LOCATION = "Hallstatt";

// Live gallery has 28 images (02–29). 01.jpg was a leaked 300×300 og-fallback
// thumbnail from the scrape (not part of the live gallery), so it is skipped.
const images: GalleryImage[] = Array.from({ length: 28 }, (_, i) => {
  const n = i + 2;
  const num = String(n).padStart(2, "0");
  return {
    src: `/images/gallery/hallstatt/${num}.jpg`,
    alt: `${LOCATION} photograph ${n}`,
  };
});

export default function HallstattPage() {
  const meta = resolveGalleryMeta(SLUG, LOCATION);
  return (
    <GalleryV2
      images={images}
      place={meta.name}
      code={meta.code}
      coords={meta.coords}
      years={meta.years}
      columns={designConfig.galleryColumns}
      frames={designConfig.frames}
    />
  );
}
