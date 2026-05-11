'use client';

import dynamic from 'next/dynamic';

const DeferredProjectGrid = dynamic(
  () => import('./ProjectGrid').then((module) => module.ProjectGrid),
  { ssr: false, loading: () => null }
);

export function ProjectGridLazy() {
  return <DeferredProjectGrid />;
}
