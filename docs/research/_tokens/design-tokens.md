# ericescapes.com — Design Tokens (source of truth)

Extracted live from https://www.ericescapes.com/ (Squarespace). Every page reuses these.

## Fonts (Google Fonts)
- **Poppins** — nav, logo wordmark, UI/body headings. Weights seen: 400. Load 300/400/500/600.
- **Open Sans** — body copy, section headings (h1–h4 render at 400). Load 400/600/700.
- **DM Mono** — eyebrow/label microtype (the signature detail). Weight 400.

## Colour
- `--background: #ffffff` (white) — body background
- `--foreground: #000000` (black) — body text
- Header bar: `rgba(0, 0, 0, 0.77)` translucent black, overlays hero
- Nav text: `#ffffff`
- Eyebrow label text: `rgba(255,255,255,0.85)` on dark; on light sections it's near-black

## Type scale (computed)
- Body base: `20px`
- Nav link: Poppins `20px` / 400 / white / no transform / normal tracking
- Section heading (h4 role): Open Sans `30px` / 400
- **Eyebrow label** (e.g. `CURRENTLY SHOOTING WITH`, `EDC CAMERA`): DM Mono `13px` / 400 / `letter-spacing: 3.9px` / `text-transform: uppercase`

## Layout
- Header: `position: absolute` (transparent-over-hero pattern), height ≈ `174px`, full-bleed
- Content sections: full-bleed images, generous vertical whitespace, centered content columns
- Squarespace section model: 5 `section` blocks on the homepage

## Global patterns
- Full-bleed photography, lots of negative space
- Monospace micro-labels above/around content is the brand signature
- Nav: `Home · About · Blog · Shop` + Instagram icon + link (Substack) icon, right-aligned
- Logo: white wordmark PNG (`/brand/logo-white.png`) — "EE" monogram + ERIC ESCAPES
