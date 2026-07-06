"use client";

/**
 * LED status dot — eePulse 2.4s glow. Colour --ee-live, always with the
 * two-layer box-shadow (see .ee-led in globals.css). Motion doctrine: MAX ONE
 * glowing pulsing element per view. Reduced-motion kills the pulse via the
 * global `.ee-root *` rule; the dot stays visible (static).
 */
export default function LedDot({
  size = 6,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`ee-led ${className}`}
      style={{ width: size, height: size, display: "inline-block" }}
      aria-hidden
    />
  );
}
