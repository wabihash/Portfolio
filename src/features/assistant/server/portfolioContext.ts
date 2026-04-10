import { CONTACT_ITEMS } from '@/shared/data/contact';
import { CORE_EXPERTISE_BADGES, SERVICES } from '@/shared/data/homeSections';
import { PROJECTS } from '@/shared/data/projects';
import {
  RESUME_EXPERIENCE,
  RESUME_FOCUS_AREAS,
  RESUME_SUMMARY,
} from '@/shared/data/resume';
import { TESTIMONIALS } from '@/shared/data/testimonials';

export function buildPortfolioContext(): string {
  const topProjects = PROJECTS.slice(0, 4)
    .map(
      (project) =>
        `${project.title}: ${project.description} Tech: ${project.techStack.join(', ')} Live: ${project.liveUrl}`
    )
    .join('\n');

  const services = SERVICES.map((service) => `${service.title}: ${service.description}`).join('\n');

  const expertise = CORE_EXPERTISE_BADGES.join(', ');
  const focus = RESUME_FOCUS_AREAS.join(', ');
  const experience = RESUME_EXPERIENCE[0]
    ? `${RESUME_EXPERIENCE[0].role} at ${RESUME_EXPERIENCE[0].organization} (${RESUME_EXPERIENCE[0].period})`
    : '';

  const contact = CONTACT_ITEMS.map((item) => `${item.label}: ${item.value}`).join('\n');

  const testimonials = TESTIMONIALS.slice(0, 2)
    .map((item) => `${item.name}: ${item.quote}`)
    .join('\n');

  return [
    `Summary: ${RESUME_SUMMARY}`,
    `Focus Areas: ${focus}`,
    `Core Expertise: ${expertise}`,
    `Current Experience: ${experience}`,
    'Services:',
    services,
    'Featured Projects:',
    topProjects,
    'Social Proof:',
    testimonials,
    'Contact:',
    contact,
  ].join('\n\n');
}
