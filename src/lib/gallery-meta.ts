/**
 * Gallery header metadata (design-v2, specs/gallery.md §2).
 *
 * The 6 primary places carry real code / coords / years from place-data.json
 * (prototype-verbatim, reconciled against the real repo inventory). Hong Kong
 * is the locked 6th tile (Eric decision, 2026-07-06) with its own real gallery.
 *
 * The other 11 galleries have NO real coordinates — per the spec we NEVER invent
 * precise coords. They degrade gracefully to a "{N} SELECTS" data line (with a
 * year range only where we actually know it, which for the scraped archive we do
 * not, so it is left blank). `resolveGalleryMeta` centralises that fallback so
 * every route renders a consistent, honest header.
 */

export interface GalleryMeta {
  /** Display place name for the header title (uppercased by the component). */
  name: string;
  /** ISO-ish country/place code, e.g. "JPN". Only for mapped places. */
  code?: string;
  /** Coordinate string, e.g. "35.68°N 139.69°E". NEVER invented. */
  coords?: string;
  /** Year range, e.g. "2023–2026" (en dash allowed in ranges only). */
  years?: string;
}

/**
 * Route slug (without leading slash) -> real, non-invented header metadata.
 * Only the mapped places appear here; everything else falls through to the
 * "{N} SELECTS" degraded line.
 */
const GALLERY_META: Record<string, GalleryMeta> = {
  sydney2: {
    name: "SYDNEY",
    code: "SYD",
    coords: "33.87°S 151.21°E",
    years: "2023–2026",
  },
  japan: {
    name: "JAPAN",
    code: "JPN",
    coords: "35.68°N 139.69°E",
    years: "2023–2026",
  },
  vietnam: {
    name: "VIETNAM",
    code: "VNM",
    coords: "10.78°N 106.70°E",
    years: "2024–2025",
  },
  austria: {
    name: "AUSTRIA",
    code: "AUT",
    coords: "47.56°N 13.65°E",
    years: "2022–2024",
  },
  italy1: {
    name: "ITALY",
    code: "ITA",
    coords: "45.44°N 12.33°E",
    years: "2022–2025",
  },
  // 6th tile — locked to Hong Kong (Eric, 2026-07-06). Coords/code/year per
  // the brief: HKG · 22.28°N 114.16°E · 2025.
  hongkong: {
    name: "HONG KONG",
    code: "HKG",
    coords: "22.28°N 114.16°E",
    years: "2025",
  },
};

/**
 * Resolve a gallery's header data line inputs from its route slug.
 *
 * @param slug   route slug without a leading slash (e.g. "japan", "cenycoast")
 * @param name   fallback display name for unmapped galleries
 * @returns      the mapped meta, or a name-only object triggering the
 *               "{N} SELECTS" degraded line in the component.
 */
export function resolveGalleryMeta(slug: string, name: string): GalleryMeta {
  return GALLERY_META[slug] ?? { name };
}
