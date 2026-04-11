import { CONTACT_ITEMS } from '@/shared/data/contact';
import { SERVICES } from '@/shared/data/homeSections';
import { PROJECTS } from '@/shared/data/projects';
import {
  RESUME_EXPERIENCE,
  RESUME_FOCUS_AREAS,
  RESUME_SUMMARY,
} from '@/shared/data/resume';
import { TESTIMONIALS } from '@/shared/data/testimonials';
import { FAQ_DATA } from '@/shared/data/faq';

export function buildPortfolioContext(): string {
  const topProjects = PROJECTS.slice(0, 4)
    .map(
      (project) =>
        `**${project.title}**
        Summary: ${project.description}
        Challenge: ${project.challenge}
        Solution: ${project.solution}
        Impact: ${project.impact}
        Tech: ${project.techStack.join(', ')}
        URL: ${project.liveUrl}`
    )
    .join('\n\n');

  const services = SERVICES.map((service) => `${service.title}: ${service.description}`).join('\n');

  const expertise = {
    frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    backend: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
    aiAndScripting: ['Python', 'LLM Integration (Gemini/OpenAI)', 'Automation Scripts'],
  };
  
  const expertiseStr = `
    - Frontend: ${expertise.frontend.join(', ')}
    - Backend: ${expertise.backend.join(', ')}
    - AI & Scripting: ${expertise.aiAndScripting.join(', ')}
  `;

  const focus = RESUME_FOCUS_AREAS.join(', ');
  const experience = RESUME_EXPERIENCE[0]
    ? `${RESUME_EXPERIENCE[0].role} at ${RESUME_EXPERIENCE[0].organization} (${RESUME_EXPERIENCE[0].period})`
    : '';

  const contact = CONTACT_ITEMS.map((item) => `${item.label}: ${item.value}`).join('\n');

  const testimonials = TESTIMONIALS.slice(0, 2)
    .map((item) => `${item.name}: ${item.quote}`)
    .join('\n');

  const faqs = FAQ_DATA.map((item) => `Q: ${item.question}\nA: ${item.answer}`).join('\n\n');

  return [
    `Summary: ${RESUME_SUMMARY}`,
    `Focus Areas: ${focus}`,
    `Core Expertise: ${expertiseStr}`,
    `Current Experience: ${experience}`,
    'Services:',
    services,
    'Featured Projects:',
    topProjects,
    'Social Proof:',
    testimonials,
    'Frequently Asked Questions:',
    faqs,
    'Contact:',
    contact,
  ].join('\n\n');
}
