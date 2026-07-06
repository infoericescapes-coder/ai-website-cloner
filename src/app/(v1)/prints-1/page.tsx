import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Prints — ERIC ESCAPES",
  description:
    "Fine art prints from Eric Escapes — street and travel photography, printed on request.",
};

const GUMROAD_PRESET_URL = "https://ericescape.gumroad.com/l/jetyik";

// NOTE: the live page at ericescapes.com/prints-1 is an unbuilt Squarespace
// stub — title "Prints" only, empty layout, no body content (verified via
// ?format=json: collection.title = "Prints", mainContent = empty grid div).
// The single asset on the live page is the site's default og:image
// (IMG_5072.jpeg), reused below as the hero. This page reproduces that
// "coming soon" reality faithfully rather than inventing content, while
// matching the site's design system.
export default function PrintsPage() {
  return (
    <>
      {/* Full-bleed hero — mirrors the homepage showcase band pattern */}
      <section className="relative h-[60vh] w-full md:h-[80vh]">
        <Image
          src="/images/prints/hero-print-frame.jpg"
          alt="Framed print from the Eric Escapes collection"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="flex flex-col items-center gap-4 px-6 text-center">
            <span className="eyebrow text-white/85">Fine Art Prints</span>
            <h1 className="font-heading text-[30px] font-normal text-white sm:text-[40px]">
              Prints
            </h1>
          </div>
        </div>
      </section>

      {/* Coming soon notice — the live page has no published content yet */}
      <section className="w-full px-6 py-24 md:py-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <span className="eyebrow text-black/70">Currently In The Works</span>
          <h4 className="font-heading text-[30px] font-normal">
            The print shop is coming soon
          </h4>
          <p className="text-base text-black/60">
            I&apos;m putting together a collection of fine art prints from the
            road: street frames, travel scenes, and a few favourites from the
            archive. Check back soon, or grab the free preset pack below while
            you wait.
          </p>
          <a
            href={GUMROAD_PRESET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex h-12 items-center justify-center bg-black px-8 text-base font-bold text-white transition-colors hover:bg-[#333333]"
          >
            Get the Free Preset Pack
          </a>
        </div>
      </section>

      {/* Currently Shooting With style dark band, kept consistent with the rest of the site */}
      <section className="w-full border-t border-white/[0.12] bg-black px-6 py-20 text-center md:py-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
          <span className="eyebrow text-white/85">Want To Know First?</span>
          <p className="text-base text-white/70">
            Follow along on Instagram for previews as the print shop comes
            together.
          </p>
          <a
            href="https://www.instagram.com/ericescapes"
            target="_blank"
            rel="noopener noreferrer"
            className="font-eyebrow text-xs text-white/40 transition-colors hover:text-white/70"
          >
            @ericescapes on Instagram
          </a>
        </div>
      </section>
    </>
  );
}
