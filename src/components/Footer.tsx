import { links, site } from '../lib/site';
import { Link } from '../lib/router';

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container-page flex flex-col items-center justify-between gap-5 md:flex-row">
        <div className="text-center md:text-left">
          <Link to="/#top" className="font-mono text-sm font-semibold tracking-[0.2em] text-text-primary">
            MENIL PATEL
          </Link>
          <p className="mt-1 text-sm text-text-muted">Software engineer · algorithms · systems · AI infrastructure</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-text-secondary">
            <li>
              <a href={links.github} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary">
                GitHub
              </a>
            </li>
            <li>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={links.email} className="hover:text-text-primary">
                Email
              </a>
            </li>
            <li>
              <a href={site.resumePath} download={site.resumeFileName} className="hover:text-text-primary">
                Resume
              </a>
            </li>
          </ul>
        </nav>
        <p className="font-mono text-xs text-text-muted">© {new Date().getFullYear()} Menil Patel</p>
      </div>
    </footer>
  );
}
