import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const R2_IMAGE_PREFIX = "https://images.ctcrazies.com/article-images/";

describe("R2 article image migration", () => {
  it("maps all canonical article image references to the public R2 image domain", () => {
    const ledgerPath = resolve(process.cwd(), "data/article-ledger.json");
    const ledger = JSON.parse(readFileSync(ledgerPath, "utf-8"));
    const articles = Array.isArray(ledger) ? ledger : ledger.articles;

    expect(articles).toHaveLength(1480);
    for (const article of articles) {
      expect(article.imageUrl, `NUM ${article.num}`).toMatch(/^https:\/\/images\.ctcrazies\.com\/article-images\/.+$/);
    }
  });
});
