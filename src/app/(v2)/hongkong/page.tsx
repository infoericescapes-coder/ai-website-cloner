import type { Metadata } from "next";
import GalleryV2, { type GalleryImage } from "@/components/v2/GalleryV2";
import { resolveGalleryMeta } from "@/lib/gallery-meta";
import { designConfig } from "@/lib/design-config";

export const metadata: Metadata = {
  title: "Hong Kong — ERIC ESCAPES",
  description: "Street and travel photography from Hong Kong.",
};

const SLUG = "hongkong";
const IMAGE_COUNT = 24;

const images: GalleryImage[] = Array.from({ length: IMAGE_COUNT }, (_, i) => {
  const n = i + 1;
  const num = String(n).padStart(2, "0");
  return {
    src: `/images/gallery/hongkong/${num}.jpg`,
    alt: `Hong Kong photograph ${n}`,
  };
});

export default function HongKongPage() {
  const meta = resolveGalleryMeta(SLUG, "Hong Kong");
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
