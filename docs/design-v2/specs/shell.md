# Spec — Shell (nav + footer + motion chrome)

Global chrome present on every page. Prototype source: `Eric Escapes.dc.html` lines 37–65 (nav + progress + canvas), 526–598 (subscribe + footer + grain), plus DCLogic `renderVals()` for responsive values. Reference screenshots: every PNG shows the nav; `home-03-diaries-subscribe.png` shows subscribe + footer.

**Responsive rule (prototype wins over README):** the prototype's mobile flag is `M = (s.vw || 1400) < 760` (`renderVals()` line 918). The README §Interactions says "JS mobile flag at 768px" — **the actual code uses 760px.** Translate to Tailwind: use `md:` (≥768px) as the desktop breakpoint; the 8px gap (760 vs 768) is immaterial for these layouts. Where a value flips at `M`, mobile = base classes, desktop = `md:` classes.

---

## 1. Backdrop canvas (z-0)
```
<canvas id="ee-dust" style="position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;display:block">
```
See `motion.md` §9. Client component. Modes `dust`(default)/`code`/`rain`. DISABLED on mobile + reduced-motion (static base only). Everything else sits `z-index:1`+ above it.

## 2. Scroll progress bar (z-45)
- Track: `position:fixed;top:0;left:0;right:0;height:2px;z-index:45;pointer-events:none;background:rgba(242,239,230,0.05)`
- Fill (`#ee-progress`): `height:100%;width:0%;background:linear-gradient(90deg,#1F7A2E,var(--ee-accent,#6BFF4A));box-shadow:0 0 10px rgba(var(--ee-accent-rgb,107,255,74),0.45)`
- Width set on scroll: `min(100, scrollY/(scrollHeight - innerHeight)*100)%`. Passive scroll listener.

## 3. Nav (sticky, z-40, 60px)
Container: `position:sticky;top:0;z-index:40;background:rgba(5,6,5,0.92);backdrop-filter:blur(10px);border-bottom:1px solid rgba(242,239,230,0.09)`.
Inner: `display:flex;align-items:center;justify-content:space-between;padding:0 {gutter};height:60px` (`gutter` = 40px desktop / 20px mobile).

**Left — registry-plate lockup** (`onClick` → home; `onMouseEnter/Leave` → wordmark hover):
- Row: `display:flex;align-items:center;gap:11px;animation:{wordmarkAnim}` (flicker once/session or rare glitch — see motion.md §2, §8).
- Monogram SVG `width:21 height:21 viewBox="0 0 48 48"`, stroke `{wmStroke}` (`#F2EFE6`, → `--ee-accent` on hover), `stroke-width:1.5`. Paths (verbatim):
  - `M14 4 H4 V14 M34 4 H44 V14 M44 34 V44 H34 M14 44 H4 V34`
  - `M21 16 H13 V32 H21 M13 24 H19`
  - `M27 16 H35 V32 H27 M35 24 H29`
  - (Or use `public/brand-v2/logos/ee-monogram-white.svg` / `-green.svg`.)
- Wordmark: `font-size:14px;font-weight:600;letter-spacing:0.24em;color:#F2EFE6;user-select:none` → `ERIC ESCAPES`
- Divider (hidden mobile, `display:{plateSub}` = `block`/`none`): `width:1px;height:14px;background:rgba(242,239,230,0.22);margin:0 3px`
- Sub-line (hidden mobile): `font-size:9px;font-weight:500;letter-spacing:0.28em;color:#8B8F86` → `VISUAL ARCHIVE`

