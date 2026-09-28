/* =====================================================================
   archive-ambient.ts  (DEMO branch)

   Post-intro ambient motion for the homepage, so the page stops feeling
   static. Started from whenIntroDone (after play, skip, off or failure),
   every visit. Three graphics, nothing else:

   A1  SIGNAL SCOPE   a small live SVG trace in the "Currently filing"
                      status bar, breathing with the LED's own eePulse phase
                      (read from the element's CSS animation), a pulse
                      crossing every 4.8 s. Not glowing: the LED stays the
                      one glowing element in view.
   A2  HERO GHOST     about every 11 s, 420 ms: a true RGB split (the photo's
                      own channels, never a tint), torn slices and a faint
                      double exposure over the hero photo. The canvas sits
                      inside .ee-hero-photo, so it inherits the page's own
                      mask and opacity. No scan bar, no frame, no caption.
   A3  TILE RENDER-IN each place tile that was below the fold renders in ONCE
                      when it first enters the viewport: code characters in the photo's
                      true colours, condensing to blocks, clearing top to
                      bottom behind a faint scan line to the real <img>, which
                      is already there (JS off: the tile is just the tile).
                      The canvas is removed when it finishes.

   LOOP RULES (terminal-intro NOTES.md + motion.md): one rAF for all, dt
   capped at 100 ms, paused on visibilitychange, IntersectionObserver-gated,
   draw(t) pure in t with seeded noise, all new DOM aria-hidden and
   pointer-events:none, no transforms on any container (a kept transform
   breaks the lightbox's position:fixed). Reduced motion: the scope is drawn
   once as a still; A2 and A3 are never added.
   ===================================================================== */

import { clamp, eInOut, fitRect, hash, prefersReducedMotion } from "./archive-intro-engine";

