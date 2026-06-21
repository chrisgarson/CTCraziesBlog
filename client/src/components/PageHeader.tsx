/**
 * PageHeader — shared header used on every article listing page (Home + Page2–Page29).
 *
 * ⚠️  DO NOT CHANGE any style values below without an explicit request from the site owner.
 *     All font families, sizes, colors, and spacing are intentional and locked.
 *
 * Locked style constants:
 *   Title font:    Roboto Slab, serif  |  64px  |  700  |  color #800000
 *   Subtitle size: 28px  |  whiteSpace nowrap
 *   Quote font:    Caveat, cursive     |  32px  |  700  |  color #800000
 *   "President Trump:" font: Roboto Slab, serif | bold | color #1a1a1a
 */
export default function PageHeader() {
  return (
    <div className="text-center mb-12">
      <a
        href="/"
        style={{ textDecoration: 'none' }}
      >
        <h1
          className="text-center mb-2"
          style={{
            fontFamily: "'Roboto Slab', serif",
            fontSize: '64px',
            fontWeight: '700',
            color: '#800000',
          }}
        >
          Curating The Crazies
        </h1>
      </a>
      <p className="text-center mb-16" style={{ fontSize: '28px', whiteSpace: 'nowrap' }}>
        <span style={{ fontFamily: "'Roboto Slab', serif", fontWeight: 'bold', color: '#1a1a1a' }}>
          President Trump:
        </span>{' '}
        <span
          style={{
            fontFamily: "'Caveat', cursive",
            fontWeight: 'bold',
            color: '#800000',
            fontSize: '32px',
          }}
        >
          &ldquo;These people are crazy. I&rsquo;m telling you, they&rsquo;re crazy.&rdquo;
        </span>
      </p>
    </div>
  );
}
