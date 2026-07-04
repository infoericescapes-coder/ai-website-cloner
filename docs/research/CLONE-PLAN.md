# ericescapes.com — Clone Master Plan

Source: https://www.ericescapes.com/ (Squarespace). Target: this Next.js 16 + Tailwind v4 project.
Approach: phased, model-tiered. Opus 4.8 = foreman/advisor (recon, specs, QA). Cheaper models = builders.

## Page inventory (~120 pages from sitemap)
- **1 homepage** `/`
- **8 core pages**: `/about` `/my-gear` `/prints-1` `/free-1` `/special` `/store` `/store/p/visual-diary-collection-lightroom-presets` `/chaostocalm`
- **~18 galleries**: hallstatt, dolomites, slovenia, italy1, vietnam/vietnam2, sydney/sydney2, verona, salzburg, melbourne, cenycoast, sapphirecoast, kosciuszko-25, gallery-1-1, japan, austria, social-lander
- **Blog**: `/blog-1` index + **92 posts** under `/blog-1/*` (shared post template)

## Phases
| # | Phase | Scope | Builder tier | Status |
|---|-------|-------|--------------|--------|
| 1 | Foundation + Homepage | design tokens, fonts, globals, Header/Footer, homepage | Sonnet | IN PROGRESS |
| 2 | Core pages | about, my-gear, prints, free, special, store+product, chaostocalm | Sonnet | pending |
| 3 | Galleries | ~18 location galleries (shared template + per-page images) | Haiku/Sonnet | pending |
| 4 | Blog | index + post template, import 92 posts | Haiku (content) + Sonnet (template) | pending |
| 5 | Assembly + QA | nav wiring, routing, visual diff vs live | Opus | pending |

## Checkpoints
- After Phase 1: show Eric the homepage before mass-dispatching galleries + blog.

## Conventions
- Design tokens: `docs/research/_tokens/design-tokens.md` (source of truth)
- Per-page research: `docs/research/<page>/` (source.html + spec.md)
- Images: `public/images/<page>/`; brand: `public/brand/`; seo: `public/seo/`
- Components: `src/components/` (shared: Header, Footer; per-section as needed)
- Routes: Next App Router under `src/app/`
- **Internal links MUST be relative** (`/about`, `/my-gear`, `/blog-1/<slug>`), NEVER absolute to the live site (`https://www.ericescapes.com/...`). The clone must be self-contained — every internal Squarespace link gets rewritten to its relative path, no `target=_blank` on internal routes. EXTERNAL links stay absolute + `target=_blank`: Amazon affiliate (`amzn.to`), Instagram, Substack, Gumroad. This preserves the SEO-critical URL slugs from the migration brief.
