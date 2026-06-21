/**
 * ArticleBlock — shared article card used on every article listing page.
 *
 * ⚠️  DO NOT CHANGE any style values below without an explicit request from the site owner.
 *     All font families, sizes, colors, and spacing are intentional and locked.
 *
 * Locked style constants:
 *   Headline class: text-2xl font-bold mb-6  (Tailwind — approx 24px)
 *   Article wrapper margin: mb-16
 *   Image: w-full rounded-lg shadow-md
 *
 * Hover tooltips (added per owner request):
 *   Headline → "Read on X"
 *   Image    → "Read original article"
 *
 * Share row (added per owner request):
 *   ✉ Email   → opens mail client with headline as subject and tinyUrl in body
 *   📋 Copy link → copies tinyUrl to clipboard, flashes "Copied!" for 2 seconds
 */

import { useState } from 'react';
import { useLocation } from 'wouter';

interface ArticleBlockProps {
  headline: string;
  tinyUrl: string;
  xPostUrl: string;
  imageSrc: string;
  tags?: string[];
}

export default function ArticleBlock({ headline, tinyUrl, xPostUrl, imageSrc, tags }: ArticleBlockProps) {
  const [copied, setCopied] = useState(false);
  const [, navigate] = useLocation();

  const handleCopy = () => {
    navigator.clipboard.writeText(tinyUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const emailSubject = encodeURIComponent(`Interesting article: ${headline}`);
  const emailBody = encodeURIComponent(`I thought you might find this article interesting:\n\n${tinyUrl}`);
  const mailtoHref = `mailto:?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6">
        <a
          href={xPostUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          title="Read on X"
        >
          {headline}
        </a>
      </h2>
      <a
        href={tinyUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Read original article"
      >
        <img src={imageSrc} alt={headline} className="w-full rounded-lg shadow-md" />
      </a>

      {/* Share row */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-xs uppercase tracking-wide text-gray-400 mr-1">Share:</span>

        {/* Email button */}
        <a
          href={mailtoHref}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-gray-300 bg-gray-50 text-gray-500 text-xs font-medium hover:bg-gray-100 hover:border-gray-400 hover:text-gray-700 transition-colors no-underline"
          title="Share via email"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <polyline points="2,4 12,13 22,4"/>
          </svg>
          Email
        </a>

        {/* Copy link button */}
        <button
          onClick={handleCopy}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded border text-xs font-medium transition-colors cursor-pointer ${
            copied
              ? 'border-green-400 bg-green-50 text-green-700'
              : 'border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-700'
          }`}
          title="Copy link to clipboard"
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              Copy link
            </>
          )}
        </button>
      </div>

      {/* Tags row */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => navigate(`/tag/${encodeURIComponent(tag)}`)}
              className="inline-block px-2 py-0.5 rounded-full text-xs font-medium cursor-pointer hover:opacity-75 transition-opacity"
              style={{ backgroundColor: '#f3e8e8', color: '#800000', border: '1px solid #d4a0a0' }}
              title={`View all articles tagged "${tag}"`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
