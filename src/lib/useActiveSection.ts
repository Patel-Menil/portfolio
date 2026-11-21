import { useEffect, useState } from 'react';

/**
 * Returns the id of the section that contains the line 40% down the viewport.
 * A rAF-throttled scroll check is used instead of IntersectionObserver: it is deterministic for
 * very tall sections and for instant jumps (anchor links, keyboard paging).
 */
export function useActiveSection(ids: string[], enabled = true) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join('|');

  useEffect(() => {
    if (!enabled) return;
    const sectionIds = key.split('|');
    let frame = 0;

    const update = () => {
      frame = 0;
      const probe = window.innerHeight * 0.4;
      let current: string | null = null;
      // At the very bottom the last (short) section can never reach the probe line.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && document.getElementById(sectionIds[sectionIds.length - 1])) {
        setActive(sectionIds[sectionIds.length - 1]);
        return;
      }
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= probe && bottom > probe) {
          current = id;
          break;
        }
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [key, enabled]);

  return enabled ? active : null;
}
