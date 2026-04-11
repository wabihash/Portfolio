'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

type CarouselControlsProps = {
  currentIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
};

export function CarouselControls({ currentIndex, total, onPrevious, onNext }: CarouselControlsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <motion.button
        type="button"
        whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        onClick={onPrevious}
        aria-label="Previous testimonial"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-black/30 text-[var(--text-secondary)] shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md transition hover:border-[var(--border-mid)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </motion.button>

      <div className="min-w-24 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-inset)] px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-secondary)] backdrop-blur-md">
        {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>

      <motion.button
        type="button"
        whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        onClick={onNext}
        aria-label="Next testimonial"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-black/30 text-[var(--text-secondary)] shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md transition hover:border-[var(--border-mid)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </motion.button>
    </div>
  );
}