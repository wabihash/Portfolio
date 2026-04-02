'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-white/5 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
        {/* Left: Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500 text-sm font-bold text-white transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8 sm:text-lg">
            W
          </div>
          <span className="bg-linear-to-r from-white to-white/60 bg-clip-text text-base font-bold tracking-tight text-transparent sm:text-xl">
            Wabi
          </span>
        </Link>

        {/* Right: Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/60 transition-all duration-300 hover:text-white hover:brightness-110"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Hamburger Button (Mobile Only) */}
        <button
          onClick={toggleMenu}
          className="z-60 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg md:hidden"
          aria-label="Toggle Menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-white rounded-full block transition-transform"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-white rounded-full block"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-white rounded-full block transition-transform"
          />
        </button>
      </div>

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
              className="fixed inset-0 top-14 z-40 bg-black/50 backdrop-blur-sm md:hidden sm:top-20"
              aria-label="Close mobile menu overlay"
            />

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 240 }}
              className="fixed top-0 left-0 h-screen w-full z-50 bg-black/60 backdrop-blur-lg md:hidden"
            >
              <div className="flex h-full w-full flex-col items-center justify-start gap-3 px-5 pb-8 pt-16 sm:gap-5 sm:px-8 sm:pt-24">
                {NAV_LINKS.map((item, idx) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-[18rem]"
                    transition={{ delay: 0.06 * idx }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-center text-lg font-semibold text-white/85 transition-all duration-300 hover:bg-white/10 hover:text-white hover:brightness-110 sm:text-2xl"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
