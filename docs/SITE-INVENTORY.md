# Site Inventory — ericescapes.com clone

Generated 2026-07-05 by script from the repo (zero-transcription). Companion: `docs/image-manifest.txt` (flat list of all 1378 files under public/). Full parity audit: `docs/research/parity-report.md`. Redirects: `docs/research/redirect-map.md`.

## 1. Site map

### Core pages (10 live + 1 retired)

| Route | Source |
|---|---|
| `/about` | src/app/about/page.tsx |
| `/blog-1` | src/app/blog-1/page.tsx |
| `/chaostocalm` | src/app/chaostocalm/page.tsx |
| `/free-1` | src/app/free-1/page.tsx |
| `/my-gear` | src/app/my-gear/page.tsx |
| `/` | src/app/page.tsx |
| `/prints-1` | src/app/prints-1/page.tsx |
| `/social-lander` | src/app/social-lander/page.tsx |
| `/special` | src/app/special/page.tsx |
| `/store` | src/app/store/page.tsx |
| ~~`/store/p/visual-diary-collection-lightroom-presets`~~ **RETIRED** | ~~src/app/store/p/…/page.tsx~~ — redirected **308 permanent → `/store`** in `next.config.ts` (v2 Shop migration). Old Squarespace product URL; not a live surface. See `docs/design-v2/ia-map.md` + `docs/research/redirect-map.md`. |

### Galleries (17 existing + 1 new) — images live in `public/images/gallery/<route>/`

| Route | Photos |
|---|---|
| `/hongkong` **NEW** | 18 — **new gallery, absent from the live Squarespace site** (18 frames). Net-new for the v2 redesign, not a migrated URL. Referenced as the 6th featured tile candidate in `docs/design-v2/ia-map.md` (which had earlier recommended `/kosciuszko-25` as a substitute because Hong Kong had no gallery — that gap is now filled). Confirm image assets land under `public/images/gallery/hongkong/` at build. |
| `/austria` | 58 |
| `/cenycoast` | 57 |
| `/dolomites` | 17 |
| `/gallery-1-1` | 1 |
| `/hallstatt` | 28 |
| `/italy1` | 59 |
| `/japan` | 43 |
| `/kosciuszko-25` | 52 |
| `/melbourne` | 13 |
| `/salzburg` | 29 |
| `/sapphirecoast` | 18 |
| `/slovenia` | 26 |
| `/sydney` | 51 |
| `/sydney2` | 69 |
| `/verona` | 21 |
| `/vietnam` | 21 |
| `/vietnam2` | 13 |

### Blog
- `/blog-1` — index, 9/page pagination (`?page=N`), title 'Photography Blog'
- `/blog-1/<slug>` — 70 posts (table below)
- `/blog-1/category/<Name>` — 10 categories: Diary, Film Simulations, FujiFilm, Gear, Guide, Inspiration, Lesson, Photography, Review, Travel
- `/blog-1/tag/<Name>` — 12 tags: Film Simulations, FujiFilm, Gear, Guide, Inspiration, Journal, Lesson, Photography, Review, Story, iPad, iPadOS
- Meta: `/sitemap.xml` (120 URLs, live parity), `/robots.txt`, `/blog-1/rss.xml` (all 70 posts), custom 404, `/home` → `/` 301

## 2. Blog posts (70) — newest first

Markdown source: `content/blog/<slug>.md` · images: `public/images/blog/<slug>/` (featured.jpg + NN.jpg in body order)

