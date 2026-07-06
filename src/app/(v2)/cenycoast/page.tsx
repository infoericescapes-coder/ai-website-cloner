import type { Metadata } from "next";
import GalleryV2, { type GalleryImage } from "@/components/v2/GalleryV2";
import { resolveGalleryMeta } from "@/lib/gallery-meta";
import { designConfig } from "@/lib/design-config";

export const metadata: Metadata = {
  title: "Central Coast — ERIC ESCAPES",
  description: "Street and travel photography from the Central Coast, NSW.",
};

const SLUG = "cenycoast";
const LOCATION = "Central Coast";

const images: GalleryImage[] = Array.from({ length: 57 }, (_, i) => {
  const n = i + 1;
  const num = String(n).padStart(2, "0");
  return {
    src: `/images/gallery/cenycoast/${num}.jpg`,
    alt: `${LOCATION} photograph ${n}`,
  };
});

export default function CenyCoastPage() {
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
