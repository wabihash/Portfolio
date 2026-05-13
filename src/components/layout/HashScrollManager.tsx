'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { queueSectionScroll } from '@/lib/sectionScroll';

export function HashScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const scrollFromHash = () => {
      const hashSection = window.location.hash.split('#').filter(Boolean).pop() || '';
      if (!hashSection) {
        return;
      }

      queueSectionScroll(hashSection, 'auto');
    };

    scrollFromHash();
    window.addEventListener('hashchange', scrollFromHash);
    window.addEventListener('pageshow', scrollFromHash);

    return () => {
      window.removeEventListener('hashchange', scrollFromHash);
      window.removeEventListener('pageshow', scrollFromHash);
    };
  }, [pathname]);

  return null;
}
