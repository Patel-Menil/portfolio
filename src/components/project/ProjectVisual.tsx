import { Play } from 'lucide-react';
import type { Project } from '../../data/types';
import { FlowList } from '../ui/FlowDiagram';

function LeadFunnel({ project }: { project: Project }) {
  const scraped = project.results[0];
  const shortlisted = project.results[1];
  const stages = [
    { label: 'Potential leads scraped', value: scraped?.value ?? '', width: '100%', tone: 'bg-primary/25 border-primary/40' },
    { label: 'High-potential prospects shortlisted', value: shortlisted?.value ?? '', width: '15.2%', tone: 'bg-success/30 border-success/50' },
  ];
  const steps = project.architecture.steps.flatMap((s) => ('parallel' in s ? s.parallel : [s]));
  return (
    <figure aria-label="Lead funnel: 950+ potential leads scraped, 144 high-potential prospects shortlisted" className="space-y-4">
      {stages.map((s) => (
        <div key={s.label}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3">
            <span className="text-[13px] text-text-secondary">{s.label}</span>
            <span className="font-mono text-lg font-semibold text-text-primary">{s.value}</span>
          </div>
          <div className="h-7 rounded-md bg-surface-2/70">
            <div className={`h-full min-w-8 rounded-md border ${s.tone}`} style={{ width: s.width }} />
          </div>
        </div>
      ))}
      <figcaption className="flex flex-wrap items-center gap-x-1.5 gap-y-1 pt-1 font-mono text-[10.5px] text-text-muted">
        {steps.map((s, i) => (
          <span key={s.label} className="flex items-center gap-1.5">
            {s.label}
            {i < steps.length - 1 && <span aria-hidden="true">→</span>}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

function BrowserFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border-strong bg-surface-2">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-text-muted/40" />
        <span className="h-2 w-2 rounded-full bg-text-muted/40" />
        <span className="h-2 w-2 rounded-full bg-text-muted/40" />
        <span className="ml-3 truncate font-mono text-[10px] text-text-muted">defi-nexus-two.vercel.app</span>
      </div>
      <img src={src} alt={alt} width={800} height={500} loading="lazy" decoding="async" className="block h-auto w-full" />
    </div>
  );
}

function LaunchSequence({ project }: { project: Project }) {
  const playLink = project.links.find((l) => l.kind === 'play');
  const stages = ['Ignition', 'Booster sep.', 'Stage 2', 'Stage 3'];
  return (
    <div className="relative overflow-hidden rounded-xl border border-border-strong bg-[radial-gradient(ellipse_at_bottom,rgba(56,189,248,0.10),transparent_70%)] p-5">
      <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-text-muted">Launch sequence</p>
      <ol className="grid grid-cols-4 gap-1.5" aria-label="Launch sequence stages">
        {stages.map((s, i) => (
          <li key={s}>
            <div className={`h-1.5 rounded-full ${i < 2 ? 'bg-primary' : 'bg-primary/35'}`} />
            <p className="mt-2 font-mono text-[10.5px] leading-tight text-text-secondary">
              <span className="text-text-muted">0{i + 1}</span> {s}
            </p>
          </li>
        ))}
      </ol>
      {playLink && (
        <a
          href={playLink.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center justify-between rounded-lg border border-border-strong bg-background/60 px-4 py-3 transition-colors hover:border-primary/60"
        >
          <span>
            <span className="block text-sm font-medium text-text-primary">Play in your browser</span>
            <span className="block font-mono text-[10.5px] text-text-muted">itch.io · HTML5 build</span>
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-background">
            <Play className="h-4 w-4 translate-x-px" aria-hidden="true" />
          </span>
        </a>
      )}
    </div>
  );
}

export default function ProjectVisual({ project }: { project: Project }) {
  switch (project.visual) {
    case 'sealapi':
    case 'voice-rag':
      return <FlowList steps={project.architecture.steps} label={`${project.title} architecture`} />;
    case 'lead-intelligence':
      return <LeadFunnel project={project} />;
    case 'defi-nexus': {
      const shot = project.media?.[0];
      return shot ? <BrowserFrame src={shot.src} alt={shot.alt} /> : null;
    }
    case 'gslv':
      return <LaunchSequence project={project} />;
    default:
      return null;
  }
}
