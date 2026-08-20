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
});
