import { links } from '../lib/site';

// Statistics are maintained by hand (no live API). Update `lastUpdated` whenever numbers change.
export const statsLastUpdated = 'November 2026';

export interface PlatformStat {
  value: string;
  label: string;
}

export interface Platform {
  id: string;
  name: string;
  rank: string;
  headline: { value: string; label: string };
  stats: PlatformStat[];
  href: string | null;
}

export const platforms: Platform[] = [
  {
    id: 'codechef',
    name: 'CodeChef',
    rank: '5★',
    headline: { value: '2035', label: 'Peak rating' },
    stats: [
      { value: '5-Star', label: 'Rank' },
      { value: '142', label: 'Problems solved' },
      { value: '18', label: 'Contests' },
    ],
    href: links.codechef,
  },
  {
    id: 'codeforces',
    name: 'Codeforces',
    rank: 'Expert',
    headline: { value: '1621', label: 'Current rating' },
    stats: [
      { value: '1626', label: 'Peak rating' },
      { value: '122', label: 'Problems solved' },
      { value: '8', label: 'Contests' },
    ],
    href: links.codeforces,
  },
];

export const hackathon = {
  title: 'Smart India Hackathon 2025',
  result: 'Top 10',
  detail: 'Top 10 finish with Team Khetify — a farming assistant using Random Forest predictions on weather and soil data.',
  projectSlug: 'khetify',
};

export const codameMetrics: PlatformStat[] = [
  { value: '3', label: 'Contests organised' },
  { value: '6+', label: 'Advanced problems featured' },
  { value: '150+', label: 'Junior students mentored' },
  { value: '45+', label: 'Code reviews' },
  { value: '14', label: 'Coding sessions led' },
  { value: '50', label: 'Session attendees' },
  { value: '~65', label: 'Contest problems discussed' },
];
