'use client';

import dynamic from 'next/dynamic';

const DeferredServicesSection = dynamic(
  () => import('./ServicesSection').then((module) => module.ServicesSection),
  { ssr: false, loading: () => null }
);

export function ServicesSectionLazy() {
  return <DeferredServicesSection />;
}
