import type { Metadata } from "next";
import GalleryGrid, { type GalleryImage } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Salzburg — ERIC ESCAPES",
};

const LOCATION = "Salzburg";
const IMAGE_COUNT = 29;

const images: GalleryImage[] = Array.from({ length: IMAGE_COUNT }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return {
    src: `/images/gallery/salzburg/${num}.jpg`,
    alt: `${LOCATION} photograph ${i + 1}`,
  };
});

export default function SalzburgPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="font-heading text-[30px] font-normal">{LOCATION}</h1>
      </div>

      <GalleryGrid images={images} />
    </div>
  );
}
