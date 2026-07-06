import type { Metadata } from "next";
import GalleryV2, { type GalleryImage } from "@/components/v2/GalleryV2";
import { resolveGalleryMeta } from "@/lib/gallery-meta";
import { designConfig } from "@/lib/design-config";

export const metadata: Metadata = {
  title: "Salzburg — ERIC ESCAPES",
};

const SLUG = "salzburg";
const LOCATION = "Salzburg";
const IMAGE_COUNT = 29;

const images: GalleryImage[] = Array.from({ length: IMAGE_COUNT }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return {
    src: `/images/gallery/salzburg/${num}.jpg`,
    alt: `${LOCATION} photograph ${i + 1}`,
  };
});

export default function SalzburgPage() {
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
