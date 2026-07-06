# Design v2 — Motion doctrine

**Governing rule (prototype README line 72): nothing moves unless it breathes (LED pulse) or you touch it.** The retro-cyberpunk layer is a ghost in the machine, never a costume. Sanctioned effects ONLY — anything not in this list does not ship.

All keyframe definitions are quoted verbatim from `Eric Escapes.dc.html` `<style>` (lines 24–34) and the DCLogic class (`support.js` / embedded script). Where the prototype gates an effect on `prefers-reduced-motion` or `sessionStorage`, replicate that gate exactly.

---

## Sanctioned effects

### 1. LED pulse — `eePulse`
```css
@keyframes eePulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
```
- Usage: `animation: eePulse 2.4s ease-in-out infinite;` on status dots.
- Loading-mark specimen (about identity board, card 06) uses **`1.6s`** — the one exception.
- Colour `--ee-live` (`#6BFF4A`), always with glow: `box-shadow: 0 0 16px rgb(var(--ee-live-rgb)/0.7), 0 0 4px rgb(var(--ee-live-rgb)/0.95);`
- **Max ONE glowing pulsing element per view.** Home = "Currently filing · Sydney" dot. Gallery = years dot. Footer mark + subscribe-success dot are separate views/states, still one-at-a-time in practice.

### 2. Wordmark flicker — `eeFlicker` (once per session)
```css
@keyframes eeFlicker { 0% {opacity:1} 7% {opacity:.1} 11% {opacity:1} 16% {opacity:.35} 20% {opacity:1} 100% {opacity:1} }
```
- `animation: eeFlicker 0.9s linear 0.25s 1 both;` on the nav wordmark, **first load only**.
- Gate: `sessionStorage.getItem('ee-flicker-done')`. On mount, if not set AND not reduced-motion → set the flag, run once (prototype clears the flicker state after 1500ms). Never repeats within a session.
- In React: run in a `useEffect` on the client, guard with `sessionStorage` + a `matchMedia('(prefers-reduced-motion: reduce)')` check.

### 3. Scroll reveal — `eeReveal` (view-timeline, with fallback)
```css
@keyframes eeReveal { from {opacity:0; transform:translateY(20px)} to {opacity:1; transform:none} }
```
- Prototype: `animation: eeReveal 0.75s cubic-bezier(.2,.7,.2,1) both; animation-timeline: view(); animation-range: entry 0% entry 30%;`
- This is a **CSS scroll-driven animation** (`animation-timeline: view()`). Support is modern-Chromium-only as of the design date.
- **REQUIRED fallback for non-supporting browsers (Firefox/Safari):** feature-detect `CSS.supports('animation-timeline: view()')`. If unsupported, drive the same 0.75s fade+rise with an **IntersectionObserver** that adds a `.is-revealed` class when the element enters the viewport (threshold ~0.15, once). Do NOT leave non-supporting browsers with content stuck at `opacity:0`.
- Applies to: hero, each place tile, latest-diaries block + rows, insta strip, gallery header + each frame, diary rows, article panels + photo breaks, about grid + identity cards, subscribe bar, footer.

### 4. Per-page view-in — `eeViewIn`
```css
@keyframes eeViewIn { from {opacity:0; transform:translateY(8px)} to {opacity:1; transform:none} }
```
- `animation: eeViewIn 0.3s ease both;` on each top-level view container. In Next.js this is the route-change fade (0.3s ease). Can attach on mount per page.

### 5. Photo hover CRT flicker — `eeCrt`
```css
@keyframes eeCrt { 0%,100%{opacity:.9} 6%{opacity:.62} 8%{opacity:.95} 46%{opacity:.82} 52%{opacity:1} 88%{opacity:.68} 91%{opacity:.95} }
```
- A phosphor tint overlay that appears on photo hover, flickering softly: `animation: eeCrt 2.6s linear infinite;` over an accent-tint layer.
- Tint alpha: **0.08** on home place tiles, **0.10** on gallery frames. `background: linear-gradient(rgb(var(--ee-accent-rgb)/0.08), rgb(var(--ee-accent-rgb)/0.08));`
- The overlay opacity toggles 0 → 1 on hover (`120ms ease`); the CRT flicker runs inside it. **NO scanlines drawn over photos.**

### 6. Hero caret blink — `eeBlink`
```css
@keyframes eeBlink { 0%,48%{opacity:1} 50%,100%{opacity:0} }
```
- `animation: eeBlink 1.15s steps(1) infinite;` on the 3px accent caret after the hero statement. Uses `--ee-accent` (resolves to `#5FB53C`) with a 9px glow.

### 7. Scan line (grain overlay) — `eeScan`
```css
@keyframes eeScan { 0% { transform: translateY(-3vh); } 100% { transform: translateY(103vh); } }
```
- A single 1px accent-tinted horizontal line sweeping the viewport: `animation: eeScan 26s linear infinite;`. Fixed, `z-index:89`, `pointer-events:none`. Part of the `grain` overlay group; gated on `grain` prop.

