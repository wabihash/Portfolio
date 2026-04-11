'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { CORE_EXPERTISE_BADGES, CORE_EXPERTISE_STATS } from '@/shared/data/homeSections';

export function CoreExpertiseSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="expertise" aria-labelledby="expertise-heading" className="mx-auto w-full max-w-6xl px-4 pt-8 md:px-8 md:pt-10">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="section-card p-4 sm:p-5 md:p-8"
      >
        <h2 id="expertise-heading" className="text-2xl font-bold sm:text-[1.75rem] md:text-3xl" style={{ color: 'var(--text-primary)' }}>
          Core <span className="text-amber-500 dark:text-amber-400">Expertise</span>
        </h2>

        {/* Skill badges */}
        <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
          {CORE_EXPERTISE_BADGES.map((badge) => (
            <motion.span
              key={badge}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
              className="rounded-full border px-3 py-1.5 text-xs transition hover:border-[#fbbf24]/40 hover:shadow-[0_8px_30px_rgba(251,191,36,0.2)] sm:px-4 sm:py-2 sm:text-sm"
              style={{ borderColor: 'var(--border-mid)', backgroundColor: 'var(--surface-inset)', color: 'var(--text-secondary)' }}
            >
              {badge}
            </motion.span>
          ))}
        </div>

        {/* Stat cards */}
        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          {CORE_EXPERTISE_STATS.map((item) => (
            <motion.article
              key={item.label}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              className="inset-card p-4 sm:p-5"
            >
              <p className="text-2xl font-bold text-amber-500 dark:text-amber-400 sm:text-3xl">{item.value}</p>
              <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>{item.label}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
