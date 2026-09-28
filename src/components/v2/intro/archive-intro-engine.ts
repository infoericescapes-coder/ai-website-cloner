/* =====================================================================
   archive-intro-engine.ts  v1.0.0-ee   (DEMO branch, never pushed)

   The "ghost in the machine" intro for the ericescapes.com homepage.
   A bespoke sibling of the shared terminal-intro engine
   (Base Team/.claude/skills/terminal-intro/engine/, v1.0.1) and of the
   Access Node fork. Same contract, own names, a different ending: no
   shock ring, no burst, nothing falls. The ominous code flood IS the
   render source: its rows stay exactly where they stand, and a steady
   top-down front COMPILES every character cell into the page beneath it:
   the character takes the page's true colour there -> condenses to a
   pixel block -> full detail. Type comes out of the same code characters.
   The detail is a raster of the real rendered homepage (masked hero photo,
   tiles, type, hairlines), so the landed frame is the page. A calm scan
   line then hands over to the live DOM.

   HOOKS (query string)
     ?t=<ms>    freeze on that exact frame (allowed under reduced motion;
                the overlay stays until a tap or key)
     ?intro=1   force it        ?intro=0   skip it
   Status for the frame shooter: window.ArchiveIntro.status, aliased to
   window.TerminalIntro when the shared engine is absent, so the stock
   shoot-frames.mjs works unchanged.

   CONTRACT
     Every intro frame is drawn by ONE deterministic function, render(t),
     t = ms since the intro started. Seeded hashes only; Math.random is
     never used. Zero network requests: the rasteriser reads the page's
     own already-loaded, same-origin images (next/image serves them from
     /_next/image on this origin, locally and on Netlify). If an image is
     tainted anyway, drawing still works and only the colour sampling falls
     back to flat tokens. Overlay only: the intro never edits page markup.
     Plays only on a hard load of "/" where the pre-paint gate ran
     (intro-gate.ts). Client-side navigation to "/" never plays it.

   PHASES (END = 6250 ms; ?t= values to shoot are in NOTES.md)
     signal   0-450      static, VHS tears, NO CARRIER, CRT power-on
     boot     450-1100   sigil hunts focus and locks, boot log, the ghost line
     blink    1100-1350  empty prompt, blinking caret
     type     1350-2000  the typed line, fast
     enter    2000-2200  commit flash, shake, "decrypting index"
     grant    2200-2950  the six places decrypt from the page, ACCESS GRANTED
     flood    2950-3600  ominous archive code floods the screen, then settles
     resolve  3600-5600  the code compiles in place into the page, top down
     handoff  5600-6250  calm scan line; the live page shows above it
   ===================================================================== */

import { INTRO_COVER_ID, INTRO_SESSION_KEY } from "./intro-gate";

export type IntroStatus =
  | "idle"
  | "off"
  | "playing"
  | "frozen-pending"
  | "frozen"
  | "leaving"
  | "done"
  | "error";

interface Gate {
  play: boolean;
  freeze: number;
  force: boolean;
  key: string;
  expired: boolean;
  consumed?: boolean;
  path?: string;
  sr?: ScrollRestoration | null;
}

export interface ArchiveIntroAPI {
  readonly version: string;
  readonly status: IntroStatus;
  skip: () => void;
  readonly T: Record<string, number> | null;
}

declare global {
  interface Window {
    __eeIntro?: Gate;
    __eeIntroLive?: boolean;
    ArchiveIntro?: ArchiveIntroAPI;
    TerminalIntro?: { readonly status: string };
  }
}

/* ---- 1. CONFIG (words, palette, timing) ------------------------------ */
const VERSION = "1.0.0-ee";
const MONO =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';
const PHASE_ORDER = [
  "signal",
  "boot",
  "blink",
  "type",
  "enter",
  "grant",
  "flood",
  "resolve",
  "handoff",
] as const;
type PhaseName = (typeof PHASE_ORDER)[number];
const PHASE_MS: Record<PhaseName, number> = {
  signal: 450,
  boot: 650,
  blink: 250,
  type: 650,
  enter: 200,
  grant: 750,
  flood: 650,
  resolve: 2000,
  handoff: 650,
};
const SEED = 2026;

// Palette: design-v2 tokens only (tokens.md). The RGB-split fringes are an
// effect, as briefed. --ee-live is used for exactly one element: the
// carrier LED in the terminal header (one glowing element per view).
const PAL = {
  bg: "#050605", // --ee-canvas
  panel: "#0B0D0B", // --ee-panel
  text: "#F2EFE6", // --ee-text
  muted: "#8B8F86", // --ee-muted
  accent: "#5FB53C", // --ee-accent (UI)
  live: "#6BFF4A", // --ee-live (LED only)
  pressed: "#1F7A2E", // --ee-pressed (the deep code tone)
};

// Words. No em dashes anywhere. "{n}" fields are filled from the page.
const COPY = {
  noCarrier: "NO CARRIER",
  header: ["EE  VISUAL ARCHIVE", "tty0  -33.87 151.21"],
  boot: [
    "[ ok ] carrier detected  SYD-AUS",
    "[ ok ] mount /archive  read-only",
    "[ ok ] darkroom  safelight on",
    "[ ?? ] something is developing in the dark",
  ],
  hauntIndex: 3,
  prompt: "ghost@ee:~$ ",
  // First candidate that fits on ONE row is typed. Phones get the short one.
  lines: ["access --archive ericescapes --mode visual", "access --archive --mode visual"],
  response: "[ .. ] decrypting index",
  verified: "[ ok ] {frames} frames  verified",
  grantedTitle: "ACCESS GRANTED",
  grantedSub: "VISUAL ARCHIVE  READ ONLY",
  floodCode: [
    'archive.open("/", { mode: "ro" })',
    "for (const place of index) develop(place);",
    "frame[0x000].subject = undefined;",
    'negative.scan({ dpi: 4000, dust: "keep" })',
    "signal.lock(SYD_AUS, -33.87, 151.21)",
    "darkroom.safelight = true;",
    "expose(frame, 1/250, f/8, iso400)",
    "grain.seed = 2019;",
    "index.places.length === 6",
    "while (archive.dark) develop.wait();",
    "photographs.filter(p => p.street || p.travel)",
    "render(world).from(code);",
    "if (!registered(pid)) watch(pid);",
    "scan(line) >>> buffer",
    "SIGSEGV  0x7f3a  archive/core",
    'fix(print, { bath: "stop", sec: 30 })',
    'presets.load("Chaos to Calm")',
    "visualDiary.append(today)",
    "// who is reading this",
    'mount("/visual-diaries", "ro")',
    "const eye = lens.focus(0.618);",
    "memcpy(frame, sensor, 6000 * 4000 * 3);",
    'return archive.edge("time");',
    "glyphs.map(g => pixel(g))",
    "// the edges of time are not empty",
  ],
  floodHex: ["EE-00", "ARCHIVE", "EDGES OF TIME", "FRAME 000", "DARKROOM", "SYD-AUS", "GHOST", "VISUAL"],
  floodWarn: [
    "!! something moved in the darkroom",
    "!! frame 000 was never taken",
    "!! the archive is rendering you",
    "!! do not trust the edges of time",
  ],
};
// Used only if the page's own place tiles cannot be read.
const FALLBACK_PLACES: Array<[string, number]> = [];
const SIGIL = [
  "M14 4 H4 V14 M34 4 H44 V14 M44 34 V44 H34 M14 44 H4 V34",
  "M21 16 H13 V32 H21 M13 24 H19",
  "M27 16 H35 V32 H27 M35 24 H29",
];

/* ---- 2. PURE HELPERS (none of these read a clock) -------------------- */
type RGB = [number, number, number];
export const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
export function sstep(a: number, b: number, v: number): number {
  const u = clamp((v - a) / (b - a), 0, 1);
  return u * u * (3 - 2 * u);
}
export function eOut(u: number): number {
  const v = 1 - clamp(u, 0, 1);
  return 1 - v * v * v;
}
export function eInOut(u: number): number {
  const v = clamp(u, 0, 1);
  return v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
}
export function hash(a: number, b: number): number {
  let h = (Math.imul(a | 0, 374761393) + Math.imul(b | 0, 668265263)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}
function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hex2rgb(h: string): RGB {
  let s = String(h || "#000").replace("#", "");
  if (s.length === 3) s = s[0] + s[0] + s[1] + s[1] + s[2] + s[2];
  const n = parseInt(s.slice(0, 6), 16);
  const v = isFinite(n) ? n : 0;
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}
function mix(a: RGB, b: RGB, m: number): RGB {
  return [Math.round(lerp(a[0], b[0], m)), Math.round(lerp(a[1], b[1], m)), Math.round(lerp(a[2], b[2], m))];
}
const css = (c: RGB) => `rgb(${c[0]},${c[1]},${c[2]})`;
const rgba = (c: RGB, a: number | string) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
function ctx2d(c: HTMLCanvasElement, read = false): CanvasRenderingContext2D {
  const g = c.getContext("2d", read ? { willReadFrequently: true } : undefined);
  if (!g) throw new Error("no 2d context");
  return g;
}
function canvas(w: number, h: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(w));
  c.height = Math.max(1, Math.round(h));
  return c;
}
function reducedMotion(): boolean {
  try {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  } catch {
    return false;
  }
}
// SVG path data (absolute M/H/V/L only, which is all the sigil uses) to
// sub-paths of segments [x0,y0,x1,y1].
function pathSubs(d: string): number[][][] {
  const tk = String(d || "").match(/[MHVLmhvl]|-?\d*\.?\d+/g) || [];
  const subs: number[][][] = [];
  let cur: number[][] | null = null,
    x = 0,
    y = 0,
    cmd = "",
    i = 0;
  while (i < tk.length) {
    const s = tk[i];
    if (/[MHVL]/i.test(s)) {
      cmd = s.toUpperCase();
      i++;
      continue;
    }
    if (cmd === "M") {
      x = +tk[i];
      y = +tk[i + 1];
      i += 2;
      cur = [];
      subs.push(cur);
      cmd = "L";
    } else if (cmd === "H") {
      const nx = +tk[i++];
      if (cur) cur.push([x, y, nx, y]);
      x = nx;
    } else if (cmd === "V") {
      const ny = +tk[i++];
      if (cur) cur.push([x, y, x, ny]);
      y = ny;
    } else if (cmd === "L") {
      const lx = +tk[i],
        ly = +tk[i + 1];
      i += 2;
      if (cur) cur.push([x, y, lx, ly]);
      x = lx;
      y = ly;
    } else i++;
  }
  return subs;
}
/** Parse a computed CSS colour ("rgb(1, 2, 3)" / "rgba(1, 2, 3, 0.5)" / "rgb(1 2 3 / 0.5)"). */
export function parseColour(s: string): [number, number, number, number] | null {
  const m = /rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+%?))?\s*\)/.exec(s || "");
  if (!m) return null;
  let a = m[4] === undefined ? 1 : parseFloat(m[4]);
  if (m[4] && m[4].endsWith("%")) a /= 100;
  return [+m[1], +m[2], +m[3], isFinite(a) ? a : 1];
}
/** Split a CSS value on top-level commas. */
function splitTop(s: string): string[] {
  const out: string[] = [];
  let depth = 0,
    cur = "";
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      out.push(cur.trim());
      cur = "";
    } else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}
