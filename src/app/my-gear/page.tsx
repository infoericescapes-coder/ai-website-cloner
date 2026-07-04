import Image from "next/image";
import GearCard from "@/components/GearCard";

type SimpleLinkItem = {
  label: string;
  name: string;
  href: string;
};

const OTHER_CAMERA_GEAR: SimpleLinkItem[] = [
  {
    label: "Great bag for travel & Hiking (carry on friendly)",
    name: "Shimoda Action X 30L",
    href: "https://amzn.to/3D3pjtS",
  },
  {
    label: "Bigger Tripod",
    name: "Benro Tortoise 24c",
    href: "https://amzn.to/44uhVn9",
  },
  {
    label: "Lightweight Travel Tripod",
    name: "ULANZI Zero Y (L bracket)",
    href: "https://amzn.to/3XDhZyG",
  },
  {
    label: "L bracket",
    name: "SmallRig L Bracket",
    href: "https://amzn.to/3NDrpWh",
  },
  {
    label: "Capture clip (so I can attach camera to bag)",
    name: "Peak Design Capture Camera Clip V3 (with Plate)",
    href: "https://amzn.to/44Q6IO7",
  },
  {
    label: "Street sling",
    name: "Peak Design Everyday Sling 6L",
    href: "https://amzn.to/3O1YxII",
  },
  {
    label: "Camera wrist strap (mainly for street safety)",
    name: "PEAK Design Cuff Camera Wrist Strap",
    href: "https://amzn.to/44BDzGh",
  },
];

const TRAVEL_TECH: SimpleLinkItem[] = [
  {
    label: "iPad Pro",
    name: "Apple 2022 11-inch iPad Pro",
    href: "https://amzn.to/3JITo5G",
  },
  {
    label: "Portable SSD",
    name: "SanDisk 2TB SSD",
    href: "https://amzn.to/3pEoHYL",
  },
  {
    label: "USB C Charger",
    name: "Anker USB C Charger (Nano II 65W)",
    href: "https://amzn.to/3XEbmw0",
  },
  {
    label: "USB Battery charger",
    name: "SmallRig EN-EL15 Charger",
    href: "https://amzn.to/3O1v5CN",
  },
  {
    label: "Power bank",
    name: "Mini Power bank",
    href: "https://amzn.to/3PKpdPC",
  },
  {
    label: "Earphones",
    name: "AirPods Pro 2",
    href: "https://amzn.to/3PKpdPC",
  },
];

const FILTERS: SimpleLinkItem[] = [
  {
    label: "Filters",
    name: "Urth 82mm UV, Circular Polarizing (CPL), ND8, ND1000 Lens Filter Kit",
    href: "https://amzn.to/3XHi7wY",
  },
  {
    label: "Step Down Adapter Ring Set",
    name: "Step Down Adapter Ring Set",
    href: "https://amzn.to/3D07TOP",
  },
  {
    label: "Drone Filters",
    name: "Drone Filters",
    href: "https://www.amazon.com.au/dp/B0CKRFH8MW?ref=ppx_yo2ov_dt_b_product_details&th=1",
  },
];

function LinkRow({ label, name, href }: SimpleLinkItem) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="group flex flex-col gap-1 border-t border-black/10 py-4 transition-opacity hover:opacity-60 first:border-t-0 sm:flex-row sm:items-baseline sm:justify-between"
    >
      <span className="font-eyebrow text-[11px] tracking-[2.5px] text-black/45">
        {label}
      </span>
      <span className="flex items-center gap-2 text-base">
        {name}
        <span aria-hidden="true" className="text-black/30">
          ↗
        </span>
      </span>
    </a>
  );
}