### 8. Ambient glitch — `eeGlitch` (rare, subtle)
```css
@keyframes eeGlitch { 0%,100%{opacity:1;transform:none} 8%{opacity:.25;transform:translateX(.7px)} 12%{opacity:1;transform:none} 20%{opacity:.55;transform:translateX(-.7px)} 24%{opacity:1;transform:none} }
```
- `eeGlitch 0.55s linear 1` fired randomly on **either** the nav wordmark **or** the footer mark, every `12000 + random*26000` ms (12–38s), for ~700ms.
- Gate: skipped entirely under reduced-motion. This is the subtlest breath of the "ghost in the machine" — keep it rare and short. Optional; can ship as `off` initially and enable later.

### 9. Backdrop canvas (fixed, z-0, behind everything)
Driven by JS `<canvas id="ee-dust">` (`initDust()` in the DCLogic class). Three modes via `backdrop` prop:
- **`dust` (DEFAULT):** 70 slow-drifting grey particles (~45% tinted green), twinkle, wrap-around. `buildDust()`.
- **`code`:** sparse grey glyph rain (katakana + `01<>/:+·`), very low alpha, per-column heads. `buildCode()`, ~`W/26` columns, 45% active.
- **`rain`:** 110 straight-down grey streaks, 34–86 px/s, len 9–25px. `buildRain()`.
- Plus 2–3 large slow-moving dark warm-grey **radial glows** (`glowFn`, colour `105,110,103`), parallax-tied to `scrollY * 0.12`, intensity scaled by `atmosphere` (`k`, default 1.4).
- Base fill gradient `#050605 → #060806 → #040504`, composite `lighter` for particles/glows.
- **DISABLED on mobile and under reduced-motion.** Under reduced-motion the prototype paints ONE static base + two static glows and returns (no rAF loop). On mobile (perf): render the static base only, or skip the canvas. Never run the rAF loop on `vw < 760`.

### 10. Film grain — SVG fractal noise
- Fixed overlay, `z-index:90`, `pointer-events:none`, **opacity `0.028`** (~2.8%), `background-size:180px 180px`.
- Source: inline SVG `feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'` desaturated, as a `data:image/svg+xml` URI (see `GRAIN` const in DCLogic). Gated on `grain` prop (default `true`). Keep ≤ 3% opacity — never a visible texture, just tooth.

### 11. Scroll progress bar
- Fixed top, `height:2px`, `z-index:45`. Track `rgba(242,239,230,0.05)`; fill `linear-gradient(90deg,#1F7A2E,var(--ee-accent))` + glow `0 0 10px rgb(var(--ee-accent-rgb)/0.45)`. Width = scroll% (`scrollY / (scrollHeight - innerHeight)`), updated on `scroll` (passive). Not an animation keyframe — a scroll listener; still disable the glow/keep it static under reduced-motion is unnecessary (it is scroll-driven, not time-driven), but it may be dropped on reduced-motion for calm.

### 12. Lightbox keyboard + hover
- Not a keyframe: `Esc` closes, `←`/`→` navigate (wrap-around via modulo), backdrop click closes. Arrow marks brighten on hover (`filter:brightness(1.7)`, 120ms). No captions, no counters in the lightbox.

### 13. Hover transitions (universal)
- `transition: … 120ms ease;` — **color / opacity / border-color ONLY**. Never transition layout, size, or position on hover. Image scale-on-hover (tiles, `scale(1.02)`) is the one transform, and it uses **`400ms`/`600ms` ease** (tile img `transition:transform 600ms ease`), separate from the 120ms rule.

---

## `prefers-reduced-motion: reduce` — explicit kill list

Global switch (prototype line 34), keep it verbatim:
```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

This alone kills, by construction: `eePulse`, `eeFlicker`, `eeReveal`, `eeViewIn`, `eeCrt`, `eeBlink`, `eeScan`, `eeGlitch`, and every 120ms hover transition. In addition, the JS must independently respect reduced-motion (the `*{animation:none}` rule does NOT stop `requestAnimationFrame`):

| Effect | Reduced-motion behaviour |
|---|---|
| Backdrop canvas | NO rAF loop. Paint static base gradient + 2 static glows once, then stop (prototype `initDust()` early-return branch). |
| Wordmark flicker | Never runs — the mount effect checks `matchMedia('(prefers-reduced-motion: reduce)').matches` before setting the session flag. |
| Ambient glitch | Never scheduled — the `loop()` is skipped under reduced-motion. |
| Scroll reveals (IntersectionObserver fallback) | Skip the fade; render content at final state immediately (add `.is-revealed` on mount, don't animate). |
| Scroll progress bar | May keep (scroll-driven, not time-driven) or drop — recommend keep; it is informational, not decorative motion. |
| Lightbox | Keyboard/click still work; only the `filter` hover transition is dropped by the global rule. |

**Also disable backdrop canvas + heavy overlays on mobile (`vw < 760`)** regardless of reduced-motion, for performance — the prototype's `M` flag path never initialises the animated canvas at mobile widths in practice; treat mobile as: static base only, grain optional, no rAF.