/** All linear-gradient(...) layers of a computed background/mask image, as canvas gradients over a box. */
export function linearGradients(
  g: CanvasRenderingContext2D,
  value: string,
  x: number,
  y: number,
  w: number,
  h: number,
): CanvasGradient[] {
  const out: CanvasGradient[] = [];
  if (!value || value === "none") return out;
  for (const layer of splitTop(value)) {
    const m = /^linear-gradient\((.*)\)$/.exec(layer.trim());
    if (!m) continue;
    const parts = splitTop(m[1]);
    let ang = 180;
    if (parts.length && /deg$|^to /.test(parts[0])) {
      const p = parts.shift() as string;
      const dm = /(-?[\d.]+)deg/.exec(p);
      if (dm) ang = parseFloat(dm[1]);
      else if (p === "to right") ang = 90;
      else if (p === "to left") ang = 270;
      else if (p === "to top") ang = 0;
      else ang = 180;
    }
    const rad = (ang * Math.PI) / 180,
      dx = Math.sin(rad),
      dy = -Math.cos(rad);
    const L = Math.abs(w * dx) + Math.abs(h * dy),
      cx = x + w / 2,
      cy = y + h / 2;
    const gr = g.createLinearGradient(cx - (dx * L) / 2, cy - (dy * L) / 2, cx + (dx * L) / 2, cy + (dy * L) / 2);
    const stops: Array<[string, number | null]> = parts.map((p) => {
      const cm = /(rgba?\([^)]*\)|#[0-9a-fA-F]{3,8}|transparent|black|white)\s*([\d.]+%)?/.exec(p);
      const col = cm ? (cm[1] === "transparent" ? "rgba(0,0,0,0)" : cm[1]) : "rgba(0,0,0,0)";
      return [col, cm && cm[2] ? parseFloat(cm[2]) / 100 : null];
    });
    stops.forEach((s, i) => {
      const pos = s[1] !== null ? s[1] : stops.length > 1 ? i / (stops.length - 1) : 0;
      try {
        gr.addColorStop(clamp(pos, 0, 1), s[0]);
      } catch {
        /* unparseable stop: skip */
      }
    });
    out.push(gr);
  }
  return out;
}
/** Where an object-fit:cover/contain image lands inside its box. */
export function fitRect(
  nw: number,
  nh: number,
  r: { left: number; top: number; width: number; height: number },
  fit: string,
  pos: string,
): [number, number, number, number] {
  let s = 1;
  if (fit === "cover") s = Math.max(r.width / nw, r.height / nh);
  else if (fit === "contain") s = Math.min(r.width / nw, r.height / nh);
  else if (fit === "fill") return [r.left, r.top, r.width, r.height];
  else s = 1;
  const dw = nw * s,
    dh = nh * s;
  const tok = String(pos || "50% 50%").split(/\s+/);
  const one = (t: string | undefined, free: number, axis: "x" | "y"): number => {
    if (!t) return free / 2;
    if (t.endsWith("%")) return (free * parseFloat(t)) / 100;
    if (t.endsWith("px")) return parseFloat(t);
    if (t === "left" || t === "top") return 0;
    if (t === "right" || t === "bottom") return free;
    if (t === "center") return free / 2;
    return axis === "x" ? free / 2 : free / 2;
  };
  return [r.left + one(tok[0], r.width - dw, "x"), r.top + one(tok[1], r.height - dh, "y"), dw, dh];
}

/* ---- 3. THE GATE ----------------------------------------------------- */
// Mirror of the pre-paint gate. The intro plays ONLY when the gate script
// ran on this document load for this path; a client-side navigation to "/"
// never plays it (there is no cover, so it would flash the page first).
function takeGate(): Gate {
  const d = window.__eeIntro;
  if (!d || d.consumed || d.path !== location.pathname) {
    return { play: false, freeze: -1, force: false, key: INTRO_SESSION_KEY, expired: false };
  }
  d.consumed = true;
  return d;
}
function uncover(): void {
  const s = document.getElementById(INTRO_COVER_ID);
  if (s && s.parentNode) s.parentNode.removeChild(s);
}

/* ---- 4. THE INTRO ---------------------------------------------------- */
let status: IntroStatus = "idle";
let activeSkip: (() => void) | null = null;
let activeT: Record<string, number> | null = null;

interface Item {
  ty: "h" | "b" | "p" | "r" | "i" | "f";
  x: number;
  y: number;
  h: number;
  s: string;
  k: number; // body colour index into KCOL
  pre: number; // prefix length
  pk: number; // prefix colour index
  at: number;
  dur: number;
  haunt: boolean;
  a: number; // prompt row start offset
  lv: number; // flood tone 0..1
}
interface Place {
  name: string;
  frames: number;
}
type Banner = { c: HTMLCanvasElement; w: number; h: number };
type Banner3 = { ink: Banner; red: Banner; cyan: Banner };

