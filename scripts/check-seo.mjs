import { readFile, access } from 'node:fs/promises';
import assert from 'node:assert/strict';
const pages=['home','projects','experience','skills','about','contact'];
const titles=new Set();
for(const lang of ['el','en']) for(const page of pages) {
 const path=`${lang==='en'?'en/':''}${page==='home'?'':page+'/'}index.html`;
 const html=await readFile(`dist/${path}`,'utf8');
 const title=html.match(/<title>(.*?)<\/title>/s)?.[1];
 assert(title && !titles.has(title),`Missing/duplicate title: ${path}`); titles.add(title);
 assert(html.includes('index, follow, max-image-preview:large'),path);
 assert(!html.includes('noindex'),path);
 const canonical=html.match(/rel="canonical" href="([^"]+)"/)?.[1];
 assert.equal(canonical,`https://mcsakis1999.github.io/my-portfolio/${path.replace('index.html','')}`);
 for(const locale of ['el','en','x-default']) assert(html.includes(`hreflang="${locale}"`),path);
 const image=html.match(/property="og:image" content="([^"]+)"/)?.[1];
 assert.equal(image,`https://mcsakis1999.github.io/my-portfolio/social/${lang}-${page}.png`);
 await access(`dist/social/${lang}-${page}.png`);
 const json=html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
 assert(JSON.parse(json)['@graph'].length>=3);
}
const sitemap=await readFile('dist/sitemap.xml','utf8');
assert.equal((sitemap.match(/<loc>/g)||[]).length,12);
assert(!sitemap.includes('404'));
const error=await readFile('dist/404.html','utf8'); assert(error.includes('noindex, follow')); assert(!error.split('</head>')[0].includes('hreflang='));
for(const size of [32,48,96,180,192,512]) await access(`dist/icons/icon-${size}.png`);
const manifest=JSON.parse(await readFile('dist/site.webmanifest','utf8')); assert.equal(manifest.scope,'/my-portfolio/');
console.log('Verified 12 unique page titles, canonical/hreflang URLs, social assets, JSON-LD, sitemap, icons, manifest, and noindex 404.');

