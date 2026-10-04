/* =====================================================================
   ambient-loop.ts

   The one rAF loop behind the homepage ambient layer and the gallery
   render-in. Lifted out of archive-ambient.ts unchanged in behaviour:

   - one requestAnimationFrame for every graphic on the page;
   - t = virtual ms, advanced by dt capped at 100 ms, only while at least
     one graphic is visible and wants frames (an idle page runs no loop);
   - paused on visibilitychange (hidden tab = no frames);
   - IntersectionObserver-gated (rootMargin 40 px, thresholds 0 and 0.15);
   - resize re-measures after 150 ms;
   - the returned stop() cancels everything and disposes every graphic,
     which removes every node it added.

   Graphics never add transforms, never take pointer events and are
   aria-hidden; that contract lives with each graphic.
   ===================================================================== */

export interface Amb {
  el: Element;
  visible: boolean;
  dead: boolean;
  /** true while this graphic needs frames */
  wants: () => boolean;
  draw: (t: number) => void;
  measure?: () => void;
  onSeen?: (entry: IntersectionObserverEntry, t: number) => void;
  dispose: () => void;
  still?: number;
}

export function runAmbientLoop(list: Amb[]): () => void {
  let raf = 0,
    last = 0,
    t = 0,
    stopped = false;
  const byEl = new Map<Element, Amb[]>();
  for (const a of list) byEl.set(a.el, (byEl.get(a.el) || []).concat(a));
  const active = (a: Amb) => a.visible && !a.dead && a.wants();
  function frame(now: number) {
    raf = 0;
    const dt = last ? Math.min(now - last, 100) : 0;
    last = now;
    t += dt;
    for (const a of list) {
      if (active(a)) {
        try {
          a.draw(t);
        } catch {
          a.dead = true;
          try {
            a.dispose();
          } catch {
            /* ignore */
          }
        }
      }
    }
    schedule();
  }
  function schedule() {
    if (raf || stopped || document.hidden) return;
    if (list.some(active)) raf = requestAnimationFrame(frame);
    else last = 0;
  }
  const onVis = () => {
    if (document.hidden) {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    } else schedule();
  };
  document.addEventListener("visibilitychange", onVis);
  let io: IntersectionObserver | null = null;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          for (const a of byEl.get(e.target) || []) {
            a.visible = e.isIntersecting;
            if (a.onSeen) a.onSeen(e, t);
            if (a.visible && a.measure) a.measure();
          }
        }
        schedule();
      },
      { rootMargin: "40px 0px", threshold: [0, 0.15] },
    );
    byEl.forEach((_v, el) => io && io.observe(el));
  } else list.forEach((a) => (a.visible = true));
  let rz = 0;
  const onResize = () => {
    clearTimeout(rz);
    rz = window.setTimeout(() => {
      list.forEach((a) => {
        try {
          if (a.measure) a.measure();
        } catch {
          /* ignore */
        }
      });
      schedule();
    }, 150);
  };
  window.addEventListener("resize", onResize);
  schedule();
  return () => {
    stopped = true;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    clearTimeout(rz);
    document.removeEventListener("visibilitychange", onVis);
    window.removeEventListener("resize", onResize);
    if (io) io.disconnect();
    list.forEach((a) => {
      try {
        a.dispose();
      } catch {
        /* ignore */
      }
    });
  };
}
