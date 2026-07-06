# Design v2 — Tokens (Eric Escapes photography archive)

Canonical token reference for the ericescapes.com redesign. Extracted from the LOCKED Claude Design handoff (`tokens.css` v0.2, `tokens.json`, and the prototype inline styles in `Eric Escapes.dc.html`). **Rule: where the prototype markup and tokens.css disagree, the prototype markup wins.** No disagreements were found on colour; disagreements on the mobile breakpoint are noted in the specs (`shell.md`).

Source of truth files (read-only, never edit):
- `brand/tokens.css`, `brand/tokens.json`
- `Eric Escapes.dc.html` (prototype markup + DCLogic `renderVals()`)
- `support.js` / embedded `<script type="text/x-dc">` (data + backdrop canvas)

---

## 1. Colour tokens

| Token | Hex / value | Role (from tokens.json colorUsage + prototype) |
|---|---|---|
| `--ee-canvas` | `#050605` | Page background. Also nav `rgba(5,6,5,0.92)`, lightbox `rgba(5,6,5,0.97)`, chip bg `rgba(5,6,5,0.55)`. |
| `--ee-panel` | `#0B0D0B` | Lifted panels: article prose panels, identity cards, pack panel, subscribe bar, tile fallback bg. |
| `--ee-mount` | `#2B2D2C` | Photo mount grey — **only** in optional `frames="mounted"` mode. Default imagery is full-bleed (`transparent`). |
| `--ee-black` | `#000000` | Index bars, status bars, hard-black strips (top+bottom hairlines). |
| `--ee-text` | `#F2EFE6` | Primary text, warm off-white. |
| `--ee-muted` | `#8B8F86` | Metadata, kickers, secondary text, data lines, placeholders. |
| `--ee-accent` | `#5FB53C` | **UI accent** (SPLIT from live): hovers, arrows, active nav underline, CTA fill, bracket-hover, `+` marks, `→` marks. This is the default `accent` config value. |
| `--ee-accent-rgb` | `95, 181, 60` | RGB triplet for `rgba()` glows/tints built on the UI accent. |
| `--ee-live` | `#6BFF4A` | **Bright LED** (SPLIT from accent): pulsing status dots **ONLY**, always with soft glow, **max one glowing element per view**. Also the prototype's CSS-var *fallback* value (`var(--ee-accent,#6BFF4A)`) — see note below. |
| `--ee-pressed` | `#1F7A2E` | Pressed states, tag fills, text `::selection` bg, progress-bar gradient start. |
| `--ee-hairline` | `rgba(242,239,230,0.09)` | Default hairline: nav bottom, index-bar borders, row separators, panel borders (`0.08` in some panels — see below). |
| `--ee-hairline-strong` | `rgba(242,239,230,0.13)` | Section underlines (gallery header, diaries header, "See the difference"). |
| `--ee-hairline-rest` | `rgba(242,239,230,0.35)` | Resting corner brackets on place tiles; first hero counter segment. |

### Colour discrepancies / gotchas (prototype wins)

1. **Accent split is real and load-bearing.** `--ee-accent` (`#5FB53C`) is the muted UI green; `--ee-live` (`#6BFF4A`) is the bright LED. In the prototype, the root div sets `--ee-accent:{{ accentHex }}` where `accentHex` defaults to `#5FB53C` (`renderVals()` `ACC = P.accent ?? '#5FB53C'`). Every `var(--ee-accent,#6BFF4A)` in the markup therefore resolves to **`#5FB53C`** at runtime — the `#6BFF4A` is only a fallback if the var is unset. **Build both as distinct tokens.** Use `--ee-accent` for all UI green, `--ee-live` for the glow dots. Do NOT collapse them.
2. **Panel border alpha varies.** tokens.css says default hairline is `0.09`. Prototype prose/identity/pack/subscribe panels use `rgba(242,239,230,0.08)` and subscribe uses `0.07`. These are intentional per-panel nudges — quote the exact value from each spec, don't normalise to `0.09`.
3. **Hero counter segments** use `0.35` (first, "active") then `0.18` (rest) — `0.18` is NOT a named token; it's a one-off. Hairline-rest `0.35` is the named one.
4. **Corner-bracket resting alpha** on the subscribe/pack panels is `0.45`, not `0.35`. `0.35` is tiles only. Both appear; keep them distinct.
5. **`::selection`** = bg `#1F7A2E` (`--ee-pressed`), text `#F2EFE6`. Scrollbar: `scrollbar-color: #2B2D2C #050605`.

---

## 2. Type scale (Space Grotesk only)

Family: **Space Grotesk**, self-hosted, weights 400 / 500 / 600 (700 available but the prototype only uses up to 600). Every text node in the prototype sets `font-family:'Space Grotesk',sans-serif`.

