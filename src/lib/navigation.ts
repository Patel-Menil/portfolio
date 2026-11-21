import { useSyncExternalStore } from 'react';

// A deliberately tiny History-API router. The site has two kinds of page (home and project
// detail), so a routing dependency would add weight without adding capability.

const NAV_EVENT = 'app:navigate';

function subscribe(callback: () => void) {
  window.addEventListener('popstate', callback);
  window.addEventListener(NAV_EVENT, callback);
  return () => {
    window.removeEventListener('popstate', callback);
    window.removeEventListener(NAV_EVENT, callback);
  };
}

const getPathname = () => window.location.pathname;

export function usePathname() {
  return useSyncExternalStore(subscribe, getPathname, () => '/');
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function scrollToHash(hash: string, smooth = true) {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  // 'instant' (not 'auto'): 'auto' defers to the CSS scroll-behavior, which is smooth on <html>.
  el.scrollIntoView({ behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'instant', block: 'start' });
  return true;
}

export function navigate(to: string) {
  const url = new URL(to, window.location.origin);
  const samePath = url.pathname === window.location.pathname;

  if (samePath && url.hash) {
    window.history.pushState({}, '', url.pathname + url.hash);
    scrollToHash(url.hash);
    return;
  }

  window.history.pushState({}, '', url.pathname + url.hash);
  window.dispatchEvent(new Event(NAV_EVENT));
}
