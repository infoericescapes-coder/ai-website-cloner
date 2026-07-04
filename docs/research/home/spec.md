# Homepage `/` — Build Spec

**Source of truth for content/order:** `docs/research/home/source.html` (full server-rendered HTML — read it for exact text, section order, alt text).
**Design system:** `docs/research/_tokens/design-tokens.md` — obey it exactly.

## Sections (top → bottom)
1. **Header** (shared `<Header />` component) — translucent black bar `rgba(0,0,0,0.77)`, `position: absolute` over the hero, full-width, ~174px tall. Left: white logo `/brand/logo-white.png` (link to `/`, alt "Eric Escapes"). Right: nav `Home` (`/`) · `About` (`/about`) · `Blog` (`/blog-1`) · `Shop` (`/store`), then Instagram icon (`https://www.instagram.com/ericescapes`) and a link/chain icon (`https://ericescapes.substack.com`). Nav = Poppins 20px/400 white. Use `lucide-react` `Instagram` and `Link` icons. Mobile: collapse nav to a hamburger.
2. **Hero** — full-bleed image `/images/home/hero-sydneyopera.jpg` (Sydney Opera House). No text overlay. Tall (min-h ~90vh). `object-cover`.
3. **Free Visual Diary Preset Pack** — centred. Heading "Free Visual Diary Preset Pack" (Open Sans). Sub: "Drop your email and get the Visual Diary Collection free." + "No spam. Just photography." Email input + button **"Get the Presets"** (this is a MailerLite form — render as a styled form posting nowhere / `onSubmit` stub with a success state "You have successfully joined our subscriber list."). Associated image present in source — place per source.
4. **Full-bleed photo dividers** — these images appear through the page as showcase bands (follow source order): `/images/home/afterdark-after.jpg`, `/images/home/shibuya-night.jpg`, `/images/home/hallstatt-morning.jpg`, `/images/home/saigon-district10.jpg`, `/images/home/venice.jpg`. Full-width, `object-cover`.
5. **Live on Instagram** — eyebrow label `LIVE ON INSTAGRAM` (DM Mono 13px, 3.9px tracking, uppercase). Original uses a Behold.so IG feed widget — replace with a responsive image grid placeholder (3–6 tiles) captioned; wire to real IG later. Keep the eyebrow + layout faithful.
6. **Currently Shooting With** — eyebrow `CURRENTLY SHOOTING WITH`. Three gear cards, each: small mono kicker + product name + image + `↗` affiliate link (`target="_blank" rel="noopener"`):
   - **EDC CAMERA** — Fujifilm X-T5 — `/images/home/camera-xt5.jpg` — https://amzn.to/4clcQVu
   - **ESTABLISHING LENS** — Fujifilm 23mm F2.8 WRX — (no local image; reuse a neutral card / text-only) — https://amzn.to/4sll44M
   - **DETAIL LENS** — Fujifilm XF 50mm F/2 — `/images/home/lens-50f2.jpg` — https://amzn.to/4u2HNEg
   - Then **FULL KIT →** link → `/my-gear`.
   (Map the three amzn links to the three items in source order; verify against source.html.)
7. **Footer** (shared `<Footer />`) — minimal, "Copyright" line. Match source; keep it simple, dark or white per source.

## Build rules
- Fonts: load Poppins, Open Sans, DM Mono via `next/font/google` in `src/app/layout.tsx`. Wire CSS vars `--font-poppins`, `--font-open-sans`, `--font-dm-mono` and map into Tailwind theme + `globals.css`.
- Add design tokens to `src/app/globals.css` `@theme` (bg white, fg black, base 20px, the eyebrow utility class `.eyebrow` = DM Mono 13px/3.9px/uppercase).
- Use `next/image` for photos. Favicon already at `/public/seo/favicon.ico` — wire in metadata.
- Header + Footer are SHARED — put them in the root layout so every future page inherits them.
- Responsive: mobile-first, collapse nav, stack gear cards.
- Must pass `npm run build` (TypeScript strict, ESLint). No `any`.