Extracted from the prototype inline styles (desktop values; mobile values in parens where `renderVals()` swaps them via the `M` flag). "Tracking" = `letter-spacing`.

### Display / titles

| Use | Size (desktop / mobile) | Weight | line-height | tracking | Prototype source |
|---|---|---|---|---|---|
| Gallery place title | **72px / 42px** (`gTitleFs`) | 600 | 0.9 | 0.01em | gallery header |
| Home place-tile name | **44px / 32px** (`tileNameFs`) | 600 | 0.95 | 0.01em | tile name |
| Hero statement / About statement | **44px / 30px** (`heroFs`) | 500 | 1.16 (hero) / 1.14 (about) | −0.015em | hero, about |
| Big title (diaries / article / shop / preset H1) | **56px / 34px** (`bigTitleFs`) | 600 | 1.0 (diaries/shop) / 1.02 (article/preset) | −0.01em | 4 views |
| Pack panel title | **34px** | 600 | — | −0.01em | pack panel |
| Section titles: diary-row title | **28px** | 500 | 1.15 | −0.005em | diaries index rows |
| Shop product title / home-diary title | **28px / 24px** | 500 | — | −0.005em | shop row (28) / home diary (24) |
| Home-diary title / look name / lightbox arrows | **24px** | 500 (look/diary) | — | — | home diaries, preset look names |
| Prev/next titles | **20px** | 500 | — | — | article prev/next |
| FAQ question / About-these Q | **18px** | 500 | — | — | preset FAQ |

### Body

| Use | Size | line-height | Weight | Colour | Source |
|---|---|---|---|---|---|
| Article prose | **17.5px** | 1.75 | 400 | `--ee-text` | prose panels, preset intro |
| About / preset paragraphs | **17px / 16.5px** | 1.7 / 1.75 | 400 | text or muted | about (17/1.7), preset "about these" (16.5/1.75) |
| Look descriptions / pack para / bullets | **16px / 15px** | 1.7 / 1.6 | 400 | muted (16) / text (15 bullets) | preset |
| Diary excerpt / FAQ answer | **15px / 15.5px** | 1.55 / 1.7 | 400 | muted | diaries (15/1.55, 56ch), FAQ (15.5/1.7, 66ch) |
| Home-diary excerpt / shop one-liner | **15px / 16px** | 1.6 | 400 | muted | shop row |
| Subscribe sub-copy | **12.5px** | 1.75 | 400 | muted | subscribe bar (tracking 0.06em) |

### Data lines / labels (uppercase, tracked, muted)

| Use | Size | tracking | transform | Source |
|---|---|---|---|---|
| Section kickers ("Index · by place", "Latest diaries", "Field notes…") | **12px** | 0.18em | uppercase | many |
| Gallery meta (`CODE · coords`, years) | **12px** | 0.14em | uppercase | gallery header |
| Article/diary data line ("Kamakura, JP · …") | **12px** | 0.14em / 0.18em | uppercase | article |
| Index-bar / status-bar text ("06 places · 263 frames") | **11px** | 0.18em | uppercase | index bar |
| Nav links | **11.5px / 10px** (`navLinkFs`) | 0.16em | uppercase | nav |
| Back links ("← Index"), "All entries →", captions | **11.5px** | 0.16em | uppercase | back links |
| Frame caption (`09 · SHIBUYA · 2025`), photo-break caption | **11px** | 0.13em / 0.18em | uppercase | gallery frame / article break |
| Tile index number ("01") | **11px** | 0.18em | — | tile (colour `rgba(242,239,230,0.6)`) |
| Wordmark "ERIC ESCAPES" | **14px** | 0.24em | (600) | nav lockup |
| Wordmark sub "VISUAL ARCHIVE" | **9px** | 0.28em | (500) | nav lockup (hidden on mobile) |
| Subscribe heading "JOURNAL UPDATES…" | **12px** | 0.24em | (600) | subscribe |
| CTA button "GET THE PACK →" | **12.5px** | 0.2em | (600) | pack CTA |
| BEFORE/AFTER chips | **10.5px** | 0.2em | — | preset comparisons |
| Identity card labels | **10.5px** | 0.16em | uppercase | about identity board |
| Hero frame counter "001" | **11px** | 0.22em | — | hero |
| Year-break labels ("2026") | **11px** | 0.22em | — | diaries index |

**Copy rules (from tokens.json voice):** middle dot `·` separators in labels; **no em dashes anywhere** (en dash `–` OK in year ranges only); no exclamation marks; quiet first-person prose.

---

## 3. Spacing / layout tokens

