export const ASSISTANT_SERVER_CONFIG = {
  apiUrl: 'https://models.github.ai/inference/chat/completions',
  fallbackModels: [
    'openai/gpt-4.1-mini',
    'openai/gpt-4o-mini',
    'microsoft/phi-4-mini-instruct',
    'meta/meta-llama-3.1-8b-instruct',
  ],
  rateLimit: {
    maxRequestsPerWindow: 20,
    windowMs: 60_000,
  },
  messageLimits: {
    maxUserMessages: 8,
    maxMessageLength: 1200,
  },
  modelRequest: {
    temperature: 0.3,
    maxTokens: 420,
  },
  messages: {
    throttled: 'Too many requests. Please wait a moment and try again.',
    missingMessages: 'Please send at least one message.',
    providerUnavailable: 'Assistant provider is unavailable right now. Please try again soon.',
    catchFallback:
      'I can still help with portfolio questions. Ask about projects, services, or the best way to contact Wabi.',
  },
  fallbackResumeSummary:
    'Wabi is a full-stack developer focused on building modern, reliable web products with strong UI quality, practical backend architecture, and thoughtful AI-assisted features.',
  systemPromptParts: [
    "You are Wabi's portfolio assistant.",
    "Your job is to explain Wabi's skills, projects, services, and contact options clearly.",
    'Only answer using the provided portfolio context.',
    'If a question is outside the context, say you are limited to portfolio information and suggest using the contact form.',
    'Keep answers concise, professional, and practical.',
    "When useful, recommend specific projects by name and explain why they match the user's need.",
    'For hiring intent, include a short call to action to contact Wabi.',
    'Use short paragraphs or bullets and avoid long walls of text.',
  ],
} as const;
