import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("bottom article-page utility navigation", () => {
  it("includes a Browse Tags link beside the shared article search link", () => {
    const pagination = readFileSync(
      resolve(process.cwd(), "client/src/components/Pagination.tsx"),
      "utf8",
    );

    expect(pagination).toContain('href="/search"');
    expect(pagination).toContain('href="/tags"');
    expect(pagination).toContain("Browse Tags");
  });
});

