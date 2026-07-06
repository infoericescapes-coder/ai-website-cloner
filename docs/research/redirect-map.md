# Redirect Map — DNS Cutover (Squarespace -> Next.js clone)

Reference for the ericescapes.com migration off Squarespace. Covers what needs a
301 at the host/edge layer, what is handled in-app, and what needs nothing because
URLs are preserved 1:1.

## Slugs preserved 1:1 — no per-post redirects needed

Every blog post keeps its exact live slug. The live URL
`https://www.ericescapes.com/blog-1/<slug>` maps to the identical clone route
`/blog-1/<slug>` (served by `src/app/blog-1/[slug]/page.tsx`, slugs sourced from
`content/blog/*.md` frontmatter). Because the path is unchanged, **no per-post 301s
are required** — the 70 post URLs resolve directly on the new stack.

The same holds for all top-level pages (`/about`, `/store`, `/japan`, `/gallery-1-1`,
the country/region galleries, etc.) and every blog archive
(`/blog-1/category/<Name>`, `/blog-1/tag/<Name>`). Paths and URL encoding
(spaces as `+`, e.g. `Film+Simulations`) are mirrored exactly, so they need no
redirects.

## In-app redirects (shipped in `next.config.ts` `redirects()`)

Both rows use `permanent: true` in `next.config.ts`. **Next.js serves `permanent: true` as HTTP `308` (Permanent Redirect), not `301`.** A 308 is SEO-equivalent to a 301: both are permanent, both pass link equity, and search engines (Google included) treat them the same for indexing/canonicalisation. The method is also preserved on a 308 (irrelevant here since these are GETs). "301" in older notes is shorthand for "permanent redirect"; the wire status is 308.

| From    | To  | Type (wire status)      | Why |
|---------|-----|-------------------------|-----|
| `/home` | `/` | 308 permanent (`permanent: true`) | Squarespace exposes the homepage at both `/home` (listed in the live sitemap) and `/`. The clone canonicalises on `/`. |
| `/store/p/visual-diary-collection-lightroom-presets` | `/store` | 308 permanent (`permanent: true`) | Old Squarespace product URL retired with the (v2) Shop migration; Shop (`/store`) is the single digital surface. See `docs/design-v2/ia-map.md`. |

## Host / edge-level rewrites & redirects needed at deploy

These are not in-app Next routes; configure them at the CDN / reverse-proxy
(Cloudflare, Vercel, nginx — wherever the cutover terminates).

| From (legacy live URL)   | To                    | Type                | Why |
|--------------------------|-----------------------|---------------------|-----|
| `/blog-1?format=rss`     | `/blog-1/rss.xml`     | 301 redirect        | Squarespace serves the feed via the `?format=rss` query param on `/blog-1`. The clone serves a static feed at `/blog-1/rss.xml` (route handler, `force-static`). Redirect the legacy query-string URL so existing feed subscribers keep working. |
| `/cart`                  | `/`                   | 301 redirect        | Squarespace system page. The clone has no cart; send to home. |
| `/search`                | `/`                   | 301 redirect        | Squarespace system page. The clone has no search; send to home. |

## www-canonical

`www.ericescapes.com` is the canonical host. The apex `ericescapes.com` must
**301 redirect to `https://www.ericescapes.com`** at the DNS/edge layer (keep the
requested path + query on the redirect). All canonical URLs — sitemap, RSS
`<link>`s, in-app absolute links — use the `www` host.

## URL-count reconciliation (live sitemap vs clone sitemap)

Both sitemaps enumerate the **same 120 URLs**.

| Bucket                                   | Live | Clone | Note |
|------------------------------------------|-----:|------:|------|
| Top-level pages                          |   28 |    28 | Live includes `/home`; clone substitutes `/` (the `/home` -> `/` alias above). Same count, same page set. |
| Blog category archives (`/blog-1/category/<Name>`) | 10 | 10 | Mirrored 1:1 with identical encoding. |
| Blog tag archives (`/blog-1/tag/<Name>`) | 12 | 12 | Mirrored 1:1 with identical encoding. |
| Blog posts (`/blog-1/<slug>`)            |   70 |    70 | One per `content/blog/*.md`. |
| **Total**                                | **120** | **120** | |

- Live sitemap: `https://www.ericescapes.com/sitemap.xml` — **120** `<loc>` entries.
- Clone sitemap: `/sitemap.ts` (`MetadataRoute.Sitemap`) — **120** URLs.

The only content-level difference is `/home` (live) vs `/` (clone), resolved by the
in-app `/home -> /` 301. Everything else is a byte-for-byte path match.
