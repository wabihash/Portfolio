'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ComponentType } from 'react';
import { BrainCircuit, Code2, LayoutTemplate, Palette } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SERVICES, type ServiceIcon } from '@/shared/data/homeSections';

const ICONS: Record<ServiceIcon, ComponentType<{ className?: string }>> = {
  palette: Palette,
  layout: LayoutTemplate,
  code: Code2,
  brain: BrainCircuit,
};

export function ServicesSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeService = useMemo(() => SERVICES[activeIndex], [activeIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SERVICES.length);
    }, shouldReduceMotion ? 5000 : 3200);

    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  return (
    <section id="services" aria-labelledby="services-heading" className="mx-auto w-full max-w-6xl px-4 pt-8 md:px-8 md:pt-10">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="section-card p-4 sm:p-5 md:p-8"
      >
        <h2 id="services-heading" className="text-2xl font-bold sm:text-[1.75rem] md:text-3xl" style={{ color: 'var(--text-primary)' }}>
          Interactive <span className="text-[#34d399]">Services</span>
        </h2>

        {/* Mobile: grid of buttons */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:hidden sm:gap-4">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.icon];
            const isActive = index === activeIndex;

            return (
              <button
                key={service.id}
                onClick={() => setActiveIndex(index)}
                className="rounded-xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2"
                style={{
                  borderColor: isActive ? 'rgba(52,211,153,0.70)' : 'var(--border-subtle)',
                  backgroundColor: isActive ? 'var(--surface-deep)' : 'var(--surface-inset)',
                  boxShadow: isActive ? '0 14px 28px rgba(52,211,153,0.18)' : 'none',
                }}
              >
                <Icon className="mb-3 h-5 w-5 text-[#9ae6c7]" />
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{service.title}</p>
                <p className="mt-1 text-xs leading-5" style={{ color: 'var(--text-secondary)' }}>{service.description}</p>
              </button>
            );
          })}
        </div>

        {/* Desktop: animated active panel */}
        <div className="relative mt-5 hidden md:block">
          <div className="overflow-hidden rounded-xl">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={activeService.id}
                initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, x: -24 }}
                transition={{ duration: 0.36, ease: 'easeOut' }}
                className="rounded-xl border p-6"
                style={{
                  borderColor: 'rgba(52,211,153,0.65)',
                  backgroundColor: 'var(--surface-inset)',
                  boxShadow: '0 16px 35px rgba(52,211,153,0.14)',
                }}
              >
                <div className="flex items-start gap-4">
                  {(() => {
                    const ActiveIcon = ICONS[activeService.icon];
                    return <ActiveIcon className="mt-1 h-7 w-7 text-[#86efac]" />;
                  })()}
                  <div>
                    <h3 className="text-lg font-semibold sm:text-xl" style={{ color: 'var(--text-primary)' }}>{activeService.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{activeService.description}</p>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Dot nav */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              {SERVICES.map((service, idx) => (
                <button
                  key={service.id}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Show ${service.title}`}
                  className="h-2.5 w-2.5 rounded-full transition"
                  style={{ backgroundColor: idx === activeIndex ? '#34d399' : 'var(--border-mid)' }}
                />
              ))}
            </div>
          </div>
        </div>

        <motion.button
          key={activeService.id}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 w-full rounded-full bg-linear-to-r from-teal-400 to-pink-500 px-5 py-2.5 text-sm font-semibold text-[#041224] shadow-[0_10px_24px_rgba(45,212,191,0.28)] sm:w-auto"
        >
          Explore {activeService.title}
        </motion.button>
      </motion.div>
    </section>
  );
}
