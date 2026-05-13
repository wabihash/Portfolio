import type { ComponentType } from 'react';
import { Mail, MapPin, MessageCircle, PhoneCall } from 'lucide-react';
import { ContactCard } from '@/components/home/contact/ContactCard';
import { PullMessageComposerLazy } from '@/components/home/contact/PullMessageComposerLazy';
import { CONTACT_ITEMS, type ContactIcon } from '@/shared/data/contact';

const CONTACT_ICONS: Record<ContactIcon, ComponentType<{ className?: string }>> = {
  email: Mail,
  phone: PhoneCall,
  location: MapPin,
  whatsapp: MessageCircle,
};

type ContactSectionProps = {
  sectionId?: string | null;
};

export function ContactSection({ sectionId }: ContactSectionProps) {
  return (
    <section
      id={sectionId === null ? undefined : sectionId ?? 'contact'}
      aria-labelledby="contact-heading"
      className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-12"
    >
      <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4 backdrop-blur-lg sm:p-5 md:p-8">
        <header className="text-center">
          <h2 id="contact-heading" className="text-2xl font-bold text-[var(--text-primary)] sm:text-[1.75rem] md:text-3xl">
            Get In <span className="text-amber-500 dark:text-amber-400">Touch</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
            I am available for freelance projects, product collaborations, and thoughtful technical discussions.
          </p>
        </header>

        <div className="mt-6 space-y-3 sm:space-y-4">
          {CONTACT_ITEMS.map((item) => {
            const Icon = CONTACT_ICONS[item.icon];

            return (
              <ContactCard key={item.id} label={item.label} value={item.value} icon={Icon} />
            );
          })}
        </div>

        <PullMessageComposerLazy />
      </div>
    </section>
  );
}
