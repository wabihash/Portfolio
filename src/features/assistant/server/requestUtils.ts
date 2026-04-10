import { ASSISTANT_SERVER_CONFIG } from './config';
import type { AssistantRequestBody } from '../types';

export function getClientIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) {
    return xff.split(',')[0]?.trim() || 'unknown';
  }

  const xRealIp = request.headers.get('x-real-ip');
  return xRealIp?.trim() || 'unknown';
}

export function normalizeUserMessages(messages: AssistantRequestBody['messages']) {
  return messages
    .filter((message) => message.role === 'user' || message.role === 'assistant')
    .slice(-ASSISTANT_SERVER_CONFIG.messageLimits.maxUserMessages)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, ASSISTANT_SERVER_CONFIG.messageLimits.maxMessageLength),
    }));
}

export function isRetriableModelError(status: number, message: string): boolean {
  const lowered = message.toLowerCase();
  return (
    status === 400 ||
    status === 401 ||
    status === 403 ||
    lowered.includes('no access to model') ||
    lowered.includes('unknown model') ||
    lowered.includes('model not found')
  );
}

export function buildModelCandidates(): string[] {
  const configured = (process.env.GITHUB_MODELS_MODEL || '').trim();
  const candidates = [configured, ...ASSISTANT_SERVER_CONFIG.fallbackModels].filter(Boolean);
  return [...new Set(candidates)];
}
