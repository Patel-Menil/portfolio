import { motion } from 'framer-motion';
import type { FlowNode, FlowStep, Tone } from '../../data/types';

const toneClass: Record<Tone, string> = {
  default: 'border-border-strong',
  primary: 'border-primary/45',
  success: 'border-success/45',
};

const toneDot: Record<Tone, string> = {
  default: 'bg-text-muted',
  primary: 'bg-primary',
  success: 'bg-success',
};

const isParallel = (step: FlowStep): step is { parallel: FlowNode[] } => 'parallel' in step;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

function Node({ node }: { node: FlowNode }) {
  const tone = node.tone ?? 'default';
  return (
    <div className={`relative h-full rounded-xl border bg-surface-2/80 px-3.5 py-3 ${toneClass[tone]}`}>
      <div className="flex items-start gap-2">
        <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${toneDot[tone]}`} aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-sm font-medium leading-snug text-text-primary">{node.label}</p>
          {node.detail && <p className="mt-1 font-mono text-[11px] leading-snug text-text-muted">{node.detail}</p>}
        </div>
      </div>
    </div>
  );
}

function Connector({ dashed }: { dashed?: boolean }) {
  return (
    <li aria-hidden="true" className="flex shrink-0 items-center justify-center py-1 lg:px-1 lg:py-0">
      <span className="relative flex flex-col items-center lg:flex-row">
        <span
          className={`block h-5 w-px lg:h-px lg:w-5 ${dashed ? 'border-l border-dashed border-success/60 lg:border-l-0 lg:border-t' : 'bg-border-strong'}`}
        />
        <span
          className={`block h-0 w-0 border-x-[4px] border-t-[5px] border-x-transparent lg:border-y-[4px] lg:border-l-[5px] lg:border-r-0 lg:border-y-transparent ${
            dashed ? 'border-t-success/60 lg:border-l-success/60' : 'border-t-border-strong lg:border-l-border-strong'
          }`}
        />
        {dashed && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-wider text-success/80 lg:left-1/2 lg:top-auto lg:-bottom-5 lg:-translate-x-1/2 lg:translate-y-0">
            async
          </span>
        )}
      </span>
    </li>
  );
}

interface FlowDiagramProps {
  steps: FlowStep[];
  label: string;
}

/** Architecture diagram: vertical on small screens, horizontal from lg. Rendered as an ordered list for screen readers. */
export default function FlowDiagram({ steps, label }: FlowDiagramProps) {
  return (
    <motion.ol
      aria-label={label}
      className="flex flex-col lg:flex-row lg:items-stretch"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
    >
      {steps.map((step, i) => {
        const firstNode = isParallel(step) ? step.parallel[0] : step;
        return (
          <FlowItem key={i} index={i} step={step} dashedBefore={i > 0 && Boolean(firstNode?.async)} />
        );
      })}
    </motion.ol>
  );
}

function FlowItem({ step, index, dashedBefore }: { step: FlowStep; index: number; dashedBefore: boolean }) {
  return (
    <>
      {index > 0 && <Connector dashed={dashedBefore} />}
      <motion.li variants={item} className="min-w-0 lg:flex-1">
        {isParallel(step) ? (
          <div className="flex h-full flex-col gap-2 sm:flex-row lg:flex-col">
            {step.parallel.map((node) => (
              <div key={node.label} className="flex-1">
                <Node node={node} />
              </div>
            ))}
          </div>
        ) : (
          <Node node={step} />
        )}
      </motion.li>
    </>
  );
}

/** Compact vertical variant used inside project cards. */
export function FlowList({ steps, label }: FlowDiagramProps) {
  return (
    <motion.ol
      aria-label={label}
      className="relative space-y-2"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
    >
      <span aria-hidden="true" className="absolute bottom-4 left-[15px] top-4 w-px bg-border-strong" />
      {steps.map((step, i) => {
        const nodes = isParallel(step) ? step.parallel : [step];
        const tone = nodes[0].tone ?? 'default';
        return (
          <motion.li key={i} variants={item} className="relative flex items-start gap-3">
            <span
              className={`relative z-10 mt-1.5 flex h-[22px] w-[31px] shrink-0 items-center justify-center rounded-md border bg-background font-mono text-[10px] text-text-muted ${toneClass[tone]}`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex min-w-0 flex-1 flex-wrap gap-2">
              {nodes.map((node) => (
                <div
                  key={node.label}
                  className={`min-w-0 flex-1 rounded-lg border bg-surface-2/70 px-3 py-2 ${node.async ? 'border-dashed border-success/50' : toneClass[node.tone ?? 'default']}`}
                >
                  <p className="text-[13px] font-medium leading-tight text-text-primary">{node.label}</p>
                  {node.detail && <p className="mt-0.5 font-mono text-[10.5px] leading-tight text-text-muted">{node.detail}</p>}
                </div>
              ))}
            </div>
          </motion.li>
        );
      })}
    </motion.ol>
  );
}
