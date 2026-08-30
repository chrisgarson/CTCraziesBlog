import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("public CTCrazies entry bundle", () => {
  it("does not eagerly load unused data-client providers", () => {
    const entryPath = resolve(process.cwd(), "client/src/main.tsx");
    const entry = readFileSync(entryPath, "utf-8");

    expect(entry).toContain('import { createRoot } from "react-dom/client";');
    expect(entry).toContain("render(<App />)");
    expect(entry).not.toContain("@tanstack/react-query");
    expect(entry).not.toContain("@trpc/client");
    expect(entry).not.toContain("trpc.Provider");
  });

  it("keeps the generated search dataset outside the Search route chunk", () => {
    const searchPath = resolve(process.cwd(), "client/src/pages/Search.tsx");
    const searchIndexPath = resolve(process.cwd(), "client/public/search-index.json");
    const search = readFileSync(searchPath, "utf-8");
    const searchIndex = JSON.parse(readFileSync(searchIndexPath, "utf-8"));

    expect(search).toContain("fetch('/search-index.json'");
    expect(search).not.toContain("const articles = [");
    expect(Array.isArray(searchIndex)).toBe(true);
    const maximumNum = Math.max(...searchIndex.map((article: { num: number }) => article.num));
    expect(searchIndex).toHaveLength(maximumNum);
    expect(searchIndex[0]).toMatchObject({ num: maximumNum, page: 1 });
  });
});
