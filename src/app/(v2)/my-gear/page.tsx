import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/v2/chrome/Reveal";

/**
 * My Gear (`/my-gear`) — migrated into the (v2) dark shell.
 *
 * CONTENT LOCK: every affiliate href below is carried over VERBATIM from the
 * previous (v1) page (product-audited, 33 links). Do not re-derive any URL.
 * Copy (intro paragraphs, drone note, section names, item labels/names) is the
 * exact live copy. Only the presentation is re-skinned to the v2 language:
 * mono kickers, hairline dividers, Space Grotesk display, clean images at
 * text-column width (no mount boxes, no hairline borders on photos).
 */
export const metadata: Metadata = {
  title: "My Gear — ERIC ESCAPES",
  description: "The camera gear, drone, filters and travel tech Eric uses.",
};

const MUTED = "#8B8F86";
const TEXT = "#F2EFE6";

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

const DRONE: GearItem = {
  role: "Portable Lightweight Drone",
  name: "DJI Mini 4 Pro",
  image: "/images/my-gear/drone-mini4pro.jpg",
  href: "https://amzn.to/47wxcoN",
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

const kickerStyle = {
  fontSize: 11.5,
  letterSpacing: "0.16em",
  textTransform: "uppercase" as const,
  color: MUTED,
};

/** Section header — mono kicker over a hairline divider. */
function SectionHead({ kicker, index }: { kicker: string; index: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
        paddingBottom: 16,
        borderBottom: "1px solid var(--ee-hairline-strong)",
        ...kickerStyle,
      }}
    >
      <span>{kicker}</span>
      <span style={{ fontSize: 10.5 }}>{index}</span>
    </div>
  );
}

/** Hero-role gear card — clean image at column width, mono role line. */
function GearFeature({ role, name, image, href }: GearItem) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="group block"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          overflow: "hidden",
          background: "#0B0D0B",
        }}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 768px) 260px, 100vw"
          className="transition-transform duration-[600ms] ease-linear group-hover:scale-[1.02]"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div style={{ marginTop: 18, ...kickerStyle }}>{role}</div>
      <div
        style={{
          marginTop: 8,
          fontSize: 17,
          fontWeight: 500,
          letterSpacing: "-0.005em",
          color: TEXT,
        }}
        className="transition-opacity duration-[120ms] group-hover:opacity-70"
      >
        {name} <span style={{ color: "var(--ee-accent)" }}>↗</span>
      </div>
    </a>
  );
}

/** Text link row — label + linked product name on a hairline. */
function LinkRow({ label, name, href }: SimpleLinkItem) {
  return (
    <div
      style={{
        padding: "18px 0",
        borderBottom: "1px solid var(--ee-hairline)",
        fontSize: 15,
        lineHeight: 1.6,
        color: MUTED,
      }}
    >
      {label} —{" "}
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="transition-[filter] duration-[120ms] hover:brightness-150"
        style={{ color: "var(--ee-accent)", textDecoration: "none" }}
      >
        {name} ↗
      </a>
    </div>
  );
}

