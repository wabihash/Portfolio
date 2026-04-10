import { AnimatePresence, motion } from 'framer-motion';
import type { FormEvent, KeyboardEvent, ReactElement, RefObject } from 'react';

import { ASSISTANT_CONFIG } from '@/features/assistant/config';
import { PROMPT_STARTERS } from '@/features/assistant/promptStarters';
import type { AssistantMessage } from '@/features/assistant/types';
import React from 'react';

// Utility: parse message and replace /#route or /route with anchor buttons
function renderMessageWithLinks(content: string) {
  // Regex: match /#section or /section or /resume (not inside a word)
  const routeRegex = /(^|\s)(\/#[a-zA-Z0-9_-]+|\/resume|\/projects|\/services|\/skills|\/about|\/contact)(?=\s|\.|,|$)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = routeRegex.exec(content)) !== null) {
    const [fullMatch, pre, route] = match;
    // Push text before the match
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }
    // Push the matched route as a button-like anchor
    parts.push(
      <a
        key={`route-link-${key++}`}
        href={route}
        className="inline-block mx-1 rounded border border-cyan-400/60 bg-cyan-400/10 px-2 py-0.5 text-cyan-200 text-xs font-medium hover:bg-cyan-400/20 hover:text-cyan-50 transition-colors underline underline-offset-2"
        tabIndex={0}
      >
        {route}
      </a>
    );
    lastIndex = match.index + fullMatch.length;
  }
  // Push any remaining text
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }
  return parts;
}

type AssistantChatPanelProps = {
  isSubmitting: boolean;
  input: string;
  placeholder: string;
  messages: AssistantMessage[];
  inputRef: RefObject<HTMLTextAreaElement | null>;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onPromptStarterClick: (prompt: string) => void;
  onInputChange: (value: string) => void;
  onInputKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function AssistantChatPanel({
  isSubmitting,
  input,
  placeholder,
  messages,
  inputRef,
  messagesEndRef,
  onClose,
  onPromptStarterClick,
  onInputChange,
  onInputKeyDown,
  onSubmit,
}: AssistantChatPanelProps): ReactElement {
  return (
    <section className="glass-card w-[min(22rem,calc(100vw-0.75rem))] overflow-hidden rounded-xl border border-cyan-300/20 bg-[#07152f]/92 shadow-[0_24px_60px_rgba(3,9,20,0.75)] backdrop-blur-2xl sm:w-[24rem] sm:rounded-2xl">
      <header className="flex items-center justify-between border-b border-white/10 bg-linear-to-r from-cyan-400/20 via-sky-400/10 to-transparent px-3 py-2.5 sm:px-4 sm:py-3">
        <div>
          <h2 className="text-xs font-semibold text-cyan-100 sm:text-sm">{ASSISTANT_CONFIG.title}</h2>
          <p className="text-[11px] text-cyan-200/80 sm:text-xs">{ASSISTANT_CONFIG.subtitle}</p>
        </div>
        <button
          type="button"
          className="rounded-md border border-white/15 px-2 py-1 text-[11px] text-white/85 hover:bg-white/10 sm:text-xs"
          onClick={onClose}
        >
          {ASSISTANT_CONFIG.closeLabel}
        </button>
      </header>

      <div className="max-h-72 space-y-2.5 overflow-y-auto px-3 py-3 sm:max-h-80 sm:space-y-3 sm:px-4 sm:py-4">
        <AnimatePresence initial={false}>

          {messages.map((message) => (
            <motion.div
              key={message.id}
              layout
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={
                message.role === 'user'
                  ? 'ml-6 rounded-2xl rounded-tr-md bg-cyan-500/20 px-2.5 py-2 text-xs text-cyan-50 sm:ml-8 sm:px-3 sm:text-sm'
                  : 'mr-6 rounded-2xl rounded-tl-md bg-white/8 px-2.5 py-2 text-xs text-white/90 sm:mr-8 sm:px-3 sm:text-sm'
              }
            >
              {message.role === 'assistant'
                ? renderMessageWithLinks(message.content)
                : message.content}
            </motion.div>
          ))}

          {isSubmitting ? (
            <motion.div
              key="assistant-typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className="mr-6 flex items-center gap-1.5 rounded-2xl rounded-tl-md bg-white/8 px-2.5 py-2 text-xs text-white/70 sm:mr-8 sm:px-3 sm:text-sm"
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-cyan-100/80"
                animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
              />
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-cyan-100/80"
                animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY, delay: 0.15 }}
              />
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-cyan-100/80"
                animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
              />
              <span className="ml-1">Typing...</span>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-white/10 px-2.5 py-2 sm:px-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-100/70 sm:text-[11px]">
          {ASSISTANT_CONFIG.promptSectionLabel}
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {PROMPT_STARTERS.map((starter) => (
            <button
              key={starter.id}
              type="button"
              disabled={isSubmitting}
              onClick={() => onPromptStarterClick(starter.prompt)}
              className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-2 py-1 text-[10px] font-medium text-cyan-100 transition hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-60 sm:px-2.5 sm:text-[11px]"
            >
              {starter.label}
            </button>
          ))}
        </div>
      </div>

      <form className="border-t border-white/10 p-2.5 sm:p-3" onSubmit={onSubmit}>
        <label htmlFor="assistant-input" className="sr-only">
          Ask the assistant
        </label>
        <div className="flex items-end gap-1.5 sm:gap-2">
          <textarea
            ref={inputRef}
            id="assistant-input"
            value={input}
            onChange={(event) => onInputChange(event.target.value)}
            onKeyDown={onInputKeyDown}
            rows={2}
            maxLength={400}
            placeholder={placeholder}
            className="min-h-14 flex-1 resize-none rounded-xl border border-white/10 bg-[#051024] px-2.5 py-2 text-xs text-white outline-none placeholder:text-white/45 focus:border-cyan-300/50 sm:min-h-16 sm:px-3 sm:text-sm"
          />
          <button
            type="submit"
            disabled={isSubmitting || !input.trim()}
            className="rounded-xl bg-cyan-400 px-2.5 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60 sm:px-3 sm:text-sm"
          >
            {isSubmitting ? ASSISTANT_CONFIG.sendingLabel : ASSISTANT_CONFIG.sendLabel}
          </button>
        </div>
      </form>
    </section>
  );
}
