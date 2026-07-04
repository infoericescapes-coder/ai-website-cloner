import type { Metadata } from "next";
import GalleryGrid, { type GalleryImage } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Sydney — ERIC ESCAPES",
  description: "Street and travel photography from Sydney, Australia.",
};

const LOCATION = "Sydney";

// Live gallery has 51 images (02–52). 01.jpg was a leaked 300×300 og-fallback
// thumbnail from the scrape (not part of the live gallery), so it is skipped.
const images: GalleryImage[] = Array.from({ length: 51 }, (_, i) => {
  const n = i + 2;
  const num = String(n).padStart(2, "0");
  return {
    src: `/images/gallery/sydney/${num}.jpg`,
    alt: `${LOCATION} photograph ${n}`,
  };
});

export default function SydneyPage() {
  return (
    <div className="w-full px-6 py-16 md:py-24">
      <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-3 text-center md:mb-16">
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
