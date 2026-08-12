import { describe, expect, it } from "vitest";

describe("Cloudflare deployment credential", () => {
  it("is accepted by Cloudflare's token-verification endpoint", async () => {
    const token = process.env.CTCRAZIES_CF_TOKEN;
    expect(token, "CTCRAZIES_CF_TOKEN must be available for deployment").toBeTruthy();

    const response = await fetch("https://api.cloudflare.com/client/v4/user/tokens/verify", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await response.json() as { success?: boolean };
    expect(response.ok).toBe(true);
    expect(result.success).toBe(true);
  }, 15_000);
});
