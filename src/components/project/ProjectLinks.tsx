import { ArrowUpRight, ExternalLink, Play } from 'lucide-react';
import type { ProjectLink } from '../../data/types';
import { GitHubIcon } from '../ui/Icons';

const iconFor = (kind: ProjectLink['kind']) => {
  switch (kind) {
    case 'github':
      return <GitHubIcon className="h-4 w-4" />;
    case 'play':
      return <Play className="h-4 w-4" aria-hidden="true" />;
    case 'live':
      return <ExternalLink className="h-4 w-4" aria-hidden="true" />;
    default:
      return <ArrowUpRight className="h-4 w-4" aria-hidden="true" />;
  }
};

export default function ProjectLinks({ links, size = 'sm' }: { links: ProjectLink[]; size?: 'sm' | 'md' }) {
  if (links.length === 0) return null;
  const pad = size === 'md' ? 'px-4 py-2.5 text-sm' : 'px-3 py-1.5 text-[13px]';
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={link.note}
            className={`inline-flex items-center gap-2 rounded-lg border border-border-strong font-medium text-text-primary transition-colors hover:border-primary/60 hover:text-white ${pad}`}
          >
            {iconFor(link.kind)}
            {link.label}
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
