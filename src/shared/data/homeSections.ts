export const CORE_EXPERTISE_BADGES = [
  'UI/UX Design',
  'React',
  'TypeScript',
  'Next.js',
  'Tailwind CSS',
  'Bootstrap',
  'Node.js',
  'Framer Motion',
  'Accessibility',
] as const;

export const CORE_EXPERTISE_STATS = [
  { label: 'Commitment', value: '100%' },
  { label: 'Creativity', value: '∞' },
  { label: 'Learning', value: '24/7' },
] as const;

export type ServiceIcon = 'palette' | 'layout' | 'code' | 'brain';

export const SERVICES = [
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'Human-centered interfaces with clear hierarchy, fast flows, and polished visual language.',
    icon: 'palette' as ServiceIcon,
  },
  {
    id: 'web-design',
    title: 'Web Design',
    description: 'Responsive website systems designed for clarity, consistency, and conversion.',
    icon: 'layout' as ServiceIcon,
  },
  {
    id: 'web-dev',
    title: 'Web Dev',
    description: 'Production-grade frontend and backend features with performance and maintainability in mind.',
    icon: 'code' as ServiceIcon,
  },
  {
    id: 'ml-ai',
    title: 'ML/AI',
    description: 'Practical AI-powered features and model integrations focused on real user value.',
    icon: 'brain' as ServiceIcon,
  },
] as const;

export type WorkSkillIcon = 'figma' | 'wordpress' | 'code';

export const WORK_SKILLS = [
  { id: 'figma', name: 'Figma', level: 99, icon: 'figma' as WorkSkillIcon },
  { id: 'wordpress', name: 'WordPress', level: 70, icon: 'wordpress' as WorkSkillIcon },
  { id: 'coding', name: 'Coding', level: 85, icon: 'code' as WorkSkillIcon },
] as const;

export const PROOF_BADGES = [
  'Open to internships',
  'Available for freelance',
  'Junior frontend / full-stack roles',
] as const;

export const HERO_OPEN_TO_ROLES =
  'Open to internships and junior frontend/full-stack roles (remote or Addis Ababa).';

export const PROOF_PILLARS = [
  {
    id: 'products',
    title: 'Built for real product flows',
    description: 'I design and ship interfaces that feel structured, fast, and usable beyond landing-page level polish.',
    accent: 'cyan',
  },
  {
    id: 'stack',
    title: 'Comfortable across the stack',
    description: 'My core workflow spans React, Next.js, Tailwind, Bootstrap, Node.js, SQL, and MongoDB for end-to-end delivery.',
    accent: 'orange',
  },
  {
    id: 'ai',
    title: 'Practical AI integrations',
    description: 'I use AI where it adds product value, from chat-style experiences to support and workflow enhancements.',
    accent: 'emerald',
  },
] as const;
