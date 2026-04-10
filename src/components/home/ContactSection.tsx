'use client';

import type { ComponentType } from 'react';
import { Mail, MapPin, MessageCircle, PhoneCall } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { ContactCard } from '@/components/home/contact/ContactCard';
import { PullMessageComposer } from '@/components/home/contact/PullMessageComposer';
import { CONTACT_ITEMS, type ContactIcon } from '@/shared/data/contact';

const CONTACT_ICONS: Record<ContactIcon, ComponentType<{ className?: string }>> = {
  email: Mail,
  phone: PhoneCall,
  location: MapPin,
  whatsapp: MessageCircle,
};

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="contact" aria-labelledby="contact-heading" className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-12">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg sm:p-5 md:p-8"
      >
        <header className="text-center">
          <h2 id="contact-heading" className="text-2xl font-bold text-white sm:text-[1.75rem] md:text-3xl">
            Get In <span className="text-[#fbbf24]">Touch</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#c8d8f7] md:text-base">
            I am available for freelance projects, product collaborations, and thoughtful technical discussions.
          </p>
        </header>

        <div className="mt-6 space-y-3 sm:space-y-4">
          {CONTACT_ITEMS.map((item, index) => {
            const Icon = CONTACT_ICONS[item.icon];

            return (
              <motion.div
                key={item.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
              >
                <ContactCard
                  label={item.label}
                  value={item.value}
                  icon={Icon}
                />
              </motion.div>
            );
          })}
        </div>

        <PullMessageComposer />
      </motion.div>
    </section>
  );
}