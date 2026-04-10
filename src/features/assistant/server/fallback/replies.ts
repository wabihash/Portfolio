import { CONTACT_ITEMS } from '@/shared/data/contact';
import { HERO_OPEN_TO_ROLES, SERVICES, CORE_EXPERTISE_BADGES } from '@/shared/data/homeSections';
import { PROJECTS } from '@/shared/data/projects';
import { RESUME_EXPERIENCE, RESUME_SUMMARY } from '@/shared/data/resume';
import { ASSISTANT_SERVER_CONFIG } from '@/features/assistant/server/config';
import type { FallbackIntent } from '@/features/assistant/server/fallback/intents';

const ROUTES = {
  about: '/#about',
  services: '/#services',
  skills: '/#skills',
  projects: '/#projects',
  contact: '/#contact',
  resume: '/resume',
} as const;

function getContactValue(label: string): string {
  return CONTACT_ITEMS.find((item) => item.label.toLowerCase() === label.toLowerCase())?.value || '';
}

function underWordLimit(text: string, maxWords: number): string {
  const words = text.split(/\s+/).filter(Boolean);
  return words.length <= maxWords ? text : words.slice(0, maxWords).join(' ');
}

function buildOverviewReply(): string {
  const text = ASSISTANT_SERVER_CONFIG.fallbackResumeSummary;
  return [
    underWordLimit(text, 80),
    `For more, go to About: ${ROUTES.about}`,
  ].join('\n');
}

function buildServicesReply(): string {
  const services = SERVICES.map((service) => service.title).join(', ');
  return [
    `Wabi offers: ${services}.`,
    'Delivery style: clean UI/UX, full-stack implementation, and practical AI integration.',
    `For more, go to Services: ${ROUTES.services}`,
  ].join('\n');
}

function buildSkillsReply(): string {
  const skills = CORE_EXPERTISE_BADGES.join(', ');
  return [
    `Core skills: ${skills}.`,
    'Backend focus includes Node.js with SQL/MongoDB and scalable architecture.',
    `For more, go to Skills: ${ROUTES.skills}`,
  ].join('\n');
}

function buildProjectRecommendationReply(): string {
  const featuredProjects = PROJECTS.filter((project) => project.featured).slice(0, 3);

  if (featuredProjects.length < 3) {
    const fallbackProjects = PROJECTS.slice(0, 3);
    const list = fallbackProjects
      .map((project, index) => `${index + 1}) ${project.title}: ${project.impact}`)
      .join('\n');

    return [list, `For more, go to Projects: ${ROUTES.projects}`].join('\n');
  }

  const lines = [
    `1) ${featuredProjects[0].title}: ${featuredProjects[0].impact}`,
    `2) ${featuredProjects[1].title}: ${featuredProjects[1].impact}`,
    `3) ${featuredProjects[2].title}: ${featuredProjects[2].impact}`,
  ];

  return [...lines, `For more, go to Projects: ${ROUTES.projects}`].join('\n');
}

function buildProjectDetailsReply(projectTitle: string): string {
  const project = PROJECTS.find((item) => item.title.toLowerCase() === projectTitle.toLowerCase());

  if (!project) {
    return 'I can walk through any listed portfolio project. Ask by project name and I will summarize challenge, solution, and stack.';
  }

  const highlights = project.highlights.slice(0, 2).join(' ');
  return [
    `${project.title}: ${project.description}`,
    `Tech stack: ${project.techStack.join(', ')}. Key highlights: ${highlights}`,
    `For more, go to Projects: ${ROUTES.projects}`,
  ].join('\n');
}

function buildExperienceReply(): string {
  const current = RESUME_EXPERIENCE[0];

  if (!current) {
    return [RESUME_SUMMARY, `For more, go to Resume: ${ROUTES.resume}`].join('\n');
  }

  return [
    `${current.role} at ${current.organization} (${current.period}).`,
    `${current.highlights[0]} ${current.highlights[1]}`,
    `For more, go to Resume: ${ROUTES.resume}`,
  ].join('\n');
}

function buildAvailabilityReply(): string {
  return [
    HERO_OPEN_TO_ROLES,
    'Wabi is also available for freelance collaborations on web product projects.',
    `For contact details, go to Contact: ${ROUTES.contact}`,
  ].join('\n');
}

function buildContactReply(): string {
  return [
    'To hire Wabi or start a project, the best next step is to go to the Contact section and send a message through the form.',
    'This ensures your inquiry is delivered directly to Wabi\'s inbox.',
    `Click here to go to the form: ${ROUTES.contact}`,
  ].join('\n');
}

function buildOutOfScopeReply(): string {
  return 'Ask me about projects, services, skills, or how to contact Wabi.';
}

function buildGeneralReply(): string {
  return [
    ASSISTANT_SERVER_CONFIG.fallbackResumeSummary,
    'Ask me for project recommendations, services, stack details, availability, or contact steps.',
    `Quick links: About ${ROUTES.about}, Services ${ROUTES.services}, Skills ${ROUTES.skills}, Projects ${ROUTES.projects}, Contact ${ROUTES.contact}`,
  ].join('\n');
}

export function buildFallbackReply(intent: FallbackIntent, projectTitle?: string): string {
  switch (intent) {
    case 'greeting':
      return `Hi, I\'m Wabi\'s portfolio assistant. ${ASSISTANT_SERVER_CONFIG.fallbackResumeSummary}`;
    case 'farewell':
      return 'Thanks for visiting Wabi\'s portfolio. If you want, come back anytime and ask about projects, services, or how to start a collaboration.';
    case 'overview':
      return buildOverviewReply();
    case 'services':
      return buildServicesReply();
    case 'skills':
      return buildSkillsReply();
    case 'project-recommendation':
      return buildProjectRecommendationReply();
    case 'project-details':
      return buildProjectDetailsReply(projectTitle || '');
    case 'experience':
      return buildExperienceReply();
    case 'availability':
      return buildAvailabilityReply();
    case 'contact':
      return buildContactReply();
    case 'out-of-scope':
      return buildOutOfScopeReply();
    case 'general':
    default:
      return buildGeneralReply();
  }
}
