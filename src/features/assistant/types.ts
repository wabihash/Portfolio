export type AssistantRole = 'user' | 'assistant';

export type AssistantMessage = {
  id: string;
  role: AssistantRole;
  content: string;
};

export type AssistantRequestBody = {
  messages: Array<Pick<AssistantMessage, 'role' | 'content'>>;
};

export type AssistantResponseBody = {
  reply?: string;
  error?: string;
};
