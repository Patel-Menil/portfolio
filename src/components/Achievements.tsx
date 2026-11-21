import { ArrowRight, ArrowUpRight, Trophy } from 'lucide-react';
import { codameMetrics, hackathon, platforms, statsLastUpdated, type Platform } from '../data/achievements';
import { Link } from '../lib/router';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

function PlatformCard({ platform, index }: { platform: Platform; index: number }) {
  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article className="card relative flex h-full flex-col overflow-hidden p-6 md:p-8">
        <div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/[0.07] blur-3xl" />
        <header className="relative flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{platform.name}</h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-primary">{platform.rank}</p>
          </div>
          {platform.href && (
            <a
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-border-strong px-3 py-1.5 text-[13px] text-text-secondary transition-colors hover:border-primary/60 hover:text-text-primary"
            >
              Profile <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">on {platform.name} (opens in a new tab)</span>
            </a>
          )}
        </header>

        <div className="relative mt-8">
          <p className="text-6xl font-semibold tracking-tight text-text-primary md:text-7xl">{platform.headline.value}</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-wider text-text-muted">{platform.headline.label}</p>
        </div>

        <dl className="relative mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
          {platform.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse bg-surface px-3 py-3">
              <dt className="mt-0.5 text-[11px] text-text-muted">{s.label}</dt>
              <dd className="text-lg font-semibold text-text-primary">{s.value}</dd>
            </div>
          ))}
        </dl>
      </article>
    </Reveal>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" aria-labelledby="achievements-title" className="relative border-t border-border py-24 md:py-32">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />
      <div className="container-page relative">
        <SectionHeading
          id="achievements-title"
          index="05"
          label="Competitive Programming & Achievements"
          title="Algorithmic ability, measured"
          aside={<p className="font-mono text-[11px] text-text-muted">Stats updated {statsLastUpdated}</p>}
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {platforms.map((p, i) => (
            <PlatformCard key={p.id} platform={p} index={i} />
          ))}

          <Reveal delay={0.16} className="h-full">
            <article className="card flex h-full flex-col border-success/25 p-6 md:p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-success/40 bg-success/10 text-success">
                <Trophy className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-lg font-semibold text-text-primary">{hackathon.title}</h3>
              <p className="mt-3 text-5xl font-semibold tracking-tight text-success">{hackathon.result}</p>
              <p className="mt-4 leading-relaxed text-text-secondary">{hackathon.detail}</p>
              <Link
                to={`/projects/${hackathon.projectSlug}`}
                className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-primary hover:text-primary-strong"
              >
                About Khetify <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          </Reveal>
        </div>

        <Reveal className="mt-5">
          <article className="card p-6 md:p-8">
            <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-end">
              <div>
                <p className="eyebrow mb-2 !text-[11px]">Leadership</p>
                <h3 className="text-lg font-semibold text-text-primary">CODAME Competitive Programming Club · IIIT Bhopal</h3>
              </div>
              <p className="text-sm text-text-muted">Executive Member · Dec 2024 – Present</p>
            </div>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4 lg:grid-cols-7 [&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1">
              {codameMetrics.map((m) => (
                <div key={m.label} className="flex flex-col-reverse bg-surface px-4 py-4">
                  <dt className="mt-1 text-xs leading-snug text-text-muted">{m.label}</dt>
                  <dd className="text-2xl font-semibold tracking-tight text-text-primary">{m.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
