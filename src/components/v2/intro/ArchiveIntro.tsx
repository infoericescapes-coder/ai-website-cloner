"use client";

import { useEffect } from "react";
import { whenIntroDone } from "./archive-intro-engine";
import { startAmbient } from "./archive-ambient";

/**
 * Homepage-only mount for the archive intro + ambient layer. Renders
 * nothing. The intro runs once per document load (the pre-paint gate in
 * IntroGate decides, before hydration, whether it plays); this component
 * only asks for it and starts the ambient layer when it is over. A client
 * navigation back to "/" skips straight to the ambient layer, and leaving
 * the page disposes it (every node it added is removed).
 */
export default function ArchiveIntro() {
  useEffect(() => {
    let alive = true;
    let stop: (() => void) | null = null;
    whenIntroDone(() => {
      if (alive) stop = startAmbient();
    });
    return () => {
      alive = false;
      if (stop) stop();
    };
  }, []);
  return null;
}
