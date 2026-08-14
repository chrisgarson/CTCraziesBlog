import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('tag index cache behavior', () => {
  for (const page of ['TagsIndex.tsx', 'TagResults.tsx']) {
    it(`${page} bypasses stale browser cache when loading tag-index.json`, () => {
      const source = readFileSync(resolve(process.cwd(), 'client/src/pages', page), 'utf8');
      expect(source).toContain("fetch('/tag-index.json', { cache: 'no-store' })");
    });
  }
});
