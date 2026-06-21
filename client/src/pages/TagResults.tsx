/**
 * TagResults — displays all articles that share a given tag.
 * Route: /tag/:tagName
 * Reads from /tag-index.json (static, built at batch time).
 *
 * ⚠️  DO NOT CHANGE any style values below without an explicit request from the site owner.
 */

import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import ArticleBlock from '../components/ArticleBlock';
import PageHeader from '../components/PageHeader';

interface Article {
  headline: string;
  tinyUrl: string;
  xPostUrl: string;
  imageSrc: string;
  tags: string[];
  page: number;
  batchDate: string;
}

export default function TagResults() {
  const params = useParams<{ tag: string }>();
  const [, navigate] = useLocation();
  const tagName = decodeURIComponent(params.tag || '');

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/tag-index.json')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load tag index');
        return r.json();
      })
      .then((data: Record<string, any[]>) => {
        // tag-index.json is an object: { "TagName": [article, ...], ... }
        // Find the matching key case-insensitively
        const matchingKey = Object.keys(data).find(
          (k) => k.toLowerCase() === tagName.toLowerCase()
        );
        const matches = matchingKey ? (data[matchingKey] || []) : [];
        // Normalize: index stores imageUrl, component expects imageSrc
        const normalized: Article[] = matches.map((a: any) => ({
          headline: a.headline || '',
          tinyUrl: a.tinyUrl || '',
          xPostUrl: a.xPostUrl || '',
          imageSrc: a.imageSrc || a.imageUrl || '',
          tags: a.tags || [],
          page: a.page || 0,
          batchDate: a.batchDate || '',
        }));
        setArticles(normalized);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [tagName]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <PageHeader />

      {/* Back link */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          ← Back to Home
        </button>
      </div>

      {/* Tag heading */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700">
          Articles tagged:{' '}
          <span
            className="inline-block px-3 py-1 rounded-full text-sm font-medium"
            style={{ backgroundColor: '#f3e8e8', color: '#800000', border: '1px solid #d4a0a0' }}
          >
            {tagName}
          </span>
        </h2>
        {!loading && (
          <p className="text-sm text-gray-400 mt-1">
            {articles.length} {articles.length === 1 ? 'article' : 'articles'} found
          </p>
        )}
      </div>

      {loading && (
        <p className="text-gray-400 text-sm">Loading articles…</p>
      )}

      {error && (
        <p className="text-red-500 text-sm">Error: {error}</p>
      )}

      {!loading && !error && articles.length === 0 && (
        <p className="text-gray-500 text-sm">No articles found for this tag.</p>
      )}

      {!loading && !error && articles.map((article, idx) => (
        <div key={idx}>
          <ArticleBlock
            headline={article.headline}
            tinyUrl={article.tinyUrl}
            xPostUrl={article.xPostUrl}
            imageSrc={article.imageSrc}
            tags={article.tags}
          />
          {(article.page > 0 || article.batchDate) && (
            <div className="flex items-center gap-4 -mt-4 mb-6 px-1">
              <span className="text-sm text-gray-500" style={{ fontFamily: 'Roboto Slab, serif' }}>
                {article.page > 0 && (
                  <a
                    href={article.page === 1 ? '/' : `/page${article.page}`}
                    className="text-blue-600 hover:underline"
                  >
                    Page {article.page}
                  </a>
                )}
                {article.page > 0 && article.batchDate && <>&nbsp;&bull;&nbsp;</>}
                {article.batchDate}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