export default function MyGearPage() {
  return (
    <>
      {/* Full-bleed hero */}
      <section className="relative h-[60vh] w-full md:h-[80vh]">
        <Image
          src="/images/my-gear/hero-gear.jpg"
          alt="Eric Escapes camera gear laid out"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </section>

      {/* Intro copy */}
      <section className="w-full bg-white px-6 py-16 md:py-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-center">
          <span className="eyebrow text-black/60">My Gear</span>
          <p className="text-lg leading-relaxed text-black/80">
            On this page you find an up to date list of all the gear I use. I
            prefer to be very minimal. As I am always on the go, my gear
            reflects this. I have made many financial mistakes in buying the
            wrong gear for me, however if it wasn&rsquo;t for these mistakes I
            would not have been able to recognise the importance having kit
            that is highly specialised for me. It&rsquo;s easy to be swept
            away by the buzz of new gear and marketing that convince us we
            need the best but I have come to realise we should get the stuff
            that works for us. As I have an importance for a lightweight
            approach this also has the benefit of not getting in my way to
            enjoy my adventures and focus on creating photographs and videos
            I&rsquo;m proud of. I want to stress that gear is very personal
            and the best gear doesn&rsquo;t exists. It must work for your
            needs, which can be hard to find without trail and error.
          </p>
        </div>
      </section>

      {/* Every Day Carry — dark section, mirrors homepage gear treatment */}
      <section className="w-full border-t border-white/[0.12] bg-black px-6 py-20 md:py-28">
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          <span className="eyebrow text-center text-white/85">
            Every Day Carry
          </span>

          <div className="flex flex-col">
            <GearCard
              kicker="EDC Camera"
              name="Fujifilm X-T5"
              image="/images/my-gear/camera-xt5.jpg"
              href="https://amzn.to/4u2HNEg"
            />
            <GearCard
              kicker="Establishing Lens"
              name="Fujifilm 23mmF2.8 WRX"
              image="/images/my-gear/lens-23mm.jpg"
              href="https://amzn.to/3NEr9Xg"
            />
            <GearCard
              kicker="Detail Lens"
              name="Fujifilm XF50mmF2 R WR"
              image="/images/my-gear/lens-50mm.jpg"
              href="https://amzn.to/4clcQVu"
            />
          </div>
        </div>
      </section>

      {/* Drone intro copy */}
      <section className="w-full bg-white px-6 py-16 md:py-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-center">
          <span className="eyebrow text-black/60">Drone</span>
          <p className="text-lg leading-relaxed text-black/80">
            As I want to hike to unique locations, I want to pack light. Now
            we have such amazing technology that is able to fit into such a
            small package. The DJI mini 4 pro is a very high quality camera.
            It takes absolutely amazing photos and can capture stunning
            videos. When it comes to video, being able to shoot in LOG
            format. This is a high end video feature that is incredible on
            such a small drone.
          </p>
        </div>
      </section>

      {/* Portable Lightweight Drone — dark section */}
      <section className="w-full border-t border-white/[0.12] bg-black px-6 py-20 md:py-28">
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          <div className="flex flex-col">
            <GearCard
              kicker="Portable Lightweight Drone"
              name="DJI Mini 4 Pro"
              image="/images/my-gear/drone-mini4pro.jpg"
              href="https://amzn.to/3D13xHj"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="w-full bg-white px-6 py-16 md:py-24">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          <span className="eyebrow text-black/60">Filters</span>
          <div className="flex flex-col">
            {FILTERS.map((item) => (
              <LinkRow key={item.href + item.name} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Travel tech intro copy */}
      <section className="w-full bg-white px-6 py-16 md:py-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-center">
          <p className="text-lg leading-relaxed text-black/80">
            The items below are my main travel items. This setup helps me do
            editing on the go. Recently I have changed to traveling with a
            iPad Pro. The advancements in Apple Silicon has meant very
            powerful computing in a lightweight form factor. When traveling,
            having a tablet and not a full computer forces me to not get
            bogged down with larger projects. If I was doing longer travel I
            would go with a full computer system like a MacBook.
          </p>
        </div>
      </section>

      {/* Other Camera Gear + Travel Tech lists */}
      <section className="w-full bg-white px-6 pb-24 md:pb-32">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-[30px] font-normal text-black">
              Other Camera Gear
            </h2>
            <div className="flex flex-col">
              {OTHER_CAMERA_GEAR.map((item) => (
                <LinkRow key={item.href + item.name} {...item} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-[30px] font-normal text-black">
              Travel Tech
            </h2>
            <div className="flex flex-col">
              {TRAVEL_TECH.map((item) => (
                <LinkRow key={item.href + item.name} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
