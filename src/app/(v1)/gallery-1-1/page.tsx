import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery 1 — ERIC ESCAPES",
  description:
    "It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something more.",
};

// NOTE: the live Squarespace page at /gallery-1-1 is an unpublished template
// stub — it never had real gallery photos added. The only image present is a
// single 300x300 placeholder thumbnail, and the body copy is Squarespace's
// default "It all begins with an idea..." filler paragraph. This page
// reproduces that stub content faithfully in the site aesthetic rather than
// inventing a photo grid that was never actually published.
export default function GalleryOnePage() {
  return (
    <div className="w-full px-6 py-16 md:py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
        <p className="eyebrow text-black/60">Gallery</p>

        <h1 className="font-heading text-[30px] font-normal text-foreground">
          Gallery 1
        </h1>

        <div className="overflow-hidden">
          <Image
            src="/images/gallery/gallery-1-1/01.jpg"
            alt="Gallery 1 placeholder image"
            width={300}
            height={300}
            className="h-auto w-[300px]"
          />
        </div>

        <p className="text-base leading-relaxed text-black/70">
          It all begins with an idea. Maybe you want to launch a business.
          Maybe you want to turn a hobby into something more. Or maybe you
          have a creative project to share with the world. Whatever it is,
          the way you tell your story online can make all the difference.
        </p>
      </div>
    </div>
  );
}
