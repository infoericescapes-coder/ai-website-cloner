import Image from "next/image";
import Link from "next/link";
import GearCard from "@/components/GearCard";
import BeholdFeed from "@/components/BeholdFeed";

const GUMROAD_PRESET_PACK_URL = "https://ericescape.gumroad.com/l/jetyik";

export const metadata = {
  title: "Special — ERIC ESCAPES",
};

export default function SpecialPage() {
  return (
    <>
      {/* Hero: thank-you note + free preset pack download, full-bleed photo */}
      <section className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden bg-black md:min-h-screen">
        <Image
          src="/images/special/hero-preset-pack.jpg"
          alt="Street photography scene at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center gap-6 px-6 py-24 text-center text-white">
          <p className="font-heading text-lg leading-relaxed sm:text-xl">
            <strong className="font-semibold">Hey!</strong>
          </p>
          <p className="font-heading text-lg leading-relaxed sm:text-xl">
            <strong className="font-semibold">
              Thank you for your continued support. Below you will find a
              link to some Lightroom presets I have put together. Hit me up
              over on Instagram if you have any questions or general
              feedback.
            </strong>
          </p>
          <p className="font-heading text-lg leading-relaxed sm:text-xl">
            <strong className="font-semibold">Cheers,</strong>
          </p>
          <p className="font-heading text-lg leading-relaxed sm:text-xl">
            <strong className="font-semibold">Eric</strong>
          </p>

          <a
            href={GUMROAD_PRESET_PACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex h-14 items-center justify-center border border-white px-10 text-base font-semibold text-white transition-colors hover:bg-white hover:text-black"
          >
            Download Free Presets
          </a>

          <nav className="mt-6 flex items-center gap-6">
            <a
              href="https://www.instagram.com/ericescapes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/70 transition-colors hover:text-white"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5.01-4.73.07-.97.04-1.5.21-1.85.34-.46.18-.79.39-1.14.74-.35.35-.56.68-.74 1.14-.13.35-.3.88-.34 1.85C3.13 8.5 3.12 8.85 3.12 12s.01 3.5.07 4.73c.04.97.21 1.5.34 1.85.18.46.39.79.74 1.14.35.35.68.56 1.14.74.35.13.88.3 1.85.34 1.23.06 1.58.07 4.73.07s3.5-.01 4.73-.07c.97-.04 1.5-.21 1.85-.34.46-.18.79-.39 1.14-.74.35-.35.56-.68.74-1.14.13-.35.3-.88.34-1.85.06-1.23.07-1.58.07-4.73s-.01-3.5-.07-4.73c-.04-.97-.21-1.5-.34-1.85a3.06 3.06 0 0 0-.74-1.14 3.06 3.06 0 0 0-1.14-.74c-.35-.13-.88-.3-1.85-.34C15.5 4.01 15.15 4 12 4Zm0 3.65a4.35 4.35 0 1 1 0 8.7 4.35 4.35 0 0 1 0-8.7Zm0 1.8a2.55 2.55 0 1 0 0 5.1 2.55 2.55 0 0 0 0-5.1Zm4.54-2a1.02 1.02 0 1 1 0 2.04 1.02 1.02 0 0 1 0-2.04Z" />
              </svg>
            </a>
            <a
              href="https://ericescapes.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Substack"
              className="text-white/70 transition-colors hover:text-white"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M21.5 3.5h-19v3.4h19V3.5Zm0 5.6h-19V12h19V9.1ZM2.5 14.3v6.2L12 15.1l9.5 5.4v-6.2H2.5Z" />
              </svg>
            </a>
          </nav>
        </div>
      </section>

      {/* Live on Instagram + Currently Shooting With — shared footer widget, same as homepage */}
      <section className="w-full border-t border-white/[0.12] bg-black px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-[58fr_42fr] lg:gap-12">
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

          <div className="flex flex-col gap-6">
            <span className="eyebrow text-white/85">Currently Shooting With</span>

            <div className="flex flex-col">
              <GearCard
                kicker="EDC Camera"
                name="Fujifilm X-T5"
                image="/images/home/camera-xt5.jpg"
                href="https://amzn.to/3GWNkoC"
              />
              <GearCard
                kicker="Establishing Lens"
                name="Fujifilm XF 23mm f/2"
                image="/images/home/lens-23mm.jpg"
                href="https://amzn.to/48wjm6A"
              />
              <GearCard
                kicker="Detail Lens"
                name="Fujifilm XF 50mm f/2"
                image="/images/home/lens-50f2.jpg"
                href="https://amzn.to/47hZT8w"
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
