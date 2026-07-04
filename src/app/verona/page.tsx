import type { Metadata } from "next";
import GalleryGrid, { type GalleryImage } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Verona — ERIC ESCAPES",
  description: "Street and travel photography from Verona, Italy.",
};

const LOCATION = "Verona";

const images: GalleryImage[] = Array.from({ length: 21 }, (_, i) => {
  const n = i + 1;
  const num = String(n).padStart(2, "0");
  return {
    src: `/images/gallery/verona/${num}.jpg`,
    alt: `${LOCATION} photograph ${n}`,
  };
});

export default function VeronaPage() {
  return (
    <div className="w-full px-6 py-16 md:py-24">
      <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-3 text-center md:mb-16">
        <p className="eyebrow text-black/60">Gallery</p>
        <h1 className="font-heading text-[30px] font-normal text-foreground">
          {LOCATION}
        </h1>
      </div>

      <div className="mx-auto max-w-7xl">
        <GalleryGrid images={images} />
      </div>
    </div>
  );
}
