'use client';

import { Quote, Star } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import type { Testimonial } from '@/shared/data/testimonials';
import { cn } from '@/lib/utils';

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className={cn('relative h-full overflow-hidden rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:p-8')}
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-amber-500/10 opacity-70" />

      <div className="relative flex h-full flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-inset)] text-yellow-400 shadow-[0_12px_30px_rgba(0,0,0,0.28)]">
            <Quote className="size-5" aria-hidden="true" />
          </div>

          <div className="flex items-center gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
            {Array.from({ length: testimonial.rating }).map((_, index) => (
              <Star
                key={`${testimonial.id}-star-${index}`}
                className="size-4 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.35)]"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        <p className="text-lg leading-relaxed text-[var(--text-primary)] md:text-xl">“{testimonial.quote}”</p>

        <div className="mt-auto flex items-center gap-4 border-t border-[var(--border-subtle)] pt-5">
          <div
            className={cn(
              'flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border-subtle)] text-sm font-bold text-[var(--text-primary)] shadow-lg',
              testimonial.accentClass
            )}
          >
            {testimonial.initials}
          </div>

          <div className="min-w-0">
            <p className="text-base font-semibold text-[var(--text-primary)]">{testimonial.name}</p>
            <p className="text-sm text-[var(--text-secondary)]">{testimonial.role}</p>
            <p className="text-xs uppercase tracking-[0.22em] text-yellow-600 dark:text-yellow-300/80">{testimonial.company}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}