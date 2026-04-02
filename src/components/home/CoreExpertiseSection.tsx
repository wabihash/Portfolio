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
        className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg md:p-8"
      >
        <h2 id="expertise-heading" className="text-2xl font-bold text-white md:text-3xl">
          Core <span className="text-[#fbbf24]">Expertise</span>
        </h2>

        <div className="mt-5 flex flex-wrap gap-3">
          {CORE_EXPERTISE_BADGES.map((badge) => (
            <motion.span
              key={badge}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
              className="rounded-full border border-white/15 bg-black/20 px-4 py-2 text-sm text-[#d4e0ff] shadow-[0_0_0_rgba(251,191,36,0)] transition hover:border-[#fbbf24]/40 hover:shadow-[0_8px_30px_rgba(251,191,36,0.2)]"
            >
              {badge}
            </motion.span>
          ))}
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_EXPERTISE_STATS.map((item) => (
            <motion.article
              key={item.label}
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              className="rounded-xl border border-white/10 bg-black/20 p-5 shadow-[0_10px_35px_rgba(0,0,0,0.28)] backdrop-blur-lg"
            >
              <p className="text-3xl font-bold text-[#fbbf24]">{item.value}</p>
              <p className="mt-1 text-sm text-[#c8d8f7]">{item.label}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