interface Amb {
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

const ACCENT = "95,181,60"; // --ee-accent-rgb
const HAIR = "rgba(242,239,230,0.13)"; // --ee-hairline-strong
// Archive-code characters for the render-in (the same vocabulary as the
// intro flood; no film glyphs).
const CODE_GLYPHS = "archive.develop(frame)=>{}[];01<>/:+=#fxlens";
const NS = "http://www.w3.org/2000/svg";

function svgEl(tag: string, attrs: Record<string, string>): SVGElement {
  const e = document.createElementNS(NS, tag) as SVGElement;
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}
function ctx2d(c: HTMLCanvasElement, read = false): CanvasRenderingContext2D {
  const g = c.getContext("2d", read ? { willReadFrequently: true } : undefined);
  if (!g) throw new Error("no 2d context");
  return g;
}

/* ---- A1: signal scope ------------------------------------------------ */
function ambScope(): Amb | null {
  const led = document.querySelector(".ee-led");
  const bar = led ? led.closest(".ee-bar") : null;
  if (!led || !bar) return null;
  const txt = led.nextElementSibling;
  const sv = svgEl("svg", {
    viewBox: "0 0 96 12",
    preserveAspectRatio: "xMaxYMid slice",
    focusable: "false",
    "aria-hidden": "true",
    class: "ee-amb-scope",
  }) as SVGSVGElement;
  sv.style.cssText = "display:block;flex:none;margin-left:auto;height:12px;width:0;pointer-events:none;overflow:hidden";
  const base = svgEl("path", { d: "M0 6 H96", stroke: HAIR, "stroke-width": "1", fill: "none" });
  const tr = svgEl("path", { d: "M0 6 H96", stroke: `rgba(${ACCENT},0.85)`, "stroke-width": "1", fill: "none", "stroke-linejoin": "round" });
  sv.appendChild(base);
  sv.appendChild(tr);
  bar.appendChild(sv);
  let anim: Animation | null = null;
  try {
    const an = led.getAnimations ? led.getAnimations() : [];
    anim = an[0] || null;
  } catch {
    anim = null;
  }
  let lastQ = -1;
  const measure = () => {
    const br = bar.getBoundingClientRect(),
      pr = parseFloat(getComputedStyle(bar).paddingRight) || 0;
    const tr2 = txt ? txt.getBoundingClientRect() : br;
    const free = Math.floor(br.right - pr - tr2.right - 24),
      w = Math.min(96, free);
    sv.style.width = (w >= 32 ? w : 0) + "px";
    sv.style.display = w >= 32 ? "block" : "none";
  };
  const draw = (t: number) => {
    const q = (t / 40) | 0;
    if (q === lastQ) return;
    lastQ = q;
    let ph = (t % 2400) / 2400;
    try {
      if (anim && anim.currentTime !== null) ph = (Number(anim.currentTime) % 2400) / 2400;
    } catch {
      /* keep the clock phase */
    }
    const amp = 0.55 + 0.45 * Math.cos(ph * Math.PI * 2),
      bl = ((t % 4800) / 4800) * 130 - 17;
    let d = "";
    for (let i = 0; i <= 48; i++) {
      const x = i * 2,
        n = hash(i, (t / 120) | 0) - 0.5;
      const y = 6 - amp * (2.2 * Math.sin(i * 0.46 - t * 0.006) + 0.8 * n) - 4 * Math.exp(-Math.pow((x - bl) / 2.4, 2));
      d += (i ? "L" : "M") + x + " " + clamp(y, 0.6, 11.4).toFixed(2);
    }
    tr.setAttribute("d", d);
  };
  measure();
  return {
    el: bar,
    visible: false,
    dead: false,
    wants: () => sv.style.display !== "none",
    draw,
    measure,
    still: 600,
    dispose: () => {
      if (sv.parentNode) sv.parentNode.removeChild(sv);
    },
  };
}

/* ---- A2: hero ghost -------------------------------------------------- */
function ambGhost(seed: number): Amb | null {
  const wrap = document.querySelector(".ee-hero-photo");
  const img = wrap ? wrap.querySelector("img") : null;
  if (!wrap || !img) return null;
  const cv = document.createElement("canvas");
  cv.setAttribute("aria-hidden", "true");
  cv.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;display:block;pointer-events:none";
  wrap.appendChild(cv);
  const ctx = ctx2d(cv);
  let base: HTMLCanvasElement | null = null,
    red: HTMLCanvasElement | null = null,
    cyan: HTMLCanvasElement | null = null;
  let cw = 0,
    ch = 0,
    k = 0,
    next = 5200,
    dirty = false;
  const DUR = 420;
  const interval = (n: number) => 9000 + hash(n, seed + 51) * 5000;
  const measure = () => {
    const r = wrap.getBoundingClientRect(),
      dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(r.width * dpr)),
      h = Math.max(1, Math.round(r.height * dpr));
    if (w === cw && h === ch && base) return;
    cw = w;
    ch = h;
    cv.width = w;
    cv.height = h;
    base = red = cyan = null;
    if (!(img.complete && img.naturalWidth)) return;
    const ics = getComputedStyle(img);
    const f = fitRect(img.naturalWidth, img.naturalHeight, { left: 0, top: 0, width: w, height: h }, ics.objectFit, ics.objectPosition);
    const b = document.createElement("canvas");
    b.width = w;
    b.height = h;
    ctx2d(b).drawImage(img, f[0], f[1], f[2], f[3]);
    base = b;
    try {
      const bx = ctx2d(b, true),
        id = bx.getImageData(0, 0, w, h),
        d = id.data,
        d2 = new Uint8ClampedArray(d);
      for (let i = 0; i < d.length; i += 4) {
        d[i + 1] = 0;
        d[i + 2] = 0;
        d2[i] = 0;
      }
      const r1 = document.createElement("canvas");
      r1.width = w;
      r1.height = h;
      ctx2d(r1).putImageData(id, 0, 0);
      const c1 = document.createElement("canvas");
      c1.width = w;
      c1.height = h;
      ctx2d(c1).putImageData(new ImageData(d2, w, h), 0, 0);
      red = r1;
      cyan = c1;
    } catch {
      red = cyan = null; // tainted: slices and double exposure only
    }
  };
  const draw = (t: number) => {
    while (t >= next + DUR) next += interval(k++);
    if (t < next) {
      if (dirty) {
        ctx.clearRect(0, 0, cv.width, cv.height);
        dirty = false;
      }
      return;
    }
    if (!base) measure();
    if (!base) return;
    const u = (t - next) / DUR,
      e = Math.sin(u * Math.PI),
      b = ((t - next) / 45) | 0,
      W2 = cv.width,
      H2 = cv.height,
      o = Math.max(1, Math.round(1 + 3 * e));
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, W2, H2);
    dirty = true;
    ctx.drawImage(base, 0, 0);
    if (red && cyan) {
      // True RGB split: G+B shifted left, R added from the right, clipped
      // inside the frame so the edges stay the photo.
      ctx.save();
      ctx.beginPath();
      ctx.rect(o, 0, W2 - 2 * o, H2);
      ctx.clip();
      ctx.clearRect(0, 0, W2, H2);
      ctx.drawImage(cyan, -o, 0);
      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(red, o, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.restore();
    }
    ctx.globalAlpha = 0.16 * e;
    ctx.drawImage(base, Math.round(10 * e), 0);
    ctx.globalAlpha = 1;
    const n = 2 + Math.floor(hash(b, seed) * 4);
    for (let j = 0; j < n; j++) {
      const sy = Math.floor(hash(b, j + 3) * H2),
        sh = Math.min(Math.max(2, Math.floor((2 + hash(b, j + 9) * 22) * (H2 / 400))), H2 - sy),
        dx = Math.round((hash(b, j + 17) - 0.5) * 30 * e * (W2 / 800));
      if (sh < 1) continue;
      ctx.drawImage(base, 0, sy, W2, sh, dx, sy, W2, sh);
    }
  };
  let pending = false;
  if (!(img.complete && img.naturalWidth)) {
    pending = true;
    img.addEventListener(
      "load",
      () => {
        pending = false;
        cw = 0;
        measure();
      },
      { once: true },
    );
  }
  measure();
  return {
    el: wrap,
    visible: false,
    dead: false,
    wants: () => !pending,
    draw,
    measure: () => {
      cw = 0;
      measure();
    },
    dispose: () => {
      if (cv.parentNode) cv.parentNode.removeChild(cv);
    },
  };
}

