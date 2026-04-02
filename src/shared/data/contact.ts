export type ContactIcon = 'email' | 'phone' | 'location' | 'whatsapp';

export type ContactItem = {
  id: string;
  label: string;
  value: string;
  icon: ContactIcon;
};

export const CONTACT_ITEMS: ContactItem[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'wabidagim280@gmail.com',
    icon: 'email',
  },
  {
    id: 'phone',
    label: 'Phone',
    value: '0983488579',
    icon: 'phone',
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
    value: 'Will update later',
    icon: 'whatsapp',
  },
];