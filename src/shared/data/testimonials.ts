export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
  accentClass: string;
  rating: number;
};

export type FeedbackStat = {
  title: string;
  detail: string;
};

export const TESTIMONIALS = [
  {
    id: 'testimonial-1',
    name: 'Maya Collins',
    role: 'Product Lead',
    company: 'Northstar Studio',
    quote:
      'Wabi turned a rough product brief into a clean, production-ready interface that felt polished from the first review.',
    initials: 'MC',
    accentClass: 'bg-linear-to-br from-yellow-500/35 via-amber-500/20 to-orange-500/15',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    name: 'Daniel Reid',
    role: 'Founder',
    company: 'BrightWave Labs',
    quote:
      'Communication stayed sharp, feedback loops were fast, and every update came back cleaner than the last.',
    initials: 'DR',
    accentClass: 'bg-linear-to-br from-cyan-500/30 via-sky-500/20 to-blue-500/15',
    rating: 5,
  },
  {
    id: 'testimonial-3',
    name: 'Sara Nguyen',
    role: 'Operations Director',
    company: 'Atlas Commerce',
    quote:
      'The redesign made our product feel faster and more trustworthy, and the attention to detail raised the whole experience.',
    initials: 'SN',
    accentClass: 'bg-linear-to-br from-emerald-500/30 via-teal-500/20 to-green-500/15',
    rating: 5,
  },
  {
    id: 'testimonial-4',
    name: 'Tomas Lee',
    role: 'Engineering Manager',
    company: 'Orbit Systems',
    quote:
      'The build quality was solid, the handoff was easy, and the final codebase has stayed simple to maintain after launch.',
    initials: 'TL',
    accentClass: 'bg-linear-to-br from-rose-500/30 via-pink-500/20 to-fuchsia-500/15',
    rating: 5,
  },
] satisfies readonly Testimonial[];

export const FEEDBACK_STATS = [
  {
    title: '100% Satisfaction',
    detail: 'Clear communication and reliable delivery from start to finish.',
  },
  {
    title: 'On-Time Delivery',
    detail: 'Milestones stayed predictable with smooth handoffs at each step.',
  },
  {
    title: 'Quality Code',
    detail: 'Clean structure, maintainable patterns, and attention to detail.',
  },
  {
    title: 'Post-Support',
    detail: 'Follow-up support that keeps the product stable after launch.',
  },
] satisfies readonly FeedbackStat[];