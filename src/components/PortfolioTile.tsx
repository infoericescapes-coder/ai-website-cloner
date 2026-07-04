"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type PortfolioTileProps = {
  src: string;
  alt: string;
  label: string;
  href: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export default function PortfolioTile({
  src,
  alt,
  label,
  href,
  sizes,
  className,
  priority,
}: PortfolioTileProps) {
  const [revealed, setRevealed] = useState(false);

  // Mirrors the live site's footer code-injection behaviour:
  // on mobile (<640px) the first tap reveals the label for ~3s and blocks
  // navigation; a second tap within the window follows the link. On desktop,
  // reveal is driven by :hover / :focus-within (CSS below) and clicks navigate.
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 640 && !revealed) {
      e.preventDefault();
      setRevealed(true);
      window.setTimeout(() => setRevealed(false), 3000);
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`group relative block overflow-hidden ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
      {/* Single overlay layer = grey wash + centered title (mirrors the site's ::after) */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-black/50 text-center font-sans font-semibold text-white transition-opacity duration-300 ease-out ${
          revealed ? "opacity-100" : "opacity-0"
        } sm:group-hover:opacity-100 sm:group-focus-within:opacity-100`}
        style={{ fontSize: "clamp(18px, 2.2vw, 28px)", letterSpacing: "0.02em" }}
      >
        {label}
      </span>
    </Link>
  );
}
