import type { Metadata } from "next";
import GalleryV2, { type GalleryImage } from "@/components/v2/GalleryV2";
import { resolveGalleryMeta } from "@/lib/gallery-meta";
import { designConfig } from "@/lib/design-config";

export const metadata: Metadata = {
  title: "Japan — ERIC ESCAPES",
  description:
    "Street and travel photography from Japan — Tokyo, Kyoto, Fujiyoshida, and beyond.",
};

const SLUG = "japan";
const LOCATION = "Japan";
const IMAGE_COUNT = 43;

const images: GalleryImage[] = Array.from({ length: IMAGE_COUNT }, (_, i) => {
  const index = i + 1;
  const num = String(index).padStart(2, "0");
  return {
    src: `/images/gallery/japan/${num}.jpg`,
    alt: `Japan photograph ${index}`,
  };
});

export default function JapanPage() {
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
