import { skillGroups } from '../data/skills';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative border-t border-border py-24 md:py-32">
      <div className="container-page">
        <SectionHeading id="skills-title" index="04" label="Technical Skills" title="Breadth, grounded in real work">
          Grouped by domain, each with the projects where it was actually used. No percentage bars — the projects are the
          evidence.
        </SectionHeading>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.id}
              delay={(i % 3) * 0.06}
              className={`card flex flex-col p-6 transition-colors hover:border-border-strong ${
                group.id === 'tools' ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <h3 className="text-base font-semibold text-text-primary">{group.title}</h3>
                <span className="font-mono text-[11px] text-text-muted">{String(group.skills.length).padStart(2, '0')}</span>
              </div>
              <p className="text-sm text-text-muted">{group.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-border bg-surface-2/60 px-2.5 py-1 text-[13px] text-text-secondary"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-5">
                <p className="border-t border-border pt-4 font-mono text-[11px] leading-relaxed text-text-muted">
                  <span className="text-primary/80">used in</span> {group.evidence}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
