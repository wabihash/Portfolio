'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { popPendingSectionScroll, queueSectionScroll } from '@/lib/sectionScroll';

const HASH_REAPPLY_DELAYS_MS = [0, 180, 520, 980, 1600] as const;

export function HashScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const timeoutIds: number[] = [];

    const applySectionWithReplays = (sectionId: string, behavior: ScrollBehavior) => {
      HASH_REAPPLY_DELAYS_MS.forEach((delay) => {
        const timeoutId = window.setTimeout(() => {
          queueSectionScroll(sectionId, behavior);
        }, delay);
        timeoutIds.push(timeoutId);
      });
    };

    const applyPendingOrHash = () => {
      const pendingSection = popPendingSectionScroll();
      if (pendingSection) {
        applySectionWithReplays(pendingSection, 'auto');
        return;
      }

      const hashSection = window.location.hash.split('#').filter(Boolean).pop() || '';
      if (hashSection) {
        applySectionWithReplays(hashSection, 'auto');
      }
    };

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    applyPendingOrHash();

    window.addEventListener('load', applyPendingOrHash);
    window.addEventListener('pageshow', applyPendingOrHash);

    return () => {
      window.removeEventListener('load', applyPendingOrHash);
      window.removeEventListener('pageshow', applyPendingOrHash);
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, [pathname]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const onHashChange = () => {
      const hashSection = window.location.hash.split('#').filter(Boolean).pop() || '';
      if (!hashSection) {
        return;
      }

      queueSectionScroll(hashSection);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return null;
}
