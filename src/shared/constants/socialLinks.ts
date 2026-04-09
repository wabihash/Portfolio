import type { ComponentType } from 'react';
import { FaEnvelope, FaWhatsapp } from 'react-icons/fa6';

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/251983488579',
    icon: FaWhatsapp,
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:wabidagim280@gmail.com',
    icon: FaEnvelope,
  },
];