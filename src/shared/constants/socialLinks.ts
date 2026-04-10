import type { ComponentType } from 'react';
import { FaEnvelope, FaTelegram, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';

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
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=wabidagim280@gmail.com',
    icon: FaEnvelope,
  },
  {
    id: 'telegram',
    label: 'Telegram',
    href: 'https://t.me/Focusrehobot',
    icon: FaTelegram,
  },
  {
    id: 'x',
    label: 'X',
    href: 'https://x.com/AgituG632',
    icon: FaXTwitter,
  },
];