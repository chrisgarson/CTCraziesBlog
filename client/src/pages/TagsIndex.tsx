/**
 * TagsIndex — A–Z browsable list of all active tags.
 * Route: /tags
 * Reads from /tag-index.json (static, built at batch time).
 *
 * ⚠️  DO NOT CHANGE any style values below without an explicit request from the site owner.
 */
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import PageHeader from '../components/PageHeader';

export default function TagsIndex() {
  const [, navigate] = useLocation();
  const [tagGroups, setTagGroups] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/tag-index.json')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load tag index');
        return r.json();
      })
      .then((data: Record<string, any[]>) => {
        // Group tags by first character (uppercase)
        const groups: Record<string, string[]> = {};
        Object.keys(data)
          .sort((a, b) => a.localeCompare(b))
          .forEach((tag) => {
            const firstChar = tag[0].toUpperCase();
            // Group digits under '#'
            const key = /[0-9]/.test(firstChar) ? '#' : firstChar;
            if (!groups[key]) groups[key] = [];
            groups[key].push(tag);
          });
        setTagGroups(groups);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const letters = Object.keys(tagGroups).sort((a, b) => {
    // Put '#' at the end
    if (a === '#') return 1;
    if (b === '#') return -1;
    return a.localeCompare(b);
  });

  const totalTags = Object.values(tagGroups).reduce((sum, arr) => sum + arr.length, 0);

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

      {/* Page heading */}
      <div className="mb-8 text-center">
        <h2
          style={{
            fontFamily: "'Roboto Slab', serif",
            fontSize: '32px',
            fontWeight: '700',
            color: '#800000',
          }}
        >
          Browse All Tags
        </h2>
        {!loading && !error && (
          <p style={{ fontSize: '16px', color: '#555', marginTop: '6px' }}>
            {totalTags} active tags — click any tag to view its articles
          </p>
        )}
      </div>

      {loading && (
        <p className="text-center text-gray-500">Loading tags…</p>
      )}

      {error && (
        <p className="text-center text-red-600">{error}</p>
      )}

      {!loading && !error && (
        <>
          {/* A–Z jump bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
              marginBottom: '40px',
              padding: '16px',
              backgroundColor: '#f9f5f0',
              borderRadius: '8px',
              border: '1px solid #e0d6cc',
            }}
          >
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                style={{
                  display: 'inline-block',
                  width: '36px',
                  height: '36px',
                  lineHeight: '36px',
                  textAlign: 'center',
                  backgroundColor: '#800000',
                  color: '#fff',
                  fontFamily: "'Roboto Slab', serif",
                  fontWeight: '700',
                  fontSize: '16px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#5a0000';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#800000';
                }}
              >
                {letter}
              </a>
            ))}
          </div>

          {/* Tag groups by letter */}
          {letters.map((letter) => (
            <div
              key={letter}
              id={`letter-${letter}`}
              style={{ marginBottom: '40px', scrollMarginTop: '20px' }}
            >
              {/* Letter heading */}
              <div
                style={{
                  fontFamily: "'Roboto Slab', serif",
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#800000',
                  borderBottom: '2px solid #800000',
                  paddingBottom: '6px',
                  marginBottom: '16px',
                }}
              >
                {letter}
              </div>

              {/* Tag list */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                {tagGroups[letter].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => navigate(`/tag/${encodeURIComponent(tag)}`)}
                    style={{
                      padding: '6px 14px',
                      backgroundColor: '#fff',
                      border: '1px solid #800000',
                      borderRadius: '20px',
                      color: '#800000',
                      fontFamily: "'Roboto Slab', serif",
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s, color 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      const btn = e.currentTarget as HTMLButtonElement;
                      btn.style.backgroundColor = '#800000';
                      btn.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      const btn = e.currentTarget as HTMLButtonElement;
                      btn.style.backgroundColor = '#fff';
                      btn.style.color = '#800000';
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Back to top */}
          <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #e0d6cc' }}>
            <a
              href="#"
              style={{
                color: '#800000',
                fontFamily: "'Roboto Slab', serif",
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'underline',
              }}
            >
              ↑ Back to top
            </a>
          </div>
        </>
      )}
    </div>
  );
}