| Date | Slug | Title | Categories | Tags | Body imgs |
|---|---|---|---|---|---|
| 2026-06-25 | `the-cure-to-gas` | The Cure to GAS | Lesson, Photography | Lesson, Photography | 3 |
| 2026-06-16 | `too-many-open-tabs` | Too Many Open Tabs | — | — | 4 |
| 2026-06-08 | `same-chaos-different-light` | Same chaos, different light | Inspiration, Photography | Inspiration, Photography | 10 |
| 2026-06-01 | `rethinking-fujifilm-film-simulations` | Rethinking Fujifilm Film Simulations | Film Simulations, FujiFilm, Guide, Photography | Film Simulations, FujiFilm, Guide, Photography | 6 |
| 2026-05-23 | `visual-diary-kamakura` | Visual Diary: Kamakura | Diary, Inspiration, Lesson, Photography, Travel | Inspiration, Journal, Photography, Story | 16 |
| 2026-05-10 | `the-tracks-you-lay-without-knowing` | The Tracks You Lay Without Knowing | Inspiration, Lesson, Photography | Inspiration, Lesson, Photography, Story | 6 |
| 2026-03-31 | `photo-journal-over-the-burnout` | Photo Journal: Over the Burnout | Inspiration, Photography | Journal, Photography, Story | 13 |
| 2026-03-23 | `overcoming-creative-burnout` | Overcoming Creative Burnout | Guide, Inspiration, Photography | Guide, Inspiration, Photography | 6 |
| 2026-03-09 | `against-the-algorithm` | Authentic Imperfection | Inspiration, Photography | Inspiration, Photography | 6 |
| 2026-03-02 | `slicing-the-scene` | Slicing the Scene | Guide, Photography | Guide, Photography | 17 |
| 2026-02-14 | `visual-diary-hiroshima` | Visual Diary: Hiroshima | Diary, Photography | Photography, Story | 15 |
| 2026-01-17 | `unteachable-resolutions` | Unteachable Photography Resolutions | Lesson, Photography | Lesson, Photography | 3 |
| 2025-12-30 | `the-photographers-paradox` | The Photographer’s Paradox | Guide, Lesson, Photography | Lesson, Photography | 6 |
| 2025-11-20 | `visual-diary-lost-in-osaka` | Visual Diary: Lost in Osaka | Diary, Inspiration, Photography | Inspiration, Photography | 18 |
| 2025-11-01 | `the-dark-side-of-photography` | The Dark Side of Photography | Inspiration, Photography | Inspiration, Photography, Story | 5 |
| 2025-10-23 | `unteachable-photography-lessons-1` | Unteachable Photography Lessons | Lesson, Photography | Inspiration, Lesson, Photography | 4 |
| 2025-10-11 | `visual-diary-fushimi-inari` | Visual Diary: Fushimi Inari | Diary, Inspiration, Photography | Inspiration, Photography, Story | 18 |
| 2025-10-02 | `finding-your-style` | Unteachable Photography Lessons | Lesson, Photography | Inspiration, Lesson, Photography | 4 |
| 2025-09-25 | `visual-diary-uncovering-nara` | Visual Diary: Waypoint Nara | Diary, Photography | Inspiration, Photography | 22 |
| 2025-09-18 | `capturing-a-feeling` | Capturing a Feeling | Inspiration, Photography | Inspiration, Photography | 16 |
| 2025-09-11 | `who-did-you-make-that-for` | Who Did You Make That For? | Inspiration, Photography | Inspiration, Photography | 4 |
| 2025-09-04 | `unteachable-photography-lessons` | Unteachable Photography Lessons | Guide, Lesson, Photography | Guide, Lesson, Photography | 4 |
| 2025-08-27 | `visual-diary-leaving-was-hard` | Visual Diary: Leaving was Hard | Diary, Inspiration, Photography | Inspiration, Photography, Story | 22 |
| 2025-08-19 | `making-sense-of-chaos-1` | Making Sense of Chaos | Guide, Photography | Guide, Photography, Story | 5 |
| 2025-08-12 | `visual-diary-kanazawa-wakes` | Visual Diary: Kanazawa Wakes | Diary, Photography | Photography, Story | 15 |
| 2025-08-04 | `screw-the-result-follow-the-process` | Process vs Results in Photography | Inspiration, Photography | Inspiration, Photography | 5 |
| 2025-07-30 | `visual-diary-kanazawa-nights` | Visual Diary: Kanazawa Nights | Diary, Photography | Photography, Story | 12 |
| 2025-07-21 | `escape-the-noise` | Escape the Noise | Inspiration, Photography | Inspiration, Photography, Story | 8 |
| 2025-07-13 | `im-a-bad-photographer` | I’m a Bad Photographer | Inspiration, Photography | Inspiration, Photography | 8 |
| 2025-07-03 | `this-camera-is-not-for-you` | This Camera Is Not for You | Gear, Photography | Gear, Photography | 7 |
| 2025-06-20 | `storytelling-in-photography` | Storytelling in Travel Photography | Guide, Photography | Guide, Inspiration, Photography | 9 |
| 2025-06-15 | `ipados-26-and-the-ipad-mini-finally-useful` | iPadOS 26 and the iPad Mini - Finally Useful? | Gear, Photography, Review | Gear, Photography, Review, iPad, iPadOS | 15 |
| 2025-06-11 | `visual-diary-mount-fuji-part-2` | Visual Diary: Mount Fuji Part 2 | Diary, Photography | Photography, Story | 16 |
| 2025-06-01 | `why-street-photography` | Why Street Photography? | Inspiration, Photography | Inspiration, Photography | 14 |
| 2025-05-22 | `visual-diary-fujiyoshida-part-1` | Visual Diary: Fujiyoshida Part 1 | Diary, Photography | Photography, Story | 17 |
| 2025-05-15 | `photography-night-settings` | How I Shoot at Night | Guide, Photography | Guide, Photography | 6 |
| 2025-05-06 | `if-youre-not-getting-frustrated-youre-not-being-challenged` | Get Frustrated | Diary, Photography | Photography, Story | 1 |
| 2025-04-24 | `visual-diary-shinjuku-to-kamakura` | Visual Diary: Shinjuku to Kamakura | Diary, Photography | Photography, Story | 23 |
| 2025-04-10 | `youre-using-the-wrong-lens` | You’re Using the Wrong Lens | Photography | Photography, Story | 12 |
| 2025-04-04 | `visual-diary-japan-half-awake-fully-alive` | Visual Diary: Japan - Half Awake, Fully Alive | Diary, Photography | Photography, Story | 19 |
| 2025-03-19 | `influence-vs-inspiration-in-photography` | Influence vs Inspiration | — | Photography | 4 |
| 2025-02-24 | `the-kit-lens-myth-fujifilm-16-50mm-f28-48-review` | The Kit Lens Myth: Fujifilm 16-50mm f/2.8-4.8 Review | — | Gear, Photography | 15 |
| 2025-02-15 | `growth-gear-and-getting-the-shot` | Growth, Gear, and Getting the Shot | — | Photography | 4 |
| 2025-02-05 | `quantity-quality` | Quantity Leads to Quality Photos | — | Photography | 4 |
| 2025-01-27 | `documenting-the-journey-vietnam` | Documenting the Journey: Vietnam | Diary, Photography | Photography, Story | 26 |
| 2025-01-18 | `fujifilm-travel-kit-exploring-vietnam` | Photography Travel Kit - Exploring Vietnam | — | Gear, Photography | 12 |
| 2025-01-14 | `fujifilm-xf-90mm-f2-review` | Fujifilm 90mm f2 Review | — | Gear | 10 |
| 2025-01-11 | `fujifilm-27mm-f28-review` | Fujifilm 27mm f2.8 WR Review: Tiny But Mighty | — | Gear | 11 |
| 2025-01-09 | `fujifilm-50mm-f2-review` | Fujifilm 50mm f2 Review | — | Gear | 11 |
| 2024-12-25 | `journey-to-simplicity-in-photography` | Journey to Simplicity in Photography | Photography | — | 9 |
| 2024-11-28 | `ai-and-the-future-of-photography-hype-vs-reality` | A.I. and Photography: Hype vs. Reality | — | — | 1 |
| 2024-11-23 | `should-you-use-presets` | Should You Use Presets? | — | Guide, Photography | 3 |
| 2024-10-10 | `fujifilm-16-55mm-f28-review` | Fujifilm 16-55mm f2.8 Review - The Tank | — | Gear | 9 |
| 2024-09-19 | `fujifilm-23mm-f2-review` | Fujifilm 23mm f2 Review | — | Gear | 9 |
| 2024-09-11 | `how-to-use-color-calibration-in-lightroom` | Lightroom's Most Mysterious Tool | — | Guide | 12 |
| 2024-09-05 | `fujifilm-x-t5-review` | Fujifilm X-T5: Review | — | Gear | 7 |
| 2024-08-27 | `clyu5bacold9q1zbw58kfptiviq2zt` | Technical Traps in Photography | — | Photography | 2 |
| 2024-08-01 | `photo-challenge` | Three Photo Solution | — | Photography | 14 |
| 2024-07-24 | `photography-and-mental-health` | Photography and Mental Health | — | — | 15 |
| 2024-07-06 | `photo-editing-workflow` | Photo Editing Workflow Guide | Guide, Photography | Guide | 11 |
| 2024-06-22 | `nikon-z6-ii-long-term-review` | Nikon Z6II Long Term Review | — | Gear | 16 |
| 2024-04-17 | `photography-in-salzburg` | Photography in Salzburg | Photography | Photography | 43 |
| 2024-01-15 | `a-letter-to-future-you` | A Letter To Future You | Travel | — | 1 |
| 2024-01-04 | `keep-2024-simple-improve-your-photography` | Keep 2024 Simple | Improve your photography | Photography | Photography | 1 |
| 2023-12-31 | `edc2023` | My Photography Daily Carry -  Ready for anything | — | Gear | 6 |
| 2023-12-14 | `skyhigh` | My Journey with Drone Photography: A Perspective from Above | Photography | Photography | 7 |
| 2023-11-19 | `voiceandstyle` | Finding Your Photographic Voice | Authentic, Unbound, & Deeply Human | Photography | Photography | 1 |
| 2023-10-27 | `triglav` | Whispers in Triglav | Travel | Photography | 1 |
| 2023-10-15 | `oneday3` | One Day Three Chimneys | Travel | Photography | 5 |
| 2023-07-25 | `Adventurepie` | Adventure Pie | Travel | — | 5 |

