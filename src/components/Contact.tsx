import { ArrowUpRight, Download, Mail } from 'lucide-react';
import type { ReactNode } from 'react';
import { links, site } from '../lib/site';
import ButtonLink from './ui/Button';
import { GitHubIcon, LinkedInIcon } from './ui/Icons';
import Reveal from './ui/Reveal';

function ContactCard({ href, icon, label, value }: { href: string; icon: ReactNode; label: string; value: string }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="card group flex items-center gap-4 p-5 transition-colors hover:border-primary/50"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border-strong bg-surface-2 text-text-secondary transition-colors group-hover:text-primary">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[11px] uppercase tracking-wider text-text-muted">{label}</span>
        <span className="block truncate text-[15px] font-medium text-text-primary">{value}</span>
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-text-muted transition-colors group-hover:text-primary" aria-hidden="true" />
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-border py-24 md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-primary/[0.08] blur-[120px]" />
      <div className="container-page relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-5">
            <span className="text-text-muted">07</span>
            <span className="mx-2 text-text-muted">/</span>Contact
          </p>
          <h2 id="contact-title" className="text-4xl font-semibold tracking-tight text-text-primary md:text-6xl">
            Let’s Build Something Interesting.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            I’m interested in challenging engineering problems, ambitious products, and opportunities to build systems that make a
            meaningful technical impact.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={links.email}>
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email me
            </ButtonLink>
            <ButtonLink href={site.resumePath} variant="secondary" download={site.resumeFileName}>
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-[1.4fr_1fr_1fr]">
          <ContactCard href={links.email} icon={<Mail className="h-5 w-5" aria-hidden="true" />} label="Email" value={site.email} />
          <ContactCard href={links.github} icon={<GitHubIcon className="h-5 w-5" />} label="GitHub" value="Patel-Menil" />
          <ContactCard href={links.linkedin} icon={<LinkedInIcon className="h-5 w-5" />} label="LinkedIn" value="menil-patel1710" />
        </Reveal>

        <p className="mt-10 text-center font-mono text-xs text-text-muted">Based in {site.location} · Open to SDE internships and collaborations</p>
      </div>
    </section>
  );
}
