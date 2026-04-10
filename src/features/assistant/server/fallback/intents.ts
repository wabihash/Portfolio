import { PROJECTS } from '@/shared/data/projects';

export type FallbackIntent =
  | 'greeting'
  | 'farewell'
  | 'overview'
  | 'services'
  | 'skills'
  | 'project-recommendation'
  | 'project-details'
  | 'experience'
  | 'availability'
  | 'contact'
  | 'out-of-scope'
  | 'general';

const OUT_OF_SCOPE_KEYWORDS = [
  'bitcoin',
  'crypto',
  'stock',
  'forex',
  'politics',
  'religion',
  'medical',
  'diagnose',
  'hack',
  'exploit',
  'malware',
  'adult',
  'bet',
  'casino',
  'astrology',
  'lottery',
  'news today',
  'weather today',
  'football score',
];

const GREETING_KEYWORDS = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'];
const FAREWELL_KEYWORDS = ['bye', 'goodbye', 'see you', 'cya', 'later'];
const IDENTITY_KEYWORDS = [
  'who are you',
  'what are you',
  'who is wabi',
  'whos wabi',
  "who's wabi",
  'tell me about wabi',
  'about wabi',
  'introduce wabi',
  'introduce yourself',
];
const OVERVIEW_KEYWORDS = ['overview', 'summary', 'quick overview', 'wabi overview'];
const SERVICE_KEYWORDS = [
  'service',
  'services',
  'offer',
  'offers',
  'what do you do',
  'tech stack',
  'technology stack',
  'what services',
  'which services',
  'what stack',
  'which stack',
  'supports those services',
  'stack of wabi',
  'give me the stack',
  'give me stack',
  'wabi stack',
  'stack wabi',
  "wabi's stack",
  "wabi's services",
  'stack for wabi',
  'services for wabi',
];
const SKILL_KEYWORDS = [
  'skill',
  'skills',
  'stack',
  'technology',
  'tech',
  'give me the skills',
  'give me skills',
  'skills of wabi',
  'wabi skills',
  'skills wabi',
  "wabi's skills",
  'skills for wabi',
  "wabi's stack",
  'stack for wabi',
];
const PROJECT_RECOMMEND_KEYWORDS = [
  'best project',
  'best projects',
  'which project',
  'which projects',
  'recommend project',
  'recommend projects',
  'review first',
  'potential client',
  'top project',
  'top projects',
  'featured projects',
];
const EXPERIENCE_KEYWORDS = ['experience', 'background', 'resume', 'work history'];
const AVAILABILITY_KEYWORDS = ['available', 'availability', 'open to', 'internship', 'freelance', 'remote'];
const CONTACT_KEYWORDS = [
  'contact',
  'hire',
  'hire or contact',
  'hire contact',
  'hire wabi',
  'how to hire wabi',
  'how can i hire wabi',
  'how do i hire wabi',
  'contact wabi',
  'how to contact wabi',
  'how can i contact wabi',
  'how do i contact wabi',
  'email',
  'phone',
  'whatsapp',
  'reach',
  'next step',
  'how can i hire',
  'how do i hire',
  'how to hire',
  'how can i contact',
  'how do i contact',
  'how to contact',
  'how can i reach',
  'how do i reach',
  'how to reach',
  'who can i contact',
  'who do i contact',
  'who should i contact',
  'who can i hire',
  'who do i hire',
  'who should i hire',
  'get in touch',
  'work with',
  'collaborate with',
  'start a project',
  'start collaboration',
  'for a project',
  'include the best next step',
];

const TYPO_CORRECTIONS: Record<string, string> = {
  servies: 'services',
  servicee: 'service',
  projecs: 'projects',
  projet: 'project',
  contat: 'contact',
  conatct: 'contact',
  experiance: 'experience',
  availablity: 'availability',
  technolgy: 'technology',
  teck: 'tech',
  gudbye: 'goodbye',
  heyy: 'hey',
  helloo: 'hello',
  whos: "who's",
};

function includesAny(text: string, keywords: string[]): boolean {
  const words = text.split(' ').filter(Boolean);

  return keywords.some((keyword) => {
    if (text.includes(keyword)) {
      return true;
    }

    if (keyword.includes(' ')) {
      // For multi-word keywords, check if all words are present in any order (robust phrase match)
      const keywordWords = keyword.split(' ').filter(Boolean);
      return keywordWords.every((kw) => words.some((w) => isFuzzyMatch(w, kw)));
    }

    return words.some((word) => isFuzzyMatch(word, keyword));
  });
}

