import { GraduationCap } from 'lucide-react';
import { education } from '../data/education';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="relative border-t border-border py-24 md:py-32">
      <div className="container-page">
        <SectionHeading id="education-title" index="06" label="Education" title="Education" />
        <Reveal>
          <article className="card grid gap-8 p-6 md:grid-cols-[auto_1fr_auto] md:gap-10 md:p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border-strong bg-surface-2 text-primary">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-xl font-semibold text-text-primary md:text-2xl">{education.institution}</h3>
              <p className="mt-2 text-text-secondary">{education.degree}</p>
              <div className="mt-6">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">Relevant coursework</p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {education.coursework.map((c) => (
                    <li key={c} className="flex items-center gap-2.5 text-[15px] text-text-secondary">
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-primary" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:text-right">
              <p className="font-mono text-sm text-text-primary">{education.period}</p>
              <p className="mt-1 text-sm text-text-muted">{education.location}</p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
