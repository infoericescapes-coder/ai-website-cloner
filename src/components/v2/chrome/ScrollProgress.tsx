"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll progress bar — fixed top, 2px, z-45 (shell.md §2, motion.md §11).
 * Track rgba(242,239,230,0.05); fill accent gradient + glow. Width =
 * scrollY / (scrollHeight - innerHeight). Passive scroll listener, not a
 * time-driven animation, so it's fine to keep under reduced-motion.
 */
export default function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
      fill.style.width = `${pct}%`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 45,
        pointerEvents: "none",
        background: "rgba(242,239,230,0.05)",
      }}
    >
      <div
        ref={fillRef}
        style={{
          height: "100%",
          width: "0%",
          background: "linear-gradient(90deg, #1F7A2E, var(--ee-accent, #6BFF4A))",
          boxShadow: "0 0 10px rgba(var(--ee-accent-rgb, 107,255,74), 0.45)",
        }}
      />
    </div>
  );
}
