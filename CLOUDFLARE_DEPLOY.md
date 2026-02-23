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

## Will my APIs work on Cloudflare?

**Yes, but with one limitation:** Cloudflare Workers have **no writable filesystem**. So:

### Works on Cloudflare today (no code change)

- **Contact form** – Uses Resend (external API over the network). Set `RESEND_API_KEY` in Cloudflare **Settings → Variables**.
- **Google OAuth** – `/api/auth/google`, `/api/auth/google/callback`. External redirects and API calls; set your Google OAuth env vars in Cloudflare.
- **Google Places / Reviews (read-only)** – Fetching reviews from Google’s API works. Set `GOOGLE_PLACE_ID` and `GOOGLE_PLACES_API_KEY` (or OAuth client) in Cloudflare.
- **YouTube videos** – `/api/youtube-videos`, `/api/youtube-videos/rss`, `/api/youtube-videos/manual`. All use `fetch` or static JSON; no disk.
- **Find Place ID** – `/api/find-place-id`. External API call.
- **Admin login / logout** – Cookie-based; works.

### Does not work on Cloudflare (uses the filesystem)

- **Reviews archive** – `lib/reviews.ts` reads and writes `content/reviews.json`. On Workers, that file isn’t writable and may not be readable at runtime. So “refresh reviews” and “manual import” won’t persist; the homepage may not show saved reviews.
- **Blog** – `lib/blog.ts` reads `content/blog/*.md`. Blog pages are **static at build time**, so the site can show the blog. Any **runtime** read of blog files won’t work.
- **Admin: create/update/delete posts** – Writes markdown to `content/blog/`. No disk = no persistence.
- **Admin: upload images** – Writes to `public/images/blog/`. No disk = uploads can’t be saved.

### Making everything work: use Cloudflare storage (bindings)

To get reviews, admin posts, and uploads working on Cloudflare you need to **replace the filesystem** with Cloudflare storage and use **bindings** in your Worker:

1. **Reviews** – Store `reviews.json` in [KV](https://developers.cloudflare.com/kv/) (or [R2](https://developers.cloudflare.com/r2/) as a single object). Add a KV namespace in the dashboard, add the binding to `wrangler.jsonc`, then change `lib/reviews.ts` to read/write via the binding instead of `fs`. See [OpenNext bindings](https://opennext.js.org/cloudflare/bindings).
2. **Blog posts (admin)** – Either keep blog as **build-time only** (edit in repo, push, redeploy) or store post content in KV/D1 and change `lib/blog.ts` and admin post APIs to use the binding.
3. **Admin uploads** – Store files in [R2](https://developers.cloudflare.com/r2/). Add an R2 bucket and binding, then change `/api/admin/upload` to upload to R2 and serve images from R2 (or a public bucket URL).

After you add bindings to `wrangler.jsonc`, you access them in API routes and server code via the request context (e.g. `getCloudflareContext()` from `@opennextjs/cloudflare`). The OpenNext docs link above shows the exact pattern.

**Summary:** Contact, Google, YouTube, and auth APIs work as-is once env vars are set. Reviews archive, admin posts, and admin uploads need a one-time migration from “file on disk” to “KV or R2” plus small code changes so your API stuff fully works on the platform.

## Troubleshooting: You see "Hello World" instead of your site

That usually means the **Worker** running at that URL is still the default template, not your Next.js app. Check the following:

1. **Project type**  
   In **Workers & Pages**, your project must be a **Worker** connected to Git (not a plain "Pages" site and not a Worker created from the "Create Worker" Hello World template without Git). The Git pipeline should run your **build** and then **deploy** that build.

2. **Last deployment**  
   Open your project → **Deployments**. The latest deployment should be **Successful**. Open it and check the logs:
   - The **build** step should run `npm run build:cloudflare` and finish without errors (OpenNext building your Next.js app).
   - A **deploy** step should run after the build (e.g. `wrangler deploy`). If there is no deploy step, or it fails, the Worker won’t be updated and you’ll keep seeing Hello World.

3. **Build and deploy commands**  
   In the project **Settings** (or Build configuration):
   - **Build command:** `npm run build:cloudflare`
   - **Deploy command:** `npx wrangler deploy` (or `wrangler deploy` if the CLI is in PATH)

   If the deploy command is missing or different, the built Next.js app may never be deployed.

4. **Deploy once from your machine**  
   To confirm the app can deploy and to see the real site:
   ```bash
   npx wrangler login
   npm run deploy
   ```
   When it finishes, it will print the Worker URL. Open that URL; you should see your Nevada License Defense site. If you do, the problem is with the Git pipeline (build or deploy not running/failing). If you still see Hello World, say what URL you’re opening (e.g. `xxx.pages.dev` vs `xxx.workers.dev`).

5. **URL you’re opening**  
   Make sure you’re opening the **Worker** URL (often `your-project.workers.dev` or a custom domain linked to that Worker), not a different Pages or Worker that still has the default page.

## Notes

- **Image optimization:** Handled by Cloudflare’s image resizing (configured via the `IMAGES` binding in `wrangler.jsonc`).
- **File-based data:** The app currently reads/writes `content/reviews.json`, `content/blog/*.md`, and admin uploads via the Node.js filesystem. On Workers there is no writable filesystem. For production you may need to move reviews and blog content to [R2](https://developers.cloudflare.com/r2/), [KV](https://developers.cloudflare.com/kv/), or [D1](https://developers.cloudflare.com/d1/) and update the code to use [bindings](https://opennext.js.org/cloudflare/bindings).
- **Caching (ISR):** Optional [R2 incremental cache](https://opennext.js.org/cloudflare/caching) can be added in `wrangler.jsonc` and `open-next.config.ts` if you use ISR.
