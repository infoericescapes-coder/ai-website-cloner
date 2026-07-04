import Image from "next/image";
import Link from "next/link";
import GearCard from "@/components/GearCard";
import BeholdFeed from "@/components/BeholdFeed";

export const metadata = {
  title: "About — Eric Escapes",
  description:
    "Travel and street photographer from Sydney. About Eric Escapes, this visual diary, and why the camera came back out.",
};

export default function AboutPage() {
  return (
    <>
      {/* About — bio copy + portrait, dark section */}
      <section className="w-full bg-black px-6 py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <h4 className="font-heading text-[30px] font-normal text-white">
              About
            </h4>
            <div className="flex flex-col gap-5 text-base leading-relaxed text-white/80">
              <p>
                Hey, I&rsquo;m Eric. I&rsquo;m a travel and street photographer
                from Sydney, and this space is basically my visual diary.
                It&rsquo;s where I document the places I go, the weird and
                wonderful stuff I see, and the moments that make it all feel
                worth it.
              </p>
              <p>
                Photography started out as a childhood curiosity, then sat on
                the back burner for a while. It wasn&rsquo;t until a few years
                ago, after the world got turned upside down, that I really
                picked up the camera again. I haven&rsquo;t put it down since.
              </p>
              <p>
                For me, photography isn&rsquo;t about chasing perfection or
                trends. I just want to capture what it <em>actually</em>{" "}
                feels like to be in a place. Sometimes that&rsquo;s a epic
                landscape. Other times, it&rsquo;s the energy of a street, a
                quiet detail, or a totally random moment that made me stop.
              </p>
              <p>
                I shoot what catches my eye and write about the things that
                stick with me. Sometimes it&rsquo;s light and funny.
                Sometimes it&rsquo;s heavier. Either way, it&rsquo;s real.
              </p>
              <p>
                This site is a mix of photos, thoughts, and photography
                skills I&rsquo;ve picked up while figuring things out on the
                road. If you&rsquo;re into photography, travel, storytelling,
                or just seeing the world from someone else&rsquo;s point of
                view. Welcome.
              </p>
              <p>
                See links for all my socials, feel free to message me on
                there if you have any questions.
              </p>
              <p>
                Cheers,
                <br />
                Eric
              </p>
            </div>

            <h4 className="mt-2 font-heading text-[30px] font-normal text-white">
              Contact
            </h4>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="https://www.instagram.com/ericescapes"
                target="_blank"
                rel="noopener noreferrer"
                className="font-eyebrow text-xs text-white/40 transition-colors hover:text-white/70"
              >
                Instagram ↗
              </a>
              <a
                href="https://ericescapes.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-eyebrow text-xs text-white/40 transition-colors hover:text-white/70"
              >
                Substack ↗
              </a>
            </div>
          </div>

          <div className="relative order-1 aspect-[3/2] w-full overflow-hidden lg:order-2 lg:aspect-auto lg:h-[560px]">
            <Image
              src="/images/about/portrait.jpg"
              alt="Eric on the road"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Live on Instagram + Currently Shooting With (shared global block) */}
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
