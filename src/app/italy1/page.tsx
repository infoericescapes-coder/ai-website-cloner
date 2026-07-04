import type { Metadata } from "next";
import GalleryGrid, { type GalleryImage } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Italy — ERIC ESCAPES",
};

const LOCATION_NAME = "Italy";

// Live gallery has 59 images (02–60). 01.jpg was a leaked 300×300 og-fallback
// thumbnail from the scrape (not part of the live gallery), so it is skipped.
const images: GalleryImage[] = Array.from({ length: 59 }, (_, i) => {
  const n = i + 2;
  const num = String(n).padStart(2, "0");
  return {
    src: `/images/gallery/italy1/${num}.jpg`,
    alt: `${LOCATION_NAME} photograph ${n}`,
  };
});

export default function Italy1Page() {
  return (
    <div className="mx-auto w-full max-w-[1800px] px-[4vw] py-16 sm:py-20">
      <div className="mb-10 text-center sm:mb-14">
        <h1 className="font-heading text-3xl font-normal sm:text-4xl">
          {LOCATION_NAME}
        </h1>
      </div>

      <GalleryGrid images={images} />
    </div>
  );
}
