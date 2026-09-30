# Professional portfolio

Bilingual Astro portfolio for Thanasis Mitsikostas (Θανάσης Μητσικώστας).
Greek is the default at `/`; English lives at `/en/`. Every page has an equivalent in each language. Language links preserve the selected page.

Run `npm install`, `npm run dev`, `npm run build`, or `npm run preview`. Use Node 22.19+.

Shared page layout and translated copy: `src/components/PortfolioPage.astro`.
Career source: `src/data/career.ts`. Greek career translations, names, and routes: `src/data/i18n.ts`. Email and social links: `src/data/portfolio.ts`.

## Private material

Original Vue source and hobby edits are preserved in `archive/vue/`. Coin images are in `archive/private/images/`. Neither folder is served or included in the build. Hobby routes are disabled. Deploy only `dist/`, never the repository root. Keep the repository private if the archive should remain private.

The preparation site uses `noindex, nofollow`; this discourages indexing but does not restrict access if deployed. No deployment was performed. Configure the final site URL and remove noindex before public launch. Add current technologies and recent project case studies as they are documented.
