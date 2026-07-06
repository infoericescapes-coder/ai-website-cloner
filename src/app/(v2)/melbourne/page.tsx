import type { Metadata } from "next";
import GalleryV2, { type GalleryImage } from "@/components/v2/GalleryV2";
import { resolveGalleryMeta } from "@/lib/gallery-meta";
import { designConfig } from "@/lib/design-config";

export const metadata: Metadata = {
  title: "Melbourne — ERIC ESCAPES",
  description: "Street and travel photography from Melbourne, Australia.",
};

const SLUG = "melbourne";
const LOCATION = "Melbourne";

const images: GalleryImage[] = Array.from({ length: 13 }, (_, i) => {
  const n = i + 1;
  const num = String(n).padStart(2, "0");
  return {
    src: `/images/gallery/melbourne/${num}.jpg`,
    alt: `${LOCATION} photograph ${n}`,
  };
});

export default function MelbournePage() {
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
