import { pageKeys, href } from '../data/i18n';
export function GET({ site }: { site: URL }) {
 const url = (path: string) => new URL(path, site).href;
 const entries = pageKeys.flatMap(page => (['el','en'] as const).map(lang => `<url><loc>${url(href(lang,page))}</loc><xhtml:link rel="alternate" hreflang="el" href="${url(href('el',page))}"/><xhtml:link rel="alternate" hreflang="en" href="${url(href('en',page))}"/><xhtml:link rel="alternate" hreflang="x-default" href="${url(href('el',page))}"/></url>`));
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join('')}</urlset>`, {headers:{'Content-Type':'application/xml'}});
}
