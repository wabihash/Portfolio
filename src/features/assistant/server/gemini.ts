import { GoogleGenerativeAI } from '@google/generative-ai';
import { ASSISTANT_SERVER_CONFIG } from './config';
import { buildPortfolioContext } from './portfolioContext';

export async function generateGeminiReply(messages: { role: string; content: string }[]) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const context = buildPortfolioContext();
    const systemPrompt = ASSISTANT_SERVER_CONFIG.systemPromptParts.join(' ');

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-3-flash-preview',
      systemInstruction: `${systemPrompt}\n\nPORTFOLIO CONTEXT:\n${context}`,
      generationConfig: {
        maxOutputTokens: ASSISTANT_SERVER_CONFIG.modelRequest.maxTokens,
        temperature: ASSISTANT_SERVER_CONFIG.modelRequest.temperature,
      },
    });

    const validMessages = messages.filter((m) => m.role === 'user' || m.role === 'assistant');
    
    // Gemini requires the LAST message to be from the 'user' for sendMessage, 
    // and the FIRST message in history to be from the 'user'.
    const lastUserMessage = validMessages[validMessages.length - 1].content;
    const historyData = validMessages.slice(0, -1);
    
    // Find the index of the first 'user' message to satisfy Gemini requirements
    const firstUserIndex = historyData.findIndex(m => m.role === 'user');
    const sanitizedHistoryData = firstUserIndex === -1 ? [] : historyData.slice(firstUserIndex);

    const history = sanitizedHistoryData.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    console.log(`[Gemini] Starting chat with ${history.length} history items using gemini-3-flash-preview`);

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastUserMessage);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      console.warn('[Gemini] Empty response received');
      return null;
    }

    console.log(`[Gemini] Successfully generated reply (${text.length} chars)`);
    return text;
  } catch (error: any) {
    console.error('Gemini API Error details:', {
      message: error.message,
      stack: error.stack,
      status: error.status,
    });
    return null;
  }
}