| Token (renderVals key) | Desktop | Mobile (`M`, vw < 760) |
|---|---|---|
| `gutter` (page horizontal padding) | `40px` | `20px` |
| `heroPad` | `190px 40px 130px` | `96px 20px 72px` |
| Nav height | `60px` | `60px` |
| `navGap` | `36px` | `14px` |
| Content max-widths | home/footer/subscribe `1560px`; diaries `1180px`; article/shop/preset `860px`; about `1280px` | full-width minus gutter |
| `panelPad` (article prose) | `56px 72px` | `30px 22px` |
| `packPad` | `52px 60px` | `30px 22px` |
| `subPad` | `40px 56px` | `28px 22px` |
| `aboutCols` / `aboutGap` | `1.2fr 0.8fr` / `88px` | `1fr` / `44px` |
| `homeDiaryCols` | `340px 1fr 48px` | `1fr` |
| `diaryRowCols` | `230px 1fr 44px 168px` | `1fr` |
| `identityCols` | `repeat(3,1fr)` | `1fr` |
| `instaCols` | `repeat(6,1fr)` | `repeat(3,1fr)` |
| `baCols` (before/after) / `baH` | `1fr 1fr` / `52vh` | `1fr` / `32vh` |
| `footCols` | `1fr auto 1fr` | `1fr` |
| Place grid | `repeat(12,1fr)`, `gap:2px`, tiles `span 4` (`span 6` mobile), aspect `3/4` | as noted |
| Gallery masonry | `column-count:3` (`galleryColumns` 2–4), `column-gap:18px`, `margin-bottom:18px` | `column-count:2` |
| Corner brackets (tiles) | `16×16px`, `1px`, `14px` inset | same |
| Corner brackets (panels) | `14×14px`, `1px`, at `-1px` offset | same |
| Status LED dot | `6px` (home) / `5px` (gallery/footer/subscribe), glow `0 0 16px …0.7, 0 0 4px …0.95` | same |

---

## 4. Motion tokens

Full detail + keyframe source in `motion.md`. Summary:

| Token | Value |
|---|---|
| `--ee-hover` | `120ms ease` (color / opacity / border-color ONLY) |
| LED pulse | `eePulse 2.4s ease-in-out infinite` (opacity 1 → 0.2 → 1); loading mark uses `1.6s` |
| Wordmark flicker | `eeFlicker 0.9s linear 0.25s 1 both`, once/session (`sessionStorage 'ee-flicker-done'`) |
| Scroll reveal | `eeReveal 0.75s cubic-bezier(.2,.7,.2,1) both`, `animation-timeline:view(); animation-range: entry 0% entry 30%` |
| View-in (per page) | `eeViewIn 0.3s ease both` |
| Photo hover CRT | `eeCrt 2.6s linear infinite` over accent tint (0.08 tiles / 0.10 gallery) |
| Hero caret blink | `eeBlink 1.15s steps(1) infinite` |
| Scan line (grain) | `eeScan 26s linear infinite` |
| Ambient glitch | `eeGlitch 0.55s linear 1`, random nav/footer every 12–38s |
| Reduced motion | `@media (prefers-reduced-motion: reduce) { * { animation:none !important; transition:none !important } }` |

---

## 5. Tailwind v4 `@theme` block (ready to paste)

Add to `src/app/globals.css`. Tailwind v4 reads `@theme` custom properties and generates utilities (`bg-ee-canvas`, `text-ee-muted`, `border-ee-hairline`, etc.). The existing shadcn `@theme inline` block stays; this is additive. Because the redesign is a dark, self-contained visual system, prefer these `ee-` tokens over the shadcn oklch set inside redesign components.

