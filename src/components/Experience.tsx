import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { experience } from '../data/experience';
import type { Experience as ExperienceEntry } from '../data/types';
import { Link } from '../lib/router';
import { statGridCols } from '../lib/grid';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

function Entry({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const isVenture = entry.id === 'bavrix';
  return (
    <Reveal delay={index * 0.05} className="relative grid gap-4 pl-8 md:grid-cols-[200px_1fr] md:gap-10 md:pl-0">
      {/* Timeline rail marker */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-2 h-3 w-3 rounded-full border-2 md:left-[216px] ${
          isVenture ? 'border-success bg-success/30' : 'border-primary bg-background'
        }`}
      />

      <div className="md:pt-0.5 md:text-right">
        <p className="font-mono text-xs uppercase tracking-wider text-text-secondary">{entry.period}</p>
        {entry.location && <p className="mt-1 text-sm text-text-muted">{entry.location}</p>}
      </div>

      <article className={`card p-6 md:ml-8 md:p-8 ${isVenture ? 'border-success/25' : ''}`}>
        <header className="mb-4">
          <p className={`mb-2 font-mono text-[11px] uppercase tracking-[0.16em] ${isVenture ? 'text-success' : 'text-primary'}`}>
            {entry.type}
          </p>
          <h3 className="text-xl font-semibold text-text-primary md:text-2xl">{entry.role}</h3>
          <p className="mt-1 text-text-secondary">
            {entry.url ? (
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline decoration-border-strong underline-offset-4 hover:text-text-primary hover:decoration-primary"
              >
                {entry.organization}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ) : (
              entry.organization
            )}
          </p>
        </header>

        <p className="leading-relaxed text-text-secondary">{entry.summary}</p>

        <ul className="mt-5 space-y-2.5">
          {entry.points.map((point) => (
            <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-text-secondary">
              <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-text-muted" />
              {point}
            </li>
          ))}
        </ul>

        {entry.focus && (
          <div className="mt-6 rounded-xl border border-border bg-background/40 p-5">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">{entry.focus.title}</p>
            <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {entry.focus.items.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-text-primary">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-sm bg-success/70" />
                  {item}
                </li>
              ))}
            </ul>
            {entry.focus.note && <p className="mt-4 text-xs text-text-muted">{entry.focus.note}</p>}
          </div>
        )}

        {entry.metrics && (
          <dl className={`mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border ${statGridCols(entry.metrics.length)}`}>
            {entry.metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse bg-surface px-4 py-3.5">
                <dt className="mt-0.5 text-xs leading-snug text-text-muted">{m.label}</dt>
                <dd className="text-xl font-semibold tracking-tight text-text-primary">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {entry.related && (
          <Link
            to={entry.related.to}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-strong"
          >
            {entry.related.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </article>
    </Reveal>
  );
}

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative border-t border-border py-24 md:py-32">
      <div className="container-page">
        <SectionHeading id="experience-title" index="02" label="Experience" title="Ownership across product, engineering and community">
          Founding a deep-tech venture, running product and marketing for a healthcare platform, mentoring competitive
          programmers, and shipping a simulation as an intern.
        </SectionHeading>

        <div className="relative">
          <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-border md:left-[221px]" />
          <div className="space-y-10">
            {experience.map((entry, i) => (
              <Entry key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
