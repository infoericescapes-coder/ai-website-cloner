# E2E Parity Report — local clone vs live ericescapes.com

**Date:** 2026-07-05 · **Method:** all 125 public routes pre-fetched both sides to `/tmp/parity/` (manifest.json there), compared file-vs-file by gpt-5.5 workers (cheap-fanout lane), gated by a Claude pilot-verify (4 routes), an opus re-comparison of the twice-failed chunk (8 routes), and an opus-high adversarial audit of 6 sampled verdicts. Raw per-route results: `/tmp/parity/bulk_results.json`.

## Headline
**Content parity is strong.** 125/125 routes compared. The overwhelming majority PASS or differ only in allowlisted platform ways (custom IG grid, native MailerLite form, pagination style, asset paths, Squarespace chrome). Real defects cluster into six small classes below — mostly metadata, no missing content pages, no missing gallery photos (all 16 gallery counts match live exactly), no broken copy.

## REAL defects (confirmed, fix-ready)

| # | Class | Scope | Detail |
|---|---|---|---|
| 1 | **date-shift (off-by-one)** | 11 posts confirmed; full 70-post sweep recommended | Frontmatter dates were sliced in UTC from AEST timestamps, so morning-published posts show a day early. Confirmed: finding-your-style, photography-and-mental-health, rethinking-fujifilm-film-simulations, the-kit-lens-myth…, the-tracks-you-lay…, visual-diary-uncovering-nara, who-did-you-make-that-for, fujifilm-travel-kit…, fujifilm-xf-90mm…, visual-diary-kanazawa-nights (audit-verified), + pilot archive-date. Fix: re-derive date from live datePublished with +10/+11 offset awareness, all 70 posts. |
| 2 | **Missing per-page `<title>`** | /my-gear, /slovenia | Both render bare "ERIC ESCAPES"; live has "My Gear — …", "Slovenia — …". Fix: add generateMetadata (and sweep all static routes for the same gap). |
| 3 | **"Blog" vs "Photography Blog" title suffix** | /blog-1 + all 22 archives | Live titles the blog collection "Photography Blog"; clone templates say "Blog". One-string fix in index + category/tag generateMetadata. |
| 4 | **/my-gear: 2 live-only affiliate clickthroughs** | /my-gear | Live wraps two gear IMAGES in links (empty anchor text): amzn.to/4sll44M and amzn.to/47wxcoN. Clone images aren't linked. (Note: 47wxcoN is the old DJI target the text-link audit replaced with 3D13xHj — live's own image link still uses the old target. Decide: mirror live exactly, or point both image+text at the corrected targets.) |
| 5 | **/about: affiliate mapping + Contact heading** | /about | Live About assigns X-T5→4u2HNEg and 50mm→4clcQVu (OPPOSITE of live homepage). Clone used the homepage mapping on both pages. Live site is internally inconsistent — owner call which mapping is intended. Also live has a "Contact" heading above the social links; clone lacks it. |
| 6 | **Gallery page-name cluster (dropped "2"/"25")** | /sydney2, /vietnam2, /kosciuszko-25 | sydney2: local title+h1 "Sydney" vs live "Sydney2". vietnam2: title correct, h1 "Vietnam" vs expected "Vietnam 2". kosciuszko-25: h1 "Kosciuszko" vs title "Kosciuszko 25". Deliberate builder humanisation vs strict live parity — owner taste call. |

**Policy item (owner decision, not a defect):** live robots.txt carries Squarespace's AI-bot blocks (GPTBot etc.) + system-path disallows; clone is allow-all. If you want AI-crawler blocking preserved post-migration, port those user-agent rules.

## False positives killed by the gates (no action)
- "Blog index missing 11 posts" — pagination-style artifact (local 9/page vs live 20/page); all posts exist.
- "Missing category tags" on 11 posts — codex misread live prev/next promo-card tag links as byline content (opus audit disproved with byte offsets; live bylines on those posts show date+author only, same as clone).
- "kosciuszko-25 missing local h1" — false; local has the h1.
- /prints-1 "extra content" — deliberate coming-soon page (live is an empty stub).
- /gallery-1-1 count 1 vs 6 — live unpublished template stub; the 6 are sqsp demo/chrome assets.
- Store/special "missing gumroad on live" — live uses native Squarespace cart; clone deliberately links Gumroad (migration design).

## Verified-good highlights
- All 16 real galleries: image counts match live exactly (69/69, 58/58, 51/51, 43/43, …).
- sitemap.xml: 120/120 URL parity (only /home ↔ / canonicalisation, by design).
- RSS, robots pointer, custom 404, /home 301: behave as designed.
- Chaostocalm, store product, homepage, blog posts' copy: spot-checks all pass.

## Process notes (first cheap-fanout production run)
gpt-5.5 lane did the grunt work for the whole sweep; Claude gates caught 2 codex over-flags in 6 sampled (kept them out of the fix list) and an opus escalation absorbed the chunk that the cheap lane failed twice — root cause was a Cypher wrapper prompt-file collision under parallelism, reported with fix in `Base Team/Team inbox/2026-07-05_cypher-prompt-file-collision-bug-report.md`.
