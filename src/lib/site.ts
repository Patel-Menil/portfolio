// Single source of truth for identity, contact details and external profile links.
// Every URL here has been checked against a live page or provided by Menil directly.

export const site = {
  name: 'Menil Patel',
  role: 'Software Engineer',
  positioning: 'Software Engineer | Systems, Algorithms & AI Infrastructure',
  location: 'Bhopal, India',
  email: 'patelmenil8494@gmail.com',
  resumePath: '/resume/Menil_Patel_Resume.pdf',
  resumeFileName: 'Menil_Patel_Resume.pdf',
  portrait: '/me.jpg',
  title: 'Menil Patel | Software Engineer | Systems, Algorithms & AI Infrastructure',
  description:
    'Menil Patel is a software engineer at IIIT Bhopal working across algorithms, systems engineering, blockchain, cryptography, AI infrastructure, and product development.',
} as const;

export const links = {
  github: 'https://github.com/Patel-Menil',
  linkedin: 'https://www.linkedin.com/in/menil-patel1710/',
  email: `mailto:${site.email}`,
  // Linked from Menil's GitHub profile; verified against the live CodeChef profile.
  codechef: 'https://www.codechef.com/users/pir_patapim17',
  // Codeforces handle not yet confirmed — leave null rather than guess.
  codeforces: null as string | null,
  itch: 'https://spiritmenil.itch.io',
  monavi: 'https://monavi.in',
} as const;
