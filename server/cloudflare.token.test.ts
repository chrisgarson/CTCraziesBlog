import { describe, expect, it } from "vitest";

describe("Cloudflare deployment credential", () => {
  it("is valid and can read the CTCrazies Pages project", async () => {
    const token = process.env.CTCRAZIES_CF_TOKEN;
    expect(token, "CTCRAZIES_CF_TOKEN must be available for deployment").toBeTruthy();

    const verifyResponse = await fetch("https://api.cloudflare.com/client/v4/user/tokens/verify", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const verifyResult = await verifyResponse.json() as { success?: boolean };
    expect(verifyResponse.ok).toBe(true);
    expect(verifyResult.success).toBe(true);

    const projectResponse = await fetch(
      "https://api.cloudflare.com/client/v4/accounts/f7c5978211a6a6db078f3c56ab7ab1cc/pages/projects/ctcrazies",
      { headers: { Authorization: `Bearer ${token}` } },
    );
    const projectResult = await projectResponse.json() as { success?: boolean };
    expect(projectResponse.ok).toBe(true);
    expect(projectResult.success).toBe(true);
  }, 15_000);
});
