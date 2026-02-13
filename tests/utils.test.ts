import { describe, expect, it } from 'vitest';
import { slugify } from '@/lib/utils';

describe('slugify', () => {
  it('slugify Chinese/latin mix fallback', () => {
    expect(slugify('Hello  World!!')).toBe('hello-world');
  });
});
