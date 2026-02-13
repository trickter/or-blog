import { describe, expect, it } from 'vitest';
import { postSchema, tagSchema } from '@/lib/validations';

describe('schemas', () => {
  it('validates post payload', () => {
    expect(postSchema.safeParse({ title: 'title', slug: 'slug', content: 'content content', status: 'DRAFT', tagIds: [] }).success).toBe(true);
  });

  it('rejects invalid tag payload', () => {
    expect(tagSchema.safeParse({ name: 'a', slug: 'x' }).success).toBe(false);
  });
});
