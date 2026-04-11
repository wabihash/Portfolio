'use client';

import { BriefcaseBusiness, Layers3, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { PROOF_BADGES, PROOF_PILLARS } from '@/shared/data/homeSections';

const PILLAR_ICONS = {
  products: Layers3,
  stack: BriefcaseBusiness,
  ai: Sparkles,
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
        className="section-card overflow-hidden p-5 md:p-8"
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_1.4fr] lg:items-start">
          {/* Left: copy */}
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: 'var(--text-label)' }}>
              Why Work With Me
            </p>
            <h2 id="proof-heading" className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: 'var(--text-primary)' }}>
              A portfolio is better when it quickly shows what I build and where I can help.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 md:text-base" style={{ color: 'var(--text-secondary)' }}>
              I focus on product-minded frontend work with enough backend depth to ship useful features, not just surface-level visuals.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {PROOF_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border px-4 py-2 text-sm"
                  style={{ borderColor: 'var(--border-mid)', backgroundColor: 'var(--surface-inset)', color: 'var(--text-secondary)' }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right: pillar cards */}
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
                  className="inset-card p-5"
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                    style={{ borderColor: 'var(--border-mid)', backgroundColor: 'var(--surface-inset)' }}
                  >
                    <Icon className="h-5 w-5" style={{ color: 'var(--text-secondary)' }} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-6" style={{ color: 'var(--text-secondary)' }}>{pillar.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
