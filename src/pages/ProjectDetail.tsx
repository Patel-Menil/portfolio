import { useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Play, TriangleAlert } from 'lucide-react';
import { getProject, projects } from '../data/projects';
import type { Media, Metric, Project } from '../data/types';
import { Link } from '../lib/router';
import { scrollToHash } from '../lib/navigation';
import { usePageMeta } from '../lib/usePageMeta';
import { statGridCols } from '../lib/grid';
import FlowDiagram, { FlowList } from '../components/ui/FlowDiagram';
import ProjectLinks from '../components/project/ProjectLinks';
import ProjectPanel from '../components/project/ProjectPanels';
import Reveal from '../components/ui/Reveal';
import NotFound from './NotFound';

const kindLabel: Record<NonNullable<Metric['kind']>, string | null> = {
  target: 'Target',
  reported: 'Reported',
  fact: null,
};

function DetailSection({ id, index, title, children }: { id: string; index: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-border py-14 md:py-16">
      <Reveal>
        <h2 id={`${id}-title`} className="mb-8 flex items-baseline gap-4 text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
          <span className="font-mono text-sm font-normal text-primary">{index}</span>
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}

function MediaFigure({ media }: { media: Media }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  const external = media.src.startsWith('http');
  return (
    <figure className={media.portrait ? 'mx-auto w-full max-w-[280px]' : ''}>
      <div className="overflow-hidden rounded-xl border border-border-strong bg-surface-2">
        <img
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          {...(external ? { referrerPolicy: 'no-referrer' as const } : {})}
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-sm text-text-muted">{media.caption}</figcaption>
    </figure>
  );
}

function Header({ project }: { project: Project }) {
  const meta = [
    { label: 'Status', value: project.status },
    project.team ? { label: 'Team', value: project.team } : null,
    project.context ? { label: 'Context', value: project.context } : null,
  ].filter((m): m is { label: string; value: string } => m !== null);

  return (
    <header id="overview" className="pb-14 pt-28 md:pt-36">
      <Link
        to="/#projects"
        className="mb-10 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All projects
      </Link>
      <Reveal>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <p className="eyebrow">{project.category}</p>
          {project.tier === 'academic' && (
            <span className="rounded-full border border-border-strong px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider text-text-secondary">
              Academic project
            </span>
          )}
        </div>
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-text-primary md:text-6xl">{project.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-secondary md:text-xl">{project.tagline}</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-text-muted">{m.label}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-text-primary">{m.value}</dd>
            </div>
          ))}
        </dl>
        <ProjectLinks links={project.links} size="md" />
      </Reveal>

      <Reveal delay={0.15} className="mt-8">
        <p className="sr-only">Technology stack</p>
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li key={s} className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[12px] text-text-secondary">
              {s}
            </li>
          ))}
        </ul>
      </Reveal>
    </header>
  );
}

