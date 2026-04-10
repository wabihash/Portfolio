import { detectFallbackIntent } from '@/features/assistant/server/fallback/intents';
import { buildFallbackReply } from '@/features/assistant/server/fallback/replies';
import type { AssistantRequestBody } from '@/features/assistant/types';

function getLatestUserMessage(messages: AssistantRequestBody['messages']): string {
  const latest = [...messages].reverse().find((message) => message.role === 'user');
  return latest?.content?.trim() || '';
}

export function buildLocalFallbackReply(messages: AssistantRequestBody['messages']): string {
  const latest = getLatestUserMessage(messages);
  const { intent, projectTitle } = detectFallbackIntent(latest);
  return buildFallbackReply(intent, projectTitle);
}
