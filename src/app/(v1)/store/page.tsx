import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Store — ERIC ESCAPES",
  description:
    "Lightroom presets for photographers who shoot with intention — the Visual Diary Collection, free while the sale lasts.",
};

const GUMROAD_URL = "https://ericescape.gumroad.com/l/jetyik";

export default function StorePage() {
  return (
    <>
      {/* Page title */}
      <section className="w-full px-6 pt-14 pb-8 text-center md:pt-20">
        <h1 className="font-heading text-[30px] font-normal">Store</h1>
      </section>

      {/* Product grid — single product: Visual Diary Collection */}
      <section className="w-full px-6 pb-24 md:pb-36">
        <div className="mx-auto max-w-md">
          <Link
            href="/store/p/visual-diary-collection-lightroom-presets"
            className="group block"
          >
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-black/5">
              <Image
                src="/images/store/visual-diary-cover.jpg"
                alt="Visual Diary Collection 2026"
                fill
                sizes="(min-width: 768px) 448px, 90vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                priority
              />
              <span className="eyebrow absolute top-4 left-4 bg-black px-3 py-1 text-white">
                Sale
              </span>
            </div>

            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h2 className="font-heading text-lg font-normal">
                Visual Diary Collection 2026
              </h2>
              <span className="flex items-baseline gap-2 whitespace-nowrap">
                <span className="text-sm text-black/40 line-through">
                  $5.00
                </span>
                <span className="font-eyebrow text-sm">$0.00</span>
              </span>
            </div>
          </Link>

          <p className="mt-4 text-base text-black/70">
            Three Lightroom presets for photographers who shoot with
            intention.
          </p>
          <ul className="mt-3 flex flex-col gap-1 text-base text-black/70">
            <li>First Light — for golden hour stillness</li>
            <li>Quiet Street — for the in-between moments</li>
            <li>After Dark — for when the city comes alive</li>
          </ul>
          <p className="mt-3 text-base text-black/70">
            Consistent presets that work across street, travel, and everyday
            life. Includes a full install guide for Lightroom Classic, Cloud,
            and Mobile.
          </p>

          <a
            href={GUMROAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center bg-black px-6 py-4 font-eyebrow text-white transition-opacity hover:opacity-80"
          >
            Get it free on Gumroad
          </a>
        </div>
      </section>

      {/* Preview gallery from the pack */}
      <section className="w-full border-t border-black/10 bg-black px-6 py-20 md:py-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <span className="eyebrow text-center text-white/85">
            From the Collection
          </span>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="relative aspect-[2/3] w-full overflow-hidden">
              <Image
                src="/images/store/gallery-first-light.jpg"
                alt="First Light preset preview"
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[2/3] w-full overflow-hidden">
              <Image
                src="/images/store/gallery-quiet-street.jpg"
                alt="Quiet Street preset preview"
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[2/3] w-full overflow-hidden">
              <Image
                src="/images/store/gallery-after-dark.jpg"
                alt="After Dark preset preview"
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
