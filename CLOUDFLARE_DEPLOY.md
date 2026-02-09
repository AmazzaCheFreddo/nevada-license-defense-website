# Deploying to Cloudflare

This Next.js app is set up to deploy to **Cloudflare Workers** using the [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare).

## Pushing to GitHub

To keep the code on GitHub and trigger automatic deploys:

1. **Include everything** so nothing is missed:
   - Run `git add .` to stage all changes (new files, edits, and deletions).
   - Run `git status` to confirm what will be committed (e.g. `.github/`, `wrangler.jsonc`, `open-next.config.ts`, new API routes, `content/`, `docs/`, etc.).
   - If you use **secrets** in `.dev.vars`, add `.dev.vars` to `.gitignore` before committing so it is never pushed.

2. **Commit and push** (from the project root):
   ```bash
   git add .
   git status
   git commit -m "Your message"
   git push origin main
   ```

3. **First-time repo setup:** If the repo is new or empty, create it on [GitHub](https://github.com/new), then:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/nevada-license-defense-website.git
   git push -u origin main
   ```

Your remote is already set to `https://github.com/sageadminassist/nevada-license-defense-website.git`; push to `main` to run the deploy workflow (after adding secrets below).

## Deploy via GitHub Actions (auto-deploy on push)

A workflow in `.github/workflows/deploy-cloudflare.yml` builds and deploys to Cloudflare when you push to `main`.

**One-time setup:**

1. In GitHub: repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
2. Add:
   - **`CLOUDFLARE_API_TOKEN`**  
     Create at [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens) → Create Token → “Edit Cloudflare Workers” template. Use that token value.
   - **`CLOUDFLARE_ACCOUNT_ID`**  
     In [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → right-hand sidebar, copy “Account ID”.

After that, every push to `main` will build with OpenNext and deploy to Cloudflare Workers.

## Prerequisites

- Node.js 18+
- A [Cloudflare account](https://dash.cloudflare.com/sign-up)
- Use **build command:** `npm run build:cloudflare` (not `npx opennextjs-cloudflare build`) so the CLI runs from the installed package.

## Deploy from your machine

1. Install dependencies: `npm install`
2. Log in to Cloudflare (first time only): `npx wrangler login`
3. Build and deploy: `npm run deploy`

## Deploy via Git (Cloudflare dashboard)

1. In [Cloudflare Dashboard](https://dash.cloudflare.com) go to **Workers & Pages**.
2. Click **Create** → **Worker** (or **Connect to Git** for a new project).
3. Connect your GitHub/GitLab repo and set:
   - **Build command:** `npm run build:cloudflare`
   - **Deploy command:** `npx wrangler deploy` (default)
   - **Root directory:** leave blank unless the app lives in a subdirectory.

4. Add any env vars (e.g. `RESEND_API_KEY`, Google OAuth) in **Settings → Variables** (or in `.dev.vars` for local; do not commit secrets).

5. Push to your production branch to trigger builds and deployments.

## Local preview (Workers runtime)

To run the app locally in the same runtime as Cloudflare:

```bash
npm run preview
```

This runs `opennextjs-cloudflare build` then serves the app with Wrangler. For everyday development, `npm run dev` is still fine.

## Notes

- **Image optimization:** Handled by Cloudflare’s image resizing (configured via the `IMAGES` binding in `wrangler.jsonc`).
- **File-based data:** The app currently reads/writes `content/reviews.json`, `content/blog/*.md`, and admin uploads via the Node.js filesystem. On Workers there is no writable filesystem. For production you may need to move reviews and blog content to [R2](https://developers.cloudflare.com/r2/), [KV](https://developers.cloudflare.com/kv/), or [D1](https://developers.cloudflare.com/d1/) and update the code to use [bindings](https://opennext.js.org/cloudflare/bindings).
- **Caching (ISR):** Optional [R2 incremental cache](https://opennext.js.org/cloudflare/caching) can be added in `wrangler.jsonc` and `open-next.config.ts` if you use ISR.
