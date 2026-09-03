import type { Theme } from '../App'

interface KPIGridProps {
  theme: Theme
}

export function KPIGrid({ theme }: KPIGridProps) {
  const isDark = theme === 'dark'

  const kpis = isDark
    ? [
        { label: 'ACCOUNTS', value: '50,412', sub: null },
        { label: 'Q3 FORECAST P50 · RUN #470 · 06:07', value: '$63,962,532', sub: null },
        { label: 'SPREAD P10–P90', value: '8.8%', sub: null },
        { label: 'LOCKED IN · Q3', value: '$35.3M', sub: null },
      ]
    : [
        { label: 'ACCOUNTS', value: '50,314', sub: null },
        { label: 'Q3 FORECAST P50 · +$271K OVERNIGHT', value: '$61,725,259', sub: null },
        { label: 'SPREAD P10–P90', value: '8.6%', sub: null },
        { label: 'LOCKED IN · Q3', value: '$31.7 M', sub: null },
      ]

  const valueSizes = ['53px', '30px', '33px', '30px']

  return (
    <div style={{
      display: 'flex',
      alignItems: 'stretch',
      marginBottom: 18,
      gap: 0,
    }}>
      {kpis.map((kpi, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'stretch' }}>
          {i > 0 && (
            <div style={{
              width: 1,
              background: 'var(--border)',
              margin: '0 36px',
              alignSelf: 'stretch',
              flexShrink: 0,
            }} />
          )}
          <div style={{ minWidth: i === 0 ? 110 : i === 1 ? 260 : i === 2 ? 130 : 150 }}>
            <div style={{
              fontSize: 10.5,
              fontWeight: 500,
              letterSpacing: '0.12em',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              marginBottom: 5,
              whiteSpace: 'nowrap',
            }}>{kpi.label}</div>
            <div style={{
              fontSize: valueSizes[i],
              fontWeight: i === 0 ? 400 : 400,
              color: 'var(--text)',
              letterSpacing: i === 0 ? '-0.02em' : '-0.01em',
              lineHeight: 1.1,
              fontVariantNumeric: 'tabular-nums',
            }}>{kpi.value}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