export default function ProjectDetail({ slug }: { slug: string }) {
  const project = getProject(slug);

  usePageMeta(
    project ? `${project.title} — Case Study | Menil Patel` : 'Project not found | Menil Patel',
    project?.tagline,
  );

  if (!project) return <NotFound />;

  const playLink = project.links.find((l) => l.kind === 'play' || l.kind === 'live');
  const hasMedia = (project.media?.length ?? 0) > 0 || Boolean(playLink);

  const sections = [
    { id: 'problem', title: 'Problem' },
    { id: 'architecture', title: 'Architecture' },
    { id: 'implementation', title: 'Implementation' },
    { id: 'decisions', title: 'Engineering Decisions' },
    { id: 'results', title: 'Results' },
    ...(hasMedia ? [{ id: 'media', title: 'Screenshots & Demo' }] : []),
    { id: 'links', title: 'Links' },
  ];
  const num = (id: string) => String(sections.findIndex((s) => s.id === id) + 1).padStart(2, '0');

  const i = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  return (
    <article className="container-page">
      <Header project={project} />

      <div className="xl:grid xl:grid-cols-[180px_1fr] xl:gap-14">
        <nav aria-label="On this page" className="hidden xl:block">
          <ul className="sticky top-28 space-y-1 border-l border-border pt-14">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash(s.id);
                  }}
                  className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[13px] text-text-muted transition-colors hover:border-primary hover:text-text-primary"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0">
          <DetailSection id="problem" index={num('problem')} title="Problem">
            <Reveal>
              <p className="max-w-3xl text-lg leading-relaxed text-text-secondary">{project.problem}</p>
            </Reveal>
          </DetailSection>

          <DetailSection id="architecture" index={num('architecture')} title="Architecture">
            {project.architecture.steps.length > 5 ? (
              // Long pipelines read better vertically than squeezed into one row.
              <Reveal className="card grid gap-8 p-5 md:p-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
                <FlowList steps={project.architecture.steps} label={`${project.title} architecture`} />
                <div className="lg:border-l lg:border-border lg:pl-10">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">How to read it</p>
                  <p className="mt-3 leading-relaxed text-text-secondary">{project.architecture.caption}</p>
                  <ul className="mt-6 space-y-2 text-sm text-text-muted">
                    <li className="flex items-center gap-3">
                      <span aria-hidden="true" className="h-3 w-5 rounded-sm border border-primary/50" /> Core processing stage
                    </li>
                    <li className="flex items-center gap-3">
                      <span aria-hidden="true" className="h-3 w-5 rounded-sm border border-success/50" /> Integrity / output stage
                    </li>
                    {project.architecture.steps.some((s) => !('parallel' in s) && s.async) && (
                      <li className="flex items-center gap-3">
                        <span aria-hidden="true" className="h-3 w-5 rounded-sm border border-dashed border-success/60" /> Asynchronous, off the request path
                      </li>
                    )}
                  </ul>
                </div>
              </Reveal>
            ) : (
              <Reveal className="card p-5 md:p-7">
                <FlowDiagram steps={project.architecture.steps} label={`${project.title} architecture`} />
                <p className="mt-8 max-w-3xl border-t border-border pt-5 text-sm leading-relaxed text-text-muted">
                  {project.architecture.caption}
                </p>
              </Reveal>
            )}
            {project.panels && (
              <div className="mt-5 grid grid-cols-1 gap-5">
                {project.panels.map((panel) => (
                  <Reveal key={panel.title}>
                    <ProjectPanel panel={panel} />
                  </Reveal>
                ))}
              </div>
            )}
          </DetailSection>

          <DetailSection id="implementation" index={num('implementation')} title="Technical Implementation">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {project.implementation.map((block, idx) => (
                <Reveal key={block.title} delay={(idx % 2) * 0.06} className="card p-6">
                  <h3 className="mb-3 font-semibold text-text-primary">{block.title}</h3>
                  <p className="text-[15px] leading-relaxed text-text-secondary">{block.body}</p>
                </Reveal>
              ))}
            </div>
          </DetailSection>

          <DetailSection id="decisions" index={num('decisions')} title="Engineering Decisions">
            <ol className="divide-y divide-border rounded-2xl border border-border">
              {project.decisions.map((d, idx) => (
                <li key={d.title}>
                  <Reveal className="grid gap-2 p-6 md:grid-cols-[2.5rem_1fr_1.6fr] md:gap-6">
                    <span className="font-mono text-xs text-text-muted">{String(idx + 1).padStart(2, '0')}</span>
                    <h3 className="font-semibold text-text-primary">{d.title}</h3>
                    <p className="text-[15px] leading-relaxed text-text-secondary">{d.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </DetailSection>

          <DetailSection id="results" index={num('results')} title="Results">
            {project.results.length > 0 && (
              <Reveal>
                <dl className={`grid gap-px overflow-hidden rounded-2xl border border-border bg-border ${statGridCols(project.results.length)}`}>
                  {project.results.map((m) => (
                    <div key={m.label} className="flex flex-col-reverse bg-surface p-6">
                      <dt className="mt-2 text-sm leading-snug text-text-secondary">
                        {m.label}
                        {m.note && <span className="mt-1 block font-mono text-[10.5px] text-text-muted">{m.note}</span>}
                      </dt>
                      <dd className="flex items-baseline gap-2">
                        <span className="text-3xl font-semibold tracking-tight text-text-primary">{m.value}</span>
                        {m.kind && kindLabel[m.kind] && (
                          <span
                            className={`font-mono text-[10px] uppercase tracking-wider ${m.kind === 'target' ? 'text-primary' : 'text-success'}`}
                          >
                            {kindLabel[m.kind]}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}
            {project.resultsNote && (
              <Reveal>
                <p className={`max-w-3xl text-sm leading-relaxed text-text-muted ${project.results.length > 0 ? 'mt-4' : ''}`}>
                  {project.resultsNote}
                </p>
              </Reveal>
            )}
            {project.limitations && (
              <Reveal className="mt-8 rounded-2xl border border-amber-400/25 bg-amber-400/[0.04] p-6">
                <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-amber-300/90">
                  <TriangleAlert className="h-4 w-4" aria-hidden="true" />
                  Limitations
                </p>
                <ul className="space-y-2">
                  {project.limitations.map((l) => (
                    <li key={l} className="flex gap-3 text-[15px] leading-relaxed text-text-secondary">
                      <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-amber-300/70" />
                      {l}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </DetailSection>

          {hasMedia && (
            <DetailSection id="media" index={num('media')} title="Screenshots & Demo">
              {project.media && project.media.length > 0 && (
                <div className={`grid grid-cols-1 gap-6 ${project.media.length > 1 ? 'md:grid-cols-2' : ''}`}>
                  {project.media.map((m) => (
                    <Reveal key={m.src}>
                      <MediaFigure media={m} />
                    </Reveal>
                  ))}
                </div>
              )}
              {playLink && (
                <Reveal className={project.media?.length ? 'mt-8' : ''}>
                  <a
                    href={playLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card group flex items-center justify-between gap-6 p-6 transition-colors hover:border-primary/50"
                  >
                    <span>
                      <span className="block font-semibold text-text-primary">
                        {playLink.kind === 'play' ? 'Play it yourself' : 'Open the live app'}
                      </span>
                      <span className="mt-1 block text-sm text-text-muted">{playLink.note ?? playLink.href.replace(/^https?:\/\//, '')}</span>
                    </span>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-background transition-transform group-hover:scale-105">
                      {playLink.kind === 'play' ? <Play className="h-4 w-4 translate-x-px" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </Reveal>
              )}
            </DetailSection>
          )}

          <DetailSection id="links" index={num('links')} title="Links">
            {project.links.length > 0 ? (
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {project.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card flex flex-col p-5 transition-colors hover:border-primary/50"
                    >
                      <span className="font-medium text-text-primary">{l.label} ↗</span>
                      <span className="mt-1 break-all font-mono text-[12px] text-text-muted">{l.href.replace(/^https?:\/\//, '')}</span>
                      {l.note && <span className="mt-2 text-xs text-text-muted">{l.note}</span>}
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-text-muted">No public repository or live demo is available for this project yet.</p>
            )}
          </DetailSection>
        </div>
      </div>

      <nav aria-label="More projects" className="grid grid-cols-1 gap-4 border-t border-border py-14 sm:grid-cols-2">
        <Link to={`/projects/${prev.slug}`} className="card group p-5 transition-colors hover:border-border-strong">
          <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-text-muted">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Previous
          </span>
          <span className="mt-2 block font-medium text-text-primary group-hover:text-primary-strong">{prev.title}</span>
        </Link>
        <Link to={`/projects/${next.slug}`} className="card group p-5 text-right transition-colors hover:border-border-strong">
          <span className="flex items-center justify-end gap-1.5 font-mono text-[11px] uppercase tracking-wider text-text-muted">
            Next <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="mt-2 block font-medium text-text-primary group-hover:text-primary-strong">{next.title}</span>
        </Link>
      </nav>
    </article>
  );
}