export default function MyGearPage() {
  return (
    <div
      className="ee-gutter"
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 860,
        margin: "0 auto",
        paddingTop: 76,
        paddingBottom: 130,
      }}
    >
      {/* ── 1. Header ───────────────────────────────────────────────────── */}
      <Reveal>
        <span style={kickerStyle}>Kit · minimal &amp; always on the go</span>
        <h1
          className="text-[34px] md:text-[56px]"
          style={{
            margin: "20px 0 0",
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}
        >
          My Gear
        </h1>
      </Reveal>

      {/* ── 2. Hero photo ───────────────────────────────────────────────── */}
      <Reveal style={{ marginTop: 48 }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            overflow: "hidden",
          }}
        >
          <Image
            src="/images/my-gear/hero-gear.jpg"
            alt="Eric Escapes camera gear laid out"
            fill
            priority
            sizes="860px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </Reveal>

      {/* ── 3. Intro copy ───────────────────────────────────────────────── */}
      <Reveal style={{ marginTop: 56, maxWidth: "62ch" }}>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: TEXT }}>
          On this page you find an up to date list of all the gear I use. I
          prefer to be very minimal. As I am always on the go, my gear reflects
          this.
        </p>
        <p style={{ margin: "22px 0 0", fontSize: 17, lineHeight: 1.7, color: TEXT }}>
          I have made many financial mistakes in buying the wrong gear for me,
          however if it wasn&rsquo;t for these mistakes I would not have been
          able to recognise the importance having kit that is highly specialised
          for me. It&rsquo;s easy to be swept away by the buzz of new gear and
          marketing that convince us we need the best but I have come to realise
          we should get the stuff that works for us.
        </p>
        <p style={{ margin: "22px 0 0", fontSize: 17, lineHeight: 1.7, color: TEXT }}>
          As I have an importance for a lightweight approach this also has the
          benefit of not getting in my way to enjoy my adventures and focus on
          creating photographs and videos I&rsquo;m proud of.
        </p>
        <p style={{ margin: "22px 0 0", fontSize: 17, lineHeight: 1.7, color: TEXT }}>
          I want to stress that gear is very personal and the best gear
          doesn&rsquo;t exists. It must work for your needs, which can be hard to
          find without trail and error.
        </p>
      </Reveal>

      {/* ── 4. Every Day Carry ──────────────────────────────────────────── */}
      <Reveal style={{ marginTop: 72 }}>
        <SectionHead kicker="Every Day Carry" index="01" />
        <div className="mt-[34px] grid grid-cols-1 gap-[40px] sm:grid-cols-3">
          {EVERY_DAY_CARRY.map((item) => (
            <GearFeature key={item.href + item.name} {...item} />
          ))}
        </div>
      </Reveal>

      {/* ── 5. Drone ────────────────────────────────────────────────────── */}
      <Reveal style={{ marginTop: 72 }}>
        <SectionHead kicker="Drone" index="02" />
        <div className="mt-[34px] grid grid-cols-1 items-start gap-[44px] sm:grid-cols-[0.9fr_1.1fr]">
          <GearFeature {...DRONE} />
          <p style={{ fontSize: 17, lineHeight: 1.7, color: TEXT, maxWidth: "52ch" }}>
            As I want to hike to unique locations, I want to pack light. Now we
            have such amazing technology that is able to fit into such a small
            package. The DJI mini 4 pro is a very high quality camera. It takes
            absolutely amazing photos and can capture stunning videos. When it
            comes to video, being able to shoot in LOG format. This is a high
            end video feature that is incredible on such a small drone.
          </p>
        </div>
      </Reveal>

      {/* ── 6. Filters ──────────────────────────────────────────────────── */}
      <Reveal style={{ marginTop: 72 }}>
        <SectionHead kicker="Filters" index="03" />
        <div style={{ marginTop: 18 }}>
          {FILTERS.map((item) => (
            <LinkRow key={item.href + item.name} {...item} />
          ))}
        </div>
      </Reveal>

      {/* ── 7. Travel tech intro ────────────────────────────────────────── */}
      <Reveal style={{ marginTop: 56, maxWidth: "62ch" }}>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: TEXT }}>
          The items below are my main travel items. This setup helps me do
          editing on the go. Recently I have changed to traveling with a iPad
          Mini. When traveling, having a tablet and not a full computer helps me
          to not get bogged down with larger projects. If I was doing longer
          travel I would go with a full computer system like a{" "}
          <a
            href="https://www.amazon.com.au/dp/B0GR1Q4452?tag=ericescapes-22&linkCode=sl1&language=en_AU"
            target="_blank"
            rel="noopener"
            className="transition-[filter] duration-[120ms] hover:brightness-150"
            style={{ color: "var(--ee-accent)", textDecoration: "none" }}
          >
            MacBook Air
          </a>
          .
        </p>
      </Reveal>

      {/* ── 8. Other Camera Gear + Travel Tech lists ────────────────────── */}
      <Reveal style={{ marginTop: 56 }}>
        <div className="grid grid-cols-1 gap-[56px] md:grid-cols-2 md:gap-[64px]">
          <div>
            <SectionHead kicker="Other Camera Gear" index="04" />
            <div style={{ marginTop: 18 }}>
              {OTHER_CAMERA_GEAR.map((item) => (
                <LinkRow key={item.href + item.name} {...item} />
              ))}
            </div>
          </div>
          <div>
            <SectionHead kicker="Travel Tech" index="05" />
            <div style={{ marginTop: 18 }}>
              {TRAVEL_TECH.map((item) => (
                <LinkRow key={item.href + item.name} {...item} />
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── 9. Back to the archive ──────────────────────────────────────── */}
      <Reveal style={{ marginTop: 72 }}>
        <Link
          href="/"
          className="ee-social"
          style={{
            ...kickerStyle,
            color: MUTED,
            textDecoration: "none",
            transition: "color 120ms ease",
          }}
        >
          ← Back to the archive
        </Link>
      </Reveal>
    </div>
  );
}
