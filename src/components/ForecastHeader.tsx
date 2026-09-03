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
      paddingTop: 26,
      paddingBottom: 22,
    }}>
      <div>
        <h1 style={{
          fontSize: 27,
          fontWeight: 600,
          color: 'var(--text)',
          letterSpacing: '-0.025em',
          lineHeight: 1.1,
          marginBottom: 6,
        }}>Forecast</h1>
        <div style={{
          fontSize: 11.5,
          color: 'var(--muted)',
          letterSpacing: '0.005em',
        }}>
          {isDark
            ? 'Data as of Aug 30, 2026 · Run #470'
            : 'Data as of Aug 31, 2026 · Run #471'}
        </div>
      </div>

      {/* Status card */}
      <div style={{
        width: 238,
        border: '1px solid var(--border)',
        borderRadius: 11,
        background: 'var(--surface)',
        padding: '11px 14px 10px',
        boxShadow: isDark ? '0 1px 4px rgba(0,0,0,0.25)' : '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <div style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: isDark ? '#687070' : '#3dba72',
            flexShrink: 0,
            marginTop: 1,
          }} />
          <span style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--text)',
            letterSpacing: '-0.005em',
          }}>Claude · nightly forecast</span>
        </div>
        <div style={{
          fontSize: 10.5,
          color: 'var(--muted)',
          paddingLeft: 14,
        }}>
          {isDark
            ? 'Scheduled 3:00 AM · est 3h 10m'
            : 'Run #471 complete · 06:07 ✓'}
        </div>
      </div>
    </div>
  )
}
