import { useState } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

function getPageUrl(page: number): string {
  return page === 1 ? '/' : `/page${page}`;
}

function buildPageRange(current: number, total: number): (number | '...')[] {
  if (total <= 9) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const delta = 2;
  const range: (number | '...')[] = [];
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  range.push(1);
  if (left > 2) range.push('...');
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push('...');
  range.push(total);

  return range;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const [jumpValue, setJumpValue] = useState('');
  const pages = buildPageRange(currentPage, totalPages);

  function handleJump(e: React.FormEvent) {
    e.preventDefault();
    const n = parseInt(jumpValue, 10);
    if (!isNaN(n) && n >= 1 && n <= totalPages) {
      window.location.href = getPageUrl(n);
    }
    setJumpValue('');
  }

  const linkBase: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '36px',
    height: '36px',
    padding: '0 8px',
    borderRadius: '4px',
    fontFamily: "'Roboto Slab', serif",
    fontWeight: '600',
    fontSize: '15px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background 0.15s, color 0.15s',
  };

  const activeStyle: React.CSSProperties = {
    ...linkBase,
    background: '#800000',
    color: '#fff',
    cursor: 'default',
  };

  const inactiveStyle: React.CSSProperties = {
    ...linkBase,
    background: 'transparent',
    color: '#800000',
    border: '1px solid #800000',
  };

  const navStyle: React.CSSProperties = {
    ...linkBase,
    background: 'transparent',
    color: '#800000',
    border: '1px solid #ccc',
    fontSize: '14px',
    padding: '0 10px',
  };

  const disabledStyle: React.CSSProperties = {
    ...navStyle,
    color: '#ccc',
    border: '1px solid #eee',
    cursor: 'not-allowed',
  };

  return (
    <div style={{ marginTop: '48px', paddingBottom: '32px' }}>
      {/* Main pagination row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>

        {/* Newest */}
        {currentPage > 1 ? (
          <a href={getPageUrl(1)} style={navStyle}>« Newest</a>
        ) : (
          <span style={disabledStyle}>« Newest</span>
        )}

        {/* Prev */}
        {currentPage > 1 ? (
          <a href={getPageUrl(currentPage - 1)} style={navStyle}>‹ Prev</a>
        ) : (
          <span style={disabledStyle}>‹ Prev</span>
        )}

        {/* Page numbers */}
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} style={{ ...linkBase, color: '#999', cursor: 'default', border: 'none' }}>…</span>
          ) : p === currentPage ? (
            <span key={p} style={activeStyle}>{p}</span>
          ) : (
            <a key={p} href={getPageUrl(p as number)} style={inactiveStyle}>{p}</a>
          )
        )}

        {/* Next */}
        {currentPage < totalPages ? (
          <a href={getPageUrl(currentPage + 1)} style={navStyle}>Next ›</a>
        ) : (
          <span style={disabledStyle}>Next ›</span>
        )}

        {/* Oldest */}
        {currentPage < totalPages ? (
          <a href={getPageUrl(totalPages)} style={navStyle}>Oldest »</a>
        ) : (
          <span style={disabledStyle}>Oldest »</span>
        )}
      </div>

      {/* Jump-to-page row */}
      <form
        onSubmit={handleJump}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '14px' }}
      >
        <label style={{ fontFamily: "'Roboto Slab', serif", fontSize: '14px', color: '#555' }}>
          Go to page:
        </label>
        <input
          type="number"
          min={1}
          max={totalPages}
          value={jumpValue}
          onChange={e => setJumpValue(e.target.value)}
          style={{
            width: '60px',
            height: '32px',
            padding: '0 8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontFamily: "'Roboto Slab', serif",
            fontSize: '14px',
            textAlign: 'center',
          }}
        />
        <button
          type="submit"
          style={{
            height: '32px',
            padding: '0 14px',
            background: '#800000',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontFamily: "'Roboto Slab', serif",
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Go
        </button>
      </form>

      {/* Search link row */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '14px' }}>
        <a
          href="/search"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: "'Roboto Slab', serif",
            fontSize: '14px',
            color: '#800000',
            textDecoration: 'none',
            border: '1px solid #800000',
            borderRadius: '4px',
            padding: '5px 14px',
          }}
        >
          🔍 Search All Articles
        </a>
      </div>
    </div>
  );
}