```css
/* ── Eric Escapes design-v2 tokens ─────────────────────────── */
@theme {
  /* Surfaces */
  --color-ee-canvas: #050605;
  --color-ee-panel:  #0B0D0B;
  --color-ee-mount:  #2B2D2C;
  --color-ee-black:  #000000;

  /* Ink */
  --color-ee-text:  #F2EFE6;
  --color-ee-muted: #8B8F86;

  /* Accent system (SPLIT — do not collapse) */
  --color-ee-accent:  #5FB53C;   /* UI: hovers, arrows, active nav, CTA fill */
  --color-ee-live:    #6BFF4A;   /* pulsing LED dots ONLY, always glowing */
  --color-ee-pressed: #1F7A2E;   /* pressed, tag fill, ::selection bg */

  /* Hairlines (rgba, never solid grey) */
  --color-ee-hairline:        rgba(242, 239, 230, 0.09);
  --color-ee-hairline-strong: rgba(242, 239, 230, 0.13);
  --color-ee-hairline-rest:   rgba(242, 239, 230, 0.35);

  /* Accent rgb triplet for arbitrary rgba() glows: rgb(var(--ee-accent-rgb) / .x) */
  --ee-accent-rgb: 95 181 60;
  --ee-live-rgb:   107 255 74;

  /* Font family (wired to next/font var — see section 6) */
  --font-grotesk: var(--font-space-grotesk), 'Space Grotesk', sans-serif;

  /* Motion */
  --ease-ee: cubic-bezier(0.2, 0.7, 0.2, 1);
  --duration-ee-hover: 120ms;
}

/* Plain CSS custom props (for inline styles / non-utility use, mirrors tokens.css) */
:root {
  --ee-canvas: #050605;  --ee-panel: #0B0D0B;  --ee-mount: #2B2D2C;  --ee-black: #000;
  --ee-text: #F2EFE6;    --ee-muted: #8B8F86;
  --ee-accent: #5FB53C;  --ee-accent-rgb: 95, 181, 60;
  --ee-live: #6BFF4A;    --ee-live-rgb: 107, 255, 74;  --ee-pressed: #1F7A2E;
  --ee-hairline: rgba(242,239,230,0.09);
  --ee-hairline-strong: rgba(242,239,230,0.13);
  --ee-hairline-rest: rgba(242,239,230,0.35);
  --ee-hover: 120ms ease;
}

/* Keyframes — see motion.md for the full set + reduced-motion kill switch */
```

> Note: Tailwind v4 arbitrary colour with the rgb triplet: `bg-[rgb(var(--ee-live-rgb)/0.7)]`. For the LED glow, keep the exact prototype box-shadow as an inline style or a `.ee-led` utility class — it is a two-layer shadow that no single Tailwind token expresses cleanly.

---

## 6. `next/font/local` plan (4 Space Grotesk weights)

Fonts are copied to `public/fonts/` (done in this handoff):
`SpaceGrotesk-Regular.woff2` (400), `-Medium.woff2` (500), `-SemiBold.woff2` (600), `-Bold.woff2` (700).

`next/font/local` reads from the filesystem, so reference them relative to the file that declares the font (typically `src/app/layout.tsx` or a `src/lib/fonts.ts`). Recommended: create `src/lib/fonts.ts`:

```ts
import localFont from "next/font/local";

export const spaceGrotesk = localFont({
  src: [
    { path: "../../public/fonts/SpaceGrotesk-Regular.woff2",  weight: "400", style: "normal" },
    { path: "../../public/fonts/SpaceGrotesk-Medium.woff2",   weight: "500", style: "normal" },
    { path: "../../public/fonts/SpaceGrotesk-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/SpaceGrotesk-Bold.woff2",     weight: "700", style: "normal" },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});
```

Then in `layout.tsx`, add `spaceGrotesk.variable` to the `<html>` (or `<body>`) className. The `@theme` `--font-grotesk` above resolves through `--font-space-grotesk`, so `font-grotesk` (Tailwind) and `font-family:var(--font-grotesk)` (inline) both work.

- `display: "swap"` matches the prototype's `font-display: swap`.
- The prototype declares weight 700 as "Bold" but only uses ≤600. Include 700 for completeness (small cost); it is the only weight not exercised by the current views.
- Do NOT use `next/font/google` for Space Grotesk — the design mandates the self-hosted files (offline-safe, exact hinting, no Google request). The old `--font-poppins` / `--font-open-sans` / `--font-dm-mono` vars in globals.css belong to the OLD site; leave them for un-migrated pages, but redesign views use `--font-grotesk` exclusively.

---

## 7. Config-driven props (build as env/config, prototype `data-props`)

The prototype exposes tweakables (`<script … data-props>`). Translate to a small config module (e.g. `src/lib/design-config.ts`) so the look is adjustable without touching components:

| Prop | Type | Default | Options | Effect |
|---|---|---|---|---|
| `accent` | colour | `#5FB53C` | `#5FB53C` / `#6BFF4A` / `#1F7A2E` | sets `--ee-accent` |
| `backdrop` | enum | `dust` | `dust` / `code` / `rain` | canvas backdrop mode (see motion.md) |
| `grain` | bool | `true` | — | SVG grain + scan line overlays |
| `atmosphere` | range 0–1.5 | `1.4` | step 0.1 | backdrop glow intensity multiplier `k` |
| `frames` | enum | `full-bleed` | `full-bleed` / `mounted` | gallery frame treatment (mount grey + padding) |
| `brackets` | enum | `hover` | `hover` / `always` / `off` | tile corner-bracket visibility |
| `galleryColumns` | int 2–4 | `3` | — | masonry column count (desktop) |

Defaults above are the prototype's shipped defaults (`atmosphere` default is `1.4` in `data-props`, though the RM fallback uses `1`).
