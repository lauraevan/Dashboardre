import type { Theme } from '../App'

interface ClassificationCardProps {
  theme: Theme
}

const categories = [
  { key: 'seasonal',  label: 'SEASONAL',      colorLight: '#72b8ac', colorDark: '#6db5a9', lightCount: 20958, darkCount: 20965, pct: 32 },
  { key: 'erratic',   label: 'ERRATIC',        colorLight: '#d48fa6', colorDark: '#cd8ca2', lightCount: 10693, darkCount: 10687, pct: 19 },
  { key: 'step',      label: 'STEP_FUNCTION',  colorLight: '#a39bd6', colorDark: '#9e97d3', lightCount: 7389,  darkCount: 7389,  pct: 14 },
  { key: 'plateau',   label: 'PLATEAU',        colorLight: '#eca851', colorDark: '#e8a54e', lightCount: 6587,  darkCount: 6587,  pct: 16 },
  { key: 'linear',    label: 'LINEAR',         colorLight: '#7ea8d1', colorDark: '#7aa5ce', lightCount: 4713,  darkCount: 4713,  pct: 19 },
]

export function ClassificationCard({ theme }: ClassificationCardProps) {
  const isDark = theme === 'dark'

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 13,
      padding: '16px 22px 18px 22px',
      marginBottom: 20,
      boxShadow: 'var(--card-shadow)',
    }}>
      <div style={{
        fontSize: 13.5,
        fontWeight: 600,
        color: 'var(--text)',
        letterSpacing: '-0.01em',
        marginBottom: 12,
      }}>Classification</div>

      {/* Segmented bar */}
      <div style={{
        display: 'flex',
        gap: 3,
        height: 8,
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 10,
      }}>
        {categories.map(cat => (
          <div
            key={cat.key}
            style={{
              flex: cat.pct,
              background: isDark ? cat.colorDark : cat.colorLight,
              borderRadius: 3,
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        flexWrap: 'wrap',
      }}>
        {categories.map(cat => (
          <div key={cat.key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: isDark ? cat.colorDark : cat.colorLight,
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: 9.5,
              fontWeight: 500,
              letterSpacing: '0.12em',
              color: 'var(--muted)',
              textTransform: 'uppercase',
            }}>
              {cat.label}{' '}
              <span style={{ color: 'var(--subtle)', fontWeight: 400 }}>
                {(isDark ? cat.darkCount : cat.lightCount).toLocaleString()}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
