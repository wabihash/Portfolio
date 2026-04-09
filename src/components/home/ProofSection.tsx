'use client';

import { BriefcaseBusiness, Layers3, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { PROOF_BADGES, PROOF_PILLARS } from '@/shared/data/homeSections';

const PILLAR_ICONS = {
  products: Layers3,
  stack: BriefcaseBusiness,
  ai: Sparkles,
} as const;

const ACCENT_STYLES = {
  cyan: 'border-cyan-300/20 bg-cyan-400/10 text-cyan-100 shadow-[0_14px_40px_rgba(34,211,238,0.12)]',
  orange: 'border-orange-300/20 bg-orange-400/10 text-orange-50 shadow-[0_14px_40px_rgba(251,146,60,0.12)]',
  emerald: 'border-emerald-300/20 bg-emerald-400/10 text-emerald-50 shadow-[0_14px_40px_rgba(52,211,153,0.12)]',
} as const;

export function ProofSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="proof" aria-labelledby="proof-heading" className="mx-auto w-full max-w-6xl px-4 pt-8 md:px-8 md:pt-10">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:p-8"
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_1.4fr] lg:items-start">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/70">Why Work With Me</p>
            <h2 id="proof-heading" className="mt-4 text-2xl font-bold text-white md:text-3xl">
              A portfolio is better when it quickly shows what I build and where I can help.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[#c8d8f7] md:text-base">
              I focus on product-minded frontend work with enough backend depth to ship useful features, not just surface-level visuals.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {PROOF_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/12 bg-black/20 px-4 py-2 text-sm text-[#d8e5ff] shadow-[0_8px_24px_rgba(3,8,22,0.22)]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {PROOF_PILLARS.map((pillar, index) => {
              const Icon = PILLAR_ICONS[pillar.id];

              return (
                <motion.article
                  key={pillar.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : index * 0.08, ease: 'easeOut' }}
                  className={`rounded-2xl border p-5 backdrop-blur-lg ${ACCENT_STYLES[pillar.accent]}`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-black/15">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-inherit/80">{pillar.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
