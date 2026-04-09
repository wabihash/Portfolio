'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { HERO_OPEN_TO_ROLES } from '@/shared/data/homeSections';

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-start">
      <div className="mx-auto w-full max-w-6xl px-4 pb-7 pt-9 md:px-8 md:pb-10 md:pt-14 lg:pt-18">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="pointer-events-auto p-2"
        >
          <div className="max-w-2xl rounded-2xl p-4 md:p-6">
            <p
              className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/90 [text-shadow:0_2px_12px_rgba(2,8,20,0.85)]"
            >
              Fullstack Developer
            </p>

            <h1
              className="mt-3 text-2xl font-bold leading-[1.2] text-white [text-shadow:0_6px_28px_rgba(2,8,20,0.92)] sm:text-3xl md:text-5xl"
            >
              I build modern web products that feel fast, polished, and ready for real users.
            </h1>

            <p
              className="mt-3 max-w-xl text-sm leading-6 text-slate-100 [text-shadow:0_4px_18px_rgba(2,8,20,0.9)] md:max-w-2xl md:text-base md:leading-7"
            >
              Fullstack developer focused on React, Next.js, AI-powered features, and scalable backend delivery.
            </p>

            <p
              className="mt-3 inline-flex rounded-full border border-cyan-200/35 bg-cyan-300/12 px-4 py-1.5 text-xs font-semibold tracking-[0.08em] text-cyan-100"
            >
              {HERO_OPEN_TO_ROLES}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-300 to-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/8 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/12"
              >
                Resume
                <Download className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
