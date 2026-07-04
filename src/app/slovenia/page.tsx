import GalleryGrid, { type GalleryImage } from "@/components/GalleryGrid";

const LOCATION = "Slovenia";

const IMAGES: GalleryImage[] = Array.from({ length: 26 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    src: `/images/gallery/slovenia/${n}.jpg`,
    alt: `${LOCATION} photograph ${i + 1}`,
  };
});

export default function SloveniaPage() {
  return (
    <div className="w-full">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 pb-10 pt-14 text-center md:pt-20">
        <h1 className="font-heading text-[30px] font-normal text-black">
          {LOCATION}
        </h1>
      </div>

      <div className="px-4 pb-16 md:px-6">
        <GalleryGrid images={IMAGES} />
      </div>
    </div>
  );
}
