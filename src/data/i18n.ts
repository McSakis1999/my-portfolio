import { experience, earlierProjects, skillGroups } from './career';
export type Lang = 'el' | 'en';
export const pageKeys = ['home', 'projects', 'experience', 'skills', 'about', 'contact'] as const;
export type Page = typeof pageKeys[number];
export const asset = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const href = (lang: Lang, page: Page) => asset(`${lang === 'en' ? 'en/' : ''}${page === 'home' ? '' : page + '/'}`);
export const names = { el: 'Θανάσης Μητσικώστας', en: 'Thanasis Mitsikostas' };
export const labels = {
  el: { home: 'Αρχική', projects: 'Έργα', experience: 'Εμπειρία', skills: 'Δεξιότητες', about: 'Σχετικά', contact: 'Επικοινωνία' },
  en: { home: 'Home', projects: 'Projects', experience: 'Experience', skills: 'Skills', about: 'About', contact: 'Contact' },
};
export const greekExperience = [
  { company: 'AIPath', role: 'Lead Frontend Developer', period: 'Σεπτέμβριος 2023 – Σήμερα', current: true, summary: 'Ηγεσία στην ανάπτυξη frontend για επιχειρησιακές εφαρμογές web και mobile, με ευθύνη για την αρχιτεκτονική και την υλοποίηση.', bullets: ['Ευθύνη για τον τομέα του frontend, από την αρχιτεκτονική των έργων μέχρι την ανάπτυξη εφαρμογών web και mobile.', 'Καθοδήγηση δύο εκπαιδευόμενων κατά τη διάρκεια της πορείας μου στην AIPath, με υποστήριξη στην εργασία και την εξέλιξή τους.', 'Εργασία σε εταιρεία enterprise software engineering με έμφαση σε business operating systems, web και mobile εφαρμογές, αυτοματισμούς και AI με πρακτική χρήση.'] },
  { company: 'Πολεμικό Ναυτικό · Κέντρο Αυτοματοποίησης Συστημάτων (ΚΑΣΜΝ)', role: 'Frontend Developer', period: 'Νοέμβριος 2022 – Ιούνιος 2023', current: false, summary: 'Ανάπτυξη frontend στο Κέντρο Αυτοματοποίησης Συστημάτων του Πολεμικού Ναυτικού.', bullets: [] },
  { company: 'BEE GROUP Α.Ε.', role: 'Software Developer', period: 'Μάιος 2021 – Νοέμβριος 2021', current: false, summary: 'Ανάπτυξη και συντήρηση ιστοσελίδων, backend συστημάτων, βάσεων δεδομένων και διαδραστικών χαρτών.', bullets: ['Κατασκευή και συντήρηση ιστοσελίδων σε WordPress και Joomla, καθώς και ανάπτυξη διεπαφών με HTML, CSS, Bootstrap και jQuery.', 'Ανάπτυξη backend συστημάτων με CodeIgniter και Grocery CRUD σε αρχιτεκτονική MVC, δημιουργία βάσεων δεδομένων και εγχειριδίων.', 'Κατασκευή συστήματος χαρτών GIS με OpenLayers.'] },
];
export const greekProjects = [
  { title: 'Ψηφιακή ένταξη μέσω παιχνιδοποίησης', period: 'Οκτώβριος – Νοέμβριος 2021 · Έργο με χρηματοδότηση της ΕΕ', text: 'Συμμετοχή στο DInSAd (Digital Inclusion of Low Skilled Adult People), με έρευνα, σχεδιασμό και υλοποίηση ιστοσελίδας με στοιχεία παιχνιδιού για την εξοικείωση ατόμων τρίτης ηλικίας με τις τεχνολογίες του διαδικτύου. Συνεργασία με Ευρωπαίους εταίρους μέσω τακτικών τηλεδιασκέψεων.' },
  { title: 'Εργαλεία διαδραστικής μάθησης και παιχνιδοποίησης', period: 'Οκτώβριος – Νοέμβριος 2021 · Έργο με χρηματοδότηση της ΕΕ', text: 'Έρευνα και δοκιμή εργαλείων διαδραστικού εκπαιδευτικού υλικού και παιχνιδοποίησης, συμβατών με συστήματα διαχείρισης μάθησης και περιεχομένου. Παρουσίαση των αποτελεσμάτων στους Ευρωπαίους εταίρους για τα παραδοτέα IO2 και IO3.' },
  { title: 'Εφαρμογή Flutter και εκπαιδευτικό υλικό', period: '2023 · Πτυχιακή εργασία', text: 'Ανάπτυξη εφαρμογής Flutter και δημιουργία μαθημάτων που χρησιμοποιούν την εφαρμογή ως εξελισσόμενο παράδειγμα διδασκαλίας.' },
];
export const greekSkills = [
  { ...skillGroups[0], title: 'Ηγεσία στο frontend', context: 'Τρέχων ρόλος στην AIPath', skills: ['Αρχιτεκτονική frontend', 'Ανάπτυξη web και mobile', 'Ευθύνη frontend', 'Καθοδήγηση εκπαιδευόμενων'] },
  { ...skillGroups[1], title: 'Γλώσσες και βασικές τεχνολογίες', context: 'Καταγεγραμμένα στο παλαιότερο βιογραφικό' },
  { ...skillGroups[2], title: 'Frameworks και εργαλεία', context: 'Καταγεγραμμένα στο παλαιότερο βιογραφικό' },
  { ...skillGroups[3], title: 'Πλατφόρμες web και χαρτογράφηση', context: 'Προηγούμενη εργασία και βιογραφικό' },
];
export function career(lang: Lang) {
  return lang === 'el' ? { experience: greekExperience, projects: greekProjects, skills: greekSkills } : { experience, projects: earlierProjects, skills: skillGroups };
}
