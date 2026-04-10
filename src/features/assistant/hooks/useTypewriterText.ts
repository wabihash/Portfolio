import { useEffect, useState } from 'react';

export function useTypewriterText(text: string, enabled: boolean, speedMs: number): string {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (!enabled) {
      setTyped('');
      return;
    }

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setTyped(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, speedMs);

    return () => {
      window.clearInterval(interval);
    };
  }, [enabled, speedMs, text]);

  return typed;
}
