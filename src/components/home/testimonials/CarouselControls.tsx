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
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md transition hover:border-white/20 hover:bg-white/10 hover:text-white"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </motion.button>

      <div className="min-w-24 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.24em] text-white/60 backdrop-blur-md">
        {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>

      <motion.button
        type="button"
        whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        onClick={onNext}
        aria-label="Next testimonial"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md transition hover:border-white/20 hover:bg-white/10 hover:text-white"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </motion.button>
    </div>
  );
}