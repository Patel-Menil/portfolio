import type { Experience } from './types';

export const experience: Experience[] = [
  {
    id: 'bavrix',
    organization: 'Bavrix Labs Pvt. Ltd.',
    role: 'Co-founder & CEO',
    period: 'Current',
    type: 'Venture · AI Security / Deep-Tech Infrastructure',
    summary:
      'Leading product direction and engineering initiatives at Bavrix, a deep-tech infrastructure venture focused on AI application security and trusted data processing. Co-founded with Jeel (CTO).',
    points: [
      'Building infrastructure to protect AI applications, APIs, sensitive data and enterprise systems.',
      'Bavrix Labs is the company and Bavrix is its current product brand. The work grew out of SealAPI, the AI-security and blockchain-attestation project.',
    ],
    focus: {
      title: 'Areas of work',
      items: [
        'AI application security',
        'Secure API infrastructure',
        'Cryptographic data protection',
        'Encryption services',
        'Secure data pipelines',
        'Blockchain-based integrity verification',
        'Trusted execution architecture',
        'Developer infrastructure & SDKs',
      ],
      note: 'Product capabilities are in active development; not every area is production-ready.',
    },
    related: { label: 'SealAPI case study', to: '/projects/sealapi' },
  },
  {
    id: 'monavi',
    organization: 'Monavi',
    url: 'https://monavi.in',
    role: 'Project & Marketing Lead',
    period: 'Jun 2026 – Present',
    type: 'Healthcare Technology',
    summary:
      'Working on product execution and marketing for a doctor–patient platform, supporting the development and growth of a healthcare technology product.',
    points: [
      'Coordinate product execution and marketing initiatives across product and marketing functions.',
      'Work with a 12-member cross-functional team to align product priorities and execution.',
      'Support user-acquisition initiatives for the platform.',
    ],
    metrics: [
      { value: '150+', label: 'Combined users — doctors and patients' },
      { value: '12', label: 'Member cross-functional team' },
    ],
  },
  {
    id: 'codame',
    organization: 'CODAME Competitive Programming Club',
    role: 'Event Lead',
    // Overall tenure with the club; individual roles are listed in `progression`.
    period: 'Dec 2024 – Present',
    location: 'IIIT Bhopal',
    type: 'Technical Leadership',
    progression: [
      { role: 'Event Lead', period: 'Sep 2026 – Present' },
      { role: 'Executive Member', period: 'Dec 2024 – Sep 2026' },
    ],
    summary:
      'Contributing to the competitive programming community through contest organisation, technical mentoring, code reviews and structured coding sessions.',
    points: [
      'Organised 3 contests featuring 6+ high-rated problems for IIIT Bhopal students.',
      'Mentored 150+ junior students through DSA practice, code reviews and competitive programming talks.',
      'Led 14 coding sessions for 50 attendees, walking through solution approaches for around 65 contest problems.',
    ],
    metrics: [
      { value: '3', label: 'Contests organised' },
      { value: '150+', label: 'Juniors mentored' },
      { value: '45+', label: 'Code reviews' },
      { value: '14', label: 'Coding sessions' },
    ],
  },
  {
    id: 'nextin',
    organization: 'NextIn Lab',
    role: 'Unity Developer Intern',
    period: 'Jun 2025 – Jul 2025',
    location: 'Remote',
    type: 'Internship · Simulation',
    summary:
      'Developed an interactive GSLV rocket launch simulation in Unity and C#, implementing stage-wise simulation logic and physics-driven launch behaviour.',
    points: [
      'Built a three-stage GSLV launch simulation, integrating 20+ asset packages for gameplay, controls, interface and sound.',
      'Wrote physics-driven C# scripts for ignition, booster separation and ascent, with reusable debugging workflows.',
      'Optimised the UI and audio pipelines, sustaining 30 FPS and 10 ms load times.',
    ],
    metrics: [
      { value: '20+', label: 'Asset packages integrated' },
      { value: '30 FPS', label: 'Sustained frame rate' },
      { value: '10 ms', label: 'Load times' },
    ],
    related: { label: 'GSLV case study', to: '/projects/gslv' },
  },
];
