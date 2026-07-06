# Sveltia CMS setup — `/admin`

The locked research decision (Track B) was **Sveltia CMS** as the editing surface for
ericescapes.com. This is the "what was installed / how Eric edits / what's left for
cutover" reference.

## What was installed

Two static files, no build step, no npm dependency added to the Next.js app:

| File | Purpose |
|---|---|
| `public/admin/index.html` | Loads Sveltia CMS from its official CDN distribution: `https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js`. Served at `/admin` (Next.js serves `public/` at the web root). Plain classic `<script>` — **not** `type="module"` (the current build is not an ES module; the module attribute breaks the JS API). |
| `public/admin/config.yml` | The CMS config: GitHub backend, media mapping, and the single `blog` collection over `content/blog/*.md`. |

Sveltia is a single-page app served entirely from the CDN — nothing is bundled into
the Next.js build, and nothing runs server-side. It reads and writes the repo directly
through the GitHub API.

### config.yml — the important bits

- **Backend:** `github`, repo `infoericescapes-coder/ai-website-cloner`, branch `main`.
  Edits commit straight to `main`; the site rebuilds from `content/blog/*.md`.
- **Media:** `media_folder: public/images/blog` / `public_folder: /images/blog`.
  Uploads land in the repo where the site expects them; images resolve at
  `/images/blog/...` in the built page — matching the existing convention
  (`featured.jpg` + `NN.jpg` under `public/images/blog/<slug>/`).
- **Collection `blog`** over `content/blog`, `format: yaml-frontmatter`,
  `slug: "{{fields.slug}}"` so the created filename equals the `slug` field
  (verified: filename === slug for all 70 existing posts).
- **Fields map the EXACT existing frontmatter, in source order:**
  `title`, `date`, `author`, `categories`, `tags`, `excerpt`, `featured`, `slug`,
  then the markdown `body`.
  - `date` uses a **string** widget with a `YYYY-MM-DD` pattern (not the datetime
    widget) so the quoted date string in the source files is preserved byte-for-byte
    — no frontmatter drift.
  - `featured` is the featured-image **path** (a string like
    `/images/blog/<slug>/featured.jpg`), **not** a boolean. It uses the `image`
    widget, which stores the chosen file's path and uploads into
    `public/images/blog/<slug>/`.
  - `categories` / `tags` are string `list` widgets; empty `tags` (`[]`) is allowed.

## GitHub OAuth requirement (production) — CUTOVER CHECKLIST ITEM

Sveltia's GitHub backend needs a way to authenticate the browser to GitHub before it
can read/write the repo. **No credentials are created here** — this is flagged for the
cutover checklist, to be set up on the final host.

Two supported paths:

1. **Personal Access Token (quick start, no infra).** On the `/admin` login screen,
   "Sign in with Token": generate a GitHub PAT (Sveltia pre-selects the scopes and
   links the token page), paste it in, and it's stored in the browser's local storage.
   Works immediately, on desktop and mobile, with zero server setup. Good enough for a
   single editor (Eric). This is the low-friction fallback if the OAuth app isn't ready
   at cutover.

2. **Authorization Code Flow (OAuth app + auth proxy) — recommended for the real
   cutover.** Register a **GitHub OAuth app** and deploy a small OAuth client the CMS
   talks to. Options:
   - **Sveltia CMS Authenticator** on **Cloudflare Workers** (Sveltia's own client) —
     the natural fit given the site already uses Cloudflare (per Foundation infra).
     Add `backend.base_url:` pointing at the deployed Worker URL in `config.yml`.
   - Any **third-party Netlify/Decap-compatible OAuth client** (same shape:
     register the OAuth app, deploy the client, set `base_url`).
   - **Netlify as OAuth provider** (backward-compat) if the site is ever hosted on
     Netlify — no config change needed, but not our host.

   **Action for cutover (do NOT do now — no credentials created):**
   - [ ] Register a GitHub OAuth app (callback URL = the deployed authenticator).
   - [ ] Deploy the Sveltia CMS Authenticator to Cloudflare Workers with the app's
         client ID + secret.
   - [ ] Add `base_url: <authenticator-url>` under `backend:` in `public/admin/config.yml`.
   - [ ] Verify a real edit round-trips (post → commit → rebuild) on the production host.

   Note: PKCE (no-proxy) auth is on Sveltia's roadmap but depends on GitHub shipping
   client-side PKCE support (not released yet), so a proxy is still required today for
   the OAuth flow. Commits made through Sveltia are GPG-signed / verified automatically.

## How Eric edits a post day-to-day (mobile included)

1. Go to `https://<site>/admin` (once live) and sign in (token or OAuth per above).
2. Open the **Blog** collection → pick a post to edit, or **New Blog post**.
3. Edit the fields (title, date, categories/tags, excerpt, featured image, slug) and
   the markdown body. Drag/drop or pick images — they upload into
   `public/images/blog/<slug>/` and are inserted with the right `/images/blog/...` path.
4. **Publish** → Sveltia commits to `main` → the site rebuilds from the markdown.

**Mobile:** Sveltia's editor is a responsive SPA and works in a phone browser. With the
PAT sign-in path there's no server round-trip to configure, so Eric can draft, add a
featured image from the camera roll, and publish from his phone. (This is why the
token path is worth keeping even after the OAuth app is set up — it's the zero-infra
mobile fallback.)

## Local editing (optional, no auth)

Sveltia also has a local-repository workflow (edit files on disk with no GitHub auth)
for testing the CMS against a local checkout. Not required for production; noted for
completeness if we want to trial the editor before the OAuth app exists.
