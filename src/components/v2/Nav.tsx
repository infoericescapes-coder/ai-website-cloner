"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import WordmarkFlicker from "./chrome/WordmarkFlicker";

/**
 * design-v2 Nav — sticky, 60px, z-40, semi-transparent black + backdrop-blur
 * (shell.md §3). Registry-plate lockup left, 4 links right with active green
 * underline. Mobile: gutter 20px, links gap 14px, wordmark sub hidden, links
 * collapse behind a toggle on the narrowest widths.
 *
 * Active grouping (shell.md §3): gallery/home -> Home, /blog-1/* -> Visual
 * Diaries, /store + /chaostocalm -> Shop.
 */
const LINKS = [
  { label: "Home", href: "/" },
  { label: "Visual Diaries", href: "/blog-1" },
  { label: "Shop", href: "/store" },
  { label: "About", href: "/about" },
] as const;

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/blog-1") return pathname === "/blog-1" || pathname.startsWith("/blog-1/");
  if (href === "/store")
    return pathname.startsWith("/store") || pathname.startsWith("/chaostocalm");
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Nav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "rgba(5,6,5,0.92)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--ee-hairline)",
      }}
    >
      <div className="flex items-center justify-between px-5 md:px-10" style={{ height: 60 }}>
        {/* Left — registry-plate lockup */}
        <Link
          href="/"
          className="group flex items-center"
          style={{ gap: 11 }}
          aria-label="Eric Escapes — home"
        >
          <WordmarkFlicker>
            <span className="flex items-center" style={{ gap: 11 }}>
              <svg
                width={21}
                height={21}
                viewBox="0 0 48 48"
                fill="none"
                className="[&_path]:stroke-ee-text group-hover:[&_path]:stroke-ee-accent"
                style={{ display: "block" }}
                aria-hidden
              >
                <path
                  d="M14 4 H4 V14 M34 4 H44 V14 M44 34 V44 H34 M14 44 H4 V34"
                  strokeWidth={1.5}
                />
                <path d="M21 16 H13 V32 H21 M13 24 H19" strokeWidth={1.5} />
                <path d="M27 16 H35 V32 H27 M35 24 H29" strokeWidth={1.5} />
              </svg>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.24em",
                  color: "var(--ee-text)",
                  userSelect: "none",
                }}
              >
                ERIC ESCAPES
              </span>
              {/* divider — hidden on mobile */}
              <span
                className="hidden md:block"
                style={{
                  width: 1,
                  height: 14,
                  background: "rgba(242,239,230,0.22)",
                  margin: "0 3px",
                }}
                aria-hidden
              />
              {/* sub-line — hidden on mobile */}
              <span
                className="hidden md:inline"
                style={{
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: "0.28em",
                  color: "var(--ee-muted)",
                  userSelect: "none",
                }}
              >
                VISUAL ARCHIVE
              </span>
            </span>
          </WordmarkFlicker>
        </Link>

        {/* Right — desktop links */}
        <div className="hidden sm:flex items-center" style={{ gap: 36 }}>
          {LINKS.map((l) => {
            const active = isActive(l.href, pathname);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className="ee-navlink"
                style={{
                  fontSize: 11.5,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: active ? "var(--ee-text)" : "var(--ee-muted)",
                  padding: "5px 0 6px",
                  borderBottom: `1px solid ${active ? "var(--ee-accent)" : "transparent"}`,
                  transition: "color 120ms ease, border-color 120ms ease",
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="sm:hidden flex flex-col justify-center"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          style={{ gap: 4, width: 24, height: 24 }}
        >
          <span style={{ height: 1, background: "var(--ee-text)", width: 18 }} />
          <span style={{ height: 1, background: "var(--ee-text)", width: 18 }} />
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div
          className="sm:hidden flex flex-col px-5 pb-4"
          style={{ gap: 4, borderTop: "1px solid var(--ee-hairline)" }}
        >
          {LINKS.map((l) => {
            const active = isActive(l.href, pathname);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                style={{
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: active ? "var(--ee-text)" : "var(--ee-muted)",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--ee-hairline)",
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
