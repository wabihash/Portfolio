'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { SectionLink } from '@/components/shared/SectionLink';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

const NAV_LINKS = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Disable scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b backdrop-blur-xl transition-colors duration-300" style={{ borderColor: 'var(--border-mid)', background: 'linear-gradient(to bottom, var(--nav-from), var(--nav-via), var(--nav-to))' }}>
      <div className="mx-auto flex h-11 max-w-7xl items-center justify-between px-3 sm:h-20 sm:px-6">
        {/* Left: Logo */}
        <SectionLink href="/#home" className="group flex items-center gap-1.5 sm:gap-2">
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { rotate: -10, scale: 1.08, y: -1 }}
            whileTap={shouldReduceMotion ? undefined : { rotate: 10, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 420, damping: 18 }}
            className="flex h-6 w-6 origin-center items-center justify-center rounded-lg bg-linear-to-br from-cyan-300 to-blue-500 text-xs font-black text-[#04101f] shadow-[0_10px_22px_rgba(34,211,238,0.35)] transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8 sm:text-lg"
          >
            W
          </motion.div>
          <span className="bg-linear-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-sm font-extrabold tracking-[-0.01em] text-transparent sm:text-xl">
            Wabi
          </span>
        </SectionLink>

        {/* Right: Desktop Links */}
        <div className="hidden md:flex items-center gap-5">
          {NAV_LINKS.map((item) => (
            <SectionLink
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-all duration-300" style={{ color: 'var(--text-secondary)' }}
            >
              {item.label}
            </SectionLink>
          ))}

          <Link
            href="/resume"
            className="text-sm font-medium transition-all duration-300" style={{ color: 'var(--text-secondary)' }}
          >
            Resume
          </Link>

          <ThemeToggle />
        </div>

        {/* Right side controls (mobile): theme toggle + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            onClick={toggleMenu}
            className="z-60 flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-lg border border-cyan-200/20 bg-[var(--surface)]"
            aria-label="Toggle Menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-5 rounded-full transition-transform" style={{ backgroundColor: 'var(--text-primary)' }}
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-5 rounded-full" style={{ backgroundColor: 'var(--text-primary)' }}
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-5 rounded-full transition-transform" style={{ backgroundColor: 'var(--text-primary)' }}
            />
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-cyan-300/65 to-transparent" />

      {/* Mobile Menu Backdrop & Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 top-12 z-40 bg-black/50 backdrop-blur-sm md:hidden sm:top-20"
              aria-label="Close mobile menu overlay"
            />

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 240 }}
              className="fixed top-0 left-0 z-50 h-screen w-full bg-[var(--nav-from)] backdrop-blur-lg md:hidden"
            >
              <div className="flex h-full w-full flex-col items-center justify-start gap-3 px-5 pb-8 pt-16 sm:gap-5 sm:px-8 sm:pt-24">
                {NAV_LINKS.map((item, idx) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-[18rem]"
                    transition={{ delay: 0.08 + 0.06 * idx }}
                  >
                    <SectionLink
                      href={item.href}
                      onNavigate={closeMenu}
                      className="block w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-4 py-2.5 text-center text-lg font-semibold text-[var(--text-secondary)] transition-all duration-300 hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] hover:brightness-110 sm:text-2xl"
                    >
                      {item.label}
                    </SectionLink>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-[18rem]"
                  transition={{ delay: 0.08 + 0.06 * NAV_LINKS.length }}
                >
                  <Link
                    href="/resume"
                    onClick={closeMenu}
                    className="block w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] px-4 py-2.5 text-center text-lg font-semibold text-[var(--text-secondary)] transition-all duration-300 hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] hover:brightness-110 sm:text-2xl"
                  >
                    Resume
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
