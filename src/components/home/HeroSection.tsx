'use client';

import Link from 'next/link';
import styles from './HeroSection.module.css';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { HERO_OPEN_TO_ROLES } from '@/shared/data/homeSections';

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-start">
      <div className="mx-auto w-full max-w-6xl px-4 pb-4 pt-0 sm:pb-7 sm:pt-6 md:px-8 md:pb-10 md:pt-14 lg:pt-18">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="pointer-events-auto p-2"
        >
          <div className="max-w-2xl rounded-2xl p-3 sm:p-4 md:p-6">
            {/* Label */}


            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-700 [text-shadow:0_2px_12px_rgba(0,0,0,0.92)] dark:text-cyan-300 sm:text-xs sm:tracking-[0.28em]">
              Fullstack Developer
            </p>

            {/* Headline */}
            <h1
              className={"mt-2 max-w-xl text-[1.55rem] font-bold leading-[1.15] text-slate-600 [text-shadow:0_6px_28px_rgba(0,0,0,0.98)] dark:text-(--text-primary) dark:[text-shadow:0_6px_28px_rgba(2,8,20,0.92)] sm:text-3xl md:text-5xl " + styles['hero-headline-stroke']}
            >
              I build modern web products that feel fast, polished, and ready for real users.
            </h1>


            {/* Open-to badge */}
            <p
              className="mt-3 inline-flex max-w-full rounded-full border border-blue-200/30 bg-transparent text-blue-900 dark:bg-transparent dark:text-blue-400 [text-shadow:0_1px_4px_rgba(0,0,0,0.04)] sm:px-4 sm:text-xs sm:tracking-[0.08em] px-3 py-1.5 text-[11px] font-bold tracking-[0.06em]"
            >
              {HERO_OPEN_TO_ROLES}
            </p>

            {/* CTAs */}
            <div className="mt-5 flex flex-row gap-3 flex-wrap justify-start">
              <Link
                href="#projects"
                className="inline-flex w-auto min-w-24 items-center justify-center gap-1.5 rounded-full bg-linear-to-r from-cyan-300 to-sky-400 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:brightness-110 sm:w-auto sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
              >
                <span className="sm:hidden">Projects</span>
                <span className="hidden sm:inline">View Projects</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>

              <Link
                href="/resume"
                className="inline-flex w-auto min-w-24 items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition sm:w-auto sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
                style={{ borderColor: 'var(--border-strong)', backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}
              >
                <span className="sm:hidden">CV</span>
                <span className="hidden sm:inline">Resume</span>
                <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
