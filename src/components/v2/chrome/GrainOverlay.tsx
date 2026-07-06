"use client";

/**
 * Film grain + scan line (shell.md §6, motion.md §10, §7). Gated on the
 * `grain` prop upstream. Grain opacity 0.028 (~2.8%, never a visible texture);
 * scan line sweeps via eeScan 26s. Both fixed, pointer-events:none.
 * Reduced-motion halts eeScan through the global rule; grain is static so it
 * stays (it is tooth, not motion).
 */
const GRAIN =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>` +
      `<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>` +
      `<feColorMatrix type='saturate' values='0'/></filter>` +
      `<rect width='100%' height='100%' filter='url(#n)'/></svg>`,
  );

export default function GrainOverlay() {
  return (
    <>
      {/* scan line — z-89 */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          height: 1,
          zIndex: 89,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, rgba(var(--ee-accent-rgb),0) 0%, rgba(var(--ee-accent-rgb),0.09) 30%, rgba(var(--ee-accent-rgb),0.24) 50%, rgba(var(--ee-accent-rgb),0.09) 70%, rgba(var(--ee-accent-rgb),0) 100%)",
          animation: "eeScan 26s linear infinite",
        }}
      />
      {/* grain — z-90 */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 90,
          pointerEvents: "none",
          opacity: 0.028,
          backgroundImage: `url("${GRAIN}")`,
          backgroundSize: "180px 180px",
        }}
      />
    </>
  );
}
