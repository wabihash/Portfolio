export type ContactIcon = 'email' | 'phone' | 'location' | 'whatsapp';

export type ContactItem = {
  id: string;
  label: string;
  value: string;
  icon: ContactIcon;
  href?: string;
};

export const CONTACT_ITEMS: ContactItem[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'wabidagim280@gmail.com',
    icon: 'email',
    href: 'mailto:wabidagim280@gmail.com',
  },
  {
    id: 'phone',
    label: 'Phone',
    value: '+251983488579',
    icon: 'phone',
    href: 'tel:+251983488579',
  },
  {
    id: 'location',
    label: 'Location',
    value: 'Addis Ababa',
    icon: 'location',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '+251983488579',
    icon: 'whatsapp',
    href: 'https://wa.me/251983488579',
  },
];