function startIntro(D: Gate, onDone: () => void): void {
  // Phase table. In-phase timings scale with their phase (all 1 at defaults).
  const T = {} as Record<PhaseName, { s: number; d: number; e: number }>;
  let acc0 = 0;
  for (const nm of PHASE_ORDER) {
    const du = Math.max(1, PHASE_MS[nm]);
    T[nm] = { s: acc0, d: du, e: acc0 + du };
    acc0 += du;
  }
  const END = acc0;
  const kG = T.signal.d / 450,
    kB = T.boot.d / 650,
    kE = T.enter.d / 200,
    kQ = T.grant.d / 750,
    kF = T.flood.d / 650,
    kV = T.resolve.d / 2000,
    kX = T.handoff.d / 650;

  const cBG = hex2rgb(PAL.bg),
    cTX = hex2rgb(PAL.text),
    cAC = hex2rgb(PAL.accent),
    cMU = hex2rgb(PAL.muted),
    cPR = hex2rgb(PAL.pressed);
  // The compile lift: a character brightens toward ink for a beat as the
  // front passes it, then takes the page's colour. A band, never a head.
  const LIFT = css(mix(cTX, cMU, 0.3));
  // Terminal colours: 0 accent, 1 text, 2 muted, 3 alert (ink), 4 deep (pressed)
  const KCOL = [PAL.accent, PAL.text, PAL.muted, PAL.text, PAL.pressed];
  const GL = "▓▒░#%&@$";
  // Flood tone ramp: 12 bins from near-invisible green to ink.
  const NB = 12,
    BIN_CSS: string[] = [];
  {
    const st: Array<[number, RGB, number]> = [
      [0, cPR, 0.25],
      [0.3, cAC, 0.34],
      [0.58, cAC, 0.95],
      [0.8, mix(cAC, cTX, 0.55), 1],
      [1, cTX, 1],
    ];
    for (let b = 0; b < NB; b++) {
      const v = b / (NB - 1);
      let j = 0;
      while (j < st.length - 2 && v > st[j + 1][0]) j++;
      const u = (v - st[j][0]) / (st[j + 1][0] - st[j][0]);
      BIN_CSS.push(rgba(mix(st[j][1], st[j + 1][1], u), lerp(st[j][2], st[j + 1][2], u).toFixed(3)));
    }
  }
  // The page's own data: place names + frame counts from the tiles.
  const PLACES: Place[] = [];
  try {
    document.querySelectorAll(".ee-tile").forEach((tile) => {
      const nm = (tile.querySelector(".ee-tile-name")?.textContent || "").trim();
      const lab = tile.querySelector("a[aria-label]")?.getAttribute("aria-label") || "";
      const fm = /(\d+)\s*frames/i.exec(lab);
      if (nm) PLACES.push({ name: nm.toUpperCase(), frames: fm ? +fm[1] : 0 });
    });
  } catch {
    /* page shape changed: fall back */
  }
  if (!PLACES.length) FALLBACK_PLACES.forEach((p) => PLACES.push({ name: p[0], frames: p[1] }));
  const FRAMES_TOTAL = PLACES.reduce((s, p) => s + p.frames, 0);

  const frozen = D.freeze >= 0,
    freezeT = D.freeze;

  // Overlay: canvas + visible SKIP control. aria-hidden, no focus trap.
  const ov = document.createElement("div");
  ov.id = "ee-intro";
  ov.setAttribute("aria-hidden", "true");
  ov.style.cssText =
    "position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483001;touch-action:none;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent";
  const cv = document.createElement("canvas");
  cv.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;display:block";
  const sk = document.createElement("div");
  sk.textContent = "SKIP INTRO";
  sk.style.cssText =
    "position:absolute;right:16px;bottom:16px;padding:9px 12px;border:1px solid " +
    rgba(cTX, 0.16) +
    ";background:" +
    rgba(cBG, 0.72) +
    ";color:" +
    PAL.muted +
    ";font:500 10px var(--font-grotesk, system-ui, sans-serif);letter-spacing:.24em;cursor:pointer";
  ov.appendChild(cv);
  ov.appendChild(sk);
  document.body.appendChild(ov);
  window.__eeIntroLive = true;

  let live = false,
    It = 0;
  let W = 0,
    H = 0,
    Vw = 0,
    Vh = 0,
    dpr = 1;
  let ctx: CanvasRenderingContext2D = ctx2d(cv);
  let fs = 12,
    lh = 18,
    cw = 7,
    mx = 16,
    my = 22,
    cols = 40,
    font = "";
  let ffs = 10,
    flh = 12,
    fcw = 6,
    fcols = 50,
    ffont = "",
    sfont = "";
  let items: Item[] = [],
    pRow0 = 0,
    pRows: Array<[number, number]> = [],
    charT: number[] = [],
    floodI0 = 0;
  let LINE = COPY.lines[0];
  let HDR = { S: 40, y: 0 };
  let SIG = { br: [] as number[][][], ee: [] as number[][][], eeLen: 0 };
  let scan: CanvasPattern | null = null,
    vig: CanvasGradient | null = null,
    band: CanvasGradient | null = null;
  let noiseT: CanvasPattern[] = [];
  let BAN: { t: Banner3; s: Banner3 } | null = null,
    NOC: Banner3 | null = null;
  // The resolve grid IS the flood's character grid: one cell per character
  // position (fcw x flh), phase-aligned to the rows as they stand when the
  // flood settles, extended over the margins so the whole screen resolves.
  let NC = 1,
    NR = 1,
    GX0 = 0,
    GY0 = 0;
  let CHS: string[] = [], // the flood character in each cell ("" = none)
    CHL: Uint8Array = new Uint8Array(1); // its tone bin on the flood ramp
  // Page rasters (built once the page is settled).
  let PAGE: HTMLCanvasElement | null = null,
    MOSP: HTMLCanvasElement | null = null;
  let KIND: Uint8Array = new Uint8Array(1), // 0 empty, 1 photo, 2 type/line, 3 surface
    GCI: Int16Array = new Int16Array(1), // glyph colour index into GPAL
    GA: Uint8Array = new Uint8Array(1), // glyph alpha 0..255
    PCI: Int16Array = new Int16Array(1); // the page's own cell colour, index into GPAL
  let GPAL: string[] = [];
  let targets = false;
  let FSNAP: HTMLCanvasElement | null = null;
  let done = false,
    leaving = false,
    lastW = "",
    lastH = "",
    ready = false,
    skOp = "",
    raf = 0,
    last = 0;

  /* -- layout ------------------------------------------------------- */
  // Word-wrap, preferring to keep a --flag with its value.
  function wrap(str: string, width: number): Array<[number, number]> {
    const out: Array<[number, number]> = [];
    let s = 0;
    while (s < str.length) {
      if (str.length - s <= width) {
        out.push([s, str.length]);
        break;
      }
      const e = s + width;
      let b = str.lastIndexOf(" ", e);
      if (b > s) {
        const pw = str.lastIndexOf(" ", b - 1);
        if (pw > s && str.charAt(pw + 1) === "-" && str.charAt(b + 1) !== "-") b = pw;
      }
      if (b <= s) {
        out.push([s, e]);
        s = e;
      } else {
        out.push([s, b]);
        s = b + 1;
      }
    }
    return out;
  }
  function normLine(text: string, haunt = false): Pick<Item, "s" | "k" | "pre" | "pk" | "haunt"> {
    const m = /^\[[^\]]{1,6}\]/.exec(text);
    const pre = m ? m[0].length : 0;
    return { s: text, k: haunt ? 3 : pre ? 2 : 1, pre, pk: haunt ? 3 : 0, haunt };
  }
  function item(p: Partial<Item> & Pick<Item, "ty" | "y" | "h" | "s" | "at">): Item {
    return { x: 0, k: 1, pre: 0, pk: 0, dur: 0, haunt: false, a: 0, lv: 0, ...p };
  }
  // One flood row: code, a hex dump, or a warning. lv = its tone.
  function floodRow(R: () => number): { s: string; lv: number; haunt: boolean } {
    const p = R();
    let s = "",
      lv = 0.6,
      haunt = false;
    if (p < 0.18) {
      const ph = COPY.floodHex[Math.floor(R() * COPY.floodHex.length)];
      const addr = ("000" + Math.floor(R() * 65535).toString(16)).slice(-4);
      const by: string[] = [];
      for (let i = 0; i < ph.length; i++) by.push(("0" + ph.charCodeAt(i).toString(16)).slice(-2));
      s = "0x" + addr + "  " + by.join(" ") + "  |" + ph + "|";
      lv = 0.4;
      while (s.length < fcols) s += "  " + by.join(" ");
    } else if (p < 0.23) {
      s = COPY.floodWarn[Math.floor(R() * COPY.floodWarn.length)];
      lv = 1;
      haunt = true;
    } else {
      s = R() < 0.25 ? "  " : "";
      while (s.length < fcols) s += (s.trim().length ? "  " : "") + COPY.floodCode[Math.floor(R() * COPY.floodCode.length)];
      lv = p < 0.4 ? 0.92 : p < 0.5 ? 0.36 : 0.62;
    }
    return { s: s.slice(0, fcols), lv, haunt };
  }
  function bannerCanvas(text: string, fnt: string, spacing: number, col: string, px: number): Banner {
    let g0 = ctx2d(canvas(1, 1));
    g0.font = fnt;
    const ch = g0.measureText("M").width,
      tw = Math.ceil(text.length * ch + (text.length - 1) * spacing) + 8,
      th = Math.ceil(px * 1.5);
    const c0 = canvas(tw * dpr, th * dpr);
    g0 = ctx2d(c0);
    g0.setTransform(dpr, 0, 0, dpr, 0, 0);
    g0.font = fnt;
    g0.textBaseline = "middle";
    g0.textAlign = "left";
    g0.fillStyle = col;
    for (let i = 0; i < text.length; i++) g0.fillText(text.charAt(i), 4 + i * (ch + spacing), th / 2);
    return { c: c0, w: tw, h: th };
  }
  function banner3(text: string, fnt: string, spacing: number, px: number): Banner3 {
    return {
      ink: bannerCanvas(text, fnt, spacing, PAL.text, px),
      red: bannerCanvas(text, fnt, spacing, "rgba(255,50,70,0.55)", px),
      cyan: bannerCanvas(text, fnt, spacing, "rgba(60,210,255,0.5)", px),
    };
  }

  // Everything that depends on the viewport. render(t) only reads this.
  function build(): void {
    W = Math.max(1, window.innerWidth | 0);
    H = Math.max(1, window.innerHeight | 0);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const vv = window.visualViewport;
    Vw = Math.max(1, Math.min(W, Math.floor((vv && vv.width) || document.documentElement.clientWidth || W)));
    Vh = Math.max(1, Math.min(H, Math.floor((vv && vv.height) || H)));
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    ctx = ctx2d(cv);
    fs = clamp(Math.floor(Vw / 31), 11, 16);
    lh = Math.round(fs * 1.5);
    font = "500 " + fs + "px " + MONO;
    ctx.font = font;
    cw = ctx.measureText("0000000000").width / 10 || fs * 0.6;
    ffs = Math.max(8, Math.round(fs * 0.78));
    flh = Math.round(ffs * 1.28);
    ffont = "500 " + ffs + "px " + MONO;
    ctx.font = ffont;
    fcw = ctx.measureText("0000000000").width / 10 || ffs * 0.6;
    sfont = "500 " + Math.max(8, Math.round(fs * 0.74)) + "px " + MONO;
    mx = Vw < 560 ? 14 : Math.round(clamp(Vw * 0.05, 28, 72));
    my = Vw < 560 ? 22 : Math.round(clamp(Vh * 0.06, 28, 64));
    cols = Math.max(24, Math.floor((Vw - 2 * mx) / cw));
    fcols = Math.max(30, Math.floor((Vw - 2 * mx) / fcw));
    sk.style.right = W - Vw + 16 + "px";
    sk.style.bottom = "calc(" + (H - Vh + 16) + "px + env(safe-area-inset-bottom, 0px))";
    // The typed line: the first candidate that fits on one row.
    LINE = COPY.lines[COPY.lines.length - 1];
    for (const cand of COPY.lines) {
      if ((COPY.prompt + cand).length <= cols) {
        LINE = cand;
        break;
      }
    }
    const R = rng(SEED);
    let cy = 0;
    items = [];
    const S = Math.min(3 * lh - 8, 46);
    HDR = { S, y: 0 };
    const hx = S + 14,
      hcap = Math.floor((Vw - 2 * mx - hx) / cw);
    items.push(item({ ty: "h", x: hx, y: lh * 0.35, h: lh, s: COPY.header[0].slice(0, hcap), k: 1, at: T.boot.s + 60 * kB, dur: 150 * kB }));
    items.push(item({ ty: "h", x: hx, y: lh * 1.35, h: lh, s: COPY.header[1].slice(0, hcap), k: 2, at: T.boot.s + 180 * kB, dur: 130 * kB }));
    cy = Math.max(S, 2 * lh) + lh * 0.7;
    COPY.boot.forEach((b, i) => {
      const haunt = i === COPY.hauntIndex;
      items.push(
        item({ ty: "b", y: cy, h: lh, ...normLine(b.slice(0, cols), haunt), at: T.boot.s + (260 + i * 65) * kB + (haunt ? 50 * kB : 0), dur: 60 * kB }),
      );
      cy += lh;
    });
    cy += lh * 0.5;
    const FULL = COPY.prompt + LINE;
    pRows = wrap(FULL, cols);
    pRow0 = items.length;
    for (const [a, b] of pRows) {
      items.push(item({ ty: "p", y: cy, h: lh, s: FULL.slice(a, b), a, k: 1, pre: a < COPY.prompt.length ? COPY.prompt.length - a : 0, at: T.blink.s }));
      cy += lh;
    }
    items.push(item({ ty: "r", y: cy, h: lh, ...normLine(COPY.response.slice(0, cols)), at: T.enter.s + 60 * kE, dur: 60 * kE }));
    cy += lh;
    // The index: the six places decrypt, one after another.
    const nw = Math.max(8, ...PLACES.map((p) => p.name.length));
    PLACES.forEach((p, i) => {
      const row = ("  " + String(i + 1).padStart(2, "0") + "  " + p.name.padEnd(nw) + "  " + String(p.frames).padStart(3, "0") + " frames").slice(0, cols);
      items.push(item({ ty: "i", y: cy, h: lh, s: row, k: 1, pre: 4, pk: 2, at: T.grant.s + (30 + i * 40) * kQ, dur: 130 * kQ }));
      cy += lh;
    });
    const ver = COPY.verified.replace("{frames}", String(FRAMES_TOTAL));
    items.push(item({ ty: "r", y: cy, h: lh, ...normLine(ver.slice(0, cols)), at: T.grant.s + 370 * kQ, dur: 60 * kQ }));
    cy += lh * 1.4;
    // Flood rows: fill the screen in the first ~55% of the phase, then scroll.
    floodI0 = items.length;
    const scr = Math.ceil((Vh - 2 * my) / flh),
      F1 = scr + 4,
      F2 = Math.ceil(scr * 0.5),
      F = F1 + F2;
    for (let i = 0; i < F; i++) {
      const fr = floodRow(R);
      const at =
        i < F1
          ? T.flood.s + T.flood.d * 0.55 * Math.pow((i + 1) / F1, 0.72)
          : T.flood.s + T.flood.d * (0.55 + (0.45 * (i + 1 - F1)) / F2);
      items.push(item({ ty: "f", y: cy, h: flh, s: fr.s, lv: fr.lv, haunt: fr.haunt, at }));
      cy += flh;
    }
    // Typing schedule: seeded jitter, a beat before each flag.
    const R2 = rng(SEED + 1);
    let acc = 0;
    const w: number[] = [];
    for (let i = 0; i < LINE.length; i++) {
      const ch = LINE.charAt(i),
        pv = i ? LINE.charAt(i - 1) : "";
      let v = 0.55 + R2() * 0.9;
      if (ch === " ") v *= 0.7;
      if (pv === " " && ch === "-") v += 0.8;
      acc += v;
      w.push(acc);
    }
    charT = w.map((x) => T.type.s + 30 + (x / acc) * (T.type.d - 90));
    // Sigil geometry (48-unit box).
    SIG = { br: pathSubs(SIGIL[0]), ee: pathSubs(SIGIL[1]).concat(pathSubs(SIGIL[2])), eeLen: 0 };
    SIG.ee.forEach((sp) => sp.forEach((s) => (SIG.eeLen += Math.hypot(s[2] - s[0], s[3] - s[1]))));
    // CRT furniture.
    const pc = canvas(1, 3),
      pg = ctx2d(pc);
    pg.fillStyle = "rgba(0,0,0,0.34)";
    pg.fillRect(0, 2, 1, 1);
    scan = ctx.createPattern(pc, "repeat");
    vig = ctx.createRadialGradient(Vw / 2, Vh / 2, Math.min(Vw, Vh) * 0.3, Vw / 2, Vh / 2, Math.max(Vw, Vh) * 0.78);
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(1, "rgba(0,0,0,0.62)");
    band = ctx.createLinearGradient(0, 0, 0, 90);
    band.addColorStop(0, rgba(cTX, 0));
    band.addColorStop(0.5, rgba(cTX, 0.035));
    band.addColorStop(1, rgba(cTX, 0));
    // Static: three seeded noise tiles.
    noiseT = [];
    const RN = rng(SEED + 9);
    for (let nt = 0; nt < 3; nt++) {
      const tc = canvas(96, 96),
        tg = ctx2d(tc),
        id = tg.createImageData(96, 96);
      for (let q = 0; q < 96 * 96; q++) {
        id.data[q * 4] = cTX[0];
        id.data[q * 4 + 1] = cTX[1];
        id.data[q * 4 + 2] = cTX[2];
        id.data[q * 4 + 3] = Math.round(Math.pow(RN(), 2.2) * 255);
      }
      tg.putImageData(id, 0, 0);
      const pat = ctx.createPattern(tc, "repeat");
      if (pat) noiseT.push(pat);
    }
    const big = clamp(Math.round(Vw / 15), 20, 44);
    BAN = {
      t: banner3(COPY.grantedTitle, "700 " + big + "px " + MONO, Math.round(big * 0.16), big),
      s: banner3(COPY.grantedSub, sfont, 3, fs),
    };
    const nb = clamp(Math.round(Vw / 17), 16, 34);
    NOC = banner3(COPY.noCarrier, "600 " + nb + "px " + MONO, Math.round(nb * 0.3), nb);
    // The resolve grid, read off the flood exactly as it stands at resolve.s.
    GX0 = mx - Math.ceil(mx / fcw) * fcw;
    NC = Math.ceil((W - GX0) / fcw);
    {
      const t0 = T.resolve.s,
        sc0 = scrollAt(t0),
        g0 = glitch(t0),
        n0 = visN(t0);
      let anchor = my;
      for (let i = floodI0; i < n0; i++) {
        const top = my + items[i].y - sc0;
        if (top + flh > 0) {
          anchor = top;
          break;
        }
      }
      GY0 = anchor - Math.ceil(anchor / flh) * flh;
      NR = Math.ceil((H - GY0) / flh);
      CHS = new Array(NC * NR).fill("");
      CHL = new Uint8Array(NC * NR);
      const c0 = Math.round((mx - GX0) / fcw);
      for (let i = floodI0; i < n0; i++) {
        const it = items[i],
          r = Math.round((my + it.y - sc0 - GY0) / flh);
        if (r < 0 || r >= NR) continue;
        const str = corrupt(it.s, i, t0, g0),
          bn = Math.round(it.lv * (NB - 1));
        for (let j = 0; j < str.length && c0 + j < NC; j++) {
          const ch = str.charAt(j);
          if (ch === " ") continue;
          CHS[r * NC + c0 + j] = ch;
          CHL[r * NC + c0 + j] = bn;
        }
      }
    }
    targets = false;
    FSNAP = null;
  }
  const visN = (t: number) => {
    let n = 0;
    while (n < items.length && items[n].at <= t) n++;
    return n;
  };
  const typedCount = (t: number) => {
    if (t < T.type.s) return 0;
    let n = 0;
    while (n < charT.length && charT[n] <= t) n++;
    return n;
  };
  const scrollAt = (t: number) => {
    const n = visN(t);
    if (!n) return 0;
    const it = items[n - 1];
    return Math.max(0, it.y + it.h - (Vh - 2 * my));
  };

  /* -- the page raster ---------------------------------------------- */
  // Rasterise the REAL rendered homepage inside the viewport: backgrounds,
  // gradients, borders, masked images at their object-fit/position, inline
  // SVG strokes and text char by char at the exact DOM rects (with
  // text-transform). Also marks each grid cell as photo / type / surface
  // and records the glyph colour it resolves from. Deterministic for a
  // given layout; called once when the page is settled (fonts + images).
  function sample(): void {
    const P = canvas(W * dpr, H * dpr),
      pg = ctx2d(P);
    pg.setTransform(dpr, 0, 0, dpr, 0, 0);
    const TR = canvas(W, H), // photos only, full opacity, unmasked: the TRUE colours
      tg = ctx2d(TR);
    const N = NC * NR;
    const kind = new Uint8Array(N),
      tcol = new Int32Array(N).fill(-1);
    const markRect = (x0: number, y0: number, x1: number, y1: number, k: number, col: number) => {
      const c0 = clamp(Math.floor((x0 - GX0) / fcw), 0, NC - 1),
        c1 = clamp(Math.floor((x1 - 0.01 - GX0) / fcw), 0, NC - 1);
      const r0 = clamp(Math.floor((y0 - GY0) / flh), 0, NR - 1),
        r1 = clamp(Math.floor((y1 - 0.01 - GY0) / flh), 0, NR - 1);
      if (x1 <= 0 || y1 <= 0 || x0 >= W || y0 >= H) return;
      for (let r = r0; r <= r1; r++)
        for (let c = c0; c <= c1; c++) {
          const i = r * NC + c;
          if (k === 2 || kind[i] === 0) {
            kind[i] = k;
            if (k === 2) tcol[i] = col;
          }
        }
    };
    const pack = (c: [number, number, number, number]) => ((c[0] & 255) << 16) | ((c[1] & 255) << 8) | (c[2] & 255);
    const root = document.querySelector(".ee-root") || document.body;
    const rootCs = getComputedStyle(root);
    pg.fillStyle = rootCs.backgroundColor && rootCs.backgroundColor !== "rgba(0, 0, 0, 0)" ? rootCs.backgroundColor : PAL.bg;
    pg.fillRect(0, 0, W, H);
    // The shell's fixed backdrop canvas (desktop dust + glows) is part of
    // what the eye sees behind the page. It is same-origin and drawable.
    const dust = root.querySelector(":scope > canvas");
    if (dust instanceof HTMLCanvasElement && dust.width > 1) {
      try {
        pg.drawImage(dust, 0, 0, W, H);
      } catch {
        /* ignore */
      }
    }

    const walk = (el: Element, op: number, g: CanvasRenderingContext2D): void => {
      if (el === ov) return;
      const cs = getComputedStyle(el);
      if (cs.display === "none") return;
      if (cs.position === "fixed") return; // overlays, grain, progress bar: not page content
      const o = op * (parseFloat(cs.opacity) || 0);
      if (o < 0.01) return;
      const r = el.getBoundingClientRect();
      if (r.top > H + 40) return;
      const hidden = cs.overflow !== "visible" || cs.clip !== "auto";
      if (r.width <= 1 && r.height <= 1 && hidden) return; // sr-only
      const vis = cs.visibility !== "hidden";
      const maskV = cs.getPropertyValue("mask-image") || cs.getPropertyValue("-webkit-mask-image");
      const hasMask = !!maskV && maskV !== "none" && maskV.indexOf("linear-gradient") >= 0;
      let tgt = g,
        lay: HTMLCanvasElement | null = null,
        eo = o;
      if (hasMask) {
        // Render the subtree into a layer, mask it, composite at the element's opacity.
        lay = canvas(W * dpr, H * dpr);
        tgt = ctx2d(lay);
        tgt.setTransform(dpr, 0, 0, dpr, 0, 0);
        eo = 1;
      }
      const clipIt = cs.overflow === "hidden" || cs.overflow === "clip";
      tgt.save();
      if (clipIt) {
        tgt.beginPath();
        tgt.rect(r.left, r.top, r.width, r.height);
        tgt.clip();
      }
      if (vis) paintBox(cs, r, eo, tgt);
      if (el instanceof HTMLImageElement) {
        if (vis) paintImg(el, cs, r, eo, tgt);
      } else if (el instanceof SVGSVGElement) {
        if (vis) paintSvg(el, r, eo, tgt);
      } else if (el instanceof HTMLCanvasElement) {
        try {
          if (vis && r.width > 0) {
            tgt.globalAlpha = eo;
            tgt.drawImage(el, r.left, r.top, r.width, r.height);
            tgt.globalAlpha = 1;
          }
        } catch {
          /* ignore */
        }
      } else {
        for (const n of Array.from(el.childNodes)) {
          if (n.nodeType === 3) {
            if (vis) paintText(n as Text, cs, eo, tgt);
          } else if (n.nodeType === 1) walk(n as Element, eo, tgt);
        }
      }
      tgt.restore();
      if (lay) {
        const lg = ctx2d(lay);
        lg.setTransform(dpr, 0, 0, dpr, 0, 0);
        lg.globalCompositeOperation = "destination-in";
        const grads = linearGradients(lg, maskV, r.left, r.top, r.width, r.height);
        if (grads.length) {
          lg.fillStyle = grads[0];
          lg.fillRect(r.left, r.top, r.width, r.height);
        }
        g.save();
        g.setTransform(1, 0, 0, 1, 0, 0);
        g.globalAlpha = o;
        g.drawImage(lay, 0, 0);
        g.restore();
      }
    };
    const paintBox = (cs: CSSStyleDeclaration, r: DOMRect, o: number, g: CanvasRenderingContext2D) => {
      if (r.width <= 0 || r.height <= 0) return;
      const bg = parseColour(cs.backgroundColor);
      const round = parseFloat(cs.borderTopLeftRadius) >= Math.min(r.width, r.height) / 2 - 0.5;
      if (bg && bg[3] > 0) {
        g.fillStyle = cs.backgroundColor;
        g.globalAlpha = o;
        if (round) {
          g.beginPath();
          g.arc(r.left + r.width / 2, r.top + r.height / 2, Math.min(r.width, r.height) / 2, 0, Math.PI * 2);
          g.fill();
        } else g.fillRect(r.left, r.top, r.width, r.height);
        g.globalAlpha = 1;
        if (bg[3] * o > 0.3 && r.width * r.height < W * H * 0.5) markRect(r.left, r.top, r.right, r.bottom, 3, 0);
      }
      if (cs.backgroundImage && cs.backgroundImage !== "none") {
        const grads = linearGradients(g, cs.backgroundImage, r.left, r.top, r.width, r.height);
        g.globalAlpha = o;
        for (const gr of grads) {
          g.fillStyle = gr;
          g.fillRect(r.left, r.top, r.width, r.height);
        }
        g.globalAlpha = 1;
      }
      const side = (w: string, st: string, col: string, x: number, y: number, ww: number, hh: number, isW: boolean) => {
        const bw = parseFloat(w);
        const c = parseColour(col);
        if (!bw || st === "none" || st === "hidden" || !c || c[3] <= 0) return;
        g.fillStyle = col;
        g.globalAlpha = o;
        if (isW) g.fillRect(x, y, bw, hh);
        else g.fillRect(x, y, ww, bw);
        g.globalAlpha = 1;
        markRect(x, y, x + (isW ? bw : ww), y + (isW ? hh : bw), 2, pack(c));
      };
      side(cs.borderTopWidth, cs.borderTopStyle, cs.borderTopColor, r.left, r.top, r.width, 0, false);
      side(cs.borderBottomWidth, cs.borderBottomStyle, cs.borderBottomColor, r.left, r.bottom - parseFloat(cs.borderBottomWidth), r.width, 0, false);
      side(cs.borderLeftWidth, cs.borderLeftStyle, cs.borderLeftColor, r.left, r.top, 0, r.height, true);
      side(cs.borderRightWidth, cs.borderRightStyle, cs.borderRightColor, r.right - parseFloat(cs.borderRightWidth), r.top, 0, r.height, true);
    };
    const paintImg = (img: HTMLImageElement, cs: CSSStyleDeclaration, r: DOMRect, o: number, g: CanvasRenderingContext2D) => {
      if (!img.complete || !img.naturalWidth || r.width <= 0) return;
      const f = fitRect(img.naturalWidth, img.naturalHeight, r, cs.objectFit, cs.objectPosition);
      g.save();
      g.beginPath();
      g.rect(r.left, r.top, r.width, r.height);
      g.clip();
      g.globalAlpha = o;
      g.drawImage(img, f[0], f[1], f[2], f[3]);
      g.restore();
      tg.save();
      tg.beginPath();
      tg.rect(r.left, r.top, r.width, r.height);
      tg.clip();
      tg.drawImage(img, f[0], f[1], f[2], f[3]);
      tg.restore();
      markRect(Math.max(0, r.left), Math.max(0, r.top), Math.min(W, r.right), Math.min(H, r.bottom), 1, 0);
    };
    const paintSvg = (sv: SVGSVGElement, r: DOMRect, o: number, g: CanvasRenderingContext2D) => {
      if (r.width <= 0 || r.height <= 0) return;
      const vb = (sv.getAttribute("viewBox") || `0 0 ${r.width} ${r.height}`).split(/[\s,]+/).map(Number);
      const sx = r.width / (vb[2] || r.width),
        sy = r.height / (vb[3] || r.height);
      sv.querySelectorAll("path").forEach((p) => {
        const pcs = getComputedStyle(p);
        const d = p.getAttribute("d");
        if (!d) return;
        let path: Path2D;
        try {
          path = new Path2D(d);
        } catch {
          return;
        }
        g.save();
        g.translate(r.left, r.top);
        g.scale(sx, sy);
        g.translate(-vb[0], -vb[1]);
        g.globalAlpha = o * (parseFloat(pcs.opacity) || 1);
        const st = parseColour(pcs.stroke);
        if (st && st[3] > 0 && pcs.stroke !== "none") {
          g.strokeStyle = pcs.stroke;
          g.lineWidth = parseFloat(pcs.strokeWidth) || 1;
          g.stroke(path);
          markRect(r.left, r.top, r.right, r.bottom, 2, pack(st));
        }
        const fl = parseColour(pcs.fill);
        if (fl && fl[3] > 0 && pcs.fill !== "none") {
          g.fillStyle = pcs.fill;
          g.fill(path);
        }
        g.restore();
      });
    };
    const rg = document.createRange();
    const paintText = (node: Text, cs: CSSStyleDeclaration, o: number, g: CanvasRenderingContext2D) => {
      const txt = node.nodeValue || "";
      if (!/\S/.test(txt)) return;
      const col = parseColour(cs.color);
      if (!col || col[3] * o < 0.02) return;
      g.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      g.textBaseline = "alphabetic";
      g.textAlign = "left";
      g.fillStyle = cs.color;
      g.globalAlpha = o;
      const m = g.measureText("Hg"),
        asc = m.fontBoundingBoxAscent,
        desc = m.fontBoundingBoxDescent,
        ratio = asc && desc ? asc / (asc + desc) : 0.8;
      const tt = cs.textTransform;
      let prev = " ";
      const pk = pack(col);
      for (let i = 0; i < txt.length; i++) {
        let ch = txt.charAt(i);
        if (/\s/.test(ch)) {
          prev = ch;
          continue;
        }
        if (tt === "uppercase") ch = ch.toUpperCase();
        else if (tt === "lowercase") ch = ch.toLowerCase();
        else if (tt === "capitalize" && /\s/.test(prev)) ch = ch.toUpperCase();
        prev = txt.charAt(i);
        rg.setStart(node, i);
        rg.setEnd(node, i + 1);
        const rs = rg.getClientRects();
        if (!rs.length) continue;
        const rr = rs[0];
        if (rr.bottom < 0 || rr.top > H || rr.right < 0 || rr.left > W) continue;
        g.fillText(ch, rr.left, rr.top + rr.height * ratio);
        markRect(rr.left, rr.top + rr.height * 0.12, rr.right, rr.bottom - rr.height * 0.08, 2, pk);
      }
      g.globalAlpha = 1;
    };
    walk(root, 1, pg);

    // Cell colours: PAGE and TRUE, downsampled to one pixel per cell.
    // One pixel per grid cell (cells are fcw x flh, origin GX0/GY0).
    const down = (src: HTMLCanvasElement, fill: boolean): HTMLCanvasElement => {
      const m1 = canvas(NC * 4, NR * 4),
        a1 = ctx2d(m1);
      if (fill) {
        a1.fillStyle = PAL.bg;
        a1.fillRect(0, 0, NC * 4, NR * 4);
      }
      a1.imageSmoothingQuality = "high";
      a1.setTransform(4 / fcw, 0, 0, 4 / flh, (-GX0 * 4) / fcw, (-GY0 * 4) / flh);
      a1.drawImage(src, 0, 0, W, H);
      const m2 = canvas(NC, NR),
        a2 = ctx2d(m2, true);
      a2.imageSmoothingQuality = "high";
      a2.drawImage(m1, 0, 0, NC, NR);
      return m2;
    };
    const mp = down(P, true),
      mt = down(TR, false);
    let pd: Uint8ClampedArray | null = null,
      td: Uint8ClampedArray | null = null;
    try {
      pd = ctx2d(mp, true).getImageData(0, 0, NC, NR).data;
      td = ctx2d(mt, true).getImageData(0, 0, NC, NR).data;
    } catch {
      pd = null; // tainted: fall back to token colours
      td = null;
    }
    // Glyph colour per cell.
    const palIdx: Record<number, number> = {};
    const gpal: string[] = [];
    const idx = (c: RGB): number => {
      const key = ((c[0] >> 3) << 10) | ((c[1] >> 3) << 5) | (c[2] >> 3);
      let v = palIdx[key];
      if (v === undefined) {
        v = palIdx[key] = gpal.length;
        gpal.push(css([(c[0] >> 3) * 8 + 4, (c[1] >> 3) * 8 + 4, (c[2] >> 3) * 8 + 4]));
      }
      return v;
    };
    const gci = new Int16Array(N),
      ga = new Uint8Array(N),
      pci = new Int16Array(N);
    const lum = (r: number, g: number, b: number) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const bgL = lum(cBG[0], cBG[1], cBG[2]);
    for (let i = 0; i < N; i++) {
      let k = kind[i];
      const pr: RGB = pd ? [pd[i * 4], pd[i * 4 + 1], pd[i * 4 + 2]] : cBG;
      const pl = lum(pr[0], pr[1], pr[2]);
      pci[i] = idx(pr);
      if (k === 2) {
        const tc = tcol[i];
        const c: RGB = tc >= 0 ? [(tc >> 16) & 255, (tc >> 8) & 255, tc & 255] : cTX;
        gci[i] = idx(c);
        ga[i] = 255;
      } else if (k === 1) {
        const tr: RGB = td ? [td[i * 4], td[i * 4 + 1], td[i * 4 + 2]] : cMU;
        const tl = lum(tr[0], tr[1], tr[2]);
        const vis = pd ? clamp((pl - bgL) / Math.max(8, tl - bgL), 0, 1) : 0.6;
        if (vis < 0.06) k = 0;
        else {
          gci[i] = idx(tr); // the photo's TRUE colour, never a tint
          ga[i] = Math.round(255 * clamp(0.3 + vis * 1.2, 0, 1));
        }
      } else if (k === 3 || (pd && Math.abs(pl - bgL) > 10)) {
        k = 3;
        gci[i] = idx(mix(pr, cMU, 0.45));
        ga[i] = 150;
      }
      kind[i] = k;
    }
    PAGE = P;
    MOSP = mp;
    KIND = kind;
    GCI = gci;
    GA = ga;
    PCI = pci;
    GPAL = gpal;
  }
  function ensureTargets(force: boolean): void {
    if (targets) return;
    if (!ready && !force) return;
    targets = true;
    try {
      sample();
    } catch {
      PAGE = null;
      MOSP = null;
    }
  }

  /* -- drawing ------------------------------------------------------- */
  // Glitch intensity 0..1 as a pure function of t. Zero through resolve.
  function glitch(t: number): number {
    let g = 0;
    const lock = T.boot.s + 330 * kB,
      hn = T.boot.s + (260 + 3 * 65 + 50) * kB,
      ga = T.grant.s + 420 * kQ;
    if (t < T.boot.s) g = 0.55 * (1 - sstep(T.signal.s + 280 * kG, T.signal.s + 350 * kG, t));
    if (t >= lock && t < lock + 90 * kB) g = Math.max(g, 0.5 * (1 - (t - lock) / (90 * kB)));
    if (t >= hn && t < hn + 150 * kB) g = Math.max(g, 0.85 * (1 - (t - hn) / (150 * kB)));
    if (t >= T.enter.s && t < T.enter.s + 110 * kE) g = Math.max(g, 0.45 * (1 - (t - T.enter.s) / (110 * kE)));
    if (t >= ga && t < ga + 140 * kQ) g = Math.max(g, 0.75 * (1 - (t - ga) / (140 * kQ)));
    // The flood surges, then settles before it compiles (calm, no split).
    if (t >= T.flood.s && t < T.resolve.s)
      g = Math.max(g, (0.2 + 0.5 * sstep(T.flood.s, T.flood.s + 240 * kF, t)) * (1 - 0.85 * sstep(T.flood.s + 0.6 * T.flood.d, T.flood.e, t)));
    if (t >= T.boot.s + 300 * kB && t < T.flood.s && hash((t / 90) | 0, 77) > 0.93) g = Math.max(g, 0.35);
    return g;
  }
  function scramble(a: number, b: number, n: number): string {
    let o = "";
    for (let i = 0; i < n; i++) o += GL.charAt(Math.floor(hash(a * 7 + i, b) * GL.length));
    return o;
  }
  function corrupt(s: string, i: number, t: number, g: number): string {
    const b = (t / 60) | 0;
    if (hash(i, b) > 0.04 + 0.3 * g) return s;
    const a = Math.floor(hash(i, b + 7) * s.length),
      L = 2 + Math.floor(hash(i, b + 13) * 8);
    let o = "";
    for (let j = 0; j < L; j++) o += GL.charAt(Math.floor(hash(i * 31 + j, b) * GL.length));
    return s.slice(0, a) + o + s.slice(a + L);
  }
  function drawRow(c: CanvasRenderingContext2D, s: string, pre: number, pk: number, k: number, x: number, y: number, co: number): void {
    if (co > 0.35) {
      c.fillStyle = "rgba(255,50,70,0.45)";
      c.fillText(s, x - co, y);
      c.fillStyle = "rgba(60,210,255,0.4)";
      c.fillText(s, x + co, y);
    }
    if (pre > 0) {
      c.fillStyle = KCOL[pk];
      c.fillText(s.slice(0, pre), x, y);
      if (s.length > pre) {
        c.fillStyle = KCOL[k];
        c.fillText(s.slice(pre), x + pre * cw, y);
      }
    } else {
      c.fillStyle = KCOL[k];
      c.fillText(s, x, y);
    }
  }
  // The EE sigil: brackets hunt for focus and lock, then the double E strokes in.
  function drawSigil(c: CanvasRenderingContext2D, t: number, x0: number, y0: number, S: number): void {
    const u = t - T.boot.s;
    if (u < 0) return;
    const k = S / 48,
      lockT = 330 * kB,
      v = clamp(u / lockT, 0, 1);
    let off = u < lockT ? 13 * Math.exp(-3.1 * v) * Math.cos(v * 15) * (1 - v) + 4 * (1 - v) : 0;
    if (u < lockT && hash((t / 40) | 0, 5) > 0.8) off += 2;
    const locked = u >= lockT,
      flash = locked ? 1 - clamp((u - lockT) / (160 * kB), 0, 1) : 0;
    c.lineWidth = Math.max(1.4, 1.6 * k * 1.2);
    c.lineCap = "butt";
    c.strokeStyle = locked ? (flash > 0 ? css(mix(cTX, cAC, flash)) : PAL.text) : PAL.accent;
    c.beginPath();
    for (const sp of SIG.br) {
      let cx = 0,
        cy = 0;
      sp.forEach((s) => {
        cx += s[0] + s[2];
        cy += s[1] + s[3];
      });
      cx /= sp.length * 2;
      cy /= sp.length * 2;
      const dx = (cx < 24 ? -1 : 1) * off,
        dy = (cy < 24 ? -1 : 1) * off;
      for (const s of sp) {
        c.moveTo(x0 + s[0] * k + dx, y0 + s[1] * k + dy);
        c.lineTo(x0 + s[2] * k + dx, y0 + s[3] * k + dy);
      }
    }
    c.stroke();
    if (flash > 0) {
      c.strokeStyle = rgba(cAC, (0.35 * flash).toFixed(3));
      c.lineWidth = 1;
      c.strokeRect(x0 - 3, y0 - 3, S + 6, S + 6);
    }
    const dp = clamp((u - 140 * kB) / (300 * kB), 0, 1);
    if (dp <= 0) return;
    let left = dp * SIG.eeLen,
      hx = 0,
      hy = 0;
    c.strokeStyle = PAL.text;
    c.beginPath();
    for (let a = 0; a < SIG.ee.length && left > 0; a++) {
      const sp2 = SIG.ee[a];
      for (let b = 0; b < sp2.length && left > 0; b++) {
        const s2 = sp2[b],
          L = Math.hypot(s2[2] - s2[0], s2[3] - s2[1]),
          f = Math.min(1, left / L);
        left -= L;
        hx = x0 + lerp(s2[0], s2[2], f) * k;
        hy = y0 + lerp(s2[1], s2[3], f) * k;
        c.moveTo(x0 + s2[0] * k, y0 + s2[1] * k);
        c.lineTo(hx, hy);
      }
    }
    c.stroke();
    if (dp < 1) {
      c.fillStyle = PAL.accent;
      c.fillRect(hx - 2, hy - 2, 4, 4);
    }
  }
  function drawFlood(c: CanvasRenderingContext2D, t: number, g: number, sc: number, n: number): void {
    c.font = ffont;
    c.textBaseline = "middle";
    c.textAlign = "left";
    const co = g * 2.6,
      ba = c.globalAlpha;
    for (let i = floodI0; i < n; i++) {
      const it = items[i],
        sy = my + it.y - sc;
      if (sy > Vh || sy + flh < 0) continue;
      const yc = sy + flh / 2,
        s = corrupt(it.s, i, t, g),
        bn = Math.round(it.lv * (NB - 1));
      if (it.haunt) c.globalAlpha = ba * (hash((t / 50) | 0, i) > 0.25 ? 1 : 0.3);
      if (co > 0.35) {
        c.fillStyle = "rgba(255,50,70,0.4)";
        c.fillText(s, mx - co, yc);
        c.fillStyle = "rgba(60,210,255,0.35)";
        c.fillText(s, mx + co, yc);
      }
      c.fillStyle = BIN_CSS[bn];
      c.fillText(s, mx, yc);
      if (it.haunt) c.globalAlpha = ba;
    }
  }
  // The terminal: header, carrier LED, boot log, prompt, index, flood.
  function drawTerm(c: CanvasRenderingContext2D, t: number, g: number): void {
    const n = visN(t);
    if (!n && t < T.boot.s) return;
    const sc = scrollAt(t),
      typed = typedCount(t),
      co = g * 3.2,
      ba = c.globalAlpha;
    let sx = 0;
    const shake = 140 * kE,
      flash = 240 * kE;
    if (t >= T.enter.s && t < T.enter.s + shake) sx = (hash((t / 28) | 0, 3) - 0.5) * 6 * (1 - (t - T.enter.s) / shake);
    const hy = my + HDR.y - sc;
    if (hy + HDR.S > 0) {
      drawSigil(c, t, mx + sx, hy, HDR.S);
      // The carrier LED: the one --ee-live element, lit once the sigil locks.
      const lk = T.boot.s + 330 * kB;
      if (t >= lk) {
        const lx = Vw - mx - 5,
          ly = hy + lh * 0.35 + lh / 2,
          pul = 0.6 + 0.4 * Math.cos(((t - lk) / 2400) * Math.PI * 2);
        c.fillStyle = rgba(hex2rgb(PAL.live), (0.18 * pul).toFixed(3));
        c.beginPath();
        c.arc(lx, ly, 7, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = rgba(hex2rgb(PAL.live), (0.35 + 0.65 * pul).toFixed(3));
        c.beginPath();
        c.arc(lx, ly, 2.6, 0, Math.PI * 2);
        c.fill();
      }
    }
    c.font = font;
    c.textBaseline = "middle";
    c.textAlign = "left";
    if (t >= T.enter.s && t < T.enter.s + flash) {
      c.fillStyle = rgba(cAC, (0.28 * (1 - (t - T.enter.s) / flash)).toFixed(3));
      for (let i = 0; i < pRows.length; i++) {
        const pr = items[pRow0 + i];
        c.fillRect(mx - 4, my + pr.y - sc, (pRows[i][1] - pRows[i][0]) * cw + 8, lh);
      }
    }
    const fEnd = Math.min(n, floodI0);
    for (let i = 0; i < fEnd; i++) {
      const r = items[i],
        y = my + r.y - sc;
      let x = mx + r.x + sx,
        s = r.s;
      if (y + r.h < 0 || y > Vh) continue;
      if (r.ty === "h" || r.ty === "b" || r.ty === "r") {
        const u = clamp((t - r.at) / (r.dur || 70), 0, 1);
        s = s.slice(0, Math.floor(s.length * u)) + (u < 1 && s.length ? scramble(i, (t / 30) | 0, 2) : "");
      } else if (r.ty === "i") {
        // Decrypt: the row is all cipher, then resolves left to right.
        const u = clamp((t - r.at) / (r.dur || 100), 0, 1),
          k2 = Math.floor(s.length * u);
        let tail = "";
        for (let j = k2; j < s.length; j++) tail += s.charAt(j) === " " ? " " : GL.charAt(Math.floor(hash(i * 53 + j, (t / 35) | 0) * GL.length));
        s = s.slice(0, k2) + tail;
      } else if (r.ty === "p") {
        s = s.slice(0, clamp(COPY.prompt.length + typed - r.a, 0, s.length));
      }
      if (!s) continue;
      let rc = co;
      if (r.haunt) {
        rc = Math.max(co, 1.6 + hash((t / 45) | 0, 9) * 2.5);
        c.globalAlpha = ba * (hash((t / 40) | 0, i) > 0.2 ? 1 : 0.35);
        if (hash((t / 70) | 0, 11) > 0.85) x += (hash((t / 70) | 0, 12) - 0.5) * 10;
      }
      drawRow(c, s, Math.min(r.pre, s.length), r.pk, r.k, x, y + r.h / 2, rc);
      if (r.haunt) c.globalAlpha = ba;
    }
    if (n > floodI0) drawFlood(c, t, g, sc, n);
    // Caret: blinks on the empty prompt, solid while typing.
    if (t >= T.blink.s && t < T.enter.s && pRows.length) {
      const on = t < T.type.s ? Math.floor((t - T.blink.s) / 125) % 2 === 0 : true;
      if (on) {
        const idx = COPY.prompt.length + typed;
        let crr = pRows.length - 1,
          cc = pRows[crr][1] - pRows[crr][0];
        for (let j = 0; j < pRows.length; j++) {
          if (idx <= pRows[j][1]) {
            crr = j;
            cc = Math.max(0, idx - pRows[j][0]);
            break;
          }
        }
        const pr2 = items[pRow0 + crr];
        c.fillStyle = PAL.accent;
        c.fillRect(mx + sx + cc * cw, my + pr2.y - sc + lh * 0.14, Math.max(2, cw * 0.62), lh * 0.72);
      }
    }
  }
  // Dead signal: static, VHS tracking tears, NO CARRIER, CRT power-on.
  function drawSignal(c: CanvasRenderingContext2D, t: number): void {
    const u = t - T.signal.s,
      na = 0.5 * (1 - sstep(280 * kG, 340 * kG, u)) * sstep(0, 40 * kG, u);
    if (na > 0.01 && noiseT.length) {
      const b = (u / 40) | 0,
        p = noiseT[Math.floor(hash(b, 1) * noiseT.length)];
      c.save();
      c.globalAlpha = na;
      c.translate(-hash(b, 2) * 96, -hash(b, 3) * 96);
      c.fillStyle = p;
      c.fillRect(0, 0, W + 96, H + 96);
      c.restore();
      for (let k = 0; k < 2; k++) {
        const y = ((u * 0.7 + k * 0.47 * (Vh + 120)) % (Vh + 120)) - 60,
          bh = 16 + 22 * k + hash(b, k + 5) * 10;
        c.save();
        c.beginPath();
        c.rect(0, y, W, bh);
        c.clip();
        c.globalAlpha = Math.min(1, na * 1.8);
        c.translate((hash(b, k + 8) - 0.5) * 60, y);
        c.fillStyle = noiseT[(k + 1) % noiseT.length];
        c.fillRect(-60, -bh, W + 120, bh * 3);
        c.restore();
        c.fillStyle = rgba(cTX, (0.35 * na).toFixed(3));
        c.fillRect(0, y, W, 1);
        c.fillStyle = rgba(cBG, 0.5);
        c.fillRect(0, y + bh, W, 3);
      }
    }
    if (NOC && u >= 70 * kG && u < 300 * kG && hash((u / 35) | 0, 5) > 0.3) {
      const nb = NOC,
        jx = (hash((u / 35) | 0, 6) - 0.5) * 8,
        x0 = (Vw - nb.ink.w) / 2 + jx,
        y0 = Vh * 0.46 - nb.ink.h / 2;
      c.drawImage(nb.red.c, x0 - 2, y0, nb.red.w, nb.red.h);
      c.drawImage(nb.cyan.c, x0 + 2, y0, nb.cyan.w, nb.cyan.h);
      c.globalAlpha = 0.85;
      c.drawImage(nb.ink.c, x0, y0, nb.ink.w, nb.ink.h);
      c.globalAlpha = 1;
    }
    if (u >= 310 * kG && u < 370 * kG) {
      const w = Vw * eOut((u - 310 * kG) / (60 * kG));
      c.fillStyle = rgba(cAC, 0.22);
      c.fillRect((Vw - w) / 2, Vh / 2 - 6, w, 12);
      c.fillStyle = rgba(cTX, 0.95);
      c.fillRect((Vw - w) / 2, Vh / 2 - 1, w, 2);
    } else if (u >= 370 * kG) {
      const v = (u - 370 * kG) / (80 * kG),
        h = Vh * eOut(Math.min(1, v * 1.8));
      c.fillStyle = rgba(mix(cAC, cTX, 0.6), (0.4 * (1 - v)).toFixed(3));
      c.fillRect(0, (Vh - h) / 2, W, h);
    }
  }
  // ACCESS GRANTED: a glitched banner across the middle of the screen.
  function drawGranted(c: CanvasRenderingContext2D, t: number): void {
    const a0 = T.grant.s + 420 * kQ,
      a1 = T.flood.s + 150 * kF;
    if (!BAN || t < a0 || t >= a1) return;
    const u = (t - a0) / (a1 - a0),
      e = t - a0;
    if (e > 30 && e < 55) return;
    const B = BAN.t,
      Sb = BAN.s,
      bh = B.ink.h + Sb.ink.h + 26,
      top = Vh * 0.5 - bh / 2;
    const out = sstep(0.82, 1, u),
      gA = 1 - sstep(0, 0.3, u) + out;
    c.fillStyle = rgba(cBG, (0.88 * (1 - out * 0.7)).toFixed(3));
    c.fillRect(0, top, W, bh);
    c.fillStyle = rgba(cAC, (0.55 * (1 - out)).toFixed(3));
    c.fillRect(0, top, W, 1);
    c.fillRect(0, top + bh - 1, W, 1);
    const x0 = (Vw - B.ink.w) / 2,
      y0 = top + 10,
      ns = 5,
      sl = B.ink.h / ns,
      b = (t / 40) | 0;
    for (let i = 0; i < ns; i++) {
      const dx = (hash(b, i + 40) - 0.5) * gA * 30,
        sy = i * sl;
      c.save();
      c.beginPath();
      c.rect(0, y0 + sy, W, sl + 0.5);
      c.clip();
      c.globalAlpha = 0.9;
      c.drawImage(B.red.c, x0 + dx - 2 - gA * 3, y0, B.red.w, B.red.h);
      c.drawImage(B.cyan.c, x0 + dx + 2 + gA * 3, y0, B.cyan.w, B.cyan.h);
      c.globalAlpha = 1 - out * 0.6;
      c.drawImage(B.ink.c, x0 + dx, y0, B.ink.w, B.ink.h);
      c.restore();
    }
    c.globalAlpha = (1 - out) * 0.9;
    c.drawImage(Sb.ink.c, (Vw - Sb.ink.w) / 2, y0 + B.ink.h + 4, Sb.ink.w, Sb.ink.h);
    c.globalAlpha = 1;
    const o = 10 * (1 - eOut(clamp(u / 0.25, 0, 1))),
      L = 8,
      bx0 = x0 - 12 - o,
      bx1 = x0 + B.ink.w + 12 + o,
      by0 = y0 - 4 - o,
      by1 = y0 + B.ink.h + Sb.ink.h + 8 + o;
    c.strokeStyle = rgba(cAC, (1 - out).toFixed(3));
    c.lineWidth = 1.4;
    c.beginPath();
    c.moveTo(bx0, by0 + L);
    c.lineTo(bx0, by0);
    c.lineTo(bx0 + L, by0);
    c.moveTo(bx1 - L, by0);
    c.lineTo(bx1, by0);
    c.lineTo(bx1, by0 + L);
    c.moveTo(bx1, by1 - L);
    c.lineTo(bx1, by1);
    c.lineTo(bx1 - L, by1);
    c.moveTo(bx0 + L, by1);
    c.lineTo(bx0, by1);
    c.lineTo(bx0, by1 - L);
    c.stroke();
    c.lineWidth = 1;
  }
  // The flood as it stands when it settles (drawn once, offscreen). The
  // unresolved part of the screen is this image, so nothing moves before
  // the front reaches it.
  function floodSnap(): HTMLCanvasElement {
    if (FSNAP) return FSNAP;
    const s = canvas(W * dpr, H * dpr),
      g = ctx2d(s);
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawTerm(g, T.resolve.s, glitch(T.resolve.s));
    FSNAP = s;
    return s;
  }
  // THE COMPILE FRONT. A steady top-down front, ragged by up to 90 ms per
  // three-column group so it reads as compiling, not as a ruler.
  //   age = ms since the front passed the cell
  //   0 .. 90      lift: the character brightens toward ink
  //   90 .. 380    the character in the page's true colour at that cell
  //   380 .. 520   it condenses into a pixel of that colour
  //   520 .. 720   pixel block (the page, one colour per cell)
  //   720 .. 850   block dissolves into full detail
  const FRONT = 950 * kV,
    JIT = 90 * kV,
    S_LIFT = 90 * kV,
    S_GLYPH = 380 * kV,
    S_COND = 520 * kV,
    S_XF = 720 * kV,
    S_DET = 850 * kV;
  const jit = (c: number) => JIT * hash((c / 3) | 0, 21);
  function cellAge(c: number, r: number, t: number): number {
    return t - T.resolve.s - jit(c) - ((GY0 + (r + 0.5) * flh) / H) * FRONT;
  }
  // Rows of column c (from the top) whose age >= X at time t.
  function rowsAged(c: number, t: number, X: number): number {
    const lim = ((t - T.resolve.s - X - jit(c)) / FRONT) * H;
    return clamp(Math.floor((lim - GY0) / flh - 0.5) + 1, 0, NR);
  }
  // Copy a screen-space rect from a device-pixel canvas, clamped to the
  // canvas (out-of-bounds source rects are unreliable in Safari).
  function blit(c: CanvasRenderingContext2D, src: HTMLCanvasElement, x: number, y: number, w: number, h: number): void {
    const x0 = Math.max(0, x),
      y0 = Math.max(0, y),
      x1 = Math.min(W, x + w),
      y1 = Math.min(H, y + h);
    if (x1 <= x0 || y1 <= y0) return;
    c.drawImage(src, x0 * dpr, y0 * dpr, (x1 - x0) * dpr, (y1 - y0) * dpr, x0, y0, x1 - x0, y1 - y0);
  }
  // The resolve: the settled flood compiles, cell by cell, into the page.
  function drawResolve(c: CanvasRenderingContext2D, t: number): void {
    const FS = floodSnap(),
      P = PAGE,
      M = MOSP;
    if (!P || !M) {
      c.drawImage(FS, 0, 0, W, H); // no raster (should not happen): hold the code
      return;
    }
    c.imageSmoothingEnabled = false;
    for (let col = 0; col < NC; col++) {
      const x = GX0 + col * fcw;
      const rD = rowsAged(col, t, S_DET),
        rX = rowsAged(col, t, S_XF),
        rB = rowsAged(col, t, S_COND),
        r0 = rowsAged(col, t, 0);
      // Detail above, pixel blocks below it, the untouched code below the front.
      if (rD > 0) blit(c, P, x, 0, fcw, GY0 + rD * flh);
      if (rB > rD) c.drawImage(M, col, rD, 1, rB - rD, x, GY0 + rD * flh, fcw, (rB - rD) * flh);
      for (let r = rD; r < rX; r++) {
        c.globalAlpha = clamp((cellAge(col, r, t) - S_XF) / (S_DET - S_XF), 0, 1);
        blit(c, P, x, GY0 + r * flh, fcw, flh);
      }
      c.globalAlpha = 1;
      if (r0 < NR) blit(c, FS, x, r0 === 0 ? 0 : GY0 + r0 * flh, fcw, H);
    }
    c.imageSmoothingEnabled = true;
    // Characters in the front band: lift, true colour, condense.
    c.font = ffont;
    c.textAlign = "left";
    c.textBaseline = "middle";
    for (let col = 0; col < NC; col++) {
      const x = GX0 + col * fcw,
        rB = rowsAged(col, t, S_COND),
        r0 = rowsAged(col, t, 0);
      for (let r = rB; r < r0; r++) {
        const i = r * NC + col,
          age = cellAge(col, r, t),
          k = KIND[i],
          ch = CHS[i],
          y = GY0 + r * flh;
        if (age < S_GLYPH) {
          if (!ch) continue;
          if (age < S_LIFT) {
            c.globalAlpha = 1;
            c.fillStyle = LIFT;
          } else if (k === 0) {
            // Nothing to render here: the code dissolves into the canvas.
            c.globalAlpha = 1 - (age - S_LIFT) / (S_GLYPH - S_LIFT);
            c.fillStyle = BIN_CSS[CHL[i]];
          } else {
            c.globalAlpha = GA[i] / 255;
            c.fillStyle = GPAL[GCI[i]] || PAL.text;
          }
          c.fillText(ch, x, y + flh / 2);
          continue;
        }
        if (k === 0) continue;
        // Condense: the character becomes a pixel of the page's own colour.
        const v = (age - S_GLYPH) / (S_COND - S_GLYPH),
          e = lerp(0.3, 1, eOut(v)),
          sw = fcw * e,
          sh = flh * e;
        c.globalAlpha = 1;
        c.fillStyle = GPAL[PCI[i]] || PAL.bg;
        c.fillRect(x + (fcw - sw) / 2, y + (flh - sh) / 2, sw, sh);
        if (ch && v < 0.5) {
          c.globalAlpha = (GA[i] / 255) * (1 - v * 2);
          c.fillStyle = GPAL[GCI[i]] || PAL.text;
          c.fillText(ch, x, y + flh / 2);
        }
      }
    }
    c.globalAlpha = 1;
  }
  function tears(c: CanvasRenderingContext2D, t: number, g: number): void {
    if (g < 0.05) return;
    const b = (t / 50) | 0,
      n = Math.floor(1 + g * 3 + hash(b, 1) * 2 * g);
    for (let j = 0; j < n; j++) {
      const y = Math.floor(hash(b, 10 + j) * H),
        h = Math.floor(3 + hash(b, 20 + j) * 36 * g),
        dx = (hash(b, 30 + j) - 0.5) * 70 * g;
      const sy = Math.round(y * dpr),
        sh = Math.min(Math.round(h * dpr), cv.height - sy);
      if (sh < 1) continue;
      c.drawImage(cv, 0, sy, cv.width, sh, dx, y, W, sh / dpr);
    }
  }
  // CRT: phosphor tint, refresh band, dust, scanlines, vignette. Eases to
  // 35% through the resolve; the handoff line wipes the rest away.
  function post(c: CanvasRenderingContext2D, t: number, g: number): void {
    const k = t < T.resolve.s ? 1 : 1 - 0.65 * sstep(T.resolve.s + 0.2 * T.resolve.d, T.resolve.e, t);
    if (k <= 0.01) return;
    c.globalAlpha = k;
    c.fillStyle = rgba(cAC, 0.03);
    c.fillRect(0, 0, W, H);
    if (band) {
      c.save();
      c.translate(0, ((t * 0.22) % (H + 180)) - 90);
      c.fillStyle = band;
      c.fillRect(0, 0, W, 90);
      c.restore();
    }
    if (g > 0.3 && t >= T.boot.s) {
      const b = (t / 45) | 0;
      c.fillStyle = rgba(cTX, 0.09);
      for (let j = 0; j < 50; j++) c.fillRect(hash(b, j) * W, hash(j, b + 99) * H, 1 + hash(b + 3, j) * 1.5, 1);
    }
    if (scan) {
      c.fillStyle = scan;
      c.fillRect(0, 0, W, H);
    }
    if (vig) {
      c.fillStyle = vig;
      c.fillRect(0, 0, W, H);
    }
    c.globalAlpha = 1;
  }

  /* render(t): the ONE function that draws every intro frame. */
  function render(t0: number): void {
    const t = clamp(t0, 0, END);
    const c = ctx,
      g = glitch(t);
    let sweepY = -1e5;
    if (t >= T.flood.s) ensureTargets(t >= T.resolve.s);
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.globalAlpha = 1;
    c.globalCompositeOperation = "source-over";
    c.clearRect(0, 0, W, H);
    if (t >= T.handoff.s) {
      // Handoff: a calm scan line; everything above it is the live page.
      sweepY = -6 + (Vh + 12) * eInOut((t - T.handoff.s) / Math.max(1, T.handoff.d - 90 * kX));
      if (sweepY >= H) {
        setSkipOpacity(t);
        return;
      }
      c.save();
      c.beginPath();
      c.rect(0, sweepY, W, H - sweepY);
      c.clip();
    }
    c.fillStyle = PAL.bg;
    c.fillRect(0, 0, W, H);
    if (t < T.boot.s) drawSignal(c, t);
    else {
      if (t < T.resolve.s) drawTerm(c, t, g);
      else drawResolve(c, t);
      drawGranted(c, t);
    }
    tears(c, t, g);
    post(c, t, g);
    if (sweepY > -1e4) {
      c.restore();
      // Calmer than the bio site: a thin line and a soft 10 px glow.
      c.fillStyle = rgba(cAC, 0.08);
      c.fillRect(0, sweepY - 5, W, 10);
      c.fillStyle = rgba(cAC, 0.8);
      c.fillRect(0, sweepY - 0.5, W, 1);
    }
    setSkipOpacity(t);
  }
  function setSkipOpacity(t: number): void {
    const op = (1 - sstep(T.handoff.s, T.handoff.s + 250 * kX, t)).toFixed(3);
    if (op !== skOp) {
      sk.style.opacity = op;
      skOp = op;
    }
  }
  function draw(t: number): void {
    try {
      render(t);
    } catch {
      finish();
    }
  }

  /* -- clock + lifecycle -------------------------------------------- */
  function frame(now: number): void {
    raf = 0;
    const dt = last ? Math.min(now - last, 100) : 0;
    last = now;
    if (!live) return;
    It += dt;
    if (It >= END) {
      finish();
      return;
    }
    draw(It);
    schedule();
  }
  function schedule(): void {
    if (raf || done || !live || document.hidden) return;
    raf = requestAnimationFrame(frame);
  }
  function onVis(): void {
    if (document.hidden) {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      last = 0;
    } else schedule();
  }
  function finish(): void {
    if (done) return;
    done = true;
    live = false;
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
    window.removeEventListener("keydown", onKey, true);
    window.removeEventListener("wheel", onKey);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVis);
    if (window.visualViewport) window.visualViewport.removeEventListener("resize", onResize);
    ov.removeEventListener("pointerdown", onKey);
    if (ov.parentNode) ov.parentNode.removeChild(ov);
    uncover();
    try {
      if (D.sr && "scrollRestoration" in history) history.scrollRestoration = D.sr;
    } catch {
      /* ignore */
    }
    window.__eeIntroLive = false;
    activeSkip = null;
    status = "done";
    PAGE = null;
    MOSP = null;
    FSNAP = null;
    onDone();
  }
  function skip(): void {
    if (done || leaving) return;
    leaving = true;
    live = false;
    status = "leaving";
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
    uncover();
    ov.style.transition = "opacity 200ms ease";
    ov.style.opacity = "0";
    setTimeout(finish, 230);
  }
  activeSkip = skip;
  function onKey(): void {
    skip();
  }
  function onResize(): void {
    if (done || leaving) return;
    const vv = window.visualViewport,
      w = window.innerWidth + "/" + (vv ? Math.floor(vv.width) : 0),
      h = window.innerHeight + "/" + (vv ? Math.floor(vv.height) : 0);
    if (w === lastW && h === lastH) return;
    lastW = w;
    lastH = h;
    build();
    if (frozen) {
      if (ready) {
        ensureTargets(true);
        draw(freezeT);
      }
    } else draw(It);
  }
  // Ready = fonts in, visible images decoded, reveal animations settled.
  function whenReady(ms: number, cb: () => void): void {
    let fired = false;
    const go = () => {
      if (fired) return;
      fired = true;
      cb();
    };
    setTimeout(go, ms);
    try {
      const want: Array<Promise<unknown>> = [];
      if (document.fonts && document.fonts.ready) want.push(document.fonts.ready);
      document.querySelectorAll("img").forEach((img) => {
        const r = img.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight || r.width <= 0) return;
        if (img.complete && img.naturalWidth) {
          if (img.decode) want.push(img.decode().catch(() => undefined));
        } else
          want.push(
            new Promise((res) => {
              img.addEventListener("load", res, { once: true });
              img.addEventListener("error", res, { once: true });
            }),
          );
      });
      // Every finite, time-based page animation must finish first (the shell's
      // eeViewIn fade on <main>, the IntersectionObserver reveal fallback, the
      // wordmark flicker), or targets are sampled mid-fade. Infinite loops
      // (LED pulse, caret blink) and scroll-driven reveals never finish: skip.
      if (document.getAnimations) {
        document.getAnimations().forEach((a) => {
          const tm = a.effect && a.effect.getComputedTiming ? a.effect.getComputedTiming() : null;
          const scrollDriven = !!a.timeline && !(a.timeline instanceof DocumentTimeline);
          if (!scrollDriven && tm && isFinite(Number(tm.endTime))) want.push(a.finished.catch(() => undefined));
        });
      }
      Promise.all(want).then(go, go);
    } catch {
      go();
    }
  }
  function onImgLoad(): void {
    if (done || leaving || frozen) return;
    if (targets && It < T.resolve.s) {
      targets = false;
      ensureTargets(true);
    }
  }

  window.addEventListener("keydown", onKey, true);
  window.addEventListener("wheel", onKey, { passive: true });
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVis);
  if (window.visualViewport) window.visualViewport.addEventListener("resize", onResize);
  ov.addEventListener("pointerdown", onKey);
  document.querySelectorAll("img").forEach((img) => {
    if (!(img.complete && img.naturalWidth)) img.addEventListener("load", onImgLoad, { once: true });
  });
  if (!D.force) {
    try {
      window.sessionStorage.setItem(D.key || INTRO_SESSION_KEY, "1");
    } catch {
      /* private mode: plays again next time, harmless */
    }
  }
  try {
    window.scrollTo(0, 0);
  } catch {
    /* ignore */
  }
  {
    const vv = window.visualViewport;
    lastW = window.innerWidth + "/" + (vv ? Math.floor(vv.width) : 0);
    lastH = window.innerHeight + "/" + (vv ? Math.floor(vv.height) : 0);
  }
  build();
  const tt: Record<string, number> = { END };
  PHASE_ORDER.forEach((nm) => (tt[nm] = T[nm].s));
  activeT = tt;
  if (frozen) {
    status = "frozen-pending";
    if (freezeT >= END) {
      finish(); // the last frame IS the page
      return;
    }
    whenReady(2500, () => {
      if (done) return;
      ready = true;
      if (freezeT >= T.flood.s) ensureTargets(true);
      draw(freezeT);
      uncover();
      status = "frozen";
    });
  } else {
    draw(0);
    uncover();
    live = true;
    status = "playing";
    schedule();
    whenReady(2500, () => {
      ready = true;
    });
  }
}

