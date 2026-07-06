import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const GUMROAD_URL = "https://ericescape.gumroad.com/l/jetyik";

export const metadata: Metadata = {
  title:
    "Lightroom Presets for Street & Travel Photography - Visual Diary Collection — ERIC ESCAPES",
  description:
    "Three film inspired Lightroom presets for street and travel photographers. First Light, Quiet Street, and After Dark. Works on Lightroom Classic, Cloud, and Mobile.",
};

const GALLERY_IMAGES = [
  {
    src: "/images/store-product/visual-diary-collection-preview.jpg",
    alt: "Visual Diary Collection preset preview",
  },
  {
    src: "/images/store-product/gallery-first-light.jpg",
    alt: "First Light preset example",
  },
  {
    src: "/images/store-product/gallery-quiet-street.jpg",
    alt: "Quiet Street preset example",
  },
  {
    src: "/images/store-product/gallery-after-dark.jpg",
    alt: "After Dark preset example",
  },
];

const PRESETS = [
  {
    name: "First Light",
    detail: "for golden hour stillness",
  },
  {
    name: "Quiet Street",
    detail: "for the in-between moments",
  },
  {
    name: "After Dark",
    detail: "for when the city comes alive",
  },
];

export default function VisualDiaryCollectionPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-6 pt-10 sm:px-10">
        <Link
          href="/store"
          className="font-eyebrow text-xs text-black/40 transition-colors hover:text-black/70"
        >
          ← Back to Store
        </Link>
      </div>

      {/* Product detail */}
      <section className="w-full px-6 py-10 sm:px-10 md:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[42fr_58fr] lg:gap-16">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/5">
              <Image
                src={GALLERY_IMAGES[0].src}
                alt={GALLERY_IMAGES[0].alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {GALLERY_IMAGES.slice(1).map((img) => (
                <div
                  key={img.src}
                  className="relative aspect-[2/3] w-full overflow-hidden bg-black/5"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 14vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Meta / buy */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="eyebrow text-black/50">Presets</span>
              <h1 className="font-heading text-[30px] font-normal text-black sm:text-4xl">
                Visual Diary Collection 2026
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-semibold text-black">
                  $0.00
                </span>
                <span className="text-lg text-black/40 line-through">
                  $5.00
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-base leading-relaxed text-black/80">
              <p>Three Lightroom presets for photographers who shoot with intention.</p>
              <ul className="flex flex-col gap-1">
                {PRESETS.map((preset) => (
                  <li key={preset.name}>
                    <span className="font-semibold text-black">{preset.name}</span>{" "}
                    {preset.detail}
                  </li>
                ))}
              </ul>
              <p>
                Consistent presets that work across street, travel, and everyday
                life. Includes a full install guide for Lightroom Classic, Cloud,
                and Mobile.
              </p>
            </div>

            <a
              href={GUMROAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 w-full items-center justify-center bg-black text-base font-semibold text-white transition-colors hover:bg-[#333333] sm:w-auto sm:min-w-[280px] sm:px-10"
            >
              Purchase
            </a>

            <p className="font-eyebrow text-xs text-black/40">
              Delivered instantly via Gumroad
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
