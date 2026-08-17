import { describe, expect, it } from "vitest";
import { getArticleImageFallbackUrl } from "../client/src/lib/imageFallback";

describe("getArticleImageFallbackUrl", () => {
  it("maps only CTCrazies jsDelivr article-image URLs to the corresponding GitHub raw URL", () => {
    expect(
      getArticleImageFallbackUrl(
        "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/example.jpg"
      )
    ).toBe(
      "https://raw.githubusercontent.com/chrisgarson/CTCraziesBlog/main/article-images/example.jpg"
    );
  });

  it("does not substitute unrelated, legacy, or relative image URLs", () => {
    expect(getArticleImageFallbackUrl("/post40_clean.jpg")).toBeNull();
    expect(getArticleImageFallbackUrl("https://example.com/image.jpg")).toBeNull();
  });
});
