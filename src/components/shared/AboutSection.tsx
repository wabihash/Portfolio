'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const ROLES = [
  'Fullstack Developer',
  'Computer Science Student',
  'AI/ML Enthusiast',
] as const;

const ROLE_COLORS: Record<(typeof ROLES)[number], string> = {
  'Fullstack Developer':    'text-[#60a5fa]',
  'Computer Science Student': 'text-[#34d399]',
  'AI/ML Enthusiast':       'text-[#c084fc]',
};

const ROLE_SWITCH_MS = 2200;

export function AboutSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (isMobile) {
      return;
    }

    const timer = setInterval(() => {
      setRoleIndex((current) => (current + 1) % ROLES.length);
    }, ROLE_SWITCH_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto w-full max-w-6xl px-4 pt-8 md:px-8 md:pt-12">
      <div className="section-card p-4 sm:p-5 md:p-8">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[280px_1fr] md:gap-10">
          {/* Portrait card */}
          <div className="mx-auto perspective-[1000px]">
            <div className="group relative h-48 w-40 transform-3d transform-[rotateX(20deg)_rotateY(-20deg)_rotateZ(10deg)] transition-transform duration-300 hover:-translate-y-2 hover:rotate-[1deg] sm:h-56 sm:w-44 md:h-72 md:w-56">
              <div className="pointer-events-none absolute inset-6 rounded-[1.75rem] bg-cyan-400/25 blur-3xl shadow-[0_0_60px_rgba(34,211,238,0.35)]" />
              <div className="pointer-events-none absolute inset-x-10 bottom-2 h-16 rounded-full bg-orange-400/20 blur-2xl shadow-[0_0_50px_rgba(251,146,60,0.25)]" />

              <div className="absolute inset-0 rounded-[1.75rem] border border-[var(--border-subtle)] bg-linear-to-br from-white/12 via-white/6 to-transparent shadow-[0_28px_60px_rgba(3,10,28,0.55)] backdrop-blur-md" />
              <div className="absolute inset-px rounded-[1.65rem] border border-white/18 bg-linear-to-br from-white/20 via-transparent to-transparent" />

              <div className="absolute inset-3 overflow-hidden rounded-[1.45rem] border border-[var(--border-subtle)] bg-[var(--surface-deep)] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                <Image
                  src="/linkidln.jpg"
                  alt="Portrait of Wabi, fullstack developer"
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 176px, 224px"
                  priority={false}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#020a1f]/45 via-transparent to-white/8" />
                <div className="absolute inset-0 bg-linear-to-br from-cyan-300/14 via-transparent to-orange-300/10 mix-blend-screen" />
              </div>

              <div className="pointer-events-none absolute inset-x-6 top-4 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
            </div>
          </div>

          {/* Copy */}
          <div className="text-center md:text-left">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]"
              style={{ color: 'var(--text-label)' }}
            >
              About Me
            </p>

            <h2
              id="about-heading"
              className="text-2xl font-bold sm:text-3xl md:text-4xl"
              style={{ color: 'var(--text-primary)' }}
            >
              Wabi
            </h2>

            <p
              className="mt-1 text-base font-medium sm:text-lg md:text-xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span style={{ color: 'var(--text-muted)' }}>Role:</span>{' '}
              <span
                aria-live="polite"
                aria-atomic="true"
                className="relative inline-flex min-h-7 min-w-[11rem] items-center align-middle sm:min-w-56"
              >
                <span key={ROLES[roleIndex]} className={`absolute left-0 transition-opacity duration-300 ${ROLE_COLORS[ROLES[roleIndex]]}`}>
                    {ROLES[roleIndex]}
                </span>
              </span>
            </p>

            <p
              className="mt-4 max-w-2xl text-sm leading-relaxed sm:text-base"
              style={{ color: 'var(--text-secondary)' }}
            >
              I build modern fullstack products, from AI-powered web apps and social platforms to responsive
              dashboards and productivity tools. My approach blends thoughtful frontend design with reliable
              backend engineering to deliver fast, scalable, and intuitive experiences that feel polished on
              every device.
            </p>

            <p
              className="mt-4 text-sm font-medium"
              style={{ color: 'var(--text-label)' }}
            >
              Creating AI-ready digital experiences that are beautiful, practical, and built to scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
