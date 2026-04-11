'use client';

import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';

const TRAIL_COUNT = 20;
const ORBIT_DURATION_SECONDS = 2;

type OrbitDotStyle = CSSProperties & {
  '--i': number;
};

export default function OrbitingRocketLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-[var(--bg-base)]/92 px-6"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_78%_24%,rgba(249,115,22,0.1),transparent_28%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.1),transparent_34%)]" />

      <motion.div
        initial={{ y: 14, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex w-full max-w-md flex-col items-center rounded-[2rem] border border-[var(--border-subtle)] bg-[var(--surface)] px-8 py-9 text-center shadow-[0_28px_90px_rgba(2,8,20,0.55)] backdrop-blur-xl"
      >
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-white/35 to-transparent" />
        <div className="pointer-events-none absolute -top-8 h-24 w-24 rounded-full bg-cyan-400/18 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 h-24 w-24 rounded-full bg-orange-400/14 blur-3xl" />

        <div className="relative flex h-48 w-48 items-center justify-center transform-gpu will-change-transform">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: ORBIT_DURATION_SECONDS, ease: 'linear' }}
            className="absolute inset-0 transform-gpu will-change-transform"
          >
            {Array.from({ length: TRAIL_COUNT }, (_, index) => (
              <span
                key={index}
                style={{ '--i': index } as OrbitDotStyle}
                className="absolute inset-0 block [transform:rotate(calc(18deg*var(--i)))]"
              >
                <span className="orbit-dot absolute left-1/2 top-1 -ml-1.5 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.55)] transform-gpu will-change-transform" />
              </span>
            ))}

            <div className="absolute inset-0 [transform:rotate(0deg)]">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-base)] p-3 shadow-[0_0_28px_rgba(34,211,238,0.28),0_0_52px_rgba(249,115,22,0.16)] backdrop-blur-md">
                <FaRocket className="h-4 w-4 -rotate-45 text-[var(--text-primary)]" aria-hidden="true" />
              </div>
            </div>
          </motion.div>

          <div className="pointer-events-none absolute inset-8 rounded-full border border-[var(--border-subtle)] bg-linear-to-br from-white/10 via-transparent to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]" />
          <div className="pointer-events-none absolute inset-[3.35rem] rounded-full border border-cyan-300/12" />
          <div className="pointer-events-none absolute h-20 w-20 rounded-full bg-cyan-300/10 blur-2xl" />
        </div>

        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--text-primary)]/70">
          Initializing Route
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">Preparing the next scene</h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">
          Streaming your next view with a lightweight loading state so navigation still feels responsive.
        </p>
      </motion.div>

      <style jsx>{`
        .orbit-dot {
          animation: orbit-trail ${ORBIT_DURATION_SECONDS}s linear infinite;
          animation-delay: calc(0.1s * var(--i));
        }

        @keyframes orbit-trail {
          0%,
          100% {
            opacity: 0.16;
            transform: scale(0.58);
          }
          40% {
            opacity: 1;
            transform: scale(1.1);
          }
          65% {
            opacity: 0.42;
            transform: scale(0.8);
          }
        }
      `}</style>
    </motion.div>
  );
}