/* ---- A3: tile render-in ---------------------------------------------- */
function ambTiles(seed: number): Amb[] {
  const out: Amb[] = [];
  const vh = window.innerHeight;
  document.querySelectorAll(".ee-tile").forEach((tile, ti) => {
    const img = tile.querySelector("img");
    if (!img) return;
    const r0 = tile.getBoundingClientRect();
    if (r0.top < vh && r0.bottom > 0) return; // on screen now: already seen (and rendered by the intro)
    const cv = document.createElement("canvas");
    cv.setAttribute("aria-hidden", "true");
    cv.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;display:block;pointer-events:none";
    img.insertAdjacentElement("afterend", cv); // above the photo, below the gradient, name and link
    const panel = getComputedStyle(tile).backgroundColor || "#0B0D0B";
    let W = 0,
      H = 0,
      dpr = 1,
      CS = 10,
      NCc = 1,
      NRr = 1,
      cols: string[] = [],
      start = -1,
      armedAt = -1,
      dead = false;
    const ctx = ctx2d(cv);
    const cover = () => {
      const r = tile.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = panel;
      ctx.fillRect(0, 0, W, H);
    };
    const remove = () => {
      dead = true;
      if (cv.parentNode) cv.parentNode.removeChild(cv);
    };
    // Cell colours: the photo's own pixels, one per cell (same-origin /_next/image).
    const prepare = (): boolean => {
      cover();
      CS = W < 300 ? 10 : 12;
      NCc = Math.ceil(W / CS);
      NRr = Math.ceil(H / CS);
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
    const SWEEP = 600,
      A1 = 130,
      A2 = 290;
    const tryStart = (t: number) => {
      if (start >= 0 || dead) return;
      if (img.complete && img.naturalWidth) {
        if (prepare()) start = t;
        else remove();
      }
    };
    img.addEventListener("error", remove, { once: true });
    cover();
    const draw = (t: number) => {
      if (dead) return;
      if (start < 0) {
        tryStart(t);
        if (start < 0) {
          if (armedAt >= 0 && t - armedAt > 1500) remove(); // failsafe: never leave a tile covered
          return;
        }
      }
      const u = t - start,
        v = H / SWEEP;
      if (u > SWEEP + A2 + 60) {
        remove();
        return;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `500 ${Math.round(CS * 0.95)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const front = eInOut(u / SWEEP) * (H + CS);
      for (let r = 0; r < NRr; r++) {
        const y = r * CS,
          age = ((front - (y + CS / 2)) / v) | 0;
        if (age >= A2) {
          ctx.clearRect(0, y, W, CS); // rendered: the real photo shows through
          continue;
        }
        ctx.fillStyle = panel;
        ctx.fillRect(0, y, W, CS);
        for (let c = 0; c < NCc; c++) {
          const x = c * CS,
            col = cols[r * NCc + c];
          if (age >= A1) {
            ctx.globalAlpha = 1;
            ctx.fillStyle = col;
            ctx.fillRect(x, y, CS, CS);
          } else if (age >= 0) {
            ctx.globalAlpha = 1;
            ctx.fillStyle = col;
            ctx.fillText(CODE_GLYPHS.charAt(Math.floor(hash(c * 31 + r + ti * 997, ((t / 90) | 0) + seed) * CODE_GLYPHS.length)), x + CS / 2, y + CS / 2);
          } else if (hash(c * 17 + ti, r * 13 + seed) > 0.8) {
            ctx.globalAlpha = 0.22;
            ctx.fillStyle = `rgb(${ACCENT})`;
            ctx.fillText(CODE_GLYPHS.charAt(Math.floor(hash(c + ti * 7, r + ((t / 140) | 0)) * CODE_GLYPHS.length)), x + CS / 2, y + CS / 2);
          }
        }
        ctx.globalAlpha = 1;
      }
      // The render front: a faint scan line, calmer than the intro's.
      if (front < H) {
        ctx.fillStyle = `rgba(${ACCENT},0.07)`;
        ctx.fillRect(0, front - 4, W, 8);
        ctx.fillStyle = `rgba(${ACCENT},0.5)`;
        ctx.fillRect(0, front - 0.5, W, 1);
      }
    };
    out.push({
      el: tile,
      visible: false,
      dead: false,
      wants: () => !dead && armedAt >= 0,
      draw,
      onSeen: (e, t) => {
        if (armedAt < 0 && e.isIntersecting && e.intersectionRatio >= 0.15) armedAt = t;
      },
      dispose: remove,
    });
  });
  return out;
}

/* ---- the loop -------------------------------------------------------- */
export function startAmbient(): () => void {
  const rm = prefersReducedMotion();
  const list: Amb[] = [];
  const seed = 2026;
  try {
    const s = ambScope();
    if (s) list.push(s);
  } catch {
    /* ignore */
  }
  if (rm) {
    for (const a of list) {
      try {
        a.draw(a.still || 0);
      } catch {
        /* ignore */
      }
    }
    return () => list.forEach((a) => a.dispose());
  }
  try {
    const g = ambGhost(seed);
    if (g) list.push(g);
  } catch {
    /* ignore */
  }
  try {
    ambTiles(seed).forEach((a) => list.push(a));
  } catch {
    /* ignore */
  }
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
