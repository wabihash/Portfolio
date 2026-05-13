'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import AmbientIntelligenceDeferred from '@/components/layout/AmbientIntelligenceDeferred';

type NavigatorConnection = {
  saveData?: boolean;
  effectiveType?: string;
};

const SceneTransition = dynamic(() => import('@/components/layout/SceneTransition'), {
  ssr: false,
  loading: () => null,
});

function shouldEnableTransitions(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) {
    return false;
  }

  const connection = (navigator as unknown as { connection?: NavigatorConnection }).connection;
  if (connection?.saveData) {
    return false;
  }

  const effectiveType = connection?.effectiveType;
  if (effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g') {
    return false;
  }

  // Mobile devices get the biggest perf win by skipping transition JS.
  if (window.innerWidth < 768) {
    return false;
  }

  return true;
}

export default function SceneWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [transitionsEnabled, setTransitionsEnabled] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setTransitionsEnabled(shouldEnableTransitions()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative isolate w-full min-h-screen">
      <AmbientIntelligenceDeferred />
      {transitionsEnabled ? (
        <SceneTransition pathname={pathname}>{children}</SceneTransition>
      ) : (
        <div className="relative z-10 w-full min-h-screen">{children}</div>
      )}
    </div>
  );
}