function levenshteinDistance(a: string, b: string): number {
  if (a === b) {
    return 0;
  }

  if (!a.length) {
    return b.length;
  }

  if (!b.length) {
    return a.length;
  }

  const matrix: number[][] = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i += 1) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= b.length; j += 1) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[a.length][b.length];
}

function isFuzzyMatch(word: string, keyword: string): boolean {
  const lengthDelta = Math.abs(word.length - keyword.length);
  if (lengthDelta > 1) {
    return false;
  }

  const distance = levenshteinDistance(word, keyword);
  if (keyword.length <= 4) {
    return distance <= 1;
  }

  return distance <= 2;
}

function normalizeMessage(message: string): string {
  return message
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function applyTypoCorrections(text: string): string {
  return text
    .split(' ')
    .map((word) => TYPO_CORRECTIONS[word] || word)
    .join(' ');
}

function getMentionedProjectTitle(text: string): string | null {
  const normalized = text.toLowerCase();
  const project = PROJECTS.find(
    (item) => normalized.includes(item.title.toLowerCase()) || normalized.includes(item.id.toLowerCase())
  );

  return project?.title || null;
}

export function detectFallbackIntent(message: string): { intent: FallbackIntent; projectTitle?: string } {
  const normalized = applyTypoCorrections(normalizeMessage(message));

  if (!normalized) {
    return { intent: 'general' };
  }

  // Check for greetings first as they are very short and common
  if (includesAny(normalized, GREETING_KEYWORDS) && normalized.length < 40) {
    return { intent: 'greeting' };
  }

  if (includesAny(normalized, FAREWELL_KEYWORDS)) {
    return { intent: 'farewell' };
  }

  // PRIORITIZE PORTFOLIO INTENTS to avoid false out-of-scope matches
  // CONTACT check
  if (includesAny(normalized, CONTACT_KEYWORDS)) {
    return { intent: 'contact' };
  }

  // SERVICES check
  if (includesAny(normalized, SERVICE_KEYWORDS)) {
    return { intent: 'services' };
  }

  // SKILLS check
  if (includesAny(normalized, SKILL_KEYWORDS)) {
    return { intent: 'skills' };
  }

  // IDENTITY / OVERVIEW check (Moved up to prevent 'about' matching 'adult')
  if (
    includesAny(normalized, IDENTITY_KEYWORDS) ||
    normalized === 'wabi' ||
    normalized === 'who is wabi' ||
    normalized === "who's wabi" ||
    includesAny(normalized, OVERVIEW_KEYWORDS) ||
    normalized.includes('about')
  ) {
    return { intent: 'overview' };
  }

  // PROJECT DETAILS check
  const projectTitle = getMentionedProjectTitle(normalized);
  if (projectTitle) {
    return { intent: 'project-details', projectTitle };
  }

  // EXPERIENCE check
  if (includesAny(normalized, EXPERIENCE_KEYWORDS)) {
    return { intent: 'experience' };
  }

  // AVAILABILITY check
  if (includesAny(normalized, AVAILABILITY_KEYWORDS)) {
    return { intent: 'availability' };
  }

  // PROJECT RECOMMENDATION check
  if (includesAny(normalized, PROJECT_RECOMMEND_KEYWORDS)) {
    return { intent: 'project-recommendation' };
  }

  // NOW check out-of-scope, but with strict matching for short sensitive words
  const isStrictOutOfScope = OUT_OF_SCOPE_KEYWORDS.some((keyword) => {
    // If the keyword is short (<= 5 chars like 'adult', 'hack', 'bet'), require exact word match
    // This prevents 'about' from matching 'adult' or 'stack' matching 'stock'
    if (keyword.length <= 5) {
      const words = normalized.split(' ');
      return words.includes(keyword);
    }
    // For longer words, use the standard includesAny logic (fuzzy)
    return includesAny(normalized, [keyword]);
  });

  if (isStrictOutOfScope) {
    return { intent: 'out-of-scope' };
  }

  return { intent: 'general' };
}
