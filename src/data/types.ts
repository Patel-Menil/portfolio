export type Tone = 'default' | 'primary' | 'success';

export interface FlowNode {
  label: string;
  detail?: string;
  tone?: Tone;
  /** Render the connector leading into this node as dashed (asynchronous / off the critical path). */
  async?: boolean;
}

/** A single node, or several nodes that run in parallel at the same stage. */
export type FlowStep = FlowNode | { parallel: FlowNode[] };

export type MetricKind = 'reported' | 'target' | 'fact';

export interface Metric {
  value: string;
  label: string;
  kind?: MetricKind;
  note?: string;
}

export type LinkKind = 'github' | 'live' | 'play' | 'docs';

export interface ProjectLink {
  label: string;
  href: string;
  kind: LinkKind;
  note?: string;
}

export interface TextBlock {
  title: string;
  body: string;
}

export type Panel =
  | { type: 'primitives'; title: string; items: { name: string; role: string; detail: string }[] }
  | { type: 'domains'; title: string; items: string[]; result: string; note?: string }
  | {
      type: 'comparison';
      title: string;
      columns: { name: string; points: string[] }[];
      conclusion?: string;
    }
  | { type: 'code'; title: string; code: string; caption?: string };

export interface Media {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** Portrait media (e.g. mobile game screenshots) are laid out narrower. */
  portrait?: boolean;
}

export type ProjectTier = 'featured' | 'other' | 'academic';

export type ProjectVisual =
  | 'sealapi'
  | 'voice-rag'
  | 'lead-intelligence'
  | 'defi-nexus'
  | 'gslv'
  | 'none';

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  tier: ProjectTier;
  status: string;
  context?: string;
  team?: string;
  stack: string[];
  highlights: string[];
  links: ProjectLink[];
  visual: ProjectVisual;
  problem: string;
  architecture: { steps: FlowStep[]; caption: string };
  implementation: TextBlock[];
  decisions: TextBlock[];
  results: Metric[];
  resultsNote?: string;
  panels?: Panel[];
  limitations?: string[];
  media?: Media[];
}

export interface ExperienceMetric {
  value: string;
  label: string;
}

export interface Experience {
  id: string;
  organization: string;
  url?: string;
  role: string;
  period: string;
  location?: string;
  type: string;
  summary: string;
  points: string[];
  metrics?: ExperienceMetric[];
  focus?: { title: string; items: string[]; note?: string };
  related?: { label: string; to: string };
}
