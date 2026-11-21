import { Binary, Layers, Shuffle } from 'lucide-react';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const principles = [
  {
    icon: Binary,
    title: 'Algorithmic Thinking',
    body: 'I use algorithmic reasoning beyond competitive programming. I enjoy breaking down complex problems, optimizing solutions, analyzing complexity, and implementing efficient logic.',
  },
  {
    icon: Layers,
    title: 'Systems Thinking',
    body: 'I care about how systems operate underneath the abstraction layer: data flow, reliability, performance, security, state management, and architecture.',
  },
  {
    icon: Shuffle,
    title: 'Cross-Domain Engineering',
    body: 'My projects span AI, blockchain, game development, and application engineering. I enjoy applying strong computer science fundamentals across different technical domains.',
  },
];

const loop = ['Build', 'Break', 'Understand', 'Improve'];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-32">
      <div className="container-page">
        <SectionHeading id="about-title" index="01" label="Engineering Philosophy" title="Beyond the Stack">
          I enjoy understanding how things work beneath the abstraction layer and using that understanding to build practical
          systems. My work spans algorithmic problem-solving, application development, blockchain, AI pipelines, and secure
          infrastructure.
        </SectionHeading>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {principles.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.08} className="card group p-7 transition-colors hover:border-border-strong">
              <div className="mb-6 flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-strong bg-surface-2 text-primary">
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs text-text-muted">0{i + 1}</span>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-text-primary">{title}</h3>
              <p className="leading-relaxed text-text-secondary">{body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10">
          <ol aria-label="Engineering loop" className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-[0.25em] text-text-muted">
            {loop.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <span className={i === loop.length - 1 ? 'text-success' : ''}>{step}</span>
                <span aria-hidden="true" className="text-border-strong">
                  {i < loop.length - 1 ? '→' : '↺'}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
