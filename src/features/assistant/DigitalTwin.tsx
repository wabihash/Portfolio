'use client';

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import { AssistantChatPanel } from '@/features/assistant/components/AssistantChatPanel';
import { AssistantLauncher } from '@/features/assistant/components/AssistantLauncher';
import { ASSISTANT_CONFIG } from '@/features/assistant/config';
import { useTypewriterText } from '@/features/assistant/hooks/useTypewriterText';
import type {
  AssistantMessage,
  AssistantRequestBody,
  AssistantResponseBody,
} from '@/features/assistant/types';

const INITIAL_MESSAGE: AssistantMessage = {
  id: 'assistant-welcome',
  role: 'assistant',
  content: ASSISTANT_CONFIG.initialAssistantMessage,
};

function createMessage(role: AssistantMessage['role'], content: string): AssistantMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
  };
}

export function DigitalTwin(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [input, setInput] = useState('');
  const [showGreeting, setShowGreeting] = useState(true);
  const [messages, setMessages] = useState<AssistantMessage[]>([INITIAL_MESSAGE]);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const typedGreeting = useTypewriterText(
    ASSISTANT_CONFIG.greetingTitle,
    showGreeting,
    ASSISTANT_CONFIG.greetingTypeSpeedMs
  );

  const placeholder = useMemo(() => ASSISTANT_CONFIG.inputPlaceholder, []);

  function closeGreeting(): void {
    setShowGreeting(false);
  }

  function openAssistant(): void {
    setIsOpen(true);
    setShowGreeting(false);
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 80);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [isOpen, isSubmitting, messages]);

  async function handleSend(rawText?: string): Promise<void> {
    const trimmed = (rawText ?? input).trim();
    if (!trimmed || isSubmitting) {
      return;
    }

    const nextUserMessage = createMessage('user', trimmed);
    const nextMessages = [...messages, nextUserMessage];

    setMessages(nextMessages);
    if (!rawText) {
      setInput('');
    }
    setIsSubmitting(true);

    try {
      const payload: AssistantRequestBody = {
        messages: nextMessages.map(({ role, content }) => ({ role, content })),
      };

      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const body = (await response.json()) as AssistantResponseBody;

      if (!response.ok || !body.reply) {
        const fallback = body.error || 'Assistant is unavailable right now. Please try again.';
        setMessages((current) => [...current, createMessage('assistant', fallback)]);
        return;
      }

      setMessages((current) => [...current, createMessage('assistant', body.reply as string)]);
    } catch {
      setMessages((current) => [
        ...current,
        createMessage('assistant', 'Network issue detected. Please retry in a moment.'),
      ]);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handlePromptStarterClick(prompt: string): void {
    void handleSend(prompt);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key !== 'Enter') {
      return;
    }

    if (event.shiftKey) {
      return;
    }

    event.preventDefault();
    void handleSend();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await handleSend();
  }

  return (
    <div className="fixed bottom-3 right-3 z-50 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <AssistantChatPanel
          isSubmitting={isSubmitting}
          input={input}
          placeholder={placeholder}
          messages={messages}
          inputRef={inputRef}
          messagesEndRef={messagesEndRef}
          onClose={() => setIsOpen(false)}
          onPromptStarterClick={handlePromptStarterClick}
          onInputChange={setInput}
          onInputKeyDown={handleInputKeyDown}
          onSubmit={handleSubmit}
        />
      ) : (
        <AssistantLauncher
          showGreeting={showGreeting}
          greetingText={typedGreeting || ASSISTANT_CONFIG.greetingTitle}
          onDismissGreeting={closeGreeting}
          onOpenAssistant={openAssistant}
        />
      )}
    </div>
  );
}
