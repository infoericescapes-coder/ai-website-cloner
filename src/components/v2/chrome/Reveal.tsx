"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Scroll reveal — eeReveal 0.75s cubic-bezier(.2,.7,.2,1) (motion.md §3).
 *
 * Primary path: CSS scroll-driven animation via `animation-timeline: view()`
 * (the `@supports` block in globals.css). Where that is unsupported
 * (Firefox/Safari as of the design date) we feature-detect and drive the same
 * fade+rise with an IntersectionObserver that adds `.is-revealed` once the
 * element enters the viewport. Non-supporting browsers never get stuck at
 * opacity:0.
 *
 * Reduced-motion: skip the animation, render at final state immediately
 * (add `.is-revealed` on mount, no fade).
 */
export default function Reveal({
  as,
  children,
  className = "",
  threshold = 0.15,
  style,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  threshold?: number;
  style?: React.CSSProperties;
}) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Native scroll-timeline path handles reveal in CSS; nothing to observe.
    const hasViewTimeline =
      typeof CSS !== "undefined" && CSS.supports("animation-timeline: view()");

    if (reduced || hasViewTimeline) {
      // Reduced motion: show at final state. View-timeline: CSS owns it, but
      // add the class so the fallback base rule (opacity:0) never traps it.
      // Defer off the effect body (react-hooks/set-state-in-effect).
      if (reduced) {
        const t = setTimeout(() => setRevealed(true), 0);
        return () => clearTimeout(t);
      }
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`ee-reveal ${revealed ? "is-revealed" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  );
}
