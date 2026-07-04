# Homepage Portfolio Tiles — hover interaction (from Eric's reference)

Reference: `Example Hover.png` (staged in the migration folder) — shows the Sydney Opera photo with a moderate dark overlay and a centered bold white **"Sydney"** label. On the live site the location photos are clickable portfolio tiles: hover → darken + reveal centered bold white location label → click goes to that location's gallery.

## The 5 portfolio tiles (image → label → gallery route)
| Image | Label | Links to |
|---|---|---|
| `/images/home/hero-sydneyopera.jpg` | **Sydney** | `/sydney2` |
| `/images/home/shibuya-night.jpg` | **Japan** | `/japan` |
| `/images/home/saigon-district10.jpg` | **Vietnam** | `/vietnam` |
| `/images/home/hallstatt-morning.jpg` | **Austria** | `/austria` |
| `/images/home/venice.jpg` | **Italy** | `/italy1` |

`/images/home/afterdark-after.jpg` is NOT a tile — leave it as a plain showcase image (no hover/label/link).

## Component: `src/components/PortfolioTile.tsx`
**EXACT values from Eric's live Squarespace custom-CSS injection (ground truth — use these precisely, not estimates):**
Reusable. Props: `src`, `alt`, `label`, `href`, plus optional layout flags (the hero is inset ~83% width; the others are full-bleed bands — keep their existing sizing, just wrap them).
- Wrap the `next/image` in a Next `<Link href={href}>` (internal route, relative, no target=_blank).
- **Overlay + label are ONE layer** (like the site's single `::after`): absolutely positioned `inset: 0`, flex centered, `background: rgba(0,0,0,0.5)`, `opacity: 0` at rest → `opacity: 1` on reveal, `transition: opacity 0.3s ease`, `pointer-events: none`.
- Label text: white `#fff`, **font-weight 600**, **font-size `clamp(18px, 2.2vw, 28px)`**, **letter-spacing 0.02em**, centered. Font-family: Poppins (site default; not explicitly set in the injection so it inherits).
- **Reveal behaviour:**
  - **Desktop (≥640px):** reveal on `:hover` OR `:focus-within` (keyboard).
  - **Mobile (<640px):** tap-to-reveal — first tap reveals the label for ~3s and PREVENTS navigation (`e.preventDefault()`); a second tap within that window navigates. Implement with a client state/class toggle: first tap sets a "revealed" state (auto-clears after 3s) and blocks the Link; if already revealed, let the Link through. On desktop, taps/clicks navigate normally.
- Whole tile is the click target. Keyboard-focusable (it's a Link).
- Preserve the current image aspect/sizing for hero (inset) vs bands (full-bleed) — this component just adds the link + overlay on top.

## Apply in `src/app/page.tsx`
Replace the 5 location images (hero + 4 showcase bands) with `<PortfolioTile>` using the table above. Keep section order and the afterdark image unchanged.

## Verify
`npm run check` clean, no `any`. Hover shows darken + label; click routes to the (not-yet-built) gallery path (will 404 until galleries are built — that's expected, the routes are correct for when they exist).
