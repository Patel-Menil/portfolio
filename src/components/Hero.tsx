import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import ButtonLink from './ui/Button';
import { GitHubIcon, LinkedInIcon } from './ui/Icons';
import { links, site } from '../lib/site';

const trajectory = ['Competitive Programming', 'Systems Engineering', 'AI Infrastructure', 'Product Development'];

const signals = [
  { value: '2035', label: 'CodeChef peak · 5★' },
  { value: '1626', label: 'Codeforces peak · Expert' },
  { value: 'Top 10', label: 'Smart India Hackathon 2025' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Background: static grid + two soft light sources. No infinite loops. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
        <div className="absolute -top-40 left-[10%] h-[32rem] w-[32rem] rounded-full bg-primary/10 blur-[130px]" />
        <div className="absolute top-40 right-[5%] h-[26rem] w-[26rem] rounded-full bg-success/[0.07] blur-[130px]" />
      </div>

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-surface/70 px-3 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary">Software Engineer</span>
          </motion.div>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05, ease }}
          >
            <span className="mb-4 block font-mono text-sm font-medium uppercase tracking-[0.3em] text-text-secondary">
              Menil Patel
            </span>
            <span className="block text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-text-primary sm:text-6xl lg:text-[4.25rem]">
              I build systems that <span className="text-gradient">think, move, and scale.</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl"
          >
            Software engineer interested in algorithms, systems engineering, blockchain, and AI infrastructure. I build practical
            products and enjoy working on challenging engineering problems across different domains.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[13px] text-text-muted"
          >
            <span className="text-primary" aria-hidden="true">
              $
            </span>
            {trajectory.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className={i === trajectory.length - 1 ? 'text-text-primary' : ''}>{step}</span>
                {i < trajectory.length - 1 && <span aria-hidden="true">→</span>}
              </span>
            ))}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="/#projects" internal>
              View Projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={site.resumePath} variant="secondary" download={site.resumeFileName}>
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </ButtonLink>
            <div className="ml-1 flex items-center gap-1">
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="rounded-lg p-2.5 text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
              >
                <GitHubIcon className="h-5 w-5" />
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="rounded-lg p-2.5 text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="card overflow-hidden p-2">
            <div className="group relative aspect-square overflow-hidden rounded-xl">
              <img
                src={site.portrait}
                alt="Portrait of Menil Patel"
                width={400}
                height={400}
                fetchPriority="high"
                className="h-full w-full object-cover saturate-[0.8] transition duration-700 ease-out group-hover:scale-[1.03] group-hover:saturate-100"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-sm font-medium text-white">Menil Patel</p>
                <p className="font-mono text-[11px] text-white/70">B.Tech IT · IIIT Bhopal · {site.location}</p>
              </figcaption>
            </div>
            <dl className="grid grid-cols-3 divide-x divide-border">
              {signals.map((s) => (
                <div key={s.label} className="flex flex-col-reverse px-2 py-3.5 text-center">
                  <dt className="mt-0.5 font-mono text-[10px] leading-tight text-text-muted">{s.label}</dt>
                  <dd className="text-lg font-semibold tracking-tight text-text-primary">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
