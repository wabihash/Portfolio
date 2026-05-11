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
    const cancel = scheduleIdle(() => setShouldLoad(true));
    return () => cancel();
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return <DigitalTwin />;
}
