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
        className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg md:p-8"
      >
        <h2 id="services-heading" className="text-2xl font-bold text-white sm:text-[1.75rem] md:text-3xl">
          Interactive <span className="text-[#34d399]">Services</span>
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-4 md:hidden">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.icon];
            const isActive = index === activeIndex;

            return (
              <button
                key={service.id}
                onClick={() => setActiveIndex(index)}
                className={`rounded-xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                  isActive
                    ? 'scale-[1.01] border-[#34d399]/70 bg-black/35 shadow-[0_14px_28px_rgba(52,211,153,0.22)]'
                    : 'border-white/10 bg-black/20'
                }`}
              >
                <Icon className="mb-3 h-5 w-5 text-[#9ae6c7]" />
                <p className="text-sm font-semibold text-white">{service.title}</p>
                <p className="mt-1 text-xs text-[#c8d8f7]">{service.description}</p>
              </button>
            );
          })}
        </div>

        <div className="relative mt-5 hidden md:block">
          <div className="overflow-hidden rounded-xl">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={activeService.id}
                initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, x: -24 }}
                transition={{ duration: 0.36, ease: 'easeOut' }}
                className="rounded-xl border border-[#34d399]/70 bg-black/30 p-6 shadow-[0_16px_35px_rgba(52,211,153,0.2)]"
              >
                <div className="flex items-start gap-4">
                  {(() => {
                    const ActiveIcon = ICONS[activeService.icon];
                    return <ActiveIcon className="mt-1 h-7 w-7 text-[#86efac]" />;
                  })()}
                  <div>
                    <h3 className="text-lg font-semibold text-white sm:text-xl">{activeService.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#c8d8f7]">{activeService.description}</p>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              {SERVICES.map((service, idx) => (
                <button
                  key={service.id}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Show ${service.title}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${idx === activeIndex ? 'bg-[#34d399]' : 'bg-white/25 hover:bg-white/45'}`}
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
          className="mt-6 rounded-full bg-linear-to-r from-teal-400 to-pink-500 px-5 py-2.5 text-sm font-semibold text-[#041224] shadow-[0_10px_24px_rgba(45,212,191,0.28)]"
        >
          Explore {activeService.title}
        </motion.button>
      </motion.div>
    </section>
  );
}
