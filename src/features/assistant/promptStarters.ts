export type PromptStarter = {
  id: string;
  label: string;
  prompt: string;
};

export const PROMPT_STARTERS: PromptStarter[] = [
  {
    id: 'overview',
    label: 'Quick overview',
    prompt: 'Give me a quick overview of Wabi in under 80 words.',
  },
  {
    id: 'best-projects',
    label: 'Best projects for clients',
    prompt:
      'Which 3 projects should a potential client review first, and why? Keep it concise.',
  },
  {
    id: 'services',
    label: 'Services and stack',
    prompt: 'What services does Wabi offer and which tech stack supports those services?',
  },
  {
    id: 'hire',
    label: 'How to hire',
    prompt: 'How can I hire or contact Wabi for a project? Include the best next step.',
  },
];
