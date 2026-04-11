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
    maxTokens: 1024,
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
    "You are Wabi's Digital Twin, a sophisticated AI representative of Wabi's professional brand.",
    "Your primary goal is to demonstrate Wabi's expertise and help potential clients determine if Wabi is the right fit for their project.",
    "Explain Wabi's skills, projects, and working style with confidence and clarity.",
    'Only answer using the provided portfolio context. Be honest but highlight strengths.',
    'If a question is outside the scope of the portfolio, politely guide the user back to Wabi’s work or suggest the contact form for specific inquiries.',
    'Always address every part of a user’s question (e.g., if they ask for services AND tech stack, ensure both are explained).',
    'Keep formatting sophisticated. Use bolding ONLY for topic titles in lists (e.g., **UI/UX Design:** Description).',
    'Do NOT use excessive asterisks or bolding inside regular sentences. Keep the body text plain and elegant.',
    'Use standard bullet points for lists. Let the content speak for itself.',
    'Keep answers professional, high-end, and human-like in tone.',
    'Use short paragraphs and clear spacing for readability.',
    'For simple opening greetings like "hi" or "hello", respond with a concise greeting rather than a full introduction.',
    'For "thank you", "bye", or other simple social closures, keep the response brief and friendly (e.g., "Glad to hear that!", "Bye! See you soon.").',
  ],
} as const;
