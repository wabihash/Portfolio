'use client';

import dynamic from 'next/dynamic';

const DeferredPullMessageComposer = dynamic(
  () => import('./PullMessageComposer').then((module) => module.PullMessageComposer),
  { ssr: false, loading: () => null }
);

export function PullMessageComposerLazy() {
  return <DeferredPullMessageComposer />;
}
