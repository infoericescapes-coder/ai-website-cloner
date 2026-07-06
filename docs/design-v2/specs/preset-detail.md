# Spec — Preset · Chaos to Calm (`/chaostocalm`)

Prototype view `preset` (`isPreset`), lines 427–523. Reference: `shop-preset-chaos-to-calm.png`. Maps to existing `/chaostocalm`.

> **OVERRIDE — Eric standard, B3 (clean photos everywhere).** No mount boxes or hairline borders around the preview photos. The **before/after cells** (§3) stay clean-edged (the `BEFORE`/`AFTER` chips are functional look labels, not decorative mounts — keep them; do not wrap the images in a mount/border). The single per-look **caption line** below each pair (§3, e.g. "Shinjuku, after dark…") is real, hand-written copy — it is NOT an auto-generated `Frame NN/total` caption, so it stays. The §4 pack-panel **corner brackets** frame a text panel, not a photo, so they're unaffected by the no-mount-on-photos rule.

Container: `position:relative;z-index:1;animation:eeViewIn 0.3s ease both`. Mixed max-width-860 sections; the before/after grids go full-container.

---

## 1. Header
`max-width:860px;margin:0 auto;padding:64px {gutter} 0`.
- Back link → "← Shop" → `/store` (11.5px, muted→accent).
- Kicker (`margin-top:42px`) → "Lightroom preset pack · 2 looks".
- Title (`margin-top:18px;font-size:{bigTitleFs}` (**56px**/34px)`;font-weight:600;line-height:1.02;letter-spacing:-0.01em`) → "Chaos to Calm".
- Intro P1 (`margin:26px 0 0;font-size:17.5px;line-height:1.75;color:#F2EFE6;max-width:62ch`) → "Two looks, pulled off the streets of Japan. Built on the road, based on how the places made me feel."
- Intro P2 (`margin:14px 0 0;` same but `color:#8B8F86`) → "No over-cooked HDR, no fake grain cranked to eleven. Just colour that respects the place."

## 2. "See the difference" bar
`max-width:860px;margin:64px auto 0;padding:0 {gutter};display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid rgba(242,239,230,0.13);padding-bottom:14px`.
- Left: "See the difference" (12px kicker). Right: "Drag nothing, just look" (11px, 0.18em uppercase muted).

## 3. Look sections (×2)
Each look = a heading block + a before/after pair.

**Look 01 — Neon & Grey:** block `max-width:860px;margin:52px auto 0;padding:0 {gutter}`.
- Heading row (`justify-content:space-between;align-items:baseline;gap:24px`): name `font-size:24px;font-weight:500` → "Neon & Grey"; film-stock tag `font-size:11.5px;letter-spacing:0.16em;uppercase;color:--ee-accent` → "Cinestill 800T".
- Description (`margin:16px 0 0;font-size:16px;line-height:1.7;color:#8B8F86;max-width:66ch`) → "Cinestill 800T, shot at street level. Warm neon glow, teal sliding into the shadows, that red halation bleeding around every sign. Reach for it after dark, when the city is lit by its own signage and you want the photo to feel like the place felt."
- **Before/after pair** (`margin:36px 0 0`): grid `grid-template-columns:{baCols}` (**`1fr 1fr`** / `1fr`)`;gap:2px`. Each cell `position:relative`, img `width:100%;height:{baH}` (**52vh**/32vh)`;object-fit:cover;object-position:50% 40%`. Chip top-left (`top:14px;left:14px;font-size:10.5px;letter-spacing:0.2em;padding:4px 8px;background:rgba(5,6,5,0.55)`): BEFORE = `color:rgba(242,239,230,0.75)`; AFTER = `color:--ee-accent`.
- Caption below (`margin-top:13px;text-align:center;font-size:11px;letter-spacing:0.18em;uppercase;color:#8B8F86`) → "Shinjuku, after dark. Straight off the camera, then the grade."
- Images: `uploads/neon-grey-before.jpg` / `-after.jpg` → our `public/images/chaostocalm/` (4 files) or `store-product/`. Map the 4 comparison images to the 2 looks; confirm exact files with Eric.

**Look 02 — Warm Afternoon:** block `margin:72px auto 0`, same structure.
- Tag → "Warm / Kodak Gold". Description → "Soft golden highlights, cool shadows, contrast kept gentle. Named for the second time I went to Kamakura, the day the light finally showed up. For late afternoons, the slow shots where you have time to wait for the sun." Object-position `50% 55%`. Caption → "Kamakura, the Enoden crossing." Images `warm-afternoon-before/after.jpg`.

