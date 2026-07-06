# Spec — Visual Diaries index (`/blog-1`)

Prototype view `diaries` (`isDiaries`), lines 190–221. Reference: `diaries-index.png`. Editorial list, **no cards**. Maps to the existing `/blog-1` index (label "Visual Diaries", `ia-map.md`).

Container: `position:relative;z-index:1;animation:eeViewIn 0.3s ease both;max-width:1180px;margin:0 auto;padding:52px {gutter} 110px`.

---

## 1. Header
- Kicker: `font-size:12px;letter-spacing:0.18em;uppercase;color:#8B8F86` → "Field notes & longer looks".
- Title row (`display:flex;align-items:flex-end;justify-content:space-between;gap:40px;margin-top:20px;padding-bottom:30px`):
  - Title: `font-size:{bigTitleFs}` (**56px** desktop / **34px** mobile)`;font-weight:600;line-height:1;letter-spacing:-0.01em` → "Visual Diaries".
  - Right meta: `font-size:12px;letter-spacing:0.14em;uppercase;color:#8B8F86` → "{N} entries · {year range}".
  - **Data (ours):** prototype shows "05 entries · 2025–2026". Real: `getAllPosts().length` = **70** posts → "70 entries · 2023–2026" (min/max post years). Recompute, don't hardcode 05.

## 2. Rows (with year-break labels)
Iterate posts. Before a group whose year differs from the previous row, emit a **year-break label**: `font-size:11px;letter-spacing:0.22em;color:#8B8F86;padding:30px 0 14px` → e.g. "2026", "2025". (Prototype drives this off `d.yearBreak`; for real data, compute: show the year label when `post.year !== prevPost.year`.)

Each row: `eeReveal…;display:grid;grid-template-columns:{diaryRowCols}` (**`230px 1fr 44px 168px`** desktop / **`1fr`** mobile)`;align-items:center;gap:30px;padding:26px 0;border-top:1px solid rgba(242,239,230,0.09);cursor:pointer` → links to `/blog-1/{slug}`.
- **Col 1 — kicker+date** (`flex-direction:column;gap:7px;font-size:11.5px;letter-spacing:0.14em;uppercase`, both `color:#8B8F86`): `{kicker}` (line 1) + `{date}` (line 2). Kicker = "DIARY · {category}" style; date = "12 JAN 2026" format.
- **Col 2 — title + excerpt:** title `font-size:28px;font-weight:500;letter-spacing:-0.005em;line-height:1.15`; excerpt `margin-top:8px;font-size:15px;line-height:1.55;color:#8B8F86;max-width:56ch`.
- **Col 3 — arrow:** `font-size:16px;color:--ee-accent;opacity:{arrowOp}` (0→1 hover)`;text-align:center` → →.
- **Col 4 — thumbnail:** `background:{mountBg};border:1px solid {thumbBorder};padding:{thumbPad}` then `<img aspect-ratio:3/2;object-fit:cover;object-position:{pos};width:100%>`. Default full-bleed (transparent border/0 pad); mounted mode adds mount grey + 6px pad + `0.16`→`0.45` hover border.
- Close with a trailing `border-top` div.

## 3. Data mapping (ours)
Source: `getAllPosts()` (70 `PostSummary` items, newest-first).
| Prototype field | Real source |
|---|---|
| `kicker` | `"DIARY · " + categories[0]?.toUpperCase()` (fallback "DIARY"). Prototype uses GEAR/STREET/TRAVEL/CRAFT — map from the post's primary category. |
| `date` | `date` formatted `DD MMM YYYY` uppercase. |
| `title` | `title`. |
| `excerpt` | `excerpt` (frontmatter), truncated to ~56ch visual measure via `max-width:56ch` (CSS handles it — pass full string). |
| `img` / `pos` | `featured` image (`public/images/blog/<slug>/featured.jpg`); `object-position` default `50% 45%`. |
| `yearBreak` | computed from `date` year vs previous row. |
| link | `/blog-1/{slug}`. |

## 4. Pagination
The existing `/blog-1` uses **9/page** pagination via `?page=N` (SITE-INVENTORY). The prototype shows a flat list (only 5 entries). Keep the existing pagination — render 9 rows per page with the editorial row treatment above, plus the site's existing pager control restyled to the token system (muted labels, accent hover, 120ms). Category (`/blog-1/category/<Name>`) and tag (`/blog-1/tag/<Name>`) index pages reuse this exact row layout, filtered. Flag: prototype has no pager design — builder restyles the existing pager to match (11px uppercase, accent active/hover), don't invent a new pattern.

## Responsive summary
gutter 20→40 · bigTitleFs 34→56 · diaryRowCols `1fr`→`230px 1fr 44px 168px` (mobile stacks: kicker, then title+excerpt, then thumb; arrow can hide on mobile). max-width 1180.