/* ---- 5. PUBLIC API --------------------------------------------------- */
// The intro runs once per document, independent of React's lifecycle.
// Callers (the React component) queue on whenIntroDone(); the ambient layer
// starts from there, after play, skip, off or failure.
let started = false;
let finished = false;
const waiters: Array<() => void> = [];
function flush(): void {
  finished = true;
  while (waiters.length) {
    const w = waiters.shift();
    try {
      if (w) w();
    } catch {
      /* ignore */
    }
  }
}
function installApi(): void {
  if (window.ArchiveIntro) return;
  const api: ArchiveIntroAPI = {
    version: VERSION,
    get status() {
      return status;
    },
    skip: () => {
      if (activeSkip) activeSkip();
    },
    get T() {
      return activeT;
    },
  };
  window.ArchiveIntro = api;
  // shoot-frames.mjs polls window.TerminalIntro.status. Alias only when the
  // shared engine is not on the page.
  if (!window.TerminalIntro) window.TerminalIntro = api;
}
export function whenIntroDone(cb: () => void): void {
  if (typeof window === "undefined") return;
  if (finished) {
    cb();
    return;
  }
  waiters.push(cb);
  if (started) return;
  started = true;
  installApi();
  const D = takeGate();
  if (!D.play || D.expired) {
    uncover();
    status = "off";
    flush();
    return;
  }
  try {
    startIntro(D, flush);
  } catch {
    status = "error";
    const o = document.getElementById("ee-intro");
    if (o && o.parentNode) o.parentNode.removeChild(o);
    uncover();
    window.__eeIntroLive = false;
    flush();
  }
}
/** Reduced-motion check shared with the ambient layer. */
export const prefersReducedMotion = reducedMotion;
