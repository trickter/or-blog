import { describe, expect, it } from 'vitest';
import { checkRateLimit } from '@/lib/rate-limit';

describe('rate limit', () => {
  it('blocks after reaching limit', () => {
    expect(checkRateLimit('ip', 2, 100000)).toBe(true);
    expect(checkRateLimit('ip', 2, 100000)).toBe(true);
    expect(checkRateLimit('ip', 2, 100000)).toBe(false);
  });
});
