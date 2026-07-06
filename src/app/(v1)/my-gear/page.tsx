import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "My Gear — ERIC ESCAPES",
  description: "The camera gear, drone, filters and travel tech Eric uses.",
};

type SimpleLinkItem = {
  label: string;
  name: string;
  href: string;
};

type GearItem = {
  role: string;
  name: string;
  image: string;
  href: string;
};

const EVERY_DAY_CARRY: GearItem[] = [
  {
    role: "EDC Camera",
    name: "Fujifilm X-T5",
    image: "/images/home/camera-xt5.jpg",
    href: "https://amzn.to/4u2HNEg",
  },
  {
    role: "Establishing Lens",
    name: "Fujifilm 23mmF2.8 WRX",
    image: "/images/home/lens-23mm.jpg",
    href: "https://amzn.to/4sll44M",
  },
  {
    role: "Detail Lens",
    name: "Fujifilm XF50mmF2 R WR",
    image: "/images/home/lens-50f2.jpg",
    href: "https://amzn.to/4clcQVu",
  },
];

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
    label: "iPad Mini",
    name: "Apple iPad mini (A17 Pro)",
    href: "https://www.amazon.com.au/dp/B0DK416M98?tag=ericescapes-22&linkCode=sl1&language=en_AU",
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
    name: "AirPods Pro 3",
    href: "https://www.amazon.com.au/dp/B0FQDRMVFV?tag=ericescapes-22&linkCode=sl1&language=en_AU",
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-center font-sans text-[27.5px] font-bold text-black">
      {children}
    </h2>
  );
}

function IntroParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-left font-sans text-[20px] font-normal leading-[30px] text-black">
      {children}
    </p>
  );
}

function GearItemCard({ role, name, image, href }: GearItem) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="group flex flex-col items-center gap-4 transition-opacity hover:opacity-70"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          className="object-contain"
        />
      </div>
      <span className="text-center font-sans text-[27.5px] font-bold text-black">
        {role}
      </span>
      <span className="text-center font-sans text-[27.5px] font-normal text-black">
        {name}
      </span>
    </a>
  );
}

function LinkRow({ label, name, href }: SimpleLinkItem) {
  return (
    <p className="text-left font-sans text-[20px] font-normal leading-[30px] text-black">
      {label} —{" "}
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="underline transition-opacity hover:opacity-60"
      >
        {name}
      </a>
    </p>
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

      {/* Intro copy — four separate live paragraphs, left-aligned */}
      <section className="w-full bg-white px-6 py-16 md:py-24">
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          <IntroParagraph>
            On this page you find an up to date list of all the gear I use. I
            prefer to be very minimal. As I am always on the go, my gear
            reflects this.
          </IntroParagraph>
          <IntroParagraph>
            I have made many financial mistakes in buying the wrong gear for me,
            however if it wasn&rsquo;t for these mistakes I would not have been
            able to recognise the importance having kit that is highly
            specialised for me. It&rsquo;s easy to be swept away by the buzz of
            new gear and marketing that convince us we need the best but I have
            come to realise we should get the stuff that works for us.
          </IntroParagraph>
          <IntroParagraph>
            As I have an importance for a lightweight approach this also has the
            benefit of not getting in my way to enjoy my adventures and focus on
            creating photographs and videos I&rsquo;m proud of.
          </IntroParagraph>
          <IntroParagraph>
            I want to stress that gear is very personal and the best gear
            doesn&rsquo;t exists. It must work for your needs, which can be hard
            to find without trail and error.
          </IntroParagraph>
        </div>
      </section>

      {/* Every Day Carry — white, 3-column gear grid */}
      <section className="w-full bg-white px-6 pb-16 md:pb-24">
        <div className="mx-auto flex max-w-5xl flex-col gap-10">
          <SectionHeading>Every Day Carry</SectionHeading>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {EVERY_DAY_CARRY.map((item) => (
              <GearItemCard key={item.href + item.name} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Drone intro copy */}
      <section className="w-full bg-white px-6 py-16 md:py-24">
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          <SectionHeading>Drone</SectionHeading>
          <IntroParagraph>
            As I want to hike to unique locations, I want to pack light. Now we
            have such amazing technology that is able to fit into such a small
            package. The DJI mini 4 pro is a very high quality camera. It takes
            absolutely amazing photos and can capture stunning videos. When it
            comes to video, being able to shoot in LOG format. This is a high
            end video feature that is incredible on such a small drone.
          </IntroParagraph>
        </div>
      </section>

      {/* Portable Lightweight Drone — white, single gear item */}
      <section className="w-full bg-white px-6 pb-16 md:pb-24">
        <div className="mx-auto flex max-w-5xl flex-col gap-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="md:col-start-2">
              <GearItemCard
                role="Portable Lightweight Drone"
                name="DJI Mini 4 Pro"
                image="/images/my-gear/drone-mini4pro.jpg"
                href="https://amzn.to/47wxcoN"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="w-full bg-white px-6 py-16 md:py-24">
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          <SectionHeading>Filters</SectionHeading>
          <div className="flex flex-col gap-2">
            {FILTERS.map((item) => (
              <LinkRow key={item.href + item.name} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Travel tech intro copy */}
      <section className="w-full bg-white px-6 py-16 md:py-24">
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          <IntroParagraph>
            The items below are my main travel items. This setup helps me do
            editing on the go. Recently I have changed to traveling with a iPad
            Mini. When traveling, having a tablet and not a full computer helps
            me to not get bogged down with larger projects. If I was doing
            longer travel I would go with a full computer system like a{" "}
            <a
              href="https://www.amazon.com.au/dp/B0GR1Q4452?tag=ericescapes-22&linkCode=sl1&language=en_AU"
              target="_blank"
              rel="noopener"
              className="underline transition-opacity hover:opacity-60"
            >
              MacBook Air
            </a>
            .
          </IntroParagraph>
        </div>
      </section>

      {/* Other Camera Gear + Travel Tech lists */}
      <section className="w-full bg-white px-6 pb-24 md:pb-32">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading>Other Camera Gear</SectionHeading>
            <div className="flex flex-col gap-2">
              {OTHER_CAMERA_GEAR.map((item) => (
                <LinkRow key={item.href + item.name} {...item} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <SectionHeading>Travel Tech</SectionHeading>
            <div className="flex flex-col gap-2">
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
