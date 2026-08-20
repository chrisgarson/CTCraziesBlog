import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const R2_IMAGE_PREFIX = "https://images.ctcrazies.com/article-images/";

describe("R2 article image migration", () => {
  it("maps all canonical article image references to the public R2 image domain", () => {
    const ledgerPath = resolve(process.cwd(), "data/article-ledger.json");
    const ledger = JSON.parse(readFileSync(ledgerPath, "utf-8"));
    const articles = Array.isArray(ledger) ? ledger : ledger.articles;
    const nums = articles.map((article: { num: number }) => article.num);
    const minimumNum = Math.min(...nums);
    const maximumNum = Math.max(...nums);

    expect(articles).toHaveLength(maximumNum - minimumNum + 1);
    for (const article of articles) {
      expect(article.imageUrl, `NUM ${article.num}`).toMatch(/^https:\/\/images\.ctcrazies\.com\/article-images\/.+$/);
    }

    const publicDir = resolve(process.cwd(), "client/public");
    const retainedLocalArticleImages = readdirSync(publicDir, { recursive: true })
      .filter((entry) => /\.(jpe?g|png|webp)$/i.test(entry) && entry !== "apple-touch-icon.png");
    expect(retainedLocalArticleImages).toEqual([]);
  });
});
