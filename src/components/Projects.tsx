import { ArrowRight, FlaskConical } from 'lucide-react';
import { academicProjects, featuredProjects, otherProjects } from '../data/projects';
import type { Project } from '../data/types';
import { Link } from '../lib/router';
import ProjectLinks from './project/ProjectLinks';
import ProjectVisual from './project/ProjectVisual';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

function StackLine({ stack, max = 6 }: { stack: string[]; max?: number }) {
  const shown = stack.slice(0, max);
  const rest = stack.length - shown.length;
  return (
    <p className="font-mono text-[12px] leading-relaxed text-text-muted">
      {shown.join(' · ')}
      {rest > 0 && <span> · +{rest}</span>}
    </p>
  );
}

function CaseStudyLink({ project }: { project: Project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3.5 py-2 text-[13px] font-medium text-primary transition-colors hover:bg-primary/20"
    >
      Read case study
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">: {project.title}</span>
    </Link>
  );
}

function CardHeader({ project, large }: { project: Project; large?: boolean }) {
  return (
    <header>
      <p className="eyebrow mb-3 !text-[11px]">{project.category}</p>
      <h3 className={`font-semibold tracking-tight text-text-primary ${large ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
        <Link to={`/projects/${project.slug}`} className="hover:text-primary-strong">
          {project.title}
        </Link>
      </h3>
      {project.context && <p className="mt-2 text-sm text-text-muted">{project.context}</p>}
    </header>
  );
}

function Flagship({ project }: { project: Project }) {
  return (
    <Reveal>
      <article className="card relative overflow-hidden border-primary/20">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <div className="flex flex-col">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-success/40 bg-success/10 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-success">
                Flagship
              </span>
              <span className="font-mono text-[11px] text-text-muted">{project.status}</span>
            </div>
            <CardHeader project={project} large />
            <p className="mt-5 text-lg leading-relaxed text-text-secondary">{project.tagline}</p>
            <ul className="mt-6 space-y-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-text-secondary">
                  <span aria-hidden="true" className="mt-[9px] h-1 w-3 shrink-0 rounded-full bg-primary/70" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <StackLine stack={project.stack} max={7} />
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <CaseStudyLink project={project} />
                <ProjectLinks links={project.links} />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-background/50 p-4 md:p-6">
            <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-text-muted">Payload → proof pipeline</p>
            <ProjectVisual project={project} />
          </div>
        </div>
        {project.results.length > 0 && (
          <dl className="grid grid-cols-2 border-t border-border md:grid-cols-4">
            {project.results.map((m, i) => (
              <div
                key={m.label}
                className={`flex flex-col-reverse px-6 py-5 md:px-8 ${i % 2 === 1 ? 'border-l border-border' : ''} ${i >= 2 ? 'border-t border-border md:border-t-0' : ''} ${i === 2 ? 'md:border-l' : ''}`}
              >
                <dt className="mt-1 text-xs leading-snug text-text-muted">
                  {m.label}
                  {m.kind === 'target' && <span className="ml-1.5 font-mono text-[10px] uppercase text-primary/80">target</span>}
                </dt>
                <dd className="text-2xl font-semibold tracking-tight text-text-primary">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </article>
    </Reveal>
  );
}

function FeaturedCard({ project, visualFirst, className = '' }: { project: Project; visualFirst?: boolean; className?: string }) {
  const visual = (
    <div className={visualFirst ? '' : 'rounded-xl border border-border bg-background/40 p-4'}>
      <ProjectVisual project={project} />
    </div>
  );
  return (
    <Reveal className={className}>
      <article className="card flex h-full flex-col gap-7 p-6 transition-colors hover:border-border-strong md:p-8">
        {visualFirst && visual}
        <div>
          <CardHeader project={project} />
          <p className="mt-4 leading-relaxed text-text-secondary">{project.tagline}</p>
        </div>
        {!visualFirst && visual}
        <div className="mt-auto space-y-5">
          <StackLine stack={project.stack} />
          <div className="flex flex-wrap items-center gap-2.5">
            <CaseStudyLink project={project} />
            <ProjectLinks links={project.links} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function CompactCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={index * 0.06} className="h-full">
      <article className="card flex h-full flex-col p-6 transition-colors hover:border-border-strong">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">{project.category}</p>
        </div>
        <h4 className="text-lg font-semibold text-text-primary">
          <Link to={`/projects/${project.slug}`} className="hover:text-primary-strong">
            {project.title}
          </Link>
        </h4>
        <p className="mt-1 font-mono text-[11px] text-success/90">{project.status}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">{project.tagline}</p>
        <div className="mt-auto pt-5">
          <StackLine stack={project.stack} max={4} />
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1 text-[13px] font-medium text-primary hover:text-primary-strong"
            >
              Details <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">about {project.title}</span>
            </Link>
            <span className="flex-1" />
            <ProjectLinks links={project.links} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function AcademicCard({ project }: { project: Project }) {
  return (
    <Reveal>
      <article className="card grid gap-6 border-dashed p-6 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8 md:p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border-strong bg-surface-2 text-text-secondary">
          <FlaskConical className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-border-strong px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider text-text-secondary">
              Academic project
            </span>
            {project.team && <span className="text-xs text-text-muted">{project.team}</span>}
          </div>
          <h4 className="text-lg font-semibold text-text-primary">
            <Link to={`/projects/${project.slug}`} className="hover:text-primary-strong">
              {project.title}
            </Link>
          </h4>
          <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-text-secondary">{project.tagline}</p>
          <p className="mt-2 text-xs text-text-muted">
            Research prototype — federation is simulated on one machine and the model is not clinically validated.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 md:flex-col md:items-end">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-[13px] font-medium text-primary hover:text-primary-strong"
          >
            Details <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">about {project.title}</span>
          </Link>
          <ProjectLinks links={project.links} />
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  const [sealapi, voiceRag, leads, defi, gslv] = featuredProjects;
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative border-t border-border py-24 md:py-32">
      <div className="container-page">
        <SectionHeading id="projects-title" index="03" label="Selected Work" title="Featured Projects">
          Systems I designed and built — from cryptographic attestation and retrieval pipelines to smart contracts and
          simulations. Each one has a full case study.
        </SectionHeading>

        <div className="space-y-5">
          {sealapi && <Flagship project={sealapi} />}

          <div className="grid gap-5 lg:grid-cols-12">
            {voiceRag && <FeaturedCard project={voiceRag} className="lg:col-span-7" />}
            {leads && <FeaturedCard project={leads} className="lg:col-span-5" />}
          </div>

          <div className="grid gap-5 lg:grid-cols-12">
            {defi && <FeaturedCard project={defi} visualFirst className="lg:col-span-7" />}
            {gslv && <FeaturedCard project={gslv} className="lg:col-span-5" />}
          </div>
        </div>

        <div className="mt-24" aria-labelledby="other-projects-title">
          <Reveal className="mb-8 flex items-end justify-between gap-4 border-b border-border pb-5">
            <h3 id="other-projects-title" className="text-xl font-semibold text-text-primary md:text-2xl">
              Other Projects
            </h3>
            <p className="hidden font-mono text-xs text-text-muted sm:block">Algorithms · game AI · applied ML</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {otherProjects.map((p, i) => (
              <CompactCard key={p.slug} project={p} index={i} />
            ))}
          </div>
          <div className="mt-5 space-y-5">
            {academicProjects.map((p) => (
              <AcademicCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
