const requests = new Map<string, { count: number; resetAt: number }>();
export function checkRateLimit(key: string, limit = 20, windowMs = 60_000) {
  const now = Date.now(); const record = requests.get(key);
  if (!record || now > record.resetAt) { requests.set(key, { count: 1, resetAt: now + windowMs }); return true; }
  if (record.count >= limit) return false; record.count += 1; return true;
}
