import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  id?: string;
  children?: ReactNode;
  aside?: ReactNode;
}

export default function SectionHeading({ index, label, title, id, children, aside }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="eyebrow mb-4">
          <span className="text-text-muted">{index}</span>
          <span className="mx-2 text-text-muted">/</span>
          {label}
        </p>
        <h2 id={id} className="text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
          {title}
        </h2>
        {children && <div className="mt-5 text-lg leading-relaxed text-text-secondary">{children}</div>}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </Reveal>
  );
}
