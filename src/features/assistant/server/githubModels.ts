import { ASSISTANT_SERVER_CONFIG } from './config';
import { buildPortfolioContext } from './portfolioContext';
import { buildModelCandidates, isRetriableModelError } from './requestUtils';

const API_URL = process.env.GITHUB_MODELS_API_URL || ASSISTANT_SERVER_CONFIG.apiUrl;
const systemPrompt = ASSISTANT_SERVER_CONFIG.systemPromptParts.join(' ');

export async function generateGithubModelsReply(messages: { role: string; content: string }[]) {
  const apiKey = process.env.GITHUB_MODELS_API_KEY || process.env.GITHUB_TOKEN;
  if (!apiKey) return null;

  const context = buildPortfolioContext();
  const modelCandidates = buildModelCandidates();

  for (const model of modelCandidates) {
    try {
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
        let providerMessage = 'Unknown error';
        try {
          const errorData = (await response.json()) as { error?: { message?: string } };
          providerMessage = errorData.error?.message || 'Error details unavailable';
        } catch {
          // empty
        }

        console.warn(`[GitHub Models] ${model} failed: ${providerMessage}`);
        
        if (isRetriableModelError(response.status, providerMessage)) {
          continue;
        }
        break; 
      }

      const data = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };

      const reply = data.choices?.[0]?.message?.content?.trim();
      if (reply) {
        return { reply, model };
      }
    } catch (err) {
      console.error(`[GitHub Models] Critical error with model ${model}:`, err);
      continue;
    }
  }

  return null;
}
