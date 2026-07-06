import type { Metadata } from "next";
import GalleryV2, { type GalleryImage } from "@/components/v2/GalleryV2";
import { resolveGalleryMeta } from "@/lib/gallery-meta";
import { designConfig } from "@/lib/design-config";

export const metadata: Metadata = {
  title: "Vietnam 2 — ERIC ESCAPES",
};

const SLUG = "vietnam2";
const LOCATION_NAME = "Vietnam 2";

const images: GalleryImage[] = Array.from({ length: 13 }, (_, i) => {
  const n = i + 1;
  const num = String(n).padStart(2, "0");
  return {
    src: `/images/gallery/vietnam2/${num}.jpg`,
    alt: `${LOCATION_NAME} photograph ${n}`,
  };
});

export default function Vietnam2Page() {
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
