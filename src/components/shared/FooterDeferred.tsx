'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const Footer = dynamic(() => import('./Footer').then((module) => module.Footer), {
  ssr: false,
  loading: () => null,
});

type FooterDeferredProps = {
  minHeightPx?: number;
  rootMargin?: string;
};

export function FooterDeferred({
  minHeightPx = 520,
  rootMargin = '600px 0px',
}: FooterDeferredProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) {
      return;
    }

    const node = containerRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) {
          return;
        }

        setMounted(true);
        observer.disconnect();
      },
      {
        rootMargin,
        threshold: 0.01,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [mounted, rootMargin]);

  return (
    <div ref={containerRef} style={{ minHeight: `${minHeightPx}px` }}>
      {mounted ? <Footer /> : null}
    </div>
  );
}