## 3. Affiliate links (33 occurrences) — audited product-correct 2026-07-05, tag `ericescapes-22`

| File | Label | Link | Product |
|---|---|---|---|
| src/app/about/page.tsx | Fujifilm X-T5 | https://amzn.to/4u2HNEg | Fujifilm X-T5 body Black AU (B0BKGQ4XF1) |
| src/app/about/page.tsx | Fujifilm 23mm F2.8 WRX | https://amzn.to/4sll44M | Fujifilm XF 23mm F2.8 WRX (B0FHZFTX94) |
| src/app/about/page.tsx | Fujifilm XF 50mm F/2 | https://amzn.to/4clcQVu | Fujinon XF 50mm f/2 WR (B01MS6WINK) |
| src/app/free-1/page.tsx | Fujifilm X-T5 | https://amzn.to/4u2HNEg | Fujifilm X-T5 body Black AU (B0BKGQ4XF1) |
| src/app/free-1/page.tsx | Fujifilm 23mm F2.8 WRX | https://amzn.to/4sll44M | Fujifilm XF 23mm F2.8 WRX (B0FHZFTX94) |
| src/app/free-1/page.tsx | Fujifilm XF 50mm F/2 | https://amzn.to/4clcQVu | Fujinon XF 50mm f/2 WR (B01MS6WINK) |
| src/app/my-gear/page.tsx | Fujifilm X-T5 | https://amzn.to/4u2HNEg | Fujifilm X-T5 body Black AU (B0BKGQ4XF1) |
| src/app/my-gear/page.tsx | Fujifilm 23mmF2.8 WRX | https://amzn.to/4sll44M | Fujifilm XF 23mm F2.8 WRX (B0FHZFTX94) |
| src/app/my-gear/page.tsx | Fujifilm XF50mmF2 R WR | https://amzn.to/4clcQVu | Fujinon XF 50mm f/2 WR (B01MS6WINK) |
| src/app/my-gear/page.tsx | Shimoda Action X 30L | https://amzn.to/3D3pjtS | Shimoda Action X 30L backpack (B083L6K5JK) |
| src/app/my-gear/page.tsx | Benro Tortoise 24c | https://amzn.to/44uhVn9 | Benro Tortoise 24c tripod (B08F2RP5QM) |
| src/app/my-gear/page.tsx | ULANZI Zero Y (L bracket) | https://amzn.to/3XDhZyG | ULANZI Zero Y travel tripod (B0B8SNSDHM) |
| src/app/my-gear/page.tsx | SmallRig L Bracket | https://amzn.to/3NDrpWh | SmallRig L Bracket (B08J9N4SFZ) |
| src/app/my-gear/page.tsx | Peak Design Capture Camera Clip V3 (with Plate) | https://amzn.to/44Q6IO7 | Peak Design Capture Clip V3 (B07818LB9D) |
| src/app/my-gear/page.tsx | Peak Design Everyday Sling 6L | https://amzn.to/3O1YxII | Peak Design Everyday Sling 6L (B07ZTQ7ZGV) |
| src/app/my-gear/page.tsx | PEAK Design Cuff Camera Wrist Strap | https://amzn.to/44BDzGh | Peak Design Cuff wrist strap (B07193B7TL) |
| src/app/my-gear/page.tsx | Apple iPad mini (A17 Pro) | https://www.amazon.com.au/dp/B0DK416M98?tag=ericescapes-22&linkCode=sl1&language=en_AU | Apple iPad mini A17 Pro 128GB Space Grey |
| src/app/my-gear/page.tsx | SanDisk 2TB SSD | https://amzn.to/3pEoHYL | SanDisk 2TB Portable SSD (B08RSML1B8) |
| src/app/my-gear/page.tsx | Anker USB C Charger (Nano II 65W) | https://amzn.to/3XEbmw0 | Anker Nano II 65W charger (B09XTX3GS8) |
| src/app/my-gear/page.tsx | SmallRig EN-EL15 Charger | https://amzn.to/3O1v5CN | SmallRig EN-EL15 charger, Nikon legacy (B09Z6WG2P1) |
| src/app/my-gear/page.tsx | Mini Power bank | https://amzn.to/3PKpdPC | Charmast mini power bank (B08B4MMHKC) |
| src/app/my-gear/page.tsx | AirPods Pro 3 | https://www.amazon.com.au/dp/B0FQDRMVFV?tag=ericescapes-22&linkCode=sl1&language=en_AU | Apple AirPods Pro 3 |
| src/app/my-gear/page.tsx | Urth 82mm UV, Circular Polarizing (CPL), ND8, ND1000 Lens Filter Kit | https://amzn.to/3XHi7wY | Urth 82mm filter kit (B088C3HXYT) |
| src/app/my-gear/page.tsx | Step Down Adapter Ring Set | https://amzn.to/3D07TOP | Neewer step-up/down ring kit (B00WW31A3E) |
| src/app/my-gear/page.tsx | Drone Filters | https://www.amazon.com.au/dp/B0CKRFH8MW?ref=ppx_yo2ov_dt_b_product_details&th=1 | (drone filters — pre-existing) |
| src/app/my-gear/page.tsx | DJI Mini 4 Pro | https://amzn.to/47wxcoN | DJI Mini 4 Pro Fly More (B0CFF4RYDM) |
| src/app/my-gear/page.tsx | (inline) | https://www.amazon.com.au/dp/B0GR1Q4452?tag=ericescapes-22&linkCode=sl1&language=en_AU | Apple MacBook Air 13" M5 2026 |
| src/app/page.tsx | Fujifilm X-T5 | https://amzn.to/4u2HNEg | Fujifilm X-T5 body Black AU (B0BKGQ4XF1) |
| src/app/page.tsx | Fujifilm 23mm F2.8 WRX | https://amzn.to/4sll44M | Fujifilm XF 23mm F2.8 WRX (B0FHZFTX94) |
| src/app/page.tsx | Fujifilm XF 50mm F/2 | https://amzn.to/4clcQVu | Fujinon XF 50mm f/2 WR (B01MS6WINK) |
| src/app/special/page.tsx | Fujifilm X-T5 | https://amzn.to/3GWNkoC | Fujifilm X-T5 body Black (B0BK2P7DMG) |
| src/app/special/page.tsx | Fujifilm XF 23mm f/2 | https://amzn.to/48wjm6A | Fujinon XF 23mm f/2 R WR (B01KNXOCO8) |
| src/app/special/page.tsx | Fujifilm XF 50mm f/2 | https://amzn.to/47hZT8w | Fujinon XF 50mm f/2 WR (B01MS6WINK) |

