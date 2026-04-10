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
    name: 'Clean Code First',
    role: 'Engineering Standard',
    company: 'Codebase Quality',
    quote:
      'I keep components readable, naming consistent, and logic split clearly so projects stay easy to maintain and extend.',
    initials: 'CC',
    accentClass: 'bg-linear-to-br from-yellow-500/35 via-amber-500/20 to-orange-500/15',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    name: 'Strong File Structure',
    role: 'Project Organization',
    company: 'Scalable Architecture',
    quote:
      'I organize files and folders by feature and responsibility so new features can be added without creating confusion.',
    initials: 'FS',
    accentClass: 'bg-linear-to-br from-cyan-500/30 via-sky-500/20 to-blue-500/15',
    rating: 5,
  },
  {
    id: 'testimonial-3',
    name: 'Reliable Delivery',
    role: 'Execution Process',
    company: 'Milestone Workflow',
    quote:
      'I break work into clear milestones, share updates consistently, and keep delivery predictable from start to finish.',
    initials: 'RD',
    accentClass: 'bg-linear-to-br from-emerald-500/30 via-teal-500/20 to-green-500/15',
    rating: 5,
  },
  {
    id: 'testimonial-4',
    name: 'Clear Collaboration',
    role: 'Client Communication',
    company: 'Feedback Loop',
    quote:
      'I use straightforward communication and fast iteration cycles to align quickly and reduce back-and-forth friction.',
    initials: 'CL',
    accentClass: 'bg-linear-to-br from-rose-500/30 via-pink-500/20 to-fuchsia-500/15',
    rating: 5,
  },
] satisfies readonly Testimonial[];

export const FEEDBACK_STATS = [
  {
    title: 'Clean Code',
    detail: 'Readable components, reusable patterns, and maintainable structure.',
  },
  {
    title: 'Good Structure',
    detail: 'Feature-based organization with clear separation of concerns.',
  },
  {
    title: 'Fast Iteration',
    detail: 'Consistent updates and practical revisions focused on outcomes.',
  },
  {
    title: 'Reliable Handoff',
    detail: 'Clear documentation and smooth transition for future changes.',
  },
] satisfies readonly FeedbackStat[];