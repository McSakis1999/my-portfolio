import { asset, href, type Lang, type Page } from './i18n';
export const absolute = (path: string) => new URL(path, import.meta.env.SITE).href;
export const seo: Record<Lang, Record<Page, { title: string; description: string }>> = {
  el: {
    home: { title: 'Θανάσης Μητσικώστας | Ιστοσελίδες & εφαρμογές στον Βόλο', description: 'Σχεδιασμός και κατασκευή ιστοσελίδων στον Βόλο, SEO και web/mobile εφαρμογές. Θανάσης Μητσικώστας — συνεργασίες τοπικά και εξ αποστάσεως.' },
    projects: { title: 'Έργα web & mobile | FoodFlow, CoolingEnergy, Adopto', description: 'Δείτε έργα του Θανάση Μητσικώστα: AIPath FoodFlow με διάκριση στο Foodtech Hackathon, CoolingEnergy στον Βόλο και το Πήλιο, Workcard και Adopto.' },
    experience: { title: 'Επαγγελματική εμπειρία | Θανάσης Μητσικώστας', description: 'Lead Frontend Developer στην AIPath από το 2023. Αρχιτεκτονική και ανάπτυξη web/mobile εφαρμογών, καθοδήγηση developers και προηγούμενη εμπειρία.' },
    skills: { title: 'Ιστοσελίδες, SEO & εφαρμογές κινητού | MitsikostasTech', description: 'Κατασκευή ιστοσελίδων, τοπικό SEO, ψηφιακή παρουσία και εφαρμογές με Vue, Astro και React Native. Λύσεις για επιχειρήσεις στον Βόλο και εξ αποστάσεως.' },
    about: { title: 'Αθανάσιος Μητσικώστας — Θανάσης / Σάκης | Σχετικά', description: 'Αθανάσιος Μητσικώστας, γνωστός ως Θανάσης ή Σάκης Μητσικώστας. Μηχανικός λογισμικού στον Βόλο: ιστοσελίδες, SEO και web/mobile εφαρμογές.' },
    contact: { title: 'Επικοινωνία για ιστοσελίδα ή εφαρμογή | Βόλος', description: 'Μιλήστε με τον Θανάση Μητσικώστα για την ιστοσελίδα ή την εφαρμογή που θέλετε να δημιουργήσετε. Συνεργασίες στον Βόλο και εξ αποστάσεως, έργα επιχειρήσεων και επαγγελματικές ευκαιρίες.' },
  },
  en: {
    home: { title: 'Thanasis Mitsikostas | Websites & Apps in Volos', description: 'Website design, SEO, and web/mobile app development by Thanasis Mitsikostas in Volos, Greece. Working with local businesses and remote clients.' },
    projects: { title: 'Web & Mobile Projects | FoodFlow, CoolingEnergy, Adopto', description: 'Explore Thanasis Mitsikostas’s work: award-winning AIPath FoodFlow, CoolingEnergy in Volos and Pelion, Workcard, and Adopto web and mobile applications.' },
    experience: { title: 'Professional Experience | Thanasis Mitsikostas', description: 'Lead Frontend Developer at AIPath since 2023. Experience in web and mobile development, frontend architecture, and mentoring developers.' },
    skills: { title: 'Web Design, SEO & Mobile Development | MitsikostasTech', description: 'Website development, local SEO, digital presence, and apps built with Vue, Astro, and React Native. Supporting businesses in Volos and remotely.' },
    about: { title: 'Athanasios (Thanasis) Mitsikostas | Software Engineer in Volos', description: 'Meet Athanasios Mitsikostas, also known as Thanasis or Sakis Mitsikostas. Software engineer in Volos, Greece, building websites and web/mobile apps.' },
    contact: { title: 'Discuss Your Website or App | Thanasis Mitsikostas, Volos', description: 'Contact Thanasis Mitsikostas about your website, business application, or a career opportunity. Based in Volos, Greece, and collaborating remotely.' },
  },
};
export const pageUrl = (lang: Lang, page: Page) => absolute(href(lang, page));
export const shareImage = (lang: Lang, page: Page) => absolute(asset(`social/${lang}-${page}.png`));