Gumroad: `ericescape.gumroad.com/l/jetyik` (Visual Diary preset, store + free-1 + homepage form redirect) · `/l/avcmj` (Chaos to Calm). Social: instagram.com/ericescapes · ericescapes.substack.com. IG feed: feeds.behold.so/rAfeJ0kqND2SHoZkoZoz. MailerLite: form 188824634630604255 (acct 2376297).

## 4. Images (1378 files under public/)

| Directory | Files |
|---|---|
| public/brand | 1 |
| public/images/about | 1 |
| public/images/blog/Adventurepie | 6 |
| public/images/blog/a-letter-to-future-you | 2 |
| public/images/blog/against-the-algorithm | 7 |
| public/images/blog/ai-and-the-future-of-photography-hype-vs-reality | 2 |
| public/images/blog/capturing-a-feeling | 17 |
| public/images/blog/clyu5bacold9q1zbw58kfptiviq2zt | 3 |
| public/images/blog/documenting-the-journey-vietnam | 27 |
| public/images/blog/edc2023 | 7 |
| public/images/blog/escape-the-noise | 9 |
| public/images/blog/finding-your-style | 5 |
| public/images/blog/fujifilm-16-55mm-f28-review | 10 |
| public/images/blog/fujifilm-23mm-f2-review | 10 |
| public/images/blog/fujifilm-27mm-f28-review | 12 |
| public/images/blog/fujifilm-50mm-f2-review | 12 |
| public/images/blog/fujifilm-travel-kit-exploring-vietnam | 13 |
| public/images/blog/fujifilm-x-t5-review | 8 |
| public/images/blog/fujifilm-xf-90mm-f2-review | 11 |
| public/images/blog/growth-gear-and-getting-the-shot | 5 |
| public/images/blog/how-to-use-color-calibration-in-lightroom | 13 |
| public/images/blog/if-youre-not-getting-frustrated-youre-not-being-challenged | 2 |
| public/images/blog/im-a-bad-photographer | 9 |
| public/images/blog/influence-vs-inspiration-in-photography | 5 |
| public/images/blog/ipados-26-and-the-ipad-mini-finally-useful | 16 |
| public/images/blog/journey-to-simplicity-in-photography | 10 |
| public/images/blog/keep-2024-simple-improve-your-photography | 2 |
| public/images/blog/making-sense-of-chaos-1 | 6 |
| public/images/blog/nikon-z6-ii-long-term-review | 17 |
| public/images/blog/oneday3 | 6 |
| public/images/blog/overcoming-creative-burnout | 7 |
| public/images/blog/photo-challenge | 17 |
| public/images/blog/photo-editing-workflow | 12 |
| public/images/blog/photo-journal-over-the-burnout | 14 |
| public/images/blog/photography-and-mental-health | 16 |
| public/images/blog/photography-in-salzburg | 44 |
| public/images/blog/photography-night-settings | 7 |
| public/images/blog/quantity-quality | 5 |
| public/images/blog/rethinking-fujifilm-film-simulations | 7 |
| public/images/blog/same-chaos-different-light | 11 |
| public/images/blog/screw-the-result-follow-the-process | 6 |
| public/images/blog/should-you-use-presets | 4 |
| public/images/blog/skyhigh | 8 |
| public/images/blog/slicing-the-scene | 18 |
| public/images/blog/storytelling-in-photography | 10 |
| public/images/blog/the-cure-to-gas | 4 |
| public/images/blog/the-dark-side-of-photography | 6 |
| public/images/blog/the-kit-lens-myth-fujifilm-16-50mm-f28-48-review | 16 |
| public/images/blog/the-photographers-paradox | 7 |
| public/images/blog/the-tracks-you-lay-without-knowing | 7 |
| public/images/blog/this-camera-is-not-for-you | 8 |
| public/images/blog/too-many-open-tabs | 5 |
| public/images/blog/triglav | 2 |
| public/images/blog/unteachable-photography-lessons | 5 |
| public/images/blog/unteachable-photography-lessons-1 | 5 |
| public/images/blog/unteachable-resolutions | 4 |
| public/images/blog/visual-diary-fujiyoshida-part-1 | 18 |
| public/images/blog/visual-diary-fushimi-inari | 19 |
| public/images/blog/visual-diary-hiroshima | 16 |
| public/images/blog/visual-diary-japan-half-awake-fully-alive | 20 |
| public/images/blog/visual-diary-kamakura | 17 |
| public/images/blog/visual-diary-kanazawa-nights | 13 |
| public/images/blog/visual-diary-kanazawa-wakes | 16 |
| public/images/blog/visual-diary-leaving-was-hard | 23 |
| public/images/blog/visual-diary-lost-in-osaka | 19 |
| public/images/blog/visual-diary-mount-fuji-part-2 | 17 |
| public/images/blog/visual-diary-shinjuku-to-kamakura | 24 |
| public/images/blog/visual-diary-uncovering-nara | 23 |
| public/images/blog/voiceandstyle | 2 |
| public/images/blog/who-did-you-make-that-for | 5 |
| public/images/blog/why-street-photography | 15 |
| public/images/blog/youre-using-the-wrong-lens | 13 |
| public/images/chaostocalm | 4 |
| public/images/free | 4 |
| public/images/gallery/austria | 58 |
| public/images/gallery/cenycoast | 57 |
| public/images/gallery/dolomites | 17 |
| public/images/gallery/gallery-1-1 | 1 |
| public/images/gallery/hallstatt | 28 |
| public/images/gallery/italy1 | 59 |
| public/images/gallery/japan | 43 |
| public/images/gallery/kosciuszko-25 | 52 |
| public/images/gallery/melbourne | 13 |
| public/images/gallery/salzburg | 29 |
| public/images/gallery/sapphirecoast | 18 |
| public/images/gallery/slovenia | 26 |
| public/images/gallery/sydney | 51 |
| public/images/gallery/sydney2 | 69 |
| public/images/gallery/verona | 21 |
| public/images/gallery/vietnam | 21 |
| public/images/gallery/vietnam2 | 13 |
| public/images/home | 9 |
| public/images/my-gear | 5 |
| public/images/prints | 1 |
| public/images/special | 1 |
| public/images/store | 4 |
| public/images/store-product | 4 |
| public/seo | 1 |

Full flat list: `docs/image-manifest.txt`. Note: many gallery/home .jpg files are WebP-encoded (Squarespace CDN quirk) — renders fine via next/image; rename pass optional at rebuild.
