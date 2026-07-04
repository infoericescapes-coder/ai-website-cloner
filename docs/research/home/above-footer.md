# Homepage — Preset section + Above-footer (IG + Gear) layout revision

Reference: `example above footer widgets and mailer embed.png` (staged in the migration folder). Two corrections to the current clone. Confirmed against the live DOM.

## A. Preset-pack section = floating card OVER a full-bleed photo
Currently the MailerLite form sits in a black box on a plain background, and `afterdark-after.jpg` is a separate standalone showcase band. On the live site these are ONE thing:
- **Full-bleed background image = `/images/home/afterdark-after.jpg`** (the warm night food-stall shot), `object-cover`, spanning the section.
- The **MailerLite form floats as a centered card ON TOP** of that photo: solid/near-solid black card (the existing PresetPackForm black wrapper), centered horizontally, generous vertical padding on the section so the photo shows above and below the card.
- Remove the separate standalone `afterdark-after.jpg` band (it becomes this background). Keep the form component + behaviour exactly as-is (Name/Email/Get the Presets → MailerLite → Gumroad).

## B. "Live on Instagram" + "Currently Shooting With" = ONE two-column section on black
Currently these are two separate full-width stacked sections. Merge into a single black-background section directly above the footer:
- **Thin hairline divider** across the top of the section (subtle, e.g. `border-top: 1px solid rgba(255,255,255,0.12)`).
- **Two columns** (desktop): LEFT ≈ 55–60% = Instagram; RIGHT ≈ 40–45% = gear. Stack to one column on mobile (IG first, then gear).
- **Left column:** the existing `LIVE ON INSTAGRAM` eyebrow (DM Mono + pulsing red dot) + the `<BeholdFeed />` (keep it a ~3-column grid within this column).
- **Right column:** the `CURRENTLY SHOOTING WITH` eyebrow + the gear as **compact horizontal rows** (see C) + `FULL KIT →` link at the bottom (→ `/my-gear`).

## C. Gear = compact mono rows (redesign GearCard)
Replace the big 3-across image cards with a vertical list of compact rows. Each row:
- **Small square thumbnail** on the left (~64–80px): `camera-xt5.jpg`, `lens-23mm.jpg`, `lens-50f2.jpg` respectively.
- **Text block** (middle): role eyebrow on top in **DM Mono, uppercase, small (~11–12px), dimmed** (e.g. `rgba(255,255,255,0.45)`, tracked); product name below in **DM Mono, uppercase, white(ish) ~14–16px, tracked**.
- **`↗` arrow** on the far right (dimmed), the whole row is the affiliate link (`target="_blank" rel="noopener"`).
- **Hairline divider** between rows (`rgba(255,255,255,0.12)`).
- Rows in order: EDC CAMERA / FUJIFILM X-T5 → https://amzn.to/4clcQVu · ESTABLISHING LENS / FUJIFILM 23MM F2.8 WRX → https://amzn.to/4sll44M · DETAIL LENS / FUJIFILM XF 50MM F/2 → https://amzn.to/4u2HNEg.
- Then **`FULL KIT →`** in DM Mono uppercase, dimmed, → `/my-gear` (internal, relative, no target=_blank).

## Verify
- `npm run check` clean, no `any`. Matches the reference PNG: form floating on the food-stall photo; IG grid left + gear rows right on black; hairline dividers; mono type. Mobile stacks cleanly.
