/* =====================================================================
   render-in.ts

   The photo render-in, shared by the homepage place tiles (archive-ambient
   A3) and the gallery masonry frames (gallery-render-in.ts). One
   implementation: the homepage passes its tiles, the galleries pass their
   frames, both run on the one loop in ambient-loop.ts.

   WHAT IT DOES
     A photo that was below the fold renders in ONCE, the first time it is
     scrolled into view: archive-code characters in the photo's true colours
     (one sampled pixel per cell) condense to blocks, then clear top to
     bottom behind a faint front line to the real <img>, which is always
     there underneath. The canvas is removed when it finishes. JS off: the
     photo is just the photo.

   CONTRACT
     - IntersectionObserver-gated; once per photo per page view; photos on
       screen when it starts are never touched.
     - Added canvas: aria-hidden, pointer-events:none, no transform (a kept
       transform breaks the lightbox's position:fixed).
     - Before it starts the canvas is a 1x1 backing store with a CSS panel
       background, so a 69-frame gallery holds no full-size canvases until
       a photo actually renders.
     - Never leaves a photo covered:
         * failsafe: removed if not started 1.5 s after first being seen;
         * a photo that scrolls out of view mid-render is released at once
           (rootMargin 40 px, so the release is never on screen);
         * at most maxLive render at once; a photo that arms while the
           slots are full is released, never queued behind a panel;
         * skipUndecoded (galleries): a photo whose <img> has not loaded
           and decoded when it is seen is released, never rendered from a
           blank or a placeholder.
     - True colours only; the faint accent glyphs on the unrendered panel
       and the front line are the homepage's approved vocabulary.
     - Cost: drawing is cheap (about 1-2 ms a frame for six photos at
       1280). The expensive step was prepare()'s colour sampling: a
       synchronous decode of the photo inside drawImage (4-19 ms each,
       measured) plus a GPU readback. Galleries turn on presample (the grid
       is built off the main thread when the photo loads) and
       staggerPrepare (one prepare per ~12 ms of wall time, so a masonry
       row arriving together starts a frame apart).
     - Reduced motion: callers never create these.
   ===================================================================== */

import type { Amb } from "./ambient-loop";
import { eInOut, fitRect, hash } from "./motion-math";

const ACCENT = "95,181,60"; // --ee-accent-rgb
// Archive-code characters for the render-in (the same vocabulary as the
// intro flood; no film glyphs).
const CODE_GLYPHS = "archive.develop(frame)=>{}[];01<>/:+=#fxlens";
const SWEEP = 600,
  A1 = 130,
  A2 = 290,
  FAILSAFE = 1500;
/** default concurrent render-ins per page (the homepage never has more than 5) */
const MAX_LIVE = 6;
/** wall-clock gap between two prepares when staggerPrepare is on */
const PREP_GAP_MS = 12;

export interface RenderInTarget {
  /** positioned box the canvas covers (homepage: the tile; gallery: the image wrapper) */
  host: Element;
  img: HTMLImageElement;
  /** stable per-photo index, seeds the glyph choice */
  index: number;
}

export interface RenderInOptions {
  seed: number;
  /** panel colour under the code, per target */
  panel: (host: Element) => string;
  /** release a photo that is not loaded and decoded when seen (galleries) */
  skipUndecoded?: boolean;
  /** one prepare (GPU readback) per PREP_GAP_MS of wall time (galleries) */
  staggerPrepare?: boolean;
  /**
   * build the cell-colour grid at load with createImageBitmap (decoded and
   * resized off the main thread), so prepare() never decodes the photo on
   * the main thread mid-scroll (galleries; the homepage keeps its original
   * two-step canvas sampling, frame for frame)
   */
  presample?: boolean;
  /** concurrent render-ins (default MAX_LIVE) */
  maxLive?: number;
}

function ctx2d(c: HTMLCanvasElement, read = false): CanvasRenderingContext2D {
  const g = c.getContext("2d", read ? { willReadFrequently: true } : undefined);
  if (!g) throw new Error("no 2d context");
  return g;
}

/**
 * Pays the two one-off costs of a page's first render-in ahead of time:
 * the first willReadFrequently readback (~27 ms measured) and the first
 * fillText in the code font (~8 ms). Galleries call it from idle time
 * after mount, so neither lands in a scroll frame.
 */
export function warmRenderIn(): void {
  try {
    const m = document.createElement("canvas");
    m.width = 2;
    m.height = 2;
    const a = ctx2d(m, true);
    a.font = "500 11px ui-monospace, SFMono-Regular, Menlo, monospace";
    a.fillText("a", 1, 1);
    a.getImageData(0, 0, 2, 2);
  } catch {
    /* nothing to warm */
  }
}

