import { useLayoutEffect } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';
import { scrollToHash, usePathname } from './lib/navigation';

function resolveRoute(pathname: string) {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/') return <Home />;
  const match = clean.match(/^\/projects\/([a-z0-9-]+)$/);
  if (match) return <ProjectDetail slug={match[1]} />;
  return <NotFound />;
}

export default function App() {
  const pathname = usePathname();

  // On every route change: jump to the requested section, or to the top of the new page.
  useLayoutEffect(() => {
    const { hash } = window.location;
    if (hash) {
      // Wait a frame so the new page's sections exist.
      const id = requestAnimationFrame(() => {
        if (!scrollToHash(hash, false)) window.scrollTo({ top: 0, behavior: 'instant' });
      });
      return () => cancelAnimationFrame(id);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-background text-text-primary">
        <div className="bg-noise" aria-hidden="true" />
        <Navbar />
        {/* Keyed by route so each page fades in; no exit phase, so hash targets exist immediately. */}
        <motion.main id="main" key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {resolveRoute(pathname)}
        </motion.main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
