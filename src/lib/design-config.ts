/**
 * design-v2 config — mirrors the prototype's `data-props` tweakables so the look
 * is adjustable without touching components (tokens.md §7). Defaults are the
 * prototype's shipped defaults.
 */
export type BackdropMode = "dust" | "code" | "rain";
export type FramesMode = "full-bleed" | "mounted";
export type BracketsMode = "hover" | "always" | "off";

export interface DesignConfig {
  /** UI accent — sets --ee-accent. */
  accent: string;
  /** canvas backdrop mode */
  backdrop: BackdropMode;
  /** SVG grain + scan-line overlays */
  grain: boolean;
  /** backdrop glow intensity multiplier k (0–1.5) */
  atmosphere: number;
  /** gallery frame treatment */
  frames: FramesMode;
  /** tile corner-bracket visibility */
  brackets: BracketsMode;
  /** masonry column count (desktop) */
  galleryColumns: number;
  /** ambient nav/footer glitch — ships off initially (motion.md §8) */
  ambientGlitch: boolean;
}

export const designConfig: DesignConfig = {
  accent: "#5FB53C",
  backdrop: "dust",
  grain: true,
  atmosphere: 1.4,
  frames: "full-bleed",
  brackets: "hover",
  galleryColumns: 3,
  ambientGlitch: false,
};
