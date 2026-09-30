// Sources: the supplied historical CV and the user's current AIPath role description.
export const experience = [
  {
    company: 'AIPath', role: 'Lead Frontend Developer', period: 'September 2023 – Present', current: true,
    summary: 'Leading frontend development for enterprise web and mobile applications, with ownership of frontend architecture and implementation.',
    bullets: [
      'Responsible for the frontend area, from project architecture to development across web and mobile applications.',
      'Mentored two trainees during my time at AIPath, guiding their work and development.',
      'Work within an enterprise software engineering company focused on business operating systems, web and mobile applications, automation, and practical AI.',
    ],
  },
  {
    company: 'Hellenic Navy · Systems Automation Centre (KASMN)', role: 'Frontend Developer', period: 'November 2022 – June 2023', current: false,
    summary: 'Frontend development at the Hellenic Navy’s Systems Automation Centre.', bullets: [],
  },
  {
    company: 'BEE GROUP S.A.', role: 'Software Developer', period: 'May 2021 – November 2021', current: false,
    summary: 'Website development and maintenance, backend systems, databases, and interactive mapping.',
    bullets: [
      'Built and maintained WordPress and Joomla websites, and developed interfaces with HTML, CSS, Bootstrap, and jQuery.',
      'Developed backend systems with CodeIgniter and Grocery CRUD using MVC architecture, and created databases and documentation.',
      'Built a GIS mapping system using OpenLayers.',
    ],
  },
];
export const earlierProjects = [
  { title: 'Digital inclusion through gamification', period: 'October – November 2021 · EU-funded project', text: 'Contributed to DInSAd (Digital Inclusion of Low Skilled Adult People), researching, designing, and implementing a gamified website to help older adults learn to use internet technologies. Collaborated with European project partners through regular video meetings.' },
  { title: 'Interactive learning & gamification tools', period: 'October – November 2021 · EU-funded project', text: 'Researched and tested tools for interactive learning content and gamification compatible with learning and content management systems. Presented findings to European partners for the IO2 and IO3 deliverables.' },
  { title: 'Flutter application & learning material', period: '2023 · University thesis', text: 'Developed a Flutter application and a series of lessons that used the application as an evolving teaching example.' },
];
export const skillGroups = [
  { title: 'Frontend leadership', context: 'Current role at AIPath', skills: ['Frontend architecture', 'Web & mobile development', 'Frontend ownership', 'Trainee mentoring'] },
  { title: 'Languages & foundations', context: 'Documented in my earlier CV', skills: ['JavaScript', 'Python', 'PHP', 'C', 'HTML', 'CSS'] },
  { title: 'Frameworks & tools', context: 'Documented in my earlier CV', skills: ['Vue.js', 'Flutter', 'Node.js', 'Electron', 'Bootstrap', 'jQuery', 'Git', 'MySQL'] },
  { title: 'Web platforms & mapping', context: 'Previous work and CV', skills: ['WordPress', 'Joomla', 'CodeIgniter', 'Grocery CRUD', 'OpenLayers', 'Leaflet'] },
];
