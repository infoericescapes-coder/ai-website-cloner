# Spec — About & identity (`/about`)

Prototype view `about` (`isAbout`), lines 279–394. Reference: `about.png`. Maps to existing `/about`.

Container: `position:relative;z-index:1;animation:eeViewIn 0.3s ease both;max-width:1280px;margin:0 auto;padding:76px {gutter} 110px`.

---

## 1. Two-column intro
`eeReveal…;display:grid;grid-template-columns:{aboutCols}` (**`1.2fr 0.8fr`** desktop / `1fr` mobile)`;gap:{aboutGap}` (**88px**/44px)`;align-items:start`.

**Left column:**
- Kicker: `font-size:12px;letter-spacing:0.18em;uppercase;color:#8B8F86` → "About · the person behind the archive".
- Statement (`margin-top:26px;font-size:{heroFs}` (**44px**/30px)`;font-weight:500;line-height:1.14;letter-spacing:-0.015em;text-wrap:pretty`) → "I photograph the version of a city that exists just before everyone looks up."
- Paragraph 1 (`margin:36px 0 0;font-size:17px;line-height:1.7;color:#F2EFE6;max-width:58ch`) → "Eric Escapes is the working archive of Eric, a street and travel photographer based in Sydney. Since 2019 the frames have been filed by place rather than by date, because memory works in places, not months. Five countries in the index so far; the darkroom queue is longer."
- Paragraph 2 (`margin:22px 0 0;` same) → "The pictures are about the in-between: station platforms, food windows, last light on ordinary streets. If a frame needs a caption to matter, it doesn't go in."
- Contact row (`display:flex;gap:34px;margin-top:40px;font-size:11.5px;letter-spacing:0.16em;uppercase`), each `color:#8B8F86` → `--ee-accent` hover (120ms):
  - `mailto:hello@ericescapes.com` → "hello@ericescapes.com ↗"
  - `target=_blank instagram.com/ericescapes` → "Instagram ↗"
  - `target=_blank ericescapes.substack.com` → "Substack ↗"

**Right column — portrait:**
- Frame: `background:{mountBg};border:1px solid {aboutBorder};padding:{aboutPad}` (default transparent/0; mounted → mount grey/12px/0.16 border).
- Image: `display:block;width:100%;aspect-ratio:4/5;object-fit:cover;object-position:72% 40%`.
- Caption (`margin-top:10px;font-size:11px;letter-spacing:0.14em;uppercase;color:#8B8F86`) → "Self, reflected · Toshima, 2025".
- **Data (ours):** use a real portrait/self-frame — `public/images/about/` (1 file) is the existing about image. Confirm the exact portrait with Eric; keep the 4:5 crop + caption format.

## 2. Identity board — "marks & fragments"
`margin-top:100px`.
- Header row (`justify-content:space-between;align-items:baseline;padding-bottom:16px;border-bottom:1px solid rgba(242,239,230,0.13)`): left "Identity · marks & fragments" (12px kicker); right "Registry plate · adopted from 1d" (11px, 0.14em uppercase muted).
- Grid: `grid-template-columns:{identityCols}` (**`repeat(3,1fr)`** desktop / `1fr` mobile)`;gap:2px;margin-top:2px`. **6 cards**, each `eeReveal…;background:#0B0D0B;border:1px solid rgba(242,239,230,0.08);padding:34px;display:flex;flex-direction:column;gap:30px`. Each card = a `96px`-tall centered specimen + a label row (`justify-content:space-between;font-size:10.5px;letter-spacing:0.16em;uppercase;color:#8B8F86` → `{label}` + `{NN}`).

The 6 specimens (verbatim SVG geometry — all use the monogram path set from `shell.md` §3):

1. **Wordmark · registry plate** (01): a bordered plate `border-top+border-bottom:1px solid rgba(242,239,230,0.18);padding:14px 2px;flex-direction:column;align-items:center;gap:10px`. Row = monogram SVG `20×20` (stroke `#F2EFE6`, sw 1.5) + "ERIC ESCAPES" `14px/600/0.2em`. Sub = "VISUAL ARCHIVE · EST. 2019" `8.5px/500/0.28em/#8B8F86`. (Or use `public/brand-v2/logos/ee-registry-plate.svg`.)
2. **Monogram · thin line** (02): monogram SVG `56×56`, stroke `#F2EFE6`, sw 1.5. (`ee-monogram-white.svg`.)
3. **Active state** (03): monogram SVG `56×56`, stroke `var(--ee-accent)`, sw 1.5. (`ee-monogram-green.svg`.)
4. **Fragment · hover frame** (04): a `74×74` box — inner img `inset:8px;58×58;object-fit:cover;object-position:60% 40%` + 4 accent corner brackets (`14px`, `1px`, `--ee-accent`) at the box corners. Use a real gallery frame for the img.
5. **Favicon · current → derived** (05): `34×34` white tile holding the current favicon (`20×20`, `image-rendering:pixelated`) + `<span color:#8B8F86>→</span>` + `34×34` `#050605` tile (`border:1px solid rgba(242,239,230,0.14)`) holding monogram SVG `20×20` stroke `#F2EFE6` **sw 3** (the heavier favicon weight — see `ee-favicon.svg`).
6. **Loading mark** (06): monogram SVG `26×26` (stroke `#F2EFE6`, sw 1.5, `opacity:0.85`) + LED dot (`5px`, `--ee-live`, glow, `eePulse` **1.6s** — the one non-2.4s pulse) + "LOADING ARCHIVE" `11px/0.2em/#8B8F86`.

- **Assets (ours):** all brand marks are in `public/brand-v2/logos/` (`ee-monogram-white/green/black.svg`, `ee-registry-plate.svg`, `ee-lockup-horizontal.svg`, `ee-favicon.svg`) + PNG renders in `logos/png/`. Prefer inlining the SVG paths (as the prototype does) for crisp stroke control + accent theming via `currentColor`/CSS var; the standalone SVG files are the fallback.

## Responsive summary
gutter 20→40 · aboutCols `1fr`→`1.2fr 0.8fr` · aboutGap 44→88 · heroFs 30→44 (statement) · identityCols `1fr`→`repeat(3,1fr)` (cards stack single-column on mobile). max-width 1280.
