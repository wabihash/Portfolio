'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { SOCIAL_LINKS } from '@/shared/constants/socialLinks';

type FooterLink = {
  id: string;
  label: string;
  href: string;
};

const QUICK_LINKS: FooterLink[] = [
  { id: 'about', label: 'About', href: '/#about' },
  { id: 'projects', label: 'Projects', href: '/#projects' },
  { id: 'contact', label: 'Contact', href: '/#contact' },
];

const FOOTER_SOCIAL_IDS = new Set(['github', 'linkedin', 'email']);

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">{title}</p>
      {children}
    </div>
  );
}

function SocialIcon({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: (props: { className?: string }) => React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -2, scale: 1.1 }}
      whileTap={{ scale: 0.97 }}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 shadow-[0_8px_22px_rgba(0,0,0,0.25)] backdrop-blur-sm transition duration-300 hover:border-cyan-300/45 hover:bg-white/10 hover:text-cyan-200 hover:shadow-[0_12px_28px_rgba(34,211,238,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60"
    >
      <Icon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-6" />
    </motion.a>
  );
}

export function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const year = new Date().getFullYear();
  const footerSocialLinks = SOCIAL_LINKS.filter((item) => FOOTER_SOCIAL_IDS.has(item.id));

  return (
    <footer className="relative mt-14 w-full overflow-hidden border-t border-white/10 bg-linear-to-b from-[#040c22] via-[#030914] to-[#01050c]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/60 to-transparent" />
      <div className="pointer-events-none absolute -top-16 left-1/2 h-32 w-2xl -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative mx-auto w-full max-w-6xl px-4 py-12 md:px-8 md:py-14"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          <FooterColumn title="Brand">
            <div>
              <p className="text-2xl font-bold tracking-tight text-white">Wabi</p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-400">
                Building modern fullstack experiences.
              </p>
            </div>
          </FooterColumn>

          <FooterColumn title="Quick Links">
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-2.5 text-sm text-gray-300">
                {QUICK_LINKS.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="transition duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/50"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </FooterColumn>

          <FooterColumn title="Connect">
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              {footerSocialLinks.map((item) => (
                <SocialIcon key={item.id} href={item.href} label={item.label} icon={item.icon} />
              ))}
            </div>
          </FooterColumn>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-5 text-xs text-gray-500 md:flex-row">
          <p>© {year} Wabi. All rights reserved.</p>
          <p>Built with Next.js &amp; Tailwind</p>
        </div>
      </motion.div>
    </footer>
  );
}