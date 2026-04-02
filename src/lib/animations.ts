export const SPRING_TRANSITION = {
  type: 'spring',
  bounce: 0.25,
  duration: 0.6,
} as const;

export const FADE_IN_UP = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
} as const;
