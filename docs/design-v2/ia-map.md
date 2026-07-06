# Design v2 — IA map: prototype view → existing route

The prototype is state-based (one `view` variable switches `<sc-if>` blocks). The real site has **existing, indexed URLs we are keeping** (SEO parity: `docs/SITE-INVENTORY.md`, `docs/research/redirect-map.md`, 120-URL sitemap). This table maps each prototype view onto the real route. **Locked decisions (do not re-litigate):** existing URLs kept; the prototype's invented `/places/` and `/diaries/` paths are NOT adopted.

## View → route table

| Prototype view | `data-screen-label` | Prototype suggested path (NOT adopted) | **Real route (build here)** | Data source | Spec file |
|---|---|---|---|---|---|
| `home` | Home · The Archive | `/` | **`/`** | place grid: `place-data.json` reconciled_final; latest diaries: `getAllPosts()` slice 3 | `specs/home-archive.md` |
| `gallery` | Location gallery | `/places/[slug]` | **`/[gallerySlug]`** (existing: `/sydney2`, `/japan`, `/vietnam`, `/austria`, `/italy1`, +6th) | gallery images `public/images/gallery/<route>/`; meta from `place-data.json` | `specs/gallery.md` |
| `diaries` | Visual Diaries index | `/diaries` | **`/blog-1`** (label "Visual Diaries") | `getAllPosts()` (70 posts), 9/page pagination `?page=N` | `specs/diaries-index.md` |
| `article` | Diary article · Kamakura | `/diaries/[slug]` | **`/blog-1/[slug]`** (existing 70 posts) | `getPostBySlug(slug)` | `specs/article.md` |
| `shop` | Shop · digital | `/shop` | **`/store`** (label "Shop") | static (Chaos to Calm + "guides soon") | `specs/shop.md` |
| `preset` | Preset · Chaos to Calm | `/shop/chaos-to-calm` | **`/chaostocalm`** (existing) | static; Gumroad `/l/avcmj` | `specs/preset-detail.md` |
| `about` | About & identity | `/about` | **`/about`** (existing) | static | `specs/about.md` |
| lightbox | Lightbox | overlay | overlay on `/[gallerySlug]` | client state (frame index) | `specs/gallery.md` |
| (nav/footer/subscribe/backdrop) | — | chrome on all pages | global layout | — | `specs/shell.md` |

## Navigation (locked)

Nav = **Home · Visual Diaries · Shop · About** (4 links, prototype `navDefs`). Only the labels/targets change from the prototype's implied paths:

| Nav label | Target route | Active when path matches |
|---|---|---|
| Home | `/` | `/` and any `/[gallerySlug]` (gallery is "under" Home/The Archive) |
| Visual Diaries | `/blog-1` | `/blog-1`, `/blog-1/*` (posts, category, tag) |
| Shop | `/store` | `/store`, `/chaostocalm` (preset is "under" Shop) |
| About | `/about` | `/about` |

Active state = text `#F2EFE6` + 1px `--ee-accent` bottom border; inactive = `#8B8F86`, transparent border; hover → text colour, 120ms. (Prototype `navLinks` in `renderVals()`: `active` derived from a `match` array — replicate the grouping above so a gallery page lights "Home" and a preset page lights "Shop".)

## Redirects in `next.config`

Per the locked decision, `/store/p/visual-diary-collection-lightroom-presets` → `/store` is **SHIPPED** in `next.config.ts` `redirects()` with `permanent: true`. Next.js serves `permanent: true` as **HTTP 308 permanent** (not 301); 308 is SEO-equivalent to a 301 (both are permanent redirects that pass link equity, and Google treats them the same). Full existing redirect set lives in `docs/research/redirect-map.md`; the redesign adds/confirms:

| From | To | Type | Reason |
|---|---|---|---|
| `/store/p/visual-diary-collection-lightroom-presets` | `/store` | 308 permanent (SHIPPED, `permanent: true`) | Old Squarespace product URL; Shop is now the single digital surface. |
| `/places/:slug` | `/:slug` | 301 (defensive) | Prototype used `/places/`; if any external link/preview used it, redirect to the real gallery slug. Optional — only if such links exist. |
| `/diaries` | `/blog-1` | 301 (defensive) | Same — prototype `/diaries` → real Visual Diaries index. Optional. |
| `/shop` | `/store` | 301 (defensive) | Prototype `/shop` label → real `/store`. Optional; only if `/shop` was ever public. |
| `/shop/chaos-to-calm` | `/chaostocalm` | 301 (defensive) | Prototype preset path → real route. Optional. |
| `/home` → `/` | (already exists, keep) | 308 permanent (SHIPPED, `permanent: true`) | Pre-existing per SITE-INVENTORY; wire status is 308, SEO-equivalent to 301 (see `docs/research/redirect-map.md`). |

The first row (`/store/p/...` → `/store`) is the one confirmed-required redirect and is already shipped (308 permanent, above). The `/places/`, `/diaries/`, `/shop*` rows are defensive only — add solely if those prototype paths were ever exposed publicly; otherwise skip (no dangling inbound links = no redirect needed).

## Gallery slug note

The prototype's 6 place tiles map to **existing** gallery routes (see `place-data.json`): `/sydney2 /japan /vietnam /austria /italy1` + a 6th pending Eric's tap (Hong Kong has no real gallery — recommended substitute `/kosciuszko-25`). The redesign gallery **view** is applied to ALL 17 existing gallery routes (not only the 6 featured tiles) — the tiles are just the curated "primary" surface on Home; every gallery route still renders with the `specs/gallery.md` treatment. The remaining 11 galleries appear in a secondary "more places" list (see `home-archive.md`).
