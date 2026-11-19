import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('public/icons', { recursive: true });
await mkdir('public/social', { recursive: true });
const logo = await sharp('public/brand/logo.png').trim().png().toBuffer();
for (const size of [32, 48, 96, 180, 192, 512]) {
  const mark = await sharp(logo).resize(Math.round(size * .8), Math.round(size * .8), {fit:'inside'}).toBuffer();
  await sharp({create:{width:size,height:size,channels:4,background:'#070f1e'}}).composite([{input:mark,gravity:'centre'}]).png().toFile(`public/icons/icon-${size}.png`);
}
const png = await sharp('public/icons/icon-32.png').toBuffer();
const header = Buffer.alloc(22); header.writeUInt16LE(1,2); header.writeUInt16LE(1,4); header[6]=32; header[7]=32; header.writeUInt16LE(1,10); header.writeUInt16LE(32,12); header.writeUInt32LE(png.length,14); header.writeUInt32LE(22,18);
await writeFile('public/favicon.ico', Buffer.concat([header,png]));
const copy = {
 el: {home:['Ιστοσελίδες & εφαρμογές','για πραγματικές ανάγκες.'],projects:['Έργα με ουσιαστικό σκοπό.','FoodFlow · CoolingEnergy · Adopto'],experience:['Εμπειρία στην πράξη.','Lead Frontend Developer · AIPath'],skills:['Σχεδιασμός. Ανάπτυξη. SEO.','Web & mobile λύσεις για επιχειρήσεις.'],about:['Γεια σας, είμαι ο Θανάσης.','Μηχανικός λογισμικού στον Βόλο.'],contact:['Έχετε μια ιδέα;','Ας της δώσουμε μορφή.']},
 en: {home:['Websites & applications','for real business needs.'],projects:['Projects with a purpose.','FoodFlow · CoolingEnergy · Adopto'],experience:['Experience in practice.','Lead Frontend Developer · AIPath'],skills:['Design. Development. SEO.','Web & mobile solutions for business.'],about:['Hi, I’m Thanasis.','Software engineer in Volos, Greece.'],contact:['Have an idea?','Let’s bring it to life.']}
};
const escape = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;');
const badge = await sharp(logo).resize(140,140,{fit:'inside'}).toBuffer();
for (const [lang,pages] of Object.entries(copy)) for (const [page,lines] of Object.entries(pages)) {
 const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bg"><stop stop-color="#102b43"/><stop offset="1" stop-color="#070f1e"/></linearGradient></defs><rect width="1200" height="630" fill="url(#bg)"/><path d="M64 215H1136" stroke="#315773"/><circle cx="1090" cy="440" r="170" fill="none" stroke="#214663"/><circle cx="1090" cy="440" r="130" fill="none" stroke="#214663"/><g font-family="DejaVu Sans, Arial, sans-serif"><text x="240" y="120" fill="#e8eef8" font-size="38" font-weight="bold">Mitsikostas<tspan fill="#31d2e5">Tech</tspan></text><text x="240" y="163" fill="#a2b4ce" font-size="24">${lang==='el'?'Θανάσης Μητσικώστας':'Thanasis Mitsikostas'}</text><text x="64" y="320" fill="#e8eef8" font-size="48" font-weight="bold">${escape(lines[0])}</text><text x="64" y="390" fill="#66b6ff" font-size="36">${escape(lines[1])}</text><rect x="64" y="493" width="7" height="50" fill="#31d2e5"/><text x="90" y="526" fill="#c9dfee" font-size="25">${lang==='el'?'Βόλος · Συνεργασίες εξ αποστάσεως':'Volos, Greece · Remote collaboration'}</text></g></svg>`;
 await sharp(Buffer.from(svg)).composite([{input:badge,left:64,top:54}]).png().toFile(`public/social/${lang}-${page}.png`);
}
console.log('Generated 6 icons, favicon.ico, and 12 social cards.');