**Right — nav links** (`gap:{navGap}` 36px/14px):
- Each: `font-size:{navLinkFs}` (11.5px/10px)`;letter-spacing:0.16em;text-transform:uppercase;color:{lnk.color};padding:5px 0 6px;border-bottom:1px solid {lnk.underline};transition:color 120ms ease,border-color 120ms ease`, hover→`color:#F2EFE6`.
- 4 links per `ia-map.md`: Home /, Visual Diaries /blog-1, Shop /store, About /about. Active = color `#F2EFE6` + underline `--ee-accent`; inactive = `#8B8F86` + transparent. Active grouping: gallery→Home, /blog-1/*→Visual Diaries, /chaostocalm→Shop.

## 4. Subscribe bar (above footer, all pages)
Wrapper: `max-width:1560px;margin:0 auto;padding:0 {gutter} 76px`. Panel: `position:relative;background:#0B0D0B;border:1px solid rgba(242,239,230,0.07);padding:{subPad}` (`40px 56px` / `28px 22px`)`;display:flex;align-items:center;justify-content:space-between;gap:56px;flex-wrap:wrap`.
- **4 corner brackets** at panel corners: each `width:14px;height:14px;border:1px solid rgba(242,239,230,0.45)` positioned `top:-1px/left:-1px` etc (L-shaped: top-left = `border-top`+`border-left`, and so on).
- Left copy block (`min-width:300px;gap:13px`): heading `font-size:12px;font-weight:600;letter-spacing:0.24em;color:#F2EFE6` → `JOURNAL UPDATES ` + `<span color:--ee-accent>+ FREE PRESET PACK</span>`. Sub: `font-size:12.5px;letter-spacing:0.06em;line-height:1.75;color:#8B8F86` → "Drop your email, get the Visual Diary preset pack free.\<br>\Plus stories from the road. No Spam. Just Photography."
- Right (not-subscribed): `display:flex;align-items:flex-end;gap:30px;flex:1;max-width:600px;min-width:340px`. Email input: `flex:1;background:transparent;border:none;border-bottom:1px solid rgba(242,239,230,0.28);padding:9px 2px;font-size:12.5px;letter-spacing:0.1em;color:#F2EFE6;outline:none;border-radius:0`, placeholder "Enter your email" (`::placeholder color:#8B8F86`), focus → `border-bottom:1px solid --ee-accent`. SUBSCRIBE control: `padding-bottom:9px;font-size:12px;font-weight:600;letter-spacing:0.22em;color:--ee-accent;display:flex;gap:9px`, hover `filter:brightness(1.6)`, text `SUBSCRIBE →`.
- Right (subscribed state): LED dot (`5px`, live, `eePulse 2.4s`) + `font-size:12px;font-weight:500;letter-spacing:0.2em;color:#F2EFE6` → `SUBSCRIBED · PRESET PACK ON ITS WAY`.
- **Data wiring (ours):** prototype fakes success. Wire to the real path — MailerLite form `188824634630604255` (acct 2376297) OR the Substack embed. The incentive is the free Visual Diary preset pack (Gumroad `/l/jetyik`). Confirm which with Eric; the visual is unchanged either way.

## 5. Footer (all pages)
Wrapper: `border-top:1px solid rgba(242,239,230,0.09);padding:36px {gutter} 48px;background:linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 70%, #000 100%)`. Inner grid: `max-width:1560px;margin:0 auto;grid-template-columns:{footCols}` (`1fr auto 1fr` / `1fr`)`;align-items:center;gap:40px`.
- **Left** (`gap:7px;font-size:11px;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;color:#8B8F86`): "© 2026 Eric Escapes" / "All rights reserved".
- **Center mark** (`justify-self:{footMarkJs}` center/start): `width:36px;height:36px` with 4 accent corner brackets (`10px`, `1px`, `--ee-accent`) + centered LED dot (`5px`, live, `eePulse 2.4s`, glow). `animation:{footMarkAnim}` (rare glitch).
- **Right** (`justify-self:{footSocJs}` end/start; `gap:32px`): INSTAGRAM + SUBSTACK links (`color:#8B8F86` → `--ee-accent` hover, 120ms), each = accent-stroked icon (see below) + `font-size:11px;font-weight:500;letter-spacing:0.2em` label.
  - Instagram icon SVG `15×15 viewBox 0 0 24 24`: rounded rect `x=3 y=3 w=18 h=18 rx=5` stroke accent 1.6, circle `cx=12 cy=12 r=4.2` stroke accent 1.6, dot `cx=17.4 cy=6.6 r=1.1` fill accent → https://www.instagram.com/ericescapes
  - Substack icon SVG `13×14 viewBox 0 0 24 26`: two accent lines `M2 1.5 H22` + `M2 7 H22` stroke 2.4, filled tab `M2 12.5 H22 V24.5 L12 19 L2 24.5 Z` fill accent → https://ericescapes.substack.com

## 6. Grain + scan overlays (z-89 / z-90) — gated on `grain` prop
- Scan line: `position:fixed;left:0;right:0;top:0;height:1px;z-index:89;pointer-events:none;background:linear-gradient(90deg, accent 0→0.09@30% →0.24@50% →0.09@70% →0 100%);animation:eeScan 26s linear infinite`.
- Grain: `position:fixed;inset:0;z-index:90;pointer-events:none;opacity:0.028;background-image:{GRAIN};background-size:180px 180px`. `GRAIN` = the SVG fractalNoise data-URI (motion.md §10).

## 7. Global head / base CSS
- `<head>`: favicon → `public/brand-v2/logos/ee-favicon.svg` + PNG set (`favicon-16/32/48/180/512.png`). OG default → `public/brand-v2/social/og-image-1200x630.png`. Space Grotesk via `next/font/local` (tokens.md §6).
- Base: `html,body{margin:0;background:#050605;color:#F2EFE6}` `-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility`. `::selection{background:#1F7A2E;color:#F2EFE6}`. `html{scrollbar-color:#2B2D2C #050605}`. `input::placeholder{color:#8B8F86}`.
- **Note:** globals.css currently sets `html{font-size:20px}` and a light theme. The redesign shell must NOT inherit the 20px root or light bg — scope redesign pages to the dark tokens (dedicated layout or a `.ee-root` wrapper that resets `font-size:16px` and applies canvas bg). Flag for the builder: reconcile with the existing shadcn base in `globals.css` so the old pages (if any remain) and new pages don't fight.

## 8. All keyframes
Paste the full keyframe set from `motion.md` into globals.css (`eePulse eeFlicker eeGlitch eeReveal eeViewIn eeScan eeBlink eeCrt`) + the reduced-motion `*{animation:none!important;transition:none!important}` block.
