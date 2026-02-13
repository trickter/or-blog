import { describe, expect, it } from 'vitest';

describe('readtime formula', () => {
  it('calculates at least 1 min', () => {
    const words = 'a '.repeat(10).trim().split(/\s+/).length;
    expect(Math.max(1, Math.ceil(words / 220))).toBe(1);
  });
});
