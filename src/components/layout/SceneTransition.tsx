'use client';

import { AnimatePresence, motion, type Variants } from 'framer-motion';

const sceneEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const sceneVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
    scale: 0.99,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: sceneEase,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.99,
    transition: {
      duration: 0.3,
      ease: sceneEase,
    },
  },
};

export default function SceneTransition({
  pathname,
  children,
}: {
  pathname: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={sceneVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative z-10 w-full min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

