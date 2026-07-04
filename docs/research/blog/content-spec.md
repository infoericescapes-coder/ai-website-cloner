# Blog content spec — ericescapes.com clone

The blog is the migration priority. Posts are stored as **Markdown files** (editable via Claude / Notion paste-in per the brief). One file per post. The index + `[slug]` template read them.

## File layout
- Post content: `content/blog/<slug>.md` (slug = the live URL slug, e.g. `visual-diary-kamakura` from `/blog-1/visual-diary-kamakura`)
- Post images: `public/images/blog/<slug>/` — `featured.jpg` (hero) + `01.jpg`, `02.jpg`, … (inline, in body order)
- Reader lib: `src/lib/blog.ts`

## Frontmatter (YAML) — every post file
```yaml
---
title: "Visual Diary: Kamakura"        # og:title minus the " — ERIC ESCAPES" suffix, HTML-entity-decoded
date: "2026-05-23"                       # from datePublished (ISO), date only
author: "Eric Kowalczyk"
categories: ["Diary", "Travel"]          # Squarespace tags/categories; [] if none
excerpt: "One-sentence summary."         # og:description, or first ~160 chars of body
featured: "/images/blog/visual-diary-kamakura/featured.jpg"  # og:image, downloaded locally
slug: "visual-diary-kamakura"            # must equal the filename
---
```

## Body (Markdown, after the frontmatter)
- Convert the live post's `.blog-item-content` HTML → clean Markdown (use `turndown` in a node script). Preserve headings, paragraphs, blockquotes, lists, links, emphasis, in order.
- **Internal links relative** (`/blog-1/<slug>`, `/my-gear`, gallery routes); external links (amzn.to, instagram, substack, gumroad) kept absolute.
- **Inline images**: download each body image to `public/images/blog/<slug>/NN.jpg` (in DOM order, high-res `?format=2500w`, `-H "Accept: image/jpeg"` to avoid WebP-as-jpg) and reference in Markdown as `![alt](/images/blog/<slug>/NN.jpg)`. Exclude the site logo/favicon/chrome.

## Reader lib `src/lib/blog.ts`
- `getAllPosts()`: read every `content/blog/*.md`, parse frontmatter with `gray-matter`, return sorted by `date` DESC. Return typed objects (title, date, author, categories, excerpt, featured, slug). NO `any`.
- `getPostBySlug(slug)`: return `{ ...frontmatter, content }` (raw markdown body).
- `getAllSlugs()`: for `generateStaticParams`.

## Index `src/app/blog-1/page.tsx`
- Server component. Heading "Blog" (or match live). Grid of post cards, newest first: featured image (next/image), a DM Mono category eyebrow, the title (Open Sans/Poppins), date (formatted e.g. "23 May 2026"), and excerpt. Each card links to `/blog-1/<slug>`.
- Pagination: the live site paginates (~7–10 per page, "Older Posts"). Implement simple pagination (e.g. `/blog-1?page=2` via searchParams, or show all with a "load more" — pick page-based; keep it clean). For the 5-sample stage this may show one page.

## Post template `src/app/blog-1/[slug]/page.tsx`
- `generateStaticParams` from `getAllSlugs()`. `generateMetadata` (title, description=excerpt, og:image=featured).
- Layout: DM Mono category eyebrow → title (large) → date + "Written by Eric Kowalczyk" → featured image (next/image, full-width-ish) → body rendered with **react-markdown + remark-gfm**, in a readable measure (Open Sans, ~65–75ch, generous line-height), on-brand.
- Markdown image renderer: map `img` to a plain `<img loading="lazy" className="w-full h-auto my-8 rounded-sm" />` (add `{/* eslint-disable-next-line @next/next/no-img-element */}`) — avoids next/image dimension issues for arbitrary inline photos.
- Back-to-blog link (→ `/blog-1`).

## Build rule
TypeScript strict, NO `any`. Deps already installed: gray-matter, react-markdown, remark-gfm (runtime), turndown (scrape-time, devDep).
