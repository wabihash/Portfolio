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
      <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl" style={{ color: 'var(--text-primary)' }}>
        My Projects
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed md:text-base" style={{ color: 'var(--text-secondary)' }}>
        A selection of projects that reflect my experience building modern web applications with
        strong UI design, responsive layouts, and practical fullstack architecture.
      </p>
    </motion.header>
  );
}
