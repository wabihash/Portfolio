'use client';

import { CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import type { FeedbackStat } from '@/shared/data/testimonials';

type StatsCardProps = {
  stat: FeedbackStat;
};

export function StatsCard({ stat }: StatsCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="rounded-2xl border border-white/10 bg-black/20 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 shadow-[0_0_0_1px_rgba(16,185,129,0.08)]">
          <CheckCircle2 className="size-5" aria-hidden="true" />
        </div>

        <div>
          <p className="text-sm font-semibold text-white">{stat.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-white/60">{stat.detail}</p>
        </div>
      </div>
    </motion.article>
  );
}