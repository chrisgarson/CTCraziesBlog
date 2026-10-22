import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const tagsIndexSource = readFileSync(
  resolve(process.cwd(), 'client/src/pages/TagsIndex.tsx'),
  'utf8',
);

describe('Tags page article counts', () => {
  it('derives every count from the canonical tag entry article array', () => {
    expect(tagsIndexSource).toContain('articleCount: Array.isArray(entry)');
    expect(tagsIndexSource).toContain('? entry.length');
    expect(tagsIndexSource).toContain(': Array.isArray(entry.articles)');
    expect(tagsIndexSource).toContain('? entry.articles.length');
  });

  it('renders each tag name beside its computed article count', () => {
    expect(tagsIndexSource).toContain('{tag.name} ({tag.articleCount})');
    expect(tagsIndexSource).toContain('aria-label={`${tag.name}: ${tag.articleCount}');
  });
});
