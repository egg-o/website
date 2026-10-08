# Sharon Zhong — Portfolio

link: https://egg-o.github.io/website/

A minimalist portfolio for Sharon Zhong, built with React, TypeScript, Vite, and React Router. The design uses Titillium Web, a white and black palette, editorial spacing, and original portfolio media.

## Getting started

Install dependencies with `npm install`, then start the development server with `npm run dev`. Open the local URL printed by Vite. Use `npm run build` for a production build, `npm run preview` to preview it locally, and `npm run lint` for linting.

In PowerShell environments where running `.ps1` files is restricted, use `npm.cmd` instead of `npm`.

## Pages

- `/` — featured reel, selected work, toolkit, navigation, and couch easter egg.
- `/tech-art` — professional work.
- `/projects` — independent projects and rigging study.
- `/about` — background and contact.
- `/secret-3` — the Couch Zone.
- `/cart` — small empty-cart page matching the header link.

The video reel loads on click. Project photos and tool marks are served from Sharon's existing Squarespace media library; video thumbnails are served from YouTube, and the résumé points to the existing PDF on sharonzhong.com. These external assets require internet access. Replace these URLs with hosted local assets if deploying independently from the original portfolio or if their source locations change.

## Publish on GitHub Pages

1. Create a GitHub repository for this project and push its files to the `main` branch. This local workspace does not need any special repository name. The generated deployment URL for a normal project repository is `https://OWNER.github.io/REPOSITORY/`; a repository named `OWNER.github.io` instead publishes at `https://OWNER.github.io/`.
2. In the GitHub repository, go to **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**. Make sure Actions are enabled for the repository.
3. Push to `main` (or run **Deploy to GitHub Pages** manually from the **Actions** tab). The workflow installs dependencies, lints, builds, then uploads `dist/` to Pages. Watch the workflow for the published URL.
4. Visit the published URL. Work and project links will look like `https://OWNER.github.io/REPOSITORY/#/tech-art` and `.../#/projects`; these routes survive refreshes and direct visits.

The build automatically reads `GITHUB_REPOSITORY` in Actions to determine whether its asset path should be `/REPOSITORY/` (project site) or `/` (repository named `OWNER.github.io`). If you later set up a **custom domain** for a normal project repository, set the GitHub Actions repository variable `PAGES_BASE_PATH` to `/` under **Settings → Secrets and variables → Actions → Variables**, then rerun the deployment. This makes asset links resolve at the root of the custom domain.

For a local production preview of a project-site deployment, set `GITHUB_REPOSITORY` to `OWNER/REPOSITORY` for **both** `npm run build` and `npm run preview`, then visit the `/REPOSITORY/` path printed by Vite. Normally local builds use `/` automatically. On Windows PowerShell, set `$env:GITHUB_REPOSITORY = 'OWNER/REPOSITORY'` before running both commands, and use `npm.cmd` instead of `npm` if script execution is restricted. The workflow file is `.github/workflows/deploy-pages.yml`.

## How the code fits together

- `package.json` lists the libraries and scripts. `package-lock.json` pins the exact dependency tree so both local installs and GitHub Actions can reproduce the build.
- `index.html` is the single HTML document GitHub Pages serves. It contains `<div id="root">`, which React takes over when the browser loads `src/main.tsx`.
- `src/main.tsx` starts React, imports the global CSS, and renders the `App` component into that root element.
- `src/App.tsx` contains the shared header/footer, all page components, data for externally hosted images, the click-to-play video component, and React Router routes. `HashRouter` stores the current page after `#` in the URL, which Pages never sends to its server.
- `src/index.css` sets the site-wide font and browser defaults. `src/App.css` styles each component and handles responsive layouts.
- `vite.config.ts` configures the React build plugin and the public base URL. `npm run build` type-checks the TypeScript and bundles assets into `dist/`.
- `.github/workflows/deploy-pages.yml` runs on GitHub after a push to `main`, builds the site, and publishes that generated `dist/` directory.

This is a static client-side site: there is no database, server application, checkout, or payment functionality. The cart is deliberately an empty informational page. Media and the résumé are hosted externally and must remain available at their current URLs.