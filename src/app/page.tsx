import Image from "next/image";
import Link from "next/link";
import PresetPackForm from "@/components/PresetPackForm";
import GearCard from "@/components/GearCard";
import BeholdFeed from "@/components/BeholdFeed";
import PortfolioTile from "@/components/PortfolioTile";

type ShowcaseImage = {
  src: string;
  alt: string;
  label?: string;
  href?: string;
  priority?: boolean;
};

const SHOWCASE_IMAGES: ShowcaseImage[] = [
  {
    src: "/images/home/hero-sydneyopera.jpg",
    alt: "Sydney Opera House",
    label: "Sydney",
    href: "/sydney2",
    priority: true,
  },
  {
    src: "/images/home/shibuya-night.jpg",
    alt: "Shibuya crossing at night",
    label: "Japan",
    href: "/japan",
  },
  {
    src: "/images/home/hallstatt-morning.jpg",
    alt: "Hallstatt in the morning light",
    label: "Austria",
    href: "/austria",
  },
  {
    src: "/images/home/saigon-district10.jpg",
    alt: "Saigon District 10 street life",
    label: "Vietnam",
    href: "/vietnam",
  },
  {
    src: "/images/home/venice.jpg",
    alt: "Venice canal scene",
    label: "Italy",
    href: "/italy1",
  },
];

export default function Home() {
  return (
    <>
      {/* Full-bleed photo showcase bands */}
      {SHOWCASE_IMAGES.map((img) =>
        img.label && img.href ? (
          <section key={img.src} className="relative h-[70vh] w-full md:h-screen">
            <PortfolioTile
              src={img.src}
              alt={img.alt}
              label={img.label}
              href={img.href}
              priority={img.priority}
              sizes="100vw"
              className="h-full w-full"
            />
          </section>
        ) : (
          <section key={img.src} className="relative h-[70vh] w-full md:h-screen">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </section>
        ),
      )}

      {/* Free Visual Diary Preset Pack — floats over a full-bleed photo */}
      <section className="relative w-full px-6 py-24 md:py-36">
        <Image
          src="/images/home/afterdark-after.jpg"
          alt="After dark street scene"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 bg-black/95 px-6 py-12 text-center text-white sm:px-12">
          <h4 className="font-heading text-[30px] font-normal text-white">
            Free Visual Diary Preset Pack
          </h4>
          <p className="text-base text-white/70">
            Drop your email and get the Visual Diary Collection free.
          </p>
          <PresetPackForm />
          <p className="text-sm text-white/50">No spam. Just photography.</p>
        </div>
      </section>

      {/* Live on Instagram + Currently Shooting With */}
      <section className="w-full border-t border-white/[0.12] bg-black px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-[58fr_42fr] lg:gap-12">
          {/* Left: Instagram */}
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-3">
              <span className="size-[7px] shrink-0 animate-pulse rounded-full bg-[#ff3b30]" />
              <span className="eyebrow text-white/85">Live on Instagram</span>
            </div>
            <BeholdFeed />
            <a
              href="https://www.instagram.com/ericescapes"
              target="_blank"
              rel="noopener noreferrer"
              className="font-eyebrow text-xs text-white/40 transition-colors hover:text-white/70"
            >
              @ericescapes on Instagram
            </a>
          </div>

          {/* Right: Gear */}
          <div className="flex flex-col gap-6">
            <span className="eyebrow text-white/85">Currently Shooting With</span>

            <div className="flex flex-col">
              <GearCard
                kicker="EDC Camera"
                name="Fujifilm X-T5"
                image="/images/home/camera-xt5.jpg"
                href="https://amzn.to/4u2HNEg"
              />
              <GearCard
                kicker="Establishing Lens"
                name="Fujifilm 23mm F2.8 WRX"
                image="/images/home/lens-23mm.jpg"
                href="https://amzn.to/4sll44M"
              />
              <GearCard
                kicker="Detail Lens"
                name="Fujifilm XF 50mm F/2"
                image="/images/home/lens-50f2.jpg"
                href="https://amzn.to/4clcQVu"
              />
            </div>

            <Link
              href="/my-gear"
              className="font-eyebrow text-xs text-white/40 transition-colors hover:text-white/70"
            >
              Full Kit →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
