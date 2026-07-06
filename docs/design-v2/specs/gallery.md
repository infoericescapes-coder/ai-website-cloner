# Spec — Location gallery (`/[gallerySlug]`) + Lightbox

Prototype view `gallery` (`isGallery`), lines 149–188; lightbox `lbOpen`, lines 578–592. Reference: `gallery-01-header.png`, `gallery-02-masonry.png`. Applies to ALL 17 existing gallery routes (see `ia-map.md`), not just the 6 featured tiles.

Container: `position:relative;z-index:1;animation:eeViewIn 0.3s ease both;max-width:1560px;margin:0 auto;padding:52px {gutter} 110px`.

---

## 1. Back link
`display:inline-block;cursor:pointer;font-size:11.5px;letter-spacing:0.16em;text-transform:uppercase;color:#8B8F86;transition:color 120ms ease`, hover → `--ee-accent`. → "← Index" → links to `/`.

## 2. Header
`eeReveal…;display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:24px;margin-top:44px;padding-bottom:30px;border-bottom:1px solid rgba(242,239,230,0.13)`.
- **Left — place name:** `font-size:{gTitleFs}` (**72px** desktop / **42px** mobile)`;font-weight:600;line-height:0.9;letter-spacing:0.01em` → `{gTitle}` (place name, e.g. "JAPAN" — prototype keeps it title-case "Japan" actually renders `place.name` = "JAPAN" uppercase; use the place's display name).
- **Right — meta column** (`flex-direction:column;gap:7px;align-items:flex-end;font-size:12px;letter-spacing:0.14em;text-transform:uppercase`):
  - Line 1 (`color:#8B8F86`): `{gMeta1}` = `{code} · {coords}` (e.g. "JPN · 35.68°N 139.69°E").
  - Line 2 (`color:#F2EFE6`, `display:flex;align-items:center;gap:10px`): LED dot (`5px`, `--ee-live`, glow, `eePulse 2.4s`) + `{gMeta2}` = years (e.g. "2023–2026").
- **Data (ours):** code/coords/years from `place-data.json` for the 6 mapped places. For the other 11 galleries (no prototype coords), supply real coords/years OR show a simpler meta ("{N} FRAMES · {year range}") — flag which for Eric. Never invent precise coords; if unknown, drop the coords line and keep `{N} SELECTS` + years.

## 3. Sub-bar
`display:flex;justify-content:space-between;margin:18px 0 30px;font-size:11px;letter-spacing:0.18em;uppercase;color:#8B8F86` → left "Selects" / right "Click a frame to view".

## 4. Masonry
`column-count:{cols};column-gap:18px`. `cols` = **`galleryColumns` (default 3)** desktop / **2** mobile. Each frame:
`break-inside:avoid;margin:0 0 18px;background:{mountBg};border:1px solid {f.border};padding:{mountPad};cursor:pointer;transition:border-color 120ms ease;box-sizing:border-box`.
- Default (`frames:full-bleed`): `mountBg=transparent`, `border=transparent`, `mountPad=0px` → full-bleed frames, no borders. Mounted mode: `mountBg=#2B2D2C`, `mountPad=10px`, border `rgba(242,239,230,0.16)`→`0.45` hover.
- **Image:** `display:block;width:100%;aspect-ratio:{f.r};object-fit:cover;object-position:{f.p}`. `f.r` = per-frame aspect (prototype mixes `3/2, 4/5, 1/1, 16/10, 3/4, 2/3, 4/3` — see support.js FRAMES); real build derives ratio from each image's intrinsic dimensions (or default `3/2`) rather than the prototype's hardcoded set.
- **CRT hover overlay** (absolute, `opacity:{capOp}` 0→1 hover, 120ms): accent tint **0.10** + `eeCrt 2.6s linear infinite`.
- **Caption row** (below image, `margin-top:9px;justify-content:space-between;font-size:11px;letter-spacing:0.13em;uppercase;color:#8B8F86;opacity:{capOp}` 0→1 hover): left `{cap}` = `{NN} · {LOCATION} · {YEAR}` (e.g. "09 · SHIBUYA · 2025"); right `<span color:--ee-accent>+</span>`.
  - **Data (ours):** caption needs frame №, location, year. Our gallery images (`public/images/gallery/<route>/`) are plain files without per-frame location metadata. Options: (a) caption = `{padded index} · {PLACE NAME} · {year}` using the gallery-level place + a year, (b) drop the location token → `{NN} · {PLACE}`. Recommend a simple index-based caption; do NOT fabricate per-frame neighbourhoods. Flag for Eric — the prototype's rich per-frame captions (SHIBUYA/TOSHIMA…) are placeholder data we don't have.

## 5. Footer line
`margin-top:26px;padding-top:14px;border-top:1px solid rgba(242,239,230,0.09);justify-content:space-between;font-size:11px;letter-spacing:0.18em;uppercase;color:#8B8F86` → left "End of selects" / right empty.

## 6. Lightbox (overlay, z-60)
Opens on frame click (`lb` = index). Fixed `inset:0;z-index:60;background:rgba(5,6,5,0.97);display:flex;flex-direction:column`.
- **Top bar:** `justify-content:space-between;align-items:center;padding:20px 32px`. Right: "Close · Esc ✕" (`font-size:11.5px;letter-spacing:0.16em;uppercase;color:#8B8F86`, hover→accent, `onClick` close).
- **Center:** `flex:1;display:flex;align-items:center;justify-content:center;gap:26px;padding:0 24px;min-height:0`, backdrop `onClick` closes (only when target === currentTarget).
  - Left arrow `←`: `padding:24px 20px;font-size:22px;color:--ee-accent`, hover `filter:brightness(1.7)` → prev (wrap).
  - Image: `max-width:min(80vw,1280px);max-height:76vh;object-fit:contain;display:block`.
  - Right arrow `→`: same → next (wrap).
- **NO captions, NO counters** — just photo + nav.
- **Keyboard:** `Esc` close, `←`/`→` navigate (modulo wrap: `(lb + d + len) % len`). Add a `keydown` listener while open; remove on close. Trap focus / lock body scroll while open (add — prototype doesn't, but it's correct behaviour).
- **Data (ours):** frames = the gallery's real image list; lightbox `src` = full-res image. `stepLb` wraps within the current gallery's frames.

## Responsive summary
gutter 20→40 · gTitleFs 42→72 · masonry cols 2→3(config) · meta column right-aligned both. Lightbox unchanged (uses vw/vh caps).
