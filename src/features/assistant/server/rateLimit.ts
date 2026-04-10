type CounterWindow = {
  count: number;
  windowStartedAt: number;
};

const counters = new Map<string, CounterWindow>();

export function checkRateLimit(key: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const current = counters.get(key);

  if (!current || now - current.windowStartedAt >= windowMs) {
    counters.set(key, { count: 1, windowStartedAt: now });
    return false;
  }

  if (current.count >= maxRequests) {
    return true;
  }

  current.count += 1;
  counters.set(key, current);
  return false;
}