## 4. Pack panel
`max-width:860px;margin:88px auto 0;padding:0 {gutter}`. Panel `position:relative;background:#0B0D0B;border:1px solid rgba(242,239,230,0.08);padding:{packPad}` (**`52px 60px`**/`30px 22px`) + **4 corner brackets** (`14px`, `1px`, `rgba(242,239,230,0.45)`, at `-1px` offsets).
- Kicker → "The pack · 2 presets".
- Title row (`justify-content:space-between;align-items:baseline;gap:30px;margin-top:16px;flex-wrap:wrap`): title `font-size:34px;font-weight:600;letter-spacing:-0.01em` → "Chaos to Calm"; price `font-size:14px;letter-spacing:0.08em;color:#F2EFE6` → "A$5+ AUD · " + `<span color:#8B8F86>pay what you want</span>`.
- Paragraph (`margin:22px 0 0;font-size:16px;line-height:1.7;color:#F2EFE6;max-width:64ch`) → "The two looks I actually reach for, in one pack. Neon & Grey for the nights, Warm Afternoon for the slow days. These are a starting point, not a one-tap miracle. You will still nudge them to fit your shot, and that is kind of the point. Pay what you want, from five bucks. You decide what they are worth."
- **4 bullet rows** (`flex-direction:column;gap:11px;margin-top:26px`), each `display:flex;gap:12px;align-items:baseline`: `<span color:--ee-accent;font-size:11px>→</span>` + `<span font-size:15px;color:#F2EFE6>{text}</span>`:
  1. "Two presets: Neon & Grey and Warm Afternoon"
  2. "XMP files for Lightroom Classic, desktop, and Mobile"
  3. "A plain-English install & usage guide"
  4. "Free updates, forever"
- **CTA button:** `<a target=_blank href=ericescape.gumroad.com/l/avcmj>` `display:inline-flex;align-items:center;gap:12px;margin-top:34px;background:var(--ee-accent);color:#050605;font-size:12.5px;font-weight:600;letter-spacing:0.2em;padding:15px 26px;transition:filter 120ms ease`, hover `filter:brightness(1.15)` → "GET THE PACK →".
- Fine-print (`margin-top:26px;font-size:11.5px;letter-spacing:0.1em;line-height:1.7;color:#8B8F86`) → "Works with Lightroom Classic 7.3+, Lightroom CC desktop, and Lightroom Mobile. Built for RAW, fine on any camera brand. Not one-click magic: set your exposure and white balance first, then drop the look on top."

## 5. "About these"
`max-width:860px;margin:76px auto 0;padding:0 {gutter}`. Kicker with `border-bottom:1px solid rgba(242,239,230,0.13);padding-bottom:14px` → "About these". Paragraph (`margin:24px 0 0;font-size:16.5px;line-height:1.75;color:#F2EFE6;max-width:66ch`) → "I am a street and travel photographer based in Sydney. I shoot Fuji mostly, Sony occasionally, a Ricoh in the pocket, sometimes just the phone. These two looks came out of three weeks in Japan in 2025, then got refined back home at the desk. They are a starting point. The whole idea is that you make them yours."

## 6. FAQ ("A few questions")
`max-width:860px;margin:76px auto 0;padding:0 {gutter} 120px`. Kicker with bottom border → "A few questions". Then 3 Q blocks, each `padding:26px 0;border-bottom:1px solid rgba(242,239,230,0.09)`: question `font-size:18px;font-weight:500`; answer `margin:12px 0 0;font-size:15.5px;line-height:1.7;color:#8B8F86;max-width:66ch`. Q&A verbatim:
1. "Will this work with my camera and software?" — "Yeah, most likely. The XMP files run in Lightroom Classic, Lightroom desktop, and Lightroom Mobile. They are built for RAW and they work on any brand, so you do not need to shoot Fuji to use them. I have run them on Canon, Sony and Fuji files. JPEGs work too, the colour just shifts a bit differently."
2. "Does it work on Lightroom Mobile?" — "Yep. The .xmp files import straight into the Lightroom Mobile app. And if you use the cloud version of Lightroom, presets you add on desktop sync to your phone on their own. Same files, all your devices."
3. "What if it looks off on my photos?" — "Set your exposure and white balance first, then apply the preset. That fixes most of it. Each look comes with a note on where to start. And if a file turns up broken or missing on delivery, tell me and I will sort it."
- Contact (`margin-top:30px;font-size:11.5px;letter-spacing:0.16em;uppercase;color:#8B8F86`) → "Questions? " + `<a href=mailto:info.ericescapes@gmail.com color:--ee-accent>info.ericescapes@gmail.com ↗</a>` (hover `filter:brightness(1.4)`).

## Responsive summary
gutter 20→40 · bigTitleFs 34→56 · baCols `1fr`→`1fr 1fr` · baH 32vh→52vh · packPad `30px 22px`→`52px 60px`. All copy is FINAL/locked — do not paraphrase.
