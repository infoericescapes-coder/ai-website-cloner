"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Link as LinkIcon } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog-1" },
  { label: "Shop", href: "/chaostocalm" },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 w-full bg-black">
      <div className="mx-auto flex h-[100px] max-w-[1400px] items-center justify-between px-6 md:h-[174px] md:px-10">
        <Link href="/" className="shrink-0" aria-label="Eric Escapes home">
          <Image
            src="/brand/logo-white.png"
            alt="Eric Escapes"
            width={608}
            height={150}
            className="h-9 w-auto md:h-11"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-nav text-[20px] font-normal text-white transition-opacity hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-5 pl-2">
            <a
              href="https://www.instagram.com/ericescapes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Eric Escapes on Instagram"
              className="text-white transition-opacity hover:opacity-70"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href="https://ericescapes.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Eric Escapes on Substack"
              className="text-white transition-opacity hover:opacity-70"
            >
              <LinkIcon className="size-5" />
            </a>
          </div>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="text-white md:hidden"
        >
          {open ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/10 bg-[rgba(0,0,0,0.92)] px-6 py-6 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-nav py-3 text-[20px] font-normal text-white"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-6 pt-4">
            <a
              href="https://www.instagram.com/ericescapes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Eric Escapes on Instagram"
              className="text-white"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href="https://ericescapes.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Eric Escapes on Substack"
              className="text-white"
            >
              <LinkIcon className="size-5" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
