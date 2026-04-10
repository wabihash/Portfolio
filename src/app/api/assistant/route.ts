import { NextResponse } from 'next/server';
import { buildPortfolioContext } from '@/features/assistant/server/portfolioContext';
import { checkRateLimit } from '@/features/assistant/server/rateLimit';
import { ASSISTANT_SERVER_CONFIG } from '@/features/assistant/server/config';
import { buildLocalFallbackReply } from '@/features/assistant/server/localFallback';
import type { AssistantRequestBody } from '@/features/assistant/types';

const API_URL = process.env.GITHUB_MODELS_API_URL || ASSISTANT_SERVER_CONFIG.apiUrl;

const systemPrompt = ASSISTANT_SERVER_CONFIG.systemPromptParts.join(' ');

function getClientIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) {
    return xff.split(',')[0]?.trim() || 'unknown';
  }

  const xRealIp = request.headers.get('x-real-ip');
  return xRealIp?.trim() || 'unknown';
}

function normalizeUserMessages(messages: AssistantRequestBody['messages']) {
  return messages
    .filter((message) => message.role === 'user' || message.role === 'assistant')
    .slice(-ASSISTANT_SERVER_CONFIG.messageLimits.maxUserMessages)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, ASSISTANT_SERVER_CONFIG.messageLimits.maxMessageLength),
    }));
}

function buildModelCandidates(): string[] {
  const configured = (process.env.GITHUB_MODELS_MODEL || '').trim();
  const candidates = [configured, ...ASSISTANT_SERVER_CONFIG.fallbackModels].filter(Boolean);
  return [...new Set(candidates)];
}

function isRetriableModelError(status: number, message: string): boolean {
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

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GITHUB_MODELS_API_KEY || process.env.GITHUB_TOKEN;

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

    if (!apiKey) {
      return NextResponse.json({
        reply: buildLocalFallbackReply(incomingMessages),
        mode: 'local-fallback',
      });
    }

    const context = buildPortfolioContext();
    const messages = normalizeUserMessages(incomingMessages);

    const modelCandidates = buildModelCandidates();
    let lastErrorMessage = ASSISTANT_SERVER_CONFIG.messages.providerUnavailable;
    let lastStatus = 502;

    for (const model of modelCandidates) {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          temperature: ASSISTANT_SERVER_CONFIG.modelRequest.temperature,
          max_tokens: ASSISTANT_SERVER_CONFIG.modelRequest.maxTokens,
          messages: [
            {
              role: 'system',
              content: `${systemPrompt}\n\nPortfolio Context:\n${context}`,
            },
            ...messages,
          ],
        }),
      });

      if (!response.ok) {
        const fallbackMessage = ASSISTANT_SERVER_CONFIG.messages.providerUnavailable;
        let providerMessage = fallbackMessage;

        try {
          const errorData = (await response.json()) as { error?: { message?: string } };
          providerMessage = errorData.error?.message || fallbackMessage;
        } catch {
          providerMessage = fallbackMessage;
        }

        lastErrorMessage = providerMessage;
        lastStatus = response.status;

        if (isRetriableModelError(response.status, providerMessage)) {
          continue;
        }

        return NextResponse.json({ error: providerMessage }, { status: response.status });
      }

      const data = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };

      const reply = data.choices?.[0]?.message?.content?.trim();

      if (reply) {
        return NextResponse.json({ reply, model });
      }
    }

    return NextResponse.json({
      reply: buildLocalFallbackReply(incomingMessages),
      mode: 'local-fallback',
      warning: `Model provider unavailable: ${lastErrorMessage}`,
      status: lastStatus,
    });
  } catch {
    return NextResponse.json({
      reply: ASSISTANT_SERVER_CONFIG.messages.catchFallback,
      mode: 'local-fallback',
    });
  }
}
