# Eric Escapes Brand Kit

Every Eric Escapes product is a file pulled from an archive, not a boxed product: a dark folder holds
museum-style window mounts, and the photograph is the artefact the folder merely sleeves.
Machine-set monospace metadata sits against warm human photography, which is the whole idea: ghost in the machine.

**SHEET: `index.html` / live at `/brand/`.** That is the visual brand sheet. Open it first. This README is the
index for humans and agents who need the file paths, the URLs and the rules in text form.

---

## Folder map

```
public/brand/
├── index.html                    the brand sheet (live at /brand/)
├── README.md                     this file
├── MANIFEST.sha256               checksums for every kit file
├── brand-kit.zip                 the whole kit, minus the sheet and this zip
├── logos/                        6 svg
│   ├── ee-monogram-white.svg     primary mark on dark
│   ├── ee-monogram-black.svg     mark on light
│   ├── ee-monogram-green.svg     accent mark, bound by the green law
│   ├── ee-lockup-horizontal.svg  mark plus wordmark
│   ├── ee-registry-plate.svg     archive registry plate
│   ├── ee-favicon.svg
│   ├── png/                      11 png, raster fallbacks 16 to 512
│   └── reference/
│       └── clear-space.png       clear space diagram, 800x500
├── favicons/                     6 files, favicon-16/32/48/180/512 png plus ee-favicon.svg
├── social/                       6 png
│   ├── og-image-1200x630.png     Open Graph card
│   ├── ig-story-1080x1920.png    Instagram story
│   ├── substack-header-1200x300.png
│   └── 01-board.png, 02-board.png, 03-board.png
├── covers/                       3 jpg, 700x1050, q85
│   ├── ee-01-chaos-to-calm.jpg   CAT. EE-CTC-01, 2 looks
│   ├── ee-02-visual-diary.jpg    CAT. EE-VDC-02, 3 looks, free
│   └── ee-03-sydney-chrome.jpg
├── photography/                  6 jpg, 1200px longest edge, q82
│   ├── 01-the-archivist.jpg      the portrait
│   ├── 02-neon-face.jpg
│   ├── 03-first-light.jpg
│   ├── 04-quiet-streets.jpg
│   ├── 05-after-dark.jpg
│   └── 06-neon-grey.jpg
└── tokens/
    ├── ericescapes-brand.css     CSS custom properties, both palettes
    └── ericescapes-brand.json    same data, W3C DTCG flavoured
```

Covers are encoded as JPEG and named `.jpg`. The kit carries display-weight copies only.
Full resolution 1400x2100 originals stay in the Design Folder and are not mirrored here.

## Live URLs

Every folder is served straight from the site root.

| What | URL form |
|---|---|
| Sheet | `https://www.ericescapes.com/brand/` |
| This README | `https://www.ericescapes.com/brand/README.md` |
| Logos | `https://www.ericescapes.com/brand/logos/{name}.svg` |
| Logo raster | `https://www.ericescapes.com/brand/logos/png/{name}.png` |
| Clear space | `https://www.ericescapes.com/brand/logos/reference/clear-space.png` |
| Favicons | `https://www.ericescapes.com/brand/favicons/{name}` |
| Social | `https://www.ericescapes.com/brand/social/{name}.png` |
| Covers | `https://www.ericescapes.com/brand/covers/{name}.jpg` |
| Photography | `https://www.ericescapes.com/brand/photography/{name}.jpg` |
| Tokens CSS | `https://www.ericescapes.com/brand/tokens/ericescapes-brand.css` |
| Tokens JSON | `https://www.ericescapes.com/brand/tokens/ericescapes-brand.json` |
| Zip | `https://www.ericescapes.com/brand/brand-kit.zip` |
| Manifest | `https://www.ericescapes.com/brand/MANIFEST.sha256` |

## The rules, one screen

**Palette roles.** Two palettes, never interchangeable. ARCHIVE PRINT (`--ee-archive-*`) is for fixed-canvas
artwork: covers, mounts, exports. SITE UI (`--ee-*`) is the ericescapes.com shell and mirrors
`src/app/globals.css` exactly. A cover using `--ee-canvas` reads wrong next to the mats; a page using
`--ee-archive-desk` reads muddy next to real photographs.

