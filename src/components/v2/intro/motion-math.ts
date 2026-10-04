/* =====================================================================
   motion-math.ts

   Pure helpers shared by the archive intro engine, the homepage ambient
   layer and the photo render-in (homepage tiles + gallery frames). Moved
   out of archive-intro-engine.ts unchanged so the galleries can use them
   without pulling the intro engine into their bundle. None of these read
   a clock.
   ===================================================================== */

export const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

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

/** prefers-reduced-motion: reduce */
export function reducedMotion(): boolean {
  try {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  } catch {
    return false;
  }
}
