'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

type LazyMountProps = {
  id?: string;
  children: ReactNode;
  rootMargin?: string;
  minHeightPx?: number;
  className?: string;
};

export function LazyMount({
  id,
  children,
  rootMargin = '450px 0px',
  minHeightPx,
  className,
}: LazyMountProps) {
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
    <div
      ref={containerRef}
      id={id}
      className={className}
      style={minHeightPx ? { minHeight: `${minHeightPx}px` } : undefined}
    >
      {mounted ? children : null}
    </div>
  );
}
