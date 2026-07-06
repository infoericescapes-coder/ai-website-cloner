import type { Metadata } from "next";
import GalleryV2, { type GalleryImage } from "@/components/v2/GalleryV2";
import { resolveGalleryMeta } from "@/lib/gallery-meta";
import { designConfig } from "@/lib/design-config";

export const metadata: Metadata = {
  title: "Kosciuszko 25 — ERIC ESCAPES",
};

const SLUG = "kosciuszko-25";
const LOCATION_NAME = "Kosciuszko 25";

const images: GalleryImage[] = Array.from({ length: 52 }, (_, i) => {
  const n = i + 1;
  const num = String(n).padStart(2, "0");
  return {
    src: `/images/gallery/kosciuszko-25/${num}.jpg`,
    alt: `${LOCATION_NAME} photograph ${n}`,
  };
});

export default function Kosciuszko25Page() {
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
