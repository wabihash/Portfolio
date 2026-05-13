'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const DigitalTwin = dynamic(
  () => import('@/features/assistant/DigitalTwin').then((module) => module.DigitalTwin),
  {
    ssr: false,
    loading: () => null,
  }
);

type NavigatorConnection = {
  saveData?: boolean;
  effectiveType?: string;
};

function shouldAutoLoadAssistant(): boolean {
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
  // Keep slower networks from paying the JS cost automatically.
  if (effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g') {
    return false;
  }

  // Mobile Lighthouse runs on a constrained device profile; don't auto-load there.
  if (window.innerWidth < 768) {
    return false;
  }

  return true;
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
    const handle = anyWindow.requestIdleCallback(callback, { timeout: 2500 });
    return () => anyWindow.cancelIdleCallback?.(handle);
  }

  const timeout = window.setTimeout(callback, 1200);
  return () => window.clearTimeout(timeout);
}

export function DigitalTwinDeferred() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Default: do not load heavy assistant JS on mobile/slow networks.
    if (!shouldAutoLoadAssistant()) {
      // Still allow loading after explicit user interaction (click/scroll/tap) on any device.
      const loadOnInteraction = () => setShouldLoad(true);
      window.addEventListener('pointerdown', loadOnInteraction, { once: true, passive: true });
      window.addEventListener('keydown', loadOnInteraction, { once: true });
      window.addEventListener('scroll', loadOnInteraction, { once: true, passive: true });
      return () => {
        window.removeEventListener('pointerdown', loadOnInteraction);
        window.removeEventListener('keydown', loadOnInteraction);
        window.removeEventListener('scroll', loadOnInteraction);
      };
    }

    const cancel = scheduleIdle(() => setShouldLoad(true));
    return () => cancel();
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return <DigitalTwin />;
}
