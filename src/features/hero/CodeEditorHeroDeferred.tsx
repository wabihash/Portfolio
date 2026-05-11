'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const CodeEditorHero = dynamic(() => import('./CodeEditorHero').then((module) => module.CodeEditorHero), {
  ssr: false,
  loading: () => null,
});

type IdleCallbackWindow = {
  requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

function scheduleIdle(callback: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const anyWindow = window as unknown as IdleCallbackWindow;

  if (typeof anyWindow.requestIdleCallback === 'function') {
    const handle = anyWindow.requestIdleCallback(callback, { timeout: 2000 });
    return () => anyWindow.cancelIdleCallback?.(handle);
  }

  const timeout = window.setTimeout(callback, 900);
  return () => window.clearTimeout(timeout);
}

export function CodeEditorHeroDeferred() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const cancel = scheduleIdle(() => setShouldLoad(true));
    return () => cancel();
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return <CodeEditorHero />;
}
