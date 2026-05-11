'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const AmbientIntelligence = dynamic(() => import('@/components/layout/AmbientIntelligence'), {
  ssr: false,
  loading: () => null,
});

type NavigatorConnection = {
  saveData?: boolean;
  effectiveType?: string;
};

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
}

function scheduleIdle(callback: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const anyWindow = window as unknown as {
    requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };

  if (typeof anyWindow.requestIdleCallback === 'function') {
    const handle = anyWindow.requestIdleCallback(callback, { timeout: 2000 });
    return () => anyWindow.cancelIdleCallback?.(handle);
  }

  const timeout = window.setTimeout(callback, 800);
  return () => window.clearTimeout(timeout);
}

function shouldRenderAmbient(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  if (prefersReducedMotion()) {
    return false;
  }

  const connection = (navigator as unknown as { connection?: NavigatorConnection }).connection;
  if (connection?.saveData) {
    return false;
  }

  // Keep low-end mobile from paying the cost.
  if (window.innerWidth < 768) {
    return false;
  }

  return true;
}

export default function AmbientIntelligenceDeferred() {
  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Avoid synchronous state updates inside effects (lint rule).
    const frame = window.requestAnimationFrame(() => {
      setEnabled(shouldRenderAmbient());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const cancel = scheduleIdle(() => setReady(true));
    return () => cancel();
  }, [enabled]);

  if (!enabled || !ready) {
    return null;
  }

  return <AmbientIntelligence />;
}