export function renderIns(targets: RenderInTarget[], opts: RenderInOptions): Amb[] {
  const out: Amb[] = [];
  const vh = window.innerHeight;
  const seed = opts.seed;
  let live = 0; // render-ins drawing right now, across this page
  let lastPrep = -Infinity; // performance.now() of the last prepare (staggerPrepare)
  const maxLive = opts.maxLive || MAX_LIVE;
  for (const { host, img, index: ti } of targets) {
    const r0 = host.getBoundingClientRect();
    if (r0.top < vh && r0.bottom > 0) continue; // on screen now: already seen (on the homepage, rendered by the intro)
    const panel = opts.panel(host);
    const cv = document.createElement("canvas");
    cv.setAttribute("aria-hidden", "true");
    cv.width = 1;
    cv.height = 1;
    cv.style.cssText = `position:absolute;top:0;left:0;width:100%;height:100%;display:block;pointer-events:none;background:${panel}`;
    img.insertAdjacentElement("afterend", cv); // above the photo, below any gradient, name, link or hover fx
    let W = 0,
      H = 0,
      dpr = 1,
      CS = 10,
      NCc = 1,
      NRr = 1,
      cols: string[] = [],
      start = -1,
      armedAt = -1,
      seenAt = -1,
      dead = false,
      decoded = false;
    let ctx: CanvasRenderingContext2D | null = null;
    // presample: the cell grid as a tiny ImageBitmap, keyed to the grid size
    let bm: ImageBitmap | null = null,
      bmKey = "",
      bmFailed = false;
    const remove = () => {
      if (!dead && start >= 0) live--;
      dead = true;
      if (cv.parentNode) cv.parentNode.removeChild(cv);
      if (bm) bm.close();
      bm = null;
    };
    const grid = () => {
      const r = host.getBoundingClientRect();
      const w = Math.max(1, Math.round(r.width)),
        h = Math.max(1, Math.round(r.height)),
        cs = w < 300 ? 10 : 12;
      return { w, h, cs, nc: Math.ceil(w / cs), nr: Math.ceil(h / cs) };
    };
    const presample = () => {
      try {
        const { nc, nr } = grid();
        const ics = getComputedStyle(img),
          nw = img.naturalWidth,
          nh = img.naturalHeight;
        // the source rect that lands on the nc x nr box under object-fit/position
        const f = fitRect(nw, nh, { left: 0, top: 0, width: nc, height: nr }, ics.objectFit, ics.objectPosition);
        const sx = Math.round((-f[0] * nw) / f[2]),
          sy = Math.round((-f[1] * nh) / f[3]),
          sw = Math.max(1, Math.round((nc * nw) / f[2])),
          sh = Math.max(1, Math.round((nr * nh) / f[3]));
        createImageBitmap(img, sx, sy, sw, sh, { resizeWidth: nc, resizeHeight: nr, resizeQuality: "high" }).then(
          (b) => {
            if (dead) b.close();
            else {
              bm = b;
              bmKey = nc + "x" + nr;
            }
          },
          () => (bmFailed = true),
        );
      } catch {
        bmFailed = true;
      }
    };
    // Decode off the main thread before the first sample, so prepare()'s
    // drawImage never forces a synchronous decode mid-scroll.
    const decode = () => {
      const done = () => {
        decoded = true;
        if (!opts.presample) return;
        // createImageBitmap still costs ~3 ms of main thread per photo: idle time only
        const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
        if (ric) ric(() => !dead && presample(), { timeout: 400 });
        else setTimeout(() => !dead && presample(), 0);
      };
      if (img.decode) img.decode().then(done, remove);
      else done();
    };
    if (img.complete && img.naturalWidth) decode();
    else img.addEventListener("load", decode, { once: true });
    img.addEventListener("error", remove, { once: true });
    const cover = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      if (!ctx) ctx = ctx2d(cv);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = panel;
      ctx.fillRect(0, 0, W, H);
      cv.style.background = "none"; // the backing store paints the panel from here on
    };
    // Cell colours: the photo's own pixels, one per cell (same-origin /_next/image).
    const prepare = (): boolean => {
      cover();
      CS = W < 300 ? 10 : 12;
      NCc = Math.ceil(W / CS);
      NRr = Math.ceil(H / CS);
      if (bm && bmKey === NCc + "x" + NRr) {
        try {
          const m = document.createElement("canvas");
          m.width = NCc;
          m.height = NRr;
          const a = ctx2d(m, true);
          a.drawImage(bm, 0, 0);
          const d = a.getImageData(0, 0, NCc, NRr).data;
          cols = [];
          for (let i = 0; i < NCc * NRr; i++) cols.push(`rgb(${d[i * 4]},${d[i * 4 + 1]},${d[i * 4 + 2]})`);
          bm.close();
          bm = null;
          return true;
        } catch {
          /* fall through to the canvas path */
        }
      }
      try {
        const ics = getComputedStyle(img);
        const f = fitRect(img.naturalWidth, img.naturalHeight, { left: 0, top: 0, width: NCc * 4, height: NRr * 4 }, ics.objectFit, ics.objectPosition);
        const m1 = document.createElement("canvas");
        m1.width = NCc * 4;
        m1.height = NRr * 4;
        const a1 = ctx2d(m1);
        a1.imageSmoothingQuality = "high";
        a1.drawImage(img, f[0], f[1], f[2], f[3]);
        const m2 = document.createElement("canvas");
        m2.width = NCc;
        m2.height = NRr;
        const a2 = ctx2d(m2, true);
        a2.imageSmoothingQuality = "high";
        a2.drawImage(m1, 0, 0, NCc, NRr);
        const d = a2.getImageData(0, 0, NCc, NRr).data;
        cols = [];
        for (let i = 0; i < NCc * NRr; i++) cols.push(`rgb(${d[i * 4]},${d[i * 4 + 1]},${d[i * 4 + 2]})`);
        return true;
      } catch {
        return false;
      }
    };
    const ready = () =>
      !!(img.complete && img.naturalWidth) &&
      (!opts.skipUndecoded || decoded) &&
      (!opts.presample || !!bm || bmFailed);
    const tryStart = (t: number) => {
      if (start >= 0 || dead || armedAt < 0) return;
      if (!ready()) return;
      if (live >= maxLive) {
        remove(); // slots full: show the photo, never a waiting panel
        return;
      }
      if (opts.staggerPrepare) {
        const now = performance.now();
        if (now - lastPrep < PREP_GAP_MS) return; // next frame (the failsafe still runs)
        lastPrep = now;
      }
      if (prepare()) {
        start = t;
        live++;
      } else remove();
    };
    const draw = (t: number) => {
      if (dead) return;
      if (start < 0) {
        tryStart(t);
        if (start < 0) {
          if (!dead && seenAt >= 0 && t - seenAt > FAILSAFE) remove(); // failsafe: never leave a photo covered
          return;
        }
      }
      const g = ctx;
      if (!g) return;
      const u = t - start,
        v = H / SWEEP;
      if (u > SWEEP + A2 + 60) {
        remove();
        return;
      }
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.font = `500 ${Math.round(CS * 0.95)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      g.textAlign = "center";
      g.textBaseline = "middle";
      const front = eInOut(u / SWEEP) * (H + CS);
      for (let r = 0; r < NRr; r++) {
        const y = r * CS,
          age = ((front - (y + CS / 2)) / v) | 0;
        if (age >= A2) {
          g.clearRect(0, y, W, CS); // rendered: the real photo shows through
          continue;
        }
        g.fillStyle = panel;
        g.fillRect(0, y, W, CS);
        for (let c = 0; c < NCc; c++) {
          const x = c * CS,
            col = cols[r * NCc + c];
          if (age >= A1) {
            g.globalAlpha = 1;
            g.fillStyle = col;
            g.fillRect(x, y, CS, CS);
          } else if (age >= 0) {
            g.globalAlpha = 1;
            g.fillStyle = col;
            g.fillText(CODE_GLYPHS.charAt(Math.floor(hash(c * 31 + r + ti * 997, ((t / 90) | 0) + seed) * CODE_GLYPHS.length)), x + CS / 2, y + CS / 2);
          } else if (hash(c * 17 + ti, r * 13 + seed) > 0.8) {
            g.globalAlpha = 0.22;
            g.fillStyle = `rgb(${ACCENT})`;
            g.fillText(CODE_GLYPHS.charAt(Math.floor(hash(c + ti * 7, r + ((t / 140) | 0)) * CODE_GLYPHS.length)), x + CS / 2, y + CS / 2);
          }
        }
        g.globalAlpha = 1;
      }
      // The render front: a faint scan line, calmer than the intro's.
      if (front < H) {
        g.fillStyle = `rgba(${ACCENT},0.07)`;
        g.fillRect(0, front - 4, W, 8);
        g.fillStyle = `rgba(${ACCENT},0.5)`;
        g.fillRect(0, front - 0.5, W, 1);
      }
    };
    const amb: Amb = {
      el: host,
      visible: false,
      dead: false,
      wants: () => !dead && seenAt >= 0,
      draw,
      onSeen: (e, t) => {
        if (dead) return;
        if (!e.isIntersecting) {
          // Out of view (40 px past the edge). Mid-render: release now, so a
          // flick never leaves a half-rendered photo behind. Not started: back
          // to pristine, it renders when it is next seen.
          if (start >= 0) remove();
          else armedAt = seenAt = -1;
          return;
        }
        if (seenAt < 0) seenAt = t;
        if (armedAt < 0 && e.intersectionRatio >= 0.15) {
          armedAt = t;
          if (opts.skipUndecoded && !ready()) remove(); // never render from an unloaded photo
        }
      },
      dispose: remove,
    };
    out.push(amb);
  }
  return out;
}
