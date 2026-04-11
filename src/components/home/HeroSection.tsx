'use client';

import Link from 'next/link';
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
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300 [text-shadow:0_2px_12px_rgba(2,8,20,0.85)] sm:text-xs sm:tracking-[0.28em]">
              Fullstack Developer
            </p>

            {/* Headline */}
            <h1 className="mt-2 max-w-xl text-[1.55rem] font-bold leading-[1.15] [text-shadow:0_6px_28px_rgba(2,8,20,0.92)] sm:text-3xl md:text-5xl" style={{ color: 'var(--text-primary)' }}>
              I build modern web products that feel fast, polished, and ready for real users.
            </h1>

            {/* Sub-copy */}
            <p className="mt-3 max-w-lg text-sm leading-6 [text-shadow:0_4px_18px_rgba(2,8,20,0.9)] sm:max-w-xl md:max-w-2xl md:text-base md:leading-7" style={{ color: 'var(--text-secondary)' }}>
              Fullstack developer focused on React, Next.js, AI-powered features, and scalable backend delivery.
            </p>

            {/* Open-to badge */}
            <p className="mt-3 inline-flex max-w-full rounded-full border border-cyan-200/35 bg-cyan-300/12 px-3 py-1.5 text-[11px] font-semibold tracking-[0.06em] text-[var(--text-primary)] sm:px-4 sm:text-xs sm:tracking-[0.08em]">
              {HERO_OPEN_TO_ROLES}
            </p>

            {/* CTAs */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="#projects"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-linear-to-r from-cyan-300 to-sky-400 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:brightness-110 sm:w-auto sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
              >
                <span className="sm:hidden">Projects</span>
                <span className="hidden sm:inline">View Projects</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>

              <Link
                href="/resume"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition sm:w-auto sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
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
