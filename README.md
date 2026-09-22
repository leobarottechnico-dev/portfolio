# RankwithLeo

Custom static Astro website based on approved homepage concept B.

## Develop

Run `npm install`, then `npm run dev`. Run `npm run build` to generate `dist/`. The website is a static Astro site intended for the existing Git-connected Cloudflare deployment. No Node server is required at runtime.

## Sanity content management

This repository already contains a Sanity Studio in `studio/`, configured for project `cygey76w` and its `production` dataset. The Astro site reads published content from that project at build time. Make sure this is your Sanity project before editing or deploying the Studio; changing the project ID requires updating both `studio/sanity.config.js`, `studio/sanity.cli.js`, and `src/sanity-content.js`.

1. Run `npm install` in the project root and `npm install` in `studio/`.
2. Run `npm run studio:dev` to open the content editor locally. Sign in with an account that has access to the configured project. Run `npm run dev` separately to preview the website.
3. Create and publish Blog Posts in Sanity. Each published post with a title, slug, publish date and article body appears at `/blog/` and `/blog/<slug>/`; no sample articles are bundled. The latest three also appear on the homepage once posts exist.
4. Use Service Pages to edit the current services or create a new one with a unique URL slug. Homepage, Blog Page, About Page, Site Settings and Other Pages cover the existing site copy. Layout, illustrations and form submission behavior remain in Astro code.
5. Publish content in the Studio, then rebuild the Cloudflare site to pick up published content. Drafts are not included.
6. To host the editor at a `*.sanity.studio` address, run `npx sanity deploy` from `studio/` while signed in. The CLI asks for a Studio hostname. This deploys the editor, **not** the Astro website.

The site keeps local copy as a fallback for fields without published Sanity content. If the Sanity API cannot be reached during a local build, the build logs a warning and uses local copy; blog posts will be absent. On Cloudflare Pages, that API failure stops the build so an empty blog cannot accidentally replace the published site.

For automatic updates on Cloudflare Pages, create a Pages deploy hook in Cloudflare's build settings and add its URL as a webhook in the Sanity project. Scope the Sanity webhook to the `production` dataset. Keep the hook URL private: anyone with it can trigger a build. This account-side step has not been completed in this repository.

## Before publishing

- Connect a verified booking URL and contact delivery service. The current forms only prepare a local brief and explicitly do not send it.
- Add approved project screenshots, responsibilities and verified results. Case-study placeholders are marked noindex.
- Confirm permission to publish client names and logos.
- Finalize privacy and terms with business details and the actual services used.
- Set the real production domain in Astro configuration, then add canonical URLs and a sitemap.
- Configure analytics only after choosing the appropriate privacy configuration.
- Fonts currently load from Google Fonts; self-host them if required for launch.

No credentials, analytics or backend services are embedded. Generated project monograms are design placeholders, not client logos.
