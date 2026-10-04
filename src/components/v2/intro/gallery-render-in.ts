/* =====================================================================
   gallery-render-in.ts

   The homepage tile render-in (render-in.ts), taken to the gallery
   masonry (GalleryV2: every place gallery, e.g. /sydney2, /japan,
   /hongkong). Each frame that was below the fold renders in once, the
   first time it is scrolled into view, then the canvas is removed.

   Gallery-specific choices (the rest is the shared contract):
     - host = the frame's image wrapper (span, position:relative), so the
       canvas covers the photo only, never the caption row or any mount;
     - skipUndecoded: frames are next/image loading="lazy", and a fast
       flick reaches frames the browser has not fetched yet. Those are
       released and simply load as photos, never rendered from a blank;
     - presample: the colour grid is built off the main thread when each
       photo loads, so no decode lands in a scroll frame;
     - staggerPrepare + maxLive 10: a masonry row arrives together, so the
       colour sampling is spread one photo per frame; drawing ten at once
       costs a few ms a frame;
     - started two frames after mount, once Next has restored or reset the
       scroll position, so "on screen at start" means what the visitor sees.
   Reduced motion: nothing is created.
   ===================================================================== */

import { runAmbientLoop } from "./ambient-loop";
import { reducedMotion } from "./motion-math";
import { renderIns, warmRenderIn, type RenderInTarget } from "./render-in";

const PANEL = "#0B0D0B"; // --ee-panel, the homepage tiles' panel

/** Starts the render-in for every `.ee-frame` photo under `root`; returns stop(). */
export function startGalleryRenderIn(root: Element): () => void {
  if (reducedMotion()) return () => {};
  let stop: (() => void) | null = null;
  let r1 = 0;
  let r2 = 0;
  r1 = requestAnimationFrame(() => {
    r2 = requestAnimationFrame(() => {
      const targets: RenderInTarget[] = [];
      root.querySelectorAll(".ee-frame").forEach((frame, index) => {
        const img = frame.querySelector("img");
        const host = img ? img.parentElement : null;
        if (img && host) targets.push({ host, img, index });
      });
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (ric) ric(warmRenderIn, { timeout: 1000 });
      else setTimeout(warmRenderIn, 200);
      try {
        stop = runAmbientLoop(
          renderIns(targets, {
            seed: 2026,
            panel: (host) => {
              const bg = getComputedStyle(host.closest(".ee-frame") || host).backgroundColor;
              return bg && bg !== "transparent" && !/rgba\(.*,\s*0\)$/.test(bg) ? bg : PANEL;
            },
            skipUndecoded: true,
            staggerPrepare: true,
            presample: true,
            maxLive: 10,
          }),
        );
      } catch {
        stop = null;
      }
    });
  });
  return () => {
    cancelAnimationFrame(r1);
    cancelAnimationFrame(r2);
    if (stop) stop();
  };
}
