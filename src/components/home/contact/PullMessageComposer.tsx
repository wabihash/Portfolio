'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion';
import { ContactForm } from '@/components/home/contact/ContactForm';

const PULL_TO_OPEN_THRESHOLD = 78;
const PULL_TO_CLOSE_THRESHOLD = -62;
const DRAG_TO_CLOSE_THRESHOLD = -110;
const KNOB_DRAG_TOP_LIMIT = -56;
const KNOB_DRAG_BOTTOM_LIMIT = 72;
const PANEL_DRAG_TOP_LIMIT = -24;
const PANEL_DRAG_BOTTOM_LIMIT = 136;
const AUTO_CLOSE_AFTER_SEND_MS = 2500;
const SUCCESS_TOAST_AUTO_HIDE_MS = 4200;
const DELAY_BEFORE_SUCCESS_MS = 700;
const MOBILE_BREAKPOINT = '(max-width: 640px)';

export function PullMessageComposer() {
  const shouldReduceMotion = useReducedMotion();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPullHintActive, setIsPullHintActive] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const autoCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const successHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const successRevealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  function playOpenPopVoiceCue() {
    if (typeof window === 'undefined') {
      return;
    }

    const AudioContextCtor = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) {
      return;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextCtor();
    }

    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      void ctx.resume();
    }

    const now = ctx.currentTime;
    const baseFrequency = 240 + Math.random() * 90;
    const glideTarget = baseFrequency * (1.4 + Math.random() * 0.12);

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.11, now + 0.02);
    masterGain.gain.exponentialRampToValueAtTime(0.045, now + 0.12);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.34);

    const toneFilter = ctx.createBiquadFilter();
    toneFilter.type = 'lowpass';
    toneFilter.frequency.setValueAtTime(2200, now);
    toneFilter.frequency.exponentialRampToValueAtTime(880, now + 0.3);
    toneFilter.Q.setValueAtTime(0.7, now);

    masterGain.connect(toneFilter);
    toneFilter.connect(ctx.destination);

    const leadOsc = ctx.createOscillator();
    leadOsc.type = 'triangle';
    leadOsc.frequency.setValueAtTime(baseFrequency, now);
    leadOsc.frequency.exponentialRampToValueAtTime(glideTarget, now + 0.18);

    const bodyOsc = ctx.createOscillator();
    bodyOsc.type = 'sine';
    bodyOsc.frequency.setValueAtTime(baseFrequency * 0.5, now);
    bodyOsc.frequency.exponentialRampToValueAtTime(baseFrequency * 0.76, now + 0.22);

    const vibrato = ctx.createOscillator();
    vibrato.type = 'sine';
    vibrato.frequency.setValueAtTime(6.2 + Math.random() * 1.1, now);

    const vibratoGain = ctx.createGain();
    vibratoGain.gain.setValueAtTime(5.5 + Math.random() * 1.8, now);
    vibrato.connect(vibratoGain);
    vibratoGain.connect(leadOsc.frequency);

    const airNoise = ctx.createBufferSource();
    const airBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.12), ctx.sampleRate);
    const airData = airBuffer.getChannelData(0);
    for (let i = 0; i < airData.length; i += 1) {
      airData[i] = (Math.random() * 2 - 1) * (1 - i / airData.length);
    }
    airNoise.buffer = airBuffer;

    const airFilter = ctx.createBiquadFilter();
    airFilter.type = 'bandpass';
    airFilter.frequency.setValueAtTime(1400 + Math.random() * 400, now);
    airFilter.Q.setValueAtTime(0.95, now);

    const airGain = ctx.createGain();
    airGain.gain.setValueAtTime(0.0001, now);
    airGain.gain.exponentialRampToValueAtTime(0.03, now + 0.018);
    airGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);

    airNoise.connect(airFilter);
    airFilter.connect(airGain);
    airGain.connect(masterGain);

    leadOsc.connect(masterGain);
    bodyOsc.connect(masterGain);

    leadOsc.start(now);
    bodyOsc.start(now);
    vibrato.start(now);
    airNoise.start(now);

    const stopAt = now + 0.34;
    leadOsc.stop(stopAt);
    bodyOsc.stop(stopAt);
    vibrato.stop(stopAt);
    airNoise.stop(now + 0.12);

    leadOsc.onended = () => {
      vibrato.disconnect();
      vibratoGain.disconnect();
      airGain.disconnect();
      airFilter.disconnect();
      toneFilter.disconnect();
      masterGain.disconnect();
    };
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);
    const syncViewport = () => setIsMobile(mediaQuery.matches);

    syncViewport();
    mediaQuery.addEventListener('change', syncViewport);

    return () => {
      mediaQuery.removeEventListener('change', syncViewport);
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
      if (successHideTimerRef.current) {
        clearTimeout(successHideTimerRef.current);
      }
      if (successRevealTimerRef.current) {
        clearTimeout(successRevealTimerRef.current);
      }
      if (audioContextRef.current) {
        void audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  const effectivePullOpenThreshold = isMobile ? 62 : PULL_TO_OPEN_THRESHOLD;
  const effectivePullCloseThreshold = isMobile ? -52 : PULL_TO_CLOSE_THRESHOLD;
  const effectiveDragToCloseThreshold = isMobile ? -92 : DRAG_TO_CLOSE_THRESHOLD;
  const effectiveKnobDragTopLimit = isMobile ? -46 : KNOB_DRAG_TOP_LIMIT;
  const effectiveKnobDragBottomLimit = isMobile ? 66 : KNOB_DRAG_BOTTOM_LIMIT;
  const effectivePanelDragTopLimit = isMobile ? -18 : PANEL_DRAG_TOP_LIMIT;
  const effectivePanelDragBottomLimit = isMobile ? 104 : PANEL_DRAG_BOTTOM_LIMIT;

  function scheduleAutoCloseAfterSend() {
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }

    autoCloseTimerRef.current = setTimeout(() => {
      setIsFormOpen(false);
    }, AUTO_CLOSE_AFTER_SEND_MS);
  }

  function handleContactSubmitSuccess(message: string) {
    if (successRevealTimerRef.current) {
      clearTimeout(successRevealTimerRef.current);
    }

    successRevealTimerRef.current = setTimeout(() => {
      setSuccessNotice(message);
      scheduleAutoCloseAfterSend();

      if (successHideTimerRef.current) {
        clearTimeout(successHideTimerRef.current);
      }

      successHideTimerRef.current = setTimeout(() => {
        setSuccessNotice(null);
      }, SUCCESS_TOAST_AUTO_HIDE_MS);
    }, DELAY_BEFORE_SUCCESS_MS);
  }

  function handlePullEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    setIsPullHintActive(false);

    if (info.offset.y >= effectivePullOpenThreshold || info.velocity.y >= 640) {
      if (!isFormOpen) {
        playOpenPopVoiceCue();
      }
      setIsFormOpen(true);
      return;
    }

    if (info.offset.y <= effectivePullCloseThreshold || info.velocity.y <= -540) {
      setIsFormOpen(false);
    }
  }

  function handleInlinePanelDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (info.offset.y <= effectiveDragToCloseThreshold || info.velocity.y <= -850) {
      setIsFormOpen(false);
    }
  }

  return (
    <>
      <AnimatePresence initial={false}>
        {successNotice ? (
          <motion.div
            key="contact-success-inline"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mb-10 flex justify-center w-full"
          >
            <p className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 dark:border-emerald-400/30 bg-emerald-500/10 dark:bg-emerald-500/12 px-4 py-2.5 text-center text-sm font-medium text-emerald-900 dark:text-emerald-100 shadow-sm dark:shadow-[0_12px_30px_rgba(16,185,129,0.15)]" role="status" aria-live="polite">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              {successNotice}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isFormOpen ? (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="pointer-events-none absolute inset-x-10 -top-8 h-56 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.5),rgba(59,130,246,0.18)_46%,transparent_74%)] opacity-60 blur-2xl sm:opacity-90"
          />
        ) : null}
      </AnimatePresence>

      <div className="mt-8 flex flex-col items-center">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)] sm:text-xs sm:tracking-[0.22em]">
          Want to reach out?
        </p>

        <motion.div
          className="mt-3 flex flex-col items-center origin-top"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  rotate: isFormOpen || isPullHintActive ? 0 : [0, 8, 0, -8, 0],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  rotate: isFormOpen || isPullHintActive
                    ? { duration: 0.2, ease: 'easeOut' }
                    : { duration: 1.6, repeat: Infinity, repeatDelay: 0.45, ease: 'easeInOut' },
                }
          }
        >
          <div className="h-14 w-px bg-linear-to-b from-indigo-500/60 dark:from-indigo-200/50 to-transparent" aria-hidden="true" />

          <div className="relative">
            <AnimatePresence>
              {isFormOpen ? (
                <motion.span
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.78, scale: 1.18 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="pointer-events-none absolute -inset-5 rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.45),rgba(59,130,246,0.18)_52%,transparent_74%)] opacity-60 blur-md sm:opacity-85"
                />
              ) : null}
            </AnimatePresence>

            <motion.button
              type="button"
              drag="y"
              dragConstraints={{ top: effectiveKnobDragTopLimit, bottom: effectiveKnobDragBottomLimit }}
              dragElastic={0.08}
              dragMomentum={false}
              dragSnapToOrigin
              onDragStart={() => setIsPullHintActive(true)}
              onDragEnd={handlePullEnd}
              aria-label="Pull down to open the message form, and pull up to close it"
              aria-expanded={isFormOpen}
              aria-controls="contact-message-form-panel"
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      boxShadow: isFormOpen
                        ? '0 0 0 1px rgba(255,255,255,0.18), 0 0 28px rgba(99,102,241,0.55), 0 14px 28px rgba(30,41,59,0.65)'
                        : '0 0 0 1px rgba(255,255,255,0.08), 0 16px 30px rgba(0,0,0,0.42)',
                    }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      boxShadow: { duration: 0.2, ease: 'easeOut' },
                    }
              }
              className="relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/60 sm:h-16 sm:w-16"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(165,180,252,0.35),transparent_66%)]"
              />
              <span className="relative h-2.5 w-2.5 rounded-full border border-[var(--border-strong)] bg-indigo-400/50" />
            </motion.button>
          </div>
        </motion.div>

        <p className="mt-3 text-xs text-[var(--text-secondary)] text-center">
          {isPullHintActive
            ? 'Nice pull. Release to open the message composer.'
            : isFormOpen
              ? 'Pull up to close.'
              : 'Pull down to open the message composer.'}
        </p>
      </div>

      <AnimatePresence>
        {isFormOpen ? (
          <motion.div
            id="contact-message-form-panel"
            drag="y"
            dragConstraints={{ top: effectivePanelDragTopLimit, bottom: effectivePanelDragBottomLimit }}
            dragElastic={0.1}
            onDragEnd={handleInlinePanelDragEnd}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22, height: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, height: 'auto' }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="mt-6 max-h-[84vh] overflow-hidden rounded-3xl border border-indigo-200/15 bg-[var(--bg-base)] shadow-[0_24px_60px_rgba(0,0,0,0.42)] sm:max-h-none"
          >
            <div className="flex justify-center pt-3">
              <div className="h-1.5 w-14 rounded-full bg-[var(--border-strong)]" />
            </div>
            <div className="border-b border-[var(--border-subtle)] px-5 pb-4 pt-2 sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Message form is open</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">Share your details below. Drag the form up when you are done.</p>
            </div>
            <div className="max-h-[65vh] overflow-y-auto px-4 pb-4 sm:max-h-none sm:px-6 sm:pb-5">
              <ContactForm autoFocusName onSubmitSuccess={handleContactSubmitSuccess} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
