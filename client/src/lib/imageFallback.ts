const JSDELIVR_IMAGE_PREFIX = "https://cdn.jsdelivr.net/gh/chrisgarson/CTCraziesBlog@main/article-images/";
const GITHUB_RAW_IMAGE_PREFIX = "https://raw.githubusercontent.com/chrisgarson/CTCraziesBlog/main/article-images/";

/**
 * Returns a public GitHub raw-content fallback only for a failed CTCrazies
 * jsDelivr article-image URL. Other image URLs deliberately receive no fallback.
 */
export function getArticleImageFallbackUrl(imageUrl: string): string | null {
  if (!imageUrl.startsWith(JSDELIVR_IMAGE_PREFIX)) {
    return null;
  }
  return `${GITHUB_RAW_IMAGE_PREFIX}${imageUrl.slice(JSDELIVR_IMAGE_PREFIX.length)}`;
}
