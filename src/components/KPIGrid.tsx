import type { Theme } from '../App'

interface KPIGridProps {
  theme: Theme
}

export function KPIGrid({ theme }: KPIGridProps) {
  const isDark = theme === 'dark'

  const items = isDark
    ? [
        { label: 'ACCOUNTS',                         value: '50,412',       size: 50 },
        { label: 'Q3 FORECAST P50 · RUN #470 · 06:07', value: '$63,962,532', size: 29 },
        { label: 'SPREAD P10–P90',                   value: '8.8%',         size: 32 },
        { label: 'LOCKED IN · Q3',                   value: '$35.3M',       size: 29 },
      ]
    : [
        { label: 'ACCOUNTS',                         value: '50,314',       size: 50 },
        { label: 'Q3 FORECAST P50 · +$271K OVERNIGHT', value: '$61,725,259', size: 29 },
        { label: 'SPREAD P10–P90',                   value: '8.6%',         size: 32 },
        { label: 'LOCKED IN · Q3',                   value: '$31.7 M',      size: 29 },
      ]

  return (
    <div style={{ display: 'flex', alignItems: 'stretch', marginBottom: 20 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'stretch' }}>
          {i > 0 && (
            <div style={{
              width: 1,
              background: 'var(--border)',
              margin: '2px 34px',
            }} />
          )}
          <div>
            <div style={{
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.13em',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              marginBottom: 4,
              whiteSpace: 'nowrap',
            }}>{item.label}</div>
            <div style={{
              fontSize: item.size,
              fontWeight: 400,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              fontVariantNumeric: 'tabular-nums',
            }}>{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
