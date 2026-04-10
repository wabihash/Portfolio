import { NextResponse } from 'next/server';
import { buildPortfolioContext } from '@/features/assistant/server/portfolioContext';
import { checkRateLimit } from '@/features/assistant/server/rateLimit';
import { ASSISTANT_SERVER_CONFIG } from '@/features/assistant/server/config';
import { buildLocalFallbackReply } from '@/features/assistant/server/localFallback';
import type { AssistantRequestBody } from '@/features/assistant/types';

import { getClientIp, normalizeUserMessages } from '@/features/assistant/server/requestUtils';

const systemPrompt = ASSISTANT_SERVER_CONFIG.systemPromptParts.join(' ');

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const isLimited = checkRateLimit(
      ip,
      ASSISTANT_SERVER_CONFIG.rateLimit.maxRequestsPerWindow,
      ASSISTANT_SERVER_CONFIG.rateLimit.windowMs
    );

    if (isLimited) {
      return NextResponse.json({ error: ASSISTANT_SERVER_CONFIG.messages.throttled }, { status: 429 });
    }

    const body = (await request.json()) as Partial<AssistantRequestBody>;
    const incomingMessages = body.messages ?? [];

    if (!Array.isArray(incomingMessages) || incomingMessages.length === 0) {
      return NextResponse.json({ error: ASSISTANT_SERVER_CONFIG.messages.missingMessages }, { status: 400 });
    }

    const messages = normalizeUserMessages(incomingMessages);

    // 1. Primary: Gemini (Free Tier + High Quality)
    if (process.env.GEMINI_API_KEY) {
      const { generateGeminiReply } = await import('@/features/assistant/server/gemini');
      const geminiReply = await generateGeminiReply(messages);
      
      if (geminiReply) {
        return NextResponse.json({ reply: geminiReply, mode: 'gemini' });
      }
    }

    // 2. Secondary: Github Models Fallback
    const { generateGithubModelsReply } = await import('@/features/assistant/server/githubModels');
    const githubResult = await generateGithubModelsReply(messages);
    
    if (githubResult) {
      return NextResponse.json({ 
        reply: githubResult.reply, 
        model: githubResult.model,
        mode: 'github-models'
      });
    }

    // 3. Absolute Fallback: Static Logic
    return NextResponse.json({
      reply: buildLocalFallbackReply(incomingMessages),
      mode: 'static-fallback',
    });
  } catch (error) {
    console.error('[API] Fatal Error:', error);
    return NextResponse.json({
      reply: ASSISTANT_SERVER_CONFIG.messages.catchFallback,
      mode: 'error-fallback',
    }, { status: 500 });
  }
}
