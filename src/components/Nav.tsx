import { SITES } from '../data'

export function Nav() {
  return (
    <nav style={{
      height: 54, background: 'var(--nav)', borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', padding: '0 44px', gap: 0,
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 32 }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1" y="1" width="16" height="16" rx="3" stroke="#5fc4d4" strokeWidth="1.5"/>
          <path d="M5 9h8M9 5v8" stroke="#5fc4d4" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.02em' }}>UBG Dashboard</span>
      </div>

      {/* Site pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: 'auto' }}>
        {[SITES.synapse, SITES.polaris].map(s => (
          <div key={s.name} style={{
            display: 'flex', alignItems: 'center', gap: 5, height: 26,
            padding: '0 10px', borderRadius: 4, border: `1px solid ${s.color}22`,
            background: s.colorDim,
          }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: s.color }} />
            <span style={{ fontSize: 11.5, fontWeight: 500, color: s.color, letterSpacing: '-0.01em' }}>{s.name}</span>
            <span style={{ fontSize: 10, color: 'var(--muted)', marginLeft: 2 }}>{s.url}</span>
          </div>
        ))}
      </div>

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', color: 'var(--muted)',
          textTransform: 'uppercase', padding: '0 10px',
          border: '1px solid var(--border)', borderRadius: 4, height: 28,
          display: 'flex', alignItems: 'center',
        }}>30D</div>
        <div style={{
          display: 'flex', alignItems: 'center', height: 30, width: 180,
          border: '1px solid var(--border)', borderRadius: 4, background: 'var(--surface)',
          padding: '0 9px', gap: 6,
        }}>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ opacity: 0.4 }}>
            <circle cx="4.5" cy="4.5" r="3.5" stroke="currentColor" strokeWidth="1.1"/>
            <line x1="7.5" y1="7.5" x2="10" y2="10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: 11.5, color: 'var(--muted)' }}>Search...</span>
        </div>
        <div style={{
          height: 30, padding: '0 11px', border: '1px solid var(--border)', borderRadius: 4,
          background: 'var(--surface)', color: 'var(--text)', fontSize: 11.5, fontWeight: 500,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 .8l1 2.3 2.3.2-1.7 1.6.5 2.3L5 6l-2.1 1.2.5-2.3L1.7 3.3l2.3-.2L5 .8z" fill="#5fc4d4"/>
          </svg>
          Ask
        </div>
      </div>
    </nav>
  )
}
