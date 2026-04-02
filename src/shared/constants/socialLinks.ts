import type { ComponentType } from 'react';
import { FaEnvelope, FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/',
    icon: FaGithub,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    icon: FaLinkedinIn,
  },
  {
    id: 'twitter',
    label: 'Twitter',
    href: 'https://x.com/',
    icon: FaXTwitter,
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:wabidagim280@gmail.com',
    icon: FaEnvelope,
  },
];