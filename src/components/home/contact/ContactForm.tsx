'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2, Send, TriangleAlert } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

type ContactFormProps = {
  autoFocusName?: boolean;
  onSubmitSuccess?: (message: string) => void;
};

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const MESSAGE_MAX_LENGTH = 1200;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactForm({ autoFocusName = false, onSubmitSuccess }: ContactFormProps) {
  const searchParams = useSearchParams();
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const source = searchParams.get('source');
    const prefills = {
      subject: searchParams.get('subject')?.trim() ?? '',
      message: searchParams.get('message')?.trim() ?? '',
    };

    if (source === 'resume') {
      setValues((prev) => {
        const nextValues = {
          ...prev,
          subject: prefills.subject || 'Resume Inquiry',
          message: '',
        };

        return nextValues.subject === prev.subject && nextValues.message === prev.message
          ? prev
          : nextValues;
      });
      return;
    }

    if (!prefills.subject && !prefills.message) {
      return;
    }

    setValues((prev) => {
      const nextValues = {
        ...prev,
        subject: prev.subject || prefills.subject,
        message: prev.message || prefills.message,
      };

      return nextValues.subject === prev.subject && nextValues.message === prev.message
        ? prev
        : nextValues;
    });
  }, [searchParams]);

  function validate(currentValues: ContactFormValues): ContactFormErrors {
    const nextErrors: ContactFormErrors = {};

    if (!currentValues.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!currentValues.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!isValidEmail(currentValues.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!currentValues.subject.trim()) nextErrors.subject = 'Please add a subject.';
    if (!currentValues.message.trim()) nextErrors.message = 'Please write your message.';
    if (currentValues.message.trim().length > MESSAGE_MAX_LENGTH) {
      nextErrors.message = `Message is too long. Keep it under ${MESSAGE_MAX_LENGTH} characters.`;
    }

    return nextErrors;
  }

  function handleChange(field: keyof ContactFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const payload = {
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim().slice(0, MESSAGE_MAX_LENGTH),
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorPayload = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(errorPayload.error || 'Unable to send your message right now. Please try again soon.');
      }

      setValues(INITIAL_VALUES);
      setErrors({});
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
      onSubmitSuccess?.('Message sent successfully. I will get back to you soon.');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong while sending your message.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-md md:p-6" noValidate>
      <h3 className="text-lg font-semibold text-white">Send a Message</h3>
      <p className="mt-1 text-sm text-gray-400">Share your project goals, timeline, and what you need help with.</p>
      <p className="mt-1 text-xs text-gray-500">Typical response time: within 24 hours.</p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-1">
          <label htmlFor="contact-name" className="text-sm font-medium text-white/90">
            Your Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={values.name}
            onChange={(event) => handleChange('name', event.target.value)}
            autoFocus={autoFocusName}
            placeholder="John Doe"
            className="w-full rounded-xl border border-gray-800 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-gray-500 transition focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            autoComplete="name"
            required
          />
          {errors.name ? (
            <p id="contact-name-error" className="text-xs text-rose-300">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="space-y-2 md:col-span-1">
          <label htmlFor="contact-email" className="text-sm font-medium text-white/90">
            Your Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={values.email}
            onChange={(event) => handleChange('email', event.target.value)}
            placeholder="john@example.com"
            className="w-full rounded-xl border border-gray-800 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-gray-500 transition focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            autoComplete="email"
            required
          />
          {errors.email ? (
            <p id="contact-email-error" className="text-xs text-rose-300">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="contact-subject" className="text-sm font-medium text-white/90">
            Subject
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            value={values.subject}
            onChange={(event) => handleChange('subject', event.target.value)}
            placeholder="Project inquiry"
            className="w-full rounded-xl border border-gray-800 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-gray-500 transition focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
            autoComplete="off"
            required
          />
          {errors.subject ? (
            <p id="contact-subject-error" className="text-xs text-rose-300">
              {errors.subject}
            </p>
          ) : null}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="contact-message" className="text-sm font-medium text-white/90">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={values.message}
            onChange={(event) => handleChange('message', event.target.value)}
            placeholder="Tell me about your goals, scope, and timeline."
            maxLength={MESSAGE_MAX_LENGTH}
            className="min-h-36 w-full resize-y rounded-xl border border-gray-800 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-gray-500 transition focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            required
          />
          <div className="flex items-center justify-end">
            <p className="text-xs text-gray-500">
              {values.message.length}/{MESSAGE_MAX_LENGTH}
            </p>
          </div>
          {errors.message ? (
            <p id="contact-message-error" className="text-xs text-rose-300">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isSuccess}
        className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition active:scale-95 disabled:cursor-not-allowed ${
          isSuccess 
            ? 'bg-emerald-600 hover:bg-emerald-600' 
            : 'bg-purple-600 hover:bg-purple-700 disabled:bg-purple-700/60 disabled:opacity-75'
        }`}
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isSuccess ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {isSubmitting ? 'Sending...' : isSuccess ? 'Sent!' : 'Send Message'}
      </button>

      <AnimatePresence mode="wait" initial={false}>
        {submitError ? (
          <motion.p
            key="contact-error"
            initial={{ opacity: 0, y: 8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.985 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-rose-400/25 bg-rose-500/10 px-3 py-2 text-sm text-rose-300"
            role="alert"
            aria-live="assertive"
          >
            <TriangleAlert className="h-4 w-4" />
            {submitError}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
