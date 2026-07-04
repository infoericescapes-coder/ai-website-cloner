import type { Metadata } from "next";
import GalleryGrid, { type GalleryImage } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Japan — ERIC ESCAPES",
  description:
    "Street and travel photography from Japan — Tokyo, Kyoto, Fujiyoshida, and beyond.",
};

const IMAGE_COUNT = 43;

const images: GalleryImage[] = Array.from({ length: IMAGE_COUNT }, (_, i) => {
  const index = i + 1;
  const num = String(index).padStart(2, "0");
  return {
    src: `/images/gallery/japan/${num}.jpg`,
    alt: `Japan photograph ${index}`,
  };
});

export default function JapanPage() {
  return (
    <section className="w-full px-6 py-16 md:py-24">
      <div className="mx-auto mb-12 flex max-w-6xl flex-col items-center gap-4 text-center md:mb-16">
        <h1 className="font-heading text-[30px] font-normal text-black">Japan</h1>
      </div>
      <div className="mx-auto max-w-6xl">
        <GalleryGrid images={images} />
      </div>
    </section>
  );
}
