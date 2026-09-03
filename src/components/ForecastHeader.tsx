import type { Theme } from '../App'

interface ForecastHeaderProps {
  theme: Theme
}

export function ForecastHeader({ theme }: ForecastHeaderProps) {
  const isDark = theme === 'dark'

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingTop: 28,
      paddingBottom: 20,
    }}>
      {/* Left: title */}
      <div>
        <h1 style={{
          fontSize: 28,
          fontWeight: 600,
          color: 'var(--text)',
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          marginBottom: 5,
        }}>Forecast</h1>
        <div style={{
          fontSize: 12,
          color: 'var(--muted)',
          letterSpacing: '0.01em',
        }}>
          {isDark
            ? 'Data as of Aug 30, 2026 · Run #470'
            : 'Data as of Aug 31, 2026 · Run #471'}
        </div>
      </div>

      {/* Right: status card */}
      <div style={{
        width: 242,
        border: '1px solid var(--border)',
        borderRadius: 12,
        background: 'var(--surface)',
        padding: '10px 14px',
        boxShadow: 'var(--card-shadow)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: isDark ? 'var(--muted)' : '#4cbc7a',
            flexShrink: 0,
          }} />
          <span style={{
            fontSize: 12.5,
            fontWeight: 600,
            color: 'var(--text)',
          }}>Claude · nightly forecast</span>
        </div>
        <div style={{
          fontSize: 11,
          color: 'var(--muted)',
          paddingLeft: 15,
          letterSpacing: '0.01em',
        }}>
          {isDark
            ? 'Scheduled 3:00 AM · est 3h 10m'
            : 'Run #471 complete · 06:07 ✓'}
        </div>
      </div>
    </div>
  )
}
