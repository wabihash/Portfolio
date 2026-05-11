'use client';

import dynamic from 'next/dynamic';

const DeferredTestimonialsSection = dynamic(
  () => import('./TestimonialsSection').then((module) => module.TestimonialsSection),
  { ssr: false, loading: () => null }
);

export function TestimonialsSectionLazy() {
  return <DeferredTestimonialsSection sectionId={null} />;
}
