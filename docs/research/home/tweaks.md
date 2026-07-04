# Homepage Tweaks — Round 2 (fidelity + live integrations)

Apply all four. Verify against live https://www.ericescapes.com/ + these exact specs.

## 1. Header + inset hero (SHARED — Header.tsx propagates to all pages)
Live structure (measured):
- **Header**: `position: absolute`, top:0, full-width, `background: rgba(0,0,0,0.77)`, height **174px** desktop (100px mobile). White logo left, nav right. It sits ABOVE content (does NOT overlay a full-bleed photo).
- **Page body**: white background. First content is pushed DOWN by the header height (the live first section has `padding-top: 174px`). So the root layout `<main>` needs top padding = header height so content clears the fixed/absolute header.
- **Hero image**: NOT full-bleed. It's an **inset contained image** on the white page: horizontal side margins ≈ 120–140px (at 1600px viewport the image was 1335px wide, i.e. ~83% width, centered), with a **top gap** (~137px of white) between the header and the image. Give it a sensible max-width container + top/side spacing; use `next/image`. Remove the current `min-h-[90vh]` full-bleed treatment.
- Net visual: black header bar at top → white gap → inset Sydney Opera photo → rest of page.

## 2. Real 23mm lens image
- Asset staged at `/public/images/home/lens-23mm.jpg` (Fujifilm 23mm f/2.8, 1382x1005).
- Replace the text-only fallback in the Establishing Lens gear card with this image (same card layout as the X-T5 / 50mm cards).

## 3. Live Instagram feed (Behold.so) — replace the static grid
Use the REAL Behold widget. It's a web component loaded via an external module script.
```html
<behold-widget feed-id="rAfeJ0kqND2SHoZkoZoz"></behold-widget>
```
Loader (module script):
```js
(() => { const d=document,s=d.createElement("script"); s.type="module"; s.src="https://w.behold.so/widget.js"; d.head.append(s); })();
```
Implementation in Next.js:
- Make a small **client component** `BeholdFeed.tsx` that injects the `w.behold.so/widget.js` module script once (via `next/script` with `strategy="afterInteractive"` and `type="module"`, or a `useEffect`), and renders `<behold-widget feed-id="rAfeJ0kqND2SHoZkoZoz" />`.
- Custom element in JSX/TSX: declare the `behold-widget` intrinsic element type (module augmentation for `JSX.IntrinsicElements`) so TS strict passes. Use `suppressHydrationWarning` if needed.
- Keep the existing "LIVE ON INSTAGRAM" eyebrow + pulsing red dot heading above it. Remove the static 6-tile placeholder grid.

## 4. Real MailerLite email capture — replace the client stub
Real form details (from the live embed):
- **Action:** `https://assets.mailerlite.com/jsonp/2376297/forms/188824634630604255/subscribe` (method POST)
- **Fields:** `fields[name]` (text, placeholder "Name", optional) and `fields[email]` (email, placeholder "Email", required). Plus hidden `ml-submit=1` and `anticsrf=true`.
- **Heading:** "Free Visual Diary Preset Pack"; body "Drop your email and get the Visual Diary Collection free."; fine print "No spam. Just photography." (all centered).
- **Submit button:** "Get the Presets".
- **On success:** show "Thank you! You have successfully joined our subscriber list." then redirect to the Gumroad preset page: `https://ericescape.gumroad.com/l/jetyik`.
- Styling: black wrapper, white heading (Open Sans 30px), white inputs (dark text), white submit button with black text (hover #333). Keep it on-brand with the rest of the page.

Implementation: client component. Submit via a native form POST to the action URL targeting a hidden `<iframe name="ml-sink">` (avoids CORS), OR a `fetch` with `mode:"no-cors"`; then set a success state and `window.location.href = "https://ericescape.gumroad.com/l/jetyik"` after a short delay. Must actually hit the MailerLite endpoint so real subscribers are captured. Keep Name optional, Email required with basic validation.

## Verify
- `npm run check` passes (lint + typecheck + build), no `any`, no TS errors for the custom element.
- Header change must not break the layout on any other route (it's shared).
