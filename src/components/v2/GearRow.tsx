import Image from "next/image";

/**
 * Compact gear row — v2 skin of the retired v1 GearCard. Small clean thumbnail
 * (no mount box, no border on the photo), mono kicker + name, arrow. Used in
 * the "Currently Shooting With" blocks on /free-1 and /special. Hrefs are
 * passed in verbatim by the caller (affiliate links are content-locked).
 */
export type GearRowProps = {
  kicker: string;
  name: string;
  image: string;
  href: string;
};

export default function GearRow({ kicker, name, image, href }: GearRowProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="group flex items-center"
      style={{
        gap: 16,
        padding: "16px 0",
        borderTop: "1px solid var(--ee-hairline)",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 64,
          height: 64,
          flexShrink: 0,
          overflow: "hidden",
          background: "#0B0D0B",
        }}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="64px"
          style={{ objectFit: "contain", padding: 6 }}
        />
      </div>
      <div className="flex flex-1 flex-col" style={{ gap: 5 }}>
        <span
          style={{
            fontSize: 10.5,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--ee-muted)",
          }}
        >
          {kicker}
        </span>
        <span
          className="transition-opacity duration-[120ms] group-hover:opacity-70"
          style={{
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.01em",
            color: "var(--ee-text)",
          }}
        >
          {name}
        </span>
      </div>
      <span aria-hidden style={{ flexShrink: 0, color: "var(--ee-accent)" }}>
        ↗
      </span>
    </a>
  );
}
