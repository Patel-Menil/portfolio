import type { ReactNode } from 'react';
import type { Panel } from '../../data/types';

function PanelShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="card p-6 md:p-7">
      <h4 className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">{title}</h4>
      {children}
    </div>
  );
}

export default function ProjectPanel({ panel }: { panel: Panel }) {
  switch (panel.type) {
    case 'primitives':
      return (
        <PanelShell title={panel.title}>
          <dl className="grid gap-3 sm:grid-cols-2">
            {panel.items.map((item) => (
              <div key={item.name} className="rounded-xl border border-border bg-background/40 p-4">
                <dt className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-mono text-sm font-medium text-text-primary">{item.name}</span>
                  <span className="text-[11px] uppercase tracking-wider text-primary">{item.role}</span>
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-text-secondary">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </PanelShell>
      );
    case 'domains':
      return (
        <PanelShell title={panel.title}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <ol className="flex-1 space-y-2">
              {panel.items.map((item, i) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-lg border border-border bg-background/40 px-3.5 py-2.5 text-sm text-text-primary"
                >
                  <span className="font-mono text-[11px] text-text-muted">H{i + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
            <span aria-hidden="true" className="self-center font-mono text-text-muted md:px-2">
              <span className="md:hidden">↓</span>
              <span className="hidden md:inline">→</span>
            </span>
            <div className="rounded-xl border border-success/40 bg-success/[0.07] p-5 md:w-56">
              <p className="font-mono text-[11px] uppercase tracking-wider text-success">Anchored</p>
              <p className="mt-2 text-sm font-medium leading-snug text-text-primary">{panel.result}</p>
            </div>
          </div>
          {panel.note && <p className="mt-4 text-sm text-text-muted">{panel.note}</p>}
        </PanelShell>
      );
    case 'comparison':
      return (
        <PanelShell title={panel.title}>
          <div className="grid gap-3 md:grid-cols-2">
            {panel.columns.map((col) => (
              <div
                key={col.name}
                className="rounded-xl border border-border bg-background/40 p-5"
              >
                <p className="mb-3 text-sm font-semibold text-text-primary">{col.name}</p>
                <ul className="space-y-2">
                  {col.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-text-secondary">
                      <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-text-muted" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {panel.conclusion && <p className="mt-4 text-sm leading-relaxed text-text-primary">{panel.conclusion}</p>}
        </PanelShell>
      );
    case 'code':
      return (
        <PanelShell title={panel.title}>
          <pre className="overflow-x-auto rounded-xl border border-border bg-background/70 p-4 font-mono text-[12.5px] leading-relaxed text-text-primary">
            <code>{panel.code}</code>
          </pre>
          {panel.caption && <p className="mt-3 text-sm text-text-muted">{panel.caption}</p>}
        </PanelShell>
      );
  }
}
