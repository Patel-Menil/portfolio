import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from '../../lib/router';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors duration-200 disabled:opacity-50 whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary: 'bg-primary px-5 py-3 text-background hover:bg-primary-strong',
  secondary: 'border border-border-strong bg-surface/60 px-5 py-3 text-text-primary hover:border-primary/60 hover:text-white',
  ghost: 'px-2 py-2 text-text-secondary hover:text-text-primary',
};

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  children: ReactNode;
  /** Internal routes use the client router; everything else is a normal anchor. */
  internal?: boolean;
}

export default function ButtonLink({ href, variant = 'primary', internal, className = '', children, ...rest }: ButtonLinkProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (internal) {
    return (
      <Link to={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
      {children}
    </a>
  );
}
