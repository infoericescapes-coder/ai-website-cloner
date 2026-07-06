import type { Metadata } from "next";
import GalleryV2, { type GalleryImage } from "@/components/v2/GalleryV2";
import { resolveGalleryMeta } from "@/lib/gallery-meta";
import { designConfig } from "@/lib/design-config";

export const metadata: Metadata = {
  title: "Slovenia — ERIC ESCAPES",
  description: "Street and travel photography from Slovenia.",
};

const SLUG = "slovenia";
const LOCATION = "Slovenia";

const IMAGES: GalleryImage[] = Array.from({ length: 26 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    src: `/images/gallery/slovenia/${n}.jpg`,
    alt: `${LOCATION} photograph ${i + 1}`,
  };
});

export default function SloveniaPage() {
  const meta = resolveGalleryMeta(SLUG, LOCATION);
  return (
    <GalleryV2
      images={IMAGES}
      place={meta.name}
      code={meta.code}
      coords={meta.coords}
      years={meta.years}
      columns={designConfig.galleryColumns}
      frames={designConfig.frames}
    />
  );
}