**Type roles.** Two families, two jobs, nothing else. Space Grotesk for titles only, uppercase, tight tracking,
always left aligned and never centred. IBM Plex Mono for everything else: labels, file and catalogue numbers,
captions, conservation stamps, footers, uppercase with wide tracking at 400/500.

**The green law.** Green appears in at most two roles per surface, never a third. On an archive cover those two
roles are fixed by the spec: the payline rule and the payload text. If a third green thing appears, one of the
first two was decoration and belongs in `--ee-muted` or a hairline. The reason is the whole brand: photography
must be the only saturated, living element on the page.

**No photo over text, ever.** Captions live on the mat, never on the image.

**Em dash ban.** No em dashes in published copy. Use colons, commas, semicolons or separate sentences.
Australian English spelling throughout: favourite, colour, realised, organised.

**Catalogue numbering.** Tab reads `FILE / EE-nn`, incrementing per release. Header right reads
`CAT. EE-{PRODUCT INITIALS}-nn`, for example Chaos to Calm becomes `CAT. EE-CTC-01`. Footer right reads
`ARCHIVE ENVELOPE / EE-nn`.

## Clear space

One monogram width of clear space on every side of the mark. See `logos/reference/clear-space.png`.

---

## Deep spec

Full cover system, canvas geometry, folder frame coordinates and mount layout live in
`archive-cover-design.md` (Design Folder, Digital Products Refined / Import Designs).
Locked by Eric on 12 July 2026. The two sections below are copied from it verbatim, because they are the
sections that get broken most often.

### Rules

- Photography must be the only saturated, living element; folder and desk stay near-black and quiet
- **No photo over text, ever.** Captions live on the mat, never on the image
- Green appears exactly twice (payline rule + payload)
- No 3D box, no spine, no skeuomorphic packaging, no rotation on mounts (mats sit square)
- No extra ornament: no icons, no emoji, no rounded accent cards
- Title left-aligned; footer is the only full-width closing element
- Keep the payload line short (one line)

### Crop law (subject-preserving, non-negotiable)

Every mat window must hold the photo's main subject, centred or deliberately placed:

- Tune `object-position` per image; never accept a default crop.
- If the subject sits too far off-centre for `object-position` to reach (no slack on that axis
  in a cover fit), **pre-crop a strip from the native file** at the window's exact aspect ratio
  with the subject centred, and mount the crop instead (e.g. `_qs-strip-crop.jpg`, cut 1200x354
  at native resolution for the 1044x308 window).
- Avoid motion-blurred frames at large mat sizes: a soft subject on a sharp mat reads as an
  error, not a pan (learned on the Enoden tram; swapped for the Vespa/café frame).
- Reference subjects, current releases: Opera House + seated figure (First Light) ·
  scooter rider dead-centre (Quiet Streets) · chef in the lit window (After Dark) ·
  cat billboard tight headroom + visible foreground (Neon & Grey) ·
  Vespa + café corner (Warm Afternoon).

---

## About the zip

`brand-kit.zip` holds every folder above plus this README and the token files. It deliberately **excludes
`index.html` (the sheet) and the zip itself**, so the download stays a pure asset bundle and the sheet stays a
live URL rather than a stale local copy.

`logo-white.png` is a legacy asset that predates this kit and is not part of it, so it is excluded too.

Regenerate after changing any asset, from `public/brand/`:

```
rm -f brand-kit.zip MANIFEST.sha256
zip -X -r brand-kit.zip . \
  -x "index.html" "brand-kit.zip" "MANIFEST.sha256" "logo-white.png" ".DS_Store" "*/.DS_Store"
find . -type f ! -name brand-kit.zip ! -name MANIFEST.sha256 \
  ! -name index.html ! -name logo-white.png \
  | sort | xargs shasum -a 256 > MANIFEST.sha256
```

Verify with `shasum -c MANIFEST.sha256` from this folder.
