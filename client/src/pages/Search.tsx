import { useEffect, useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { Link } from 'wouter';

interface Article {
  num: number;
  headline: string;
  tinyUrl: string;
  xPostUrl: string;
  imageUrl: string;
  tags: string[];
  page: number;
  batchDate: string;
}

const fuseOptions = {
  keys: ['headline'],
  threshold: 0.0,
  ignoreLocation: true,
  useExtendedSearch: true,
  includeScore: true,
  minMatchCharLength: 2,
};

export default function Search() {
  const initialQuery = new URLSearchParams(window.location.search).get('q') ?? '';
  const [query, setQuery] = useState(initialQuery);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    fetch('/search-index.json', { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load search index');
        return response.json();
      })
      .then((data: unknown) => {
        if (!Array.isArray(data)) throw new Error('Invalid search index');
        if (!active) return;
        setArticles(data as Article[]);
        setLoading(false);
      })
      .catch((requestError: Error) => {
        if (!active) return;
        setError(requestError.message);
        setLoading(false);
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    const newUrl = query
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  }, [query]);

  const fuse = useMemo(() => new Fuse(articles, fuseOptions), [articles]);

  const results = useMemo(() => {
    if (!query.trim() || loading) return [];
    // If the query already uses extended search operators (=, ^, $, !, ', |)
    // pass it through as-is. Otherwise wrap each word in the include-word
    // prefix (') so Fuse.js performs exact token matching instead of fuzzy
    // substring matching.
    const hasOperator = /[=^$!'|]/.test(query);
    const words = query.trim().split(/\s+/);
    const normalizedQuery = hasOperator
      ? query
      : words.map(w => `'${w}`).join(' ');
    const fuseResults = fuse.search(normalizedQuery).map(r => r.item);
    // Post-filter: for plain queries, each search word must appear in the
    // headline either as a standalone word OR as part of a hyphenated compound
    // (e.g. "govt-dental"), but NOT embedded inside a non-hyphenated word
    // (e.g. "accidentally" should NOT match "dental").
    if (hasOperator) return fuseResults;
    return fuseResults.filter(item =>
      words.every(w => {
        const re = new RegExp(`(?:^|[\\s\\-])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:[\\s\\-,.'"!?;:()]|$)`, 'i');
        return re.test(item.headline);
      })
    );
  }, [query, fuse, loading]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-6">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 underline">
          &larr; Back to Home
        </Link>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4" style={{fontFamily: 'Roboto Slab, serif', color: '#800000'}}>
          Curating The Crazies
        </h1>
        <p className="text-xl mb-6" style={{fontFamily: 'Roboto Slab, serif'}}>
          <span style={{color: '#1a1a1a', fontFamily: 'Roboto Slab, serif', fontWeight: 'bold'}}>President Trump:</span>{' '}
          <span style={{color: '#800000', fontFamily: 'Caveat, cursive', fontWeight: 'bold', fontSize: '1.4rem'}}>&ldquo;These people are crazy. I&apos;m telling you, they&apos;re crazy.&rdquo;</span>
        </p>
        <h2 className="text-2xl font-semibold mb-4" style={{fontFamily: 'Roboto Slab, serif', color: '#1a1a1a'}}>
          Search All Articles
        </h2>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search headlines..."
          className="w-full max-w-xl px-4 py-2 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-red-800"
          style={{fontFamily: 'Roboto Slab, serif'}}
          autoFocus
        />
        <p className="text-xs text-gray-500 mt-2">
          Tip: Use <code>=word</code> for exact match, <code>^word</code> starts with, <code>word$</code> ends with, <code>!word</code> exclude, <code>&#39;word</code> includes, <code>a | b</code> for OR
        </p>
      </div>

      {loading && <p className="text-sm text-gray-500 mb-6">Loading search index…</p>}
      {error && <p className="text-sm text-red-700 mb-6">Unable to load search results. Please try again.</p>}
      {!loading && !error && query.trim() && (
        <p className="text-sm text-gray-600 mb-6" style={{fontFamily: 'Roboto Slab, serif'}}>
          {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
        </p>
      )}

      <div>
        {!loading && !error && results.map((article, idx) => (
          <div key={idx} className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-xl font-bold mb-2" style={{fontFamily: 'Roboto Slab, serif', color: '#1a1a1a'}}>
              <a href={article.tinyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {article.headline}
              </a>
            </h2>
            <div className="flex items-center gap-4 mt-1">
              <a href={article.xPostUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                View X Post
              </a>
              <span className="text-sm text-gray-500" style={{fontFamily: 'Roboto Slab, serif'}}>
                <a href={article.page === 1 ? '/' : `/page${article.page}`} className="text-blue-600 hover:underline">
                  Page {article.page}
                </a>
                &nbsp;&bull;&nbsp; {article.batchDate}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/" className="text-red-800 hover:underline" style={{fontFamily: 'Roboto Slab, serif'}}>
          &larr; Back to Page 1
        </Link>
      </div>
    </div>
  );
}
