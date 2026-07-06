import type { Metadata } from "next";
import GalleryV2, { type GalleryImage } from "@/components/v2/GalleryV2";
import { resolveGalleryMeta } from "@/lib/gallery-meta";
import { designConfig } from "@/lib/design-config";

export const metadata: Metadata = {
  title: "Italy — ERIC ESCAPES",
};

const SLUG = "italy1";
const LOCATION_NAME = "Italy";

// Live gallery has 59 images (02–60). 01.jpg was a leaked 300×300 og-fallback
// thumbnail from the scrape (not part of the live gallery), so it is skipped.
const images: GalleryImage[] = Array.from({ length: 59 }, (_, i) => {
  const n = i + 2;
  const num = String(n).padStart(2, "0");
  return {
    src: `/images/gallery/italy1/${num}.jpg`,
    alt: `${LOCATION_NAME} photograph ${n}`,
  };
});

export default function Italy1Page() {
  const meta = resolveGalleryMeta(SLUG, LOCATION_NAME);
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
