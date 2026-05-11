'use client';

import dynamic from 'next/dynamic';

const DeferredProjectStorySection = dynamic(
  () => import('./ProjectStorySection').then((module) => module.ProjectStorySection),
  { ssr: false, loading: () => null }
);

export function ProjectStorySectionLazy() {
  return <DeferredProjectStorySection sectionId={null} />;
}
