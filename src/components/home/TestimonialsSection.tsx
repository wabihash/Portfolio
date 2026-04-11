'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { Button } from '@/components/ui/Button';
import { TESTIMONIALS, FEEDBACK_STATS } from '@/shared/data/testimonials';

import { StatsCard } from './testimonials/StatsCard';
import { TestimonialCard } from './testimonials/TestimonialCard';

const AUTOPLAY_INTERVAL_MS = 4200;

const SLIDE_VARIANTS = {
  enter: (direction: number) => ({
    x: direction > 0 ? 72 : -72,
    opacity: 0,
    scale: 0.985,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -72 : 72,
    opacity: 0,
    scale: 0.985,
  }),
} as const;

export function TestimonialsSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const activeTestimonial = TESTIMONIALS[activeIndex];

  const goToNext = () => {
    setDirection(1);
    setActiveIndex((current) => (current === TESTIMONIALS.length - 1 ? 0 : current + 1));
  };

  useEffect(() => {
    const autoplay = window.setInterval(() => {
      goToNext();
    }, AUTOPLAY_INTERVAL_MS);

    return () => {
      window.clearInterval(autoplay);
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');

    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="feedback" aria-labelledby="feedback-heading" className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-12">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative isolate overflow-hidden rounded-[32px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 backdrop-blur-xl md:p-8"
      >
        <div className="pointer-events-none absolute inset-0 glow-mesh opacity-35" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-500/10 blur-3xl" />

        <div className="relative text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--text-secondary)]">How I Work</p>
          <h2 id="feedback-heading" className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-primary)] md:text-4xl">
            <span className="text-amber-500 dark:text-amber-400">How</span> I Work
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
            I focus on clean code and good file structure so every project is easier to scale and maintain.
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-[var(--text-muted)] md:text-sm">
            Client testimonials will be added as collaborations grow.
          </p>
        </div>

        <div className="relative mt-8">
          <div className="pointer-events-none absolute inset-x-6 top-6 h-28 rounded-full bg-yellow-500/10 blur-3xl" />

          <div className="relative mx-auto min-h-[24rem] w-full max-w-4xl sm:min-h-[28rem]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeTestimonial.id}
                custom={direction}
                variants={SLIDE_VARIANTS}
                initial={shouldReduceMotion ? false : 'enter'}
                animate={shouldReduceMotion ? undefined : 'center'}
                exit={shouldReduceMotion ? undefined : 'exit'}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <TestimonialCard testimonial={activeTestimonial} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <div className="min-w-24 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-inset)] px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-secondary)] backdrop-blur-md">
              {String(activeIndex + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
            </div>
          </div>
        </div>

        <div className="relative mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEEDBACK_STATS.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.05 * index, duration: 0.35, ease: 'easeOut' }}
            >
              <StatsCard stat={stat} />
            </motion.div>
          ))}
        </div>

        <div className="relative mt-8 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-[var(--text-secondary)]">Ready to turn an idea into a polished product?</p>

          <Button
            type="button"
            onClick={scrollToProjects}
            className="group inline-flex items-center gap-2 bg-linear-to-r from-yellow-400 via-amber-400 to-orange-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_16px_45px_rgba(245,158,11,0.32)] hover:translate-y-[-1px] hover:shadow-[0_18px_55px_rgba(245,158,11,0.42)]"
          >
            Get Your Project Quote
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}