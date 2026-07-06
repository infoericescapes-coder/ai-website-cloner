# Spec — Shop (`/store`) — digital only

Prototype view `shop` (`isShop`), lines 396–425. Reference: `shop.png`. Maps to existing `/store` (nav label "Shop"). Digital only.

> **OVERRIDE — Eric standard, B3 (clean photos everywhere).** If any product row ever carries a thumbnail/preview image, it renders clean at column width — **no** mount box, **no** hairline border, **no** auto caption. (The current Shop rows are text + arrow only, so there's nothing to mount today; this pins the standard for any future imagery.)

Container: `position:relative;z-index:1;animation:eeViewIn 0.3s ease both;max-width:860px;margin:0 auto;padding:88px {gutter} 150px`.

---

## 1. Header
- Kicker: `font-size:12px;letter-spacing:0.18em;uppercase;color:#8B8F86` → "Digital only · download & shoot".
- Title (`margin-top:20px;font-size:{bigTitleFs}` (**56px**/34px)`;font-weight:600;line-height:1;letter-spacing:-0.01em`) → "Shop".

## 2. Product list
`margin-top:56px;border-top:1px solid rgba(242,239,230,0.13)`.

**Row 1 — Chaos to Calm** (active, clickable → `/chaostocalm`): `display:grid;grid-template-columns:1fr auto;gap:40px;align-items:center;padding:34px 0;border-bottom:1px solid rgba(242,239,230,0.09);cursor:pointer`.
- Left: kicker `font-size:11.5px;letter-spacing:0.16em;uppercase;color:#8B8F86` → "Preset pack · 2 looks · Lightroom + Mobile"; title `margin-top:12px;font-size:28px;font-weight:500;letter-spacing:-0.005em` → "Chaos to Calm"; one-liner `margin-top:10px;font-size:15px;line-height:1.6;color:#8B8F86;max-width:52ch` → "Two looks pulled off the streets of Japan: Neon & Grey for the nights, Warm Afternoon for the slow days."
- Right (`display:flex;align-items:center;gap:22px`): price `font-size:20px;font-weight:500` → "A$5+"; then `font-size:12px;font-weight:600;letter-spacing:0.2em;color:--ee-accent;opacity:{shopArrowOp}` (**0.55** rest → **1** hover, 120ms) → "VIEW →".

**Row 2 — Guides (coming later)** (`opacity:0.55`, not clickable): same grid, `padding:34px 0;border-bottom:1px solid rgba(242,239,230,0.09)`.
- Left: kicker → "Field guides · In the darkroom"; title (`color:#8B8F86`) → "Guides · coming later".
- Right: `font-size:11.5px;letter-spacing:0.16em;uppercase;color:#8B8F86` → "Soon".

## 3. Substack line
`margin-top:34px;font-size:11.5px;letter-spacing:0.16em;uppercase;color:#8B8F86` → "First to know when guides land: " + `<a target=_blank href=ericescapes.substack.com color:--ee-accent>Substack ↗</a>` (hover `filter:brightness(1.5)`).

## 4. Data / wiring (ours)
- Chaos to Calm is real → row 1 links to `/chaostocalm` (existing route, restyled per `preset-detail.md`). Price "A$5+" pay-what-you-want (Gumroad `/l/avcmj`).
- **Redirect (SHIPPED):** the old product URL `/store/p/visual-diary-collection-lightroom-presets` → `/store` is live in `next.config.ts` `redirects()` as `permanent: true`, which Next.js serves as **HTTP 308 permanent** (SEO-equivalent to a 301). See `ia-map.md` / `docs/research/redirect-map.md`.
- The existing `/store` page may currently list the Visual Diary preset collection (Gumroad `/l/jetyik`). Reconcile: the prototype's Shop shows ONLY Chaos to Calm as the live product. Decision for Eric — does the redesigned Shop surface (a) Chaos to Calm only (prototype-faithful), or (b) both Chaos to Calm AND the Visual Diary collection as a second live row? The prototype design supports one live row + one "Soon" row; a second live product would take the "Soon" slot's grid. Flag as a tap decision; default = prototype-faithful (Chaos to Calm only, Guides "Soon").

## Responsive summary
gutter 20→40 · bigTitleFs 34→56 · product rows keep `1fr auto` (right column shrinks gracefully; on very narrow screens allow it to wrap under). max-width 860.
