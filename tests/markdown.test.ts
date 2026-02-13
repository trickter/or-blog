import { describe, expect, it } from 'vitest';
import { renderMarkdown } from '@/lib/markdown';

describe('markdown', () => {
  it('renders headings', () => {
    expect(renderMarkdown('# Title')).toContain('<h1');
  });
});
