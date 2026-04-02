'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const ROLES = [
  'Fullstack Developer',
  'Computer Science Student',
  'AI/ML Enthusiast',
] as const;

const ROLE_COLORS: Record<(typeof ROLES)[number], string> = {
  'Fullstack Developer': 'text-[#60a5fa]',
  'Computer Science Student': 'text-[#34d399]',
  'AI/ML Enthusiast': 'text-[#c084fc]',
};

const ROLE_SWITCH_MS = 2200;

export function AboutSection() {
  const shouldReduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const timer = setInterval(() => {
      setRoleIndex((current) => (current + 1) % ROLES.length);
    }, ROLE_SWITCH_MS);

    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto w-full max-w-6xl px-4 pt-8 md:px-8 md:pt-12">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md md:p-8"
      >
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[280px_1fr] md:gap-10">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.08, duration: 0.4 }}
            className="mx-auto"
          >
            <div className="relative h-52 w-52 overflow-hidden rounded-full border-4 border-white/15 bg-[#122047] shadow-[0_16px_40px_rgba(0,0,0,0.45)] md:h-64 md:w-64">
              <Image
                src="/linkidln.jpg"
                alt="Portrait of Wabi, fullstack developer"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 208px, 256px"
                priority={false}
              />
            </div>
          </motion.div>

          <div className="text-center md:text-left">
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.12, duration: 0.35 }}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#9db3e3]"
            >
              About Me
            </motion.p>

            <motion.h2
              id="about-heading"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.16, duration: 0.35 }}
              className="text-3xl font-bold text-white md:text-4xl"
            >
              Wabi
            </motion.h2>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.2, duration: 0.35 }}
              className="mt-1 text-lg font-medium text-[#8cb0ff] md:text-xl"
            >
              <span className="text-white/70">Role:</span>{' '}
              <span
                aria-live="polite"
                aria-atomic="true"
                className="relative inline-flex min-h-7 min-w-56 items-center align-middle"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={ROLES[roleIndex]}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 10 }}
                    animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className={`absolute left-0 ${ROLE_COLORS[ROLES[roleIndex]]}`}
                  >
                    {ROLES[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.p>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.24, duration: 0.4 }}
              className="mt-4 max-w-2xl text-base leading-relaxed text-[#ccdaf7]"
            >
              I build modern fullstack products, from AI-powered web apps and social platforms to responsive
              dashboards and productivity tools. My approach blends thoughtful frontend design with reliable
              backend engineering to deliver fast, scalable, and intuitive experiences that feel polished on
              every device.
            </motion.p>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.3, duration: 0.35 }}
              className="mt-4 text-sm font-medium text-[#9db3e3]"
            >
              Creating AI-ready digital experiences that are beautiful, practical, and built to scale.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
