import type { Metadata } from "next";
import GalleryV2, { type GalleryImage } from "@/components/v2/GalleryV2";
import { resolveGalleryMeta } from "@/lib/gallery-meta";
import { designConfig } from "@/lib/design-config";

export const metadata: Metadata = {
  title: "Sapphire Coast — ERIC ESCAPES",
  description: "Street and travel photography from the Sapphire Coast, NSW.",
};

const SLUG = "sapphirecoast";
const LOCATION = "Sapphire Coast";

const images: GalleryImage[] = Array.from({ length: 18 }, (_, i) => {
  const n = i + 1;
  const num = String(n).padStart(2, "0");
  return {
    src: `/images/gallery/sapphirecoast/${num}.jpg`,
    alt: `${LOCATION} photograph ${n}`,
  };
});

export default function SapphireCoastPage() {
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
