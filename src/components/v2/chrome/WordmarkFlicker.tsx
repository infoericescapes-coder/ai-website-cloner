"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { designConfig } from "@/lib/design-config";

/**
 * Wordmark flicker (motion.md §2) + optional ambient glitch (§8).
 *
 * Flicker: eeFlicker 0.9s, FIRST LOAD ONLY per session. Gate on
 * sessionStorage('ee-flicker-done') AND matchMedia reduced-motion. Never
 * repeats within a session.
 *
 * Ambient glitch: eeGlitch fired randomly every 12–38s (~700ms), skipped
 * entirely under reduced-motion. Ships OFF via designConfig.ambientGlitch;
 * enable later. Wraps the wordmark lockup as its animation host.
 */
export default function WordmarkFlicker({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // once-per-session flicker. Defer the state kick off the effect body (out
    // of the synchronous phase) to satisfy react-hooks/set-state-in-effect.
    if (!reduced && !sessionStorage.getItem("ee-flicker-done")) {
      sessionStorage.setItem("ee-flicker-done", "1");
      const start = setTimeout(() => setFlicker(true), 0);
      const stop = setTimeout(() => setFlicker(false), 1500);
      return () => {
        clearTimeout(start);
        clearTimeout(stop);
      };
    }
  }, []);

  useEffect(() => {
    if (!designConfig.ambientGlitch) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = 12000 + Math.random() * 26000;
      timer = setTimeout(() => {
        const el = ref.current;
        if (el) {
          el.style.animation = "eeGlitch 0.55s linear 1";
          setTimeout(() => {
            if (el) el.style.animation = "";
          }, 700);
        }
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(timer);
  }, []);

  return (
    <span
      ref={ref}
      style={flicker ? { animation: "eeFlicker 0.9s linear 0.25s 1 both" } : undefined}
    >
      {children}
    </span>
  );
}
