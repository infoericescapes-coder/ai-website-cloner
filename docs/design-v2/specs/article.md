# Spec — Diary article (`/blog-1/[slug]`)

Prototype view `article` (`isArticle`), lines 223–277. Reference: `article-01-top.png`, `article-02-photo-break.png`. Maps to existing 70 posts at `/blog-1/[slug]` via `getPostBySlug()`.

Container: `position:relative;z-index:1;animation:eeViewIn 0.3s ease both`. The article alternates **centered prose panels** (max-width 860px) with **full-bleed photo breaks** (100% width).

---

## 1. Header block
`max-width:860px;margin:0 auto;padding:64px {gutter} 0`.
- Back link: `display:inline-block;font-size:11.5px;letter-spacing:0.16em;uppercase;color:#8B8F86`, hover→accent → "← Visual Diaries" → `/blog-1`.
- Kicker (`margin-top:42px;font-size:12px;letter-spacing:0.18em;uppercase;color:#8B8F86`): "Diary · {category} · {date}" (prototype: "Diary · Travel · 12 Jan 2026").
- Title (`margin-top:18px;font-size:{bigTitleFs}` (**56px**/34px)`;font-weight:600;line-height:1.02;letter-spacing:-0.01em;text-wrap:balance`) → post title.
- Data line (`margin-top:20px;font-size:12px;letter-spacing:0.14em;uppercase;color:#8B8F86`) → "{place}, {CC} · {coords} · {detail} · {N} frames" (prototype: "Kamakura, JP · 35.32°N 139.55°E · Enoden line · 31 frames").
  - **Data (ours):** most posts have no coords/frame-count in frontmatter. Build the data line from what exists: `{category} · {date} · {N} images` where N = body image count, OR just `{category} · {formatted date}`. Do NOT fabricate coords. Flag: this signature data line is richest for the travel/visual-diary posts; for gear/lesson posts it degrades to category+date. Confirm the degraded form with Eric.

## 2. Prose panels
`max-width:860px;margin:52px auto 0` (first) / `0 auto` (subsequent)`;padding:0 {gutter}`. Inner panel (`eeReveal…`): `background:#0B0D0B;border:1px solid rgba(242,239,230,0.08);padding:{panelPad}` (**`56px 72px`** desktop / **`30px 22px`** mobile).
- Paragraphs: `font-size:17.5px;line-height:1.75;color:#F2EFE6`, `margin:0 0 26px` (all but last) / `margin:0` (last). Measure ~68ch (panel width caps it).
- **Rendering (ours):** post body is Markdown (`content` from `getPostBySlug`, rendered via `react-markdown` + `remark-gfm` — already deps). The prototype groups prose into discrete `#0B0D0B` panels between photo breaks. For real posts, the builder must **segment the markdown into panels around body images**: each run of prose between images → one prose panel; each body image → a full-bleed photo break (§3). This is the key translation task — the prototype hand-authored the alternation; ours derives it from markdown structure. Strategy: split `content` on image nodes; wrap prose runs in panels, promote images to breaks. Flag as the most involved part of this view.

## 3. Full-bleed photo breaks
Between panels: `eeReveal…;margin:72px 0`. Image: `display:block;width:100%;height:{70vh|66vh};object-fit:cover;object-position:{pos}`. Prototype alternates `70vh` then `66vh` — use `70vh` as default (or vary subtly). Caption below: `margin-top:13px;text-align:center;font-size:11px;letter-spacing:0.18em;uppercase;color:#8B8F86` → "Frame {NN}/{total} · {caption} · {time}".
- **Data (ours):** body images live at `public/images/blog/<slug>/NN.jpg` (in body order). Caption: markdown alt text if present, else `"{PLACE} · {index}"` or omit. Prototype's "Frame 09/31 · Station soba · 18:36" is placeholder-rich; ours uses alt text or a simple index. Don't fabricate times/locations.

## 4. Sign-off
Last prose panel ends with (`margin-top:34px;font-size:12px;letter-spacing:0.18em;uppercase;color:#8B8F86`) → "Eric". (Wrapper `padding:0 {gutter} 40px`.)

## 5. Prev / next
`max-width:860px;margin:40px auto 110px;padding:0 {gutter}`. Grid `eeReveal…;grid-template-columns:1fr 1fr;border-top+border-bottom:1px solid rgba(242,239,230,0.13)`.
- **Prev** (`padding:26px 28px 26px 0;border-right:1px solid rgba(242,239,230,0.09)`): label `font-size:11px;letter-spacing:0.18em;uppercase;color:{hover?accent:muted}` → "← Prev"; title `margin-top:10px;font-size:20px;font-weight:500` → prev post title. → `/blog-1/{prevSlug}`.
- **Next** (`padding:26px 0 26px 28px;text-align:right`): "Next →" + next title. → `/blog-1/{nextSlug}`.
- **Data (ours):** prev/next by date order from `getAllPosts()` (newest-first array → prev = older neighbour, next = newer, or match the site's existing convention). Handle first/last edges (hide the missing side or wrap). Mobile: stack to 1 column (drop the vertical divider).

## Responsive summary
gutter 20→40 · bigTitleFs 34→56 · panelPad `30px 22px`→`56px 72px` · photo breaks stay full-width (height 70/66vh) · prev/next 2col→1col.
