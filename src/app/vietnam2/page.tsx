import type { Metadata } from "next";
import GalleryGrid, { type GalleryImage } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Vietnam 2 — ERIC ESCAPES",
};

const LOCATION_NAME = "Vietnam 2";

const images: GalleryImage[] = Array.from({ length: 13 }, (_, i) => {
  const n = i + 1;
  const num = String(n).padStart(2, "0");
  return {
    src: `/images/gallery/vietnam2/${num}.jpg`,
    alt: `${LOCATION_NAME} photograph ${n}`,
  };
});

export default function Vietnam2Page() {
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
