# Professional portfolio

Bilingual Astro portfolio for Thanasis Mitsikostas (Θανάσης Μητσικώστας).
Greek is the default at `/`; English lives at `/en/`. Every page has an equivalent in each language. Language links preserve the selected page.

Run `npm install`, `npm run dev`, `npm run build`, or `npm run preview`. Use Node 22.19+.

Shared page layout and translated copy: `src/components/PortfolioPage.astro`.
Career source: `src/data/career.ts`. Greek career translations, names, and routes: `src/data/i18n.ts`. Email and social links: `src/data/portfolio.ts`.

## Private material

Original Vue source and hobby edits are preserved in `archive/vue/`. Coin images are in `archive/private/images/`. Neither folder is served or included in the build. Hobby routes are disabled. Deploy only `dist/`, never the repository root. Keep the repository private if the archive should remain private.

Public pages are indexable; the 404 page remains noindex. Page-specific bilingual metadata, absolute canonical/hreflang links, Open Graph/Twitter previews, and Person/WebSite/Service structured data live in src/data/seo.ts and src/components/SeoHead.astro. Brand icons and 12 social cards regenerate before dev/build using scripts/generate-brand-assets.mjs. No deployment is performed by the local build.

## GitHub Pages

Configured for https://mcsakis1999.github.io/my-portfolio/. Internal links and assets use Astro BASE_URL. The existing Actions workflow builds and deploys dist on pushes to master, or a manual workflow run. In repository Settings > Pages, choose GitHub Actions as the source. Local preview is now at http://localhost:4321/my-portfolio/. For a custom domain, update site and remove base.


## Search and sharing launch

- Current canonical base: https://mcsakis1999.github.io/my-portfolio/. Change astro.config.mjs before deploying to a custom domain; generated sitemap, manifest and metadata follow that configuration.
- Submit https://mcsakis1999.github.io/my-portfolio/sitemap.xml in Google Search Console after deployment. It lists all 12 public language/page combinations.
- robots.txt is generated, but Google only reads it at the hostname root. A file under /my-portfolio/ does not control crawling. Configure the root site separately if needed; do not overwrite other projects’ root settings.
- Google site names and favicons apply to a domain/subdomain, not a project subdirectory. Use a custom domain or configure the GitHub user-site root to establish distinct Google branding.
- Social preview images must be publicly deployed before sharing services can retrieve them. Existing shares may need their preview refreshed.
- Volos is the stated base; no street address, phone, opening hours, reviews or business-profile ownership has been invented.
