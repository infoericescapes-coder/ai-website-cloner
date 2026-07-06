# Spec — Home · The Archive (`/`)

Prototype view `home` (`isHome`), `Eric Escapes.dc.html` lines 67–147. Reference screenshots: `home-01-hero.png`, `home-03-diaries-subscribe.png`. (The place grid + lightbox render black in DOM-clone capture — treat prototype markup as truth there, per README line 115.)

"Not a blog roll; a location index." Container: `position:relative;z-index:1;animation:eeViewIn 0.3s ease both`.

---

## 1. Hero
Wrapper: `animation:eeReveal 0.75s cubic-bezier(.2,.7,.2,1) both;animation-timeline:view();animation-range:entry 0% entry 30%;max-width:1560px;margin:0 auto;padding:{heroPad};box-sizing:border-box`. `heroPad` = **`190px 40px 130px`** desktop / **`96px 20px 72px`** mobile.

- **Background photo:** `<img>` absolutely positioned `top:0;right:0;bottom:0;width:{heroImgW};height:100%;object-fit:cover;object-position:76% 56%;opacity:{heroImgOp};pointer-events:none`. `heroImgW` = **62%** desktop / **100%** mobile. `heroImgOp` = **0.85** desktop / **0.5** mobile. Masked: `mask-image:linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,1) 85%)` (+ `-webkit-mask-image`).
  - **Our image:** prototype uses `uploads/Heroimage1.jpeg`. Use the best wide hero from `public/images/home/` (9 files) — pick a Sydney/street frame; confirm exact file with Eric. Keep object-position `76% 56%` as the design intent (adjust only if the chosen photo's subject sits elsewhere).
- **Statement:** `position:relative;z-index:1;margin-top:{heroTopAir}` (24px/12px)`;font-size:{heroFs}` (**44px**/30px)`;font-weight:500;line-height:1.16;letter-spacing:-0.015em;max-width:920px;text-wrap:pretty` → "Street and travel photography from the edges of time." followed inline by the **caret**: `display:inline-block;width:3px;height:0.72em;background:var(--ee-accent);box-shadow:0 0 9px rgba(var(--ee-accent-rgb),0.6);margin-left:13px;transform:translateY(0.06em);animation:eeBlink 1.15s steps(1) infinite`.
- **Frame counter** (bottom-right, static — never animates): `position:absolute;right:{gutter};bottom:20px;display:flex;align-items:center;gap:14px;font-size:11px;letter-spacing:0.22em;color:#8B8F86`. Content: `<span color:--ee-accent>001</span>` + a row (`gap:8px`) of **four** `18px×1px` segments — first `rgba(242,239,230,0.35)`, next three `rgba(242,239,230,0.18)`.

## 2. INDEX · BY PLACE bar
`background:#000;border-top+border-bottom:1px solid rgba(242,239,230,0.09);padding:13px {gutter};display:flex;justify-content:space-between;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#8B8F86`.
- Left: `Index · by place`. Right: `{N} places · {M} frames`.
- **Data (ours):** compute from `place-data.json` reconciled_final primary_tiles. Prototype shows "06 places · 263 frames" — recompute: 6 places, sum of real frame counts (69+43+21+58+59+slot06). With Kosciuszko(52): **6 places · 302 frames**. Do NOT hardcode 263.

## 3. Place grid (6 tiles)
`display:grid;grid-template-columns:repeat(12,1fr);gap:2px;background:#050605;padding-top:2px`. Each tile: `grid-column:{p.col}` (**span 4** desktop / **span 6** mobile → 3×2 desktop, 2-col mobile)`;aspect-ratio:3/4;cursor:pointer;overflow:hidden;background:#0B0D0B;position:relative`, wrapped in the same `eeReveal` scroll animation.

Per tile (bottom-up z-order):
1. **Cover img:** `position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:{p.pos};transform:scale({imgScale});transition:transform 600ms ease`. `imgScale` = **1.02 on hover**, else 1. Object-positions (prototype, carry to real covers): sydney `50% 35%`, japan `50% 45%`, vietnam `72% 55%`, italy `50% 42%`, austria `82% 40%`, (6th: set for chosen photo).
2. **Bottom gradient:** `inset:0;background:linear-gradient(180deg,rgba(5,6,5,0) 40%,rgba(5,6,5,0.82) 100%)`.
3. **CRT hover tint** (`opacity:{fxOp}` 0→1 on hover, `transition:opacity 120ms ease`): inner `background:linear-gradient(rgba(var(--ee-accent-rgb),0.08),…);animation:eeCrt 2.6s linear infinite`.
4. **Index number** top-left: `top:18px;left:20px;font-size:11px;letter-spacing:0.18em;color:rgba(242,239,230,0.6)` → "01"…"06".
5. **Corner brackets** (all 4): `width:16px;height:16px;` L-shaped `1px` borders, `14px` inset from each corner, `border-color:{brC}` (`rgba(242,239,230,0.35)` rest → `--ee-accent` hover), `opacity:{brOp}` (`brackets` prop: hover=1/off=0), `transition:opacity 120ms,border-color 120ms`.
6. **Place name** bottom (`left:28px;right:28px;bottom:24px`): `font-size:{tileNameFs}` (**44px**/32px)`;font-weight:600;line-height:0.95;letter-spacing:0.01em` → UPPERCASE name.
7. **Arrow** bottom-right `right:26px;bottom:26px;font-size:16px;color:--ee-accent;opacity:{brOp};transition:opacity 120ms`.
- **Data + links (ours):** the 6 tiles = `place-data.json` reconciled_final.primary_tiles; each `onClick` → its real gallery route (`/sydney2 /japan /vietnam /austria /italy1` + 6th). Cover images: use a strong frame from each gallery's `public/images/gallery/<route>/` (or a curated hero); flag exact picks for Eric.

## 4. Status bar
Below grid, `margin-top:2px`: same `#000` bar as §2. Left: LED dot (`6px`, `--ee-live`, glow `0 0 16px …0.7, 0 0 4px …0.95`, `eePulse 2.4s ease-in-out infinite`) + `<span color:#F2EFE6>Currently filing · Sydney</span>`. (Keep "Sydney" or make it config — it is the "currently shooting" signal.)

## 5. Latest diaries
Wrapper: `eeReveal…;max-width:1560px;margin:0 auto;padding:84px {gutter} 0`.
- Header row (`justify-content:space-between;align-items:baseline;margin-bottom:26px`): left kicker `font-size:12px;letter-spacing:0.18em;uppercase;color:#8B8F86` → "Latest diaries"; right `font-size:11.5px;letter-spacing:0.16em;uppercase;color:#8B8F86`, hover→accent → "All entries →" (`onClick` → `/blog-1`).
- **3 rows** (`homeDiaries` = first 3), each: `eeReveal…;display:grid;grid-template-columns:{homeDiaryCols}` (**`340px 1fr 48px`** / `1fr`)`;align-items:center;gap:32px;padding:24px 0;border-top:1px solid rgba(242,239,230,0.09);cursor:pointer`.
  - Col1: `font-size:11.5px;letter-spacing:0.14em;uppercase;color:#8B8F86` → `{kicker} · {date}`.
  - Col2: `font-size:24px;font-weight:500;letter-spacing:-0.005em` → title.
  - Col3: `font-size:16px;color:--ee-accent;opacity:{arrowOp}` (0→1 hover)`;text-align:right` → →.
  - Close with one trailing `border-top` div.
- **Data (ours):** `getAllPosts()` (src/lib/blog.ts), take the **3 newest**. Map: `kicker` = a "DIARY · {primary category}" style label (or first category uppercased); `date` = formatted `date` (e.g. "23 MAY 2026"); `title` = post title; link → `/blog-1/{slug}`. (Prototype's 3 titles — The Cure to GAS, Same chaos different light, Kamakura — are all real posts, so this will look identical to the mock with live data.)

## 6. @ericescapes strip
Wrapper: `eeReveal…;max-width:1560px;margin:0 auto;padding:84px {gutter} 96px`.
- Header (`margin-bottom:26px`): left "@ericescapes" (12px kicker); right `<a target=_blank href=instagram.com/ericescapes>Follow on Instagram ↗</a>` (11.5px, hover accent).
- Grid: `grid-template-columns:{instaCols}` (**`repeat(6,1fr)`** / `repeat(3,1fr)`)`;gap:2px`. **6 tiles**, each `aspect-ratio:1/1;overflow:hidden;background:#0B0D0B;cursor:pointer`, hover → `box-shadow:inset 0 0 0 1px rgba(242,239,230,0.45)` (120ms). Img `object-fit:cover;object-position:{pos}`.
- **Data (ours):** prototype uses 6 reference photos. Real options: (a) wire the live Behold IG feed `feeds.behold.so/rAfeJ0kqND2SHoZkoZoz` (matches the existing site integration per SITE-INVENTORY), or (b) 6 curated static frames from galleries. Recommend Behold for freshness; the 6-square 2px-gap layout is unchanged. Flag for Eric.

## 7. Subscribe + Footer
Rendered by the shell (see `specs/shell.md` §4–6). They follow the home content on `/` exactly as on every page.

## Responsive summary (M = <760 → Tailwind base; desktop = md:)
gutter 20→40 · heroPad/heroFs/heroImgW/heroImgOp per tokens · tiles span-6→span-4 · tileName 32→44 · homeDiaryCols `1fr`→`340px 1fr 48px` · instaCols 3→6 · nav sub-line hidden mobile.
