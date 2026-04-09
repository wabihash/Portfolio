'use client';

import { motion, useReducedMotion } from 'framer-motion';

export function ProjectsHeader() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.header
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.42, ease: 'easeOut' }}
      className="mb-6 md:mb-8"
    >
      <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">My Projects</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#c6d5f4] md:text-base">
        A selection of projects that reflect my experience building modern web applications with
        strong UI design, responsive layouts, and practical fullstack architecture.
      </p>
    </motion.header>
  );
}
