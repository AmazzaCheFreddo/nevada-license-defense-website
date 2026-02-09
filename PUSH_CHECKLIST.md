# Checklist: What to include when pushing to GitHub

If something was “missed” when you last pushed, it was probably **not staged** (untracked or modified but not added). Below are things that often get left out. Use `git add .` before committing so they’re included.

## Windows: "Filename too long" or LF/CRLF warnings

- **Filename too long:** In this repo, run once: `git config core.longpaths true` (enables long paths on Windows).
- **LF/CRLF warnings:** Normal. The repo uses LF (`.gitattributes`); safe to ignore.

## Often missed (previously untracked)

- **Cloudflare / deploy**
  - `.github/workflows/deploy-cloudflare.yml` – auto-deploy on push to `main`
  - `wrangler.jsonc` – Cloudflare Worker config
  - `open-next.config.ts` – OpenNext build config
  - `CLOUDFLARE_DEPLOY.md` – deploy instructions
  - `public/_headers` – cache headers for static assets

- **App and API**
  - `app/admin/google-business-setup/`, `app/admin/reviews-import/`
  - `app/api/admin/check-auth/`, `app/api/auth/`, `app/api/google-reviews/` (business-profile, manual-import, refresh), `app/api/youtube-videos/`

- **Components**
  - `components/layout/FloatingContactForm.tsx`
  - `components/sections/GoogleReviews.tsx`, `MiniContactForm.tsx`, `YouTubeVideoGrid.tsx`

- **Content and data**
  - `content/reviews.json`, `content/youtube-videos.json`, `content/reviews-archive-README.md`

- **Lib and types**
  - `lib/google-business-profile.ts`, `lib/reviews.ts`, `lib/youtube-videos.ts`
  - `types/` (e.g. `reviews.ts`)

- **Docs and scripts**
  - `docs/` (API and setup guides)
  - `scripts/refresh-reviews.js`
  - `CONTACT_FORM_SETUP.md`, `REVIEWS_AUTO_REFRESH.md`, `SEO_RULES.md`

- **Assets**
  - New images under `public/images/` (e.g. logo SVGs, new filler images)

## Optional: don’t push secrets

- **`.dev.vars`** – Right now it only has `NEXTJS_ENV=development`, which is safe to commit. If you later put API keys or secrets in it, add `.dev.vars` to `.gitignore` and never commit it.

## One-time fix: include everything and push

From the project root:

```bash
git add .
git status
git commit -m "Include Cloudflare deploy, GitHub Actions, and all app changes"
git push origin main
```

After that, run `git status` before each push and confirm the list of staged files looks right.
