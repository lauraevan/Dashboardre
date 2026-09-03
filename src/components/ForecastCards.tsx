import type { Theme } from '../App'

interface ForecastCardsProps {
  theme: Theme
}

export function ForecastCards({ theme }: ForecastCardsProps) {
  const isDark = theme === 'dark'

  const forecastCards = isDark
    ? [
        { period: '30D',            spread: '5.6% SPREAD', value: '$56.0M', p10: 'P10 $54.4M', p90: 'P90 $57.6M' },
        { period: '60D',            spread: '7.4% SPREAD', value: '$59.5M', p10: 'P10 $57.3M', p90: 'P90 $61.7M' },
        { period: "Q3'26 END · NOV 20", spread: '8.8% SPREAD', value: '$64.0M', p10: 'P10 $61.1M', p90: 'P90 $66.8M', highlight: true },
      ]
    : [
        { period: '30D',            spread: '5.6% SPREAD', value: '$55.8M', p10: 'P10 $54.9M', p90: 'P90 $58.1M' },
        { period: '60D',            spread: '7.4% SPREAD', value: '$58.2M', p10: 'P10 $57.8M', p90: 'P90 $62.2M' },
        { period: "Q3'26 END · NOV 20", spread: '8.8% SPREAD', value: '$60.4M', p10: 'P10 $61.4M', p90: 'P90 $67.1M', highlight: true },
      ]

  const locked = isDark
    ? { locked: '$35.3M', modeled: '$28.7M' }
    : { locked: '$35.3M', modeled: '$28.9M' }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.06fr', gap: 13, marginBottom: 14 }}>
      {forecastCards.map((card, i) => (
        <div key={i} style={{
          background: 'var(--surface)',
          border: card.highlight
            ? `1.5px solid ${isDark ? '#323838' : '#c5cfd2'}`
            : '1px solid var(--border)',
          borderRadius: 12,
          padding: '14px 17px 13px',
          boxShadow: card.highlight
            ? (isDark ? '0 2px 8px rgba(0,0,0,0.35)' : '0 2px 6px rgba(0,0,0,0.06)')
            : 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 7 }}>
            <span style={{
              fontSize: 9.5,
              fontWeight: 500,
              letterSpacing: '0.13em',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              lineHeight: 1.4,
            }}>{card.period}</span>
            <span style={{
              fontSize: 8,
              fontWeight: 500,
              letterSpacing: '0.09em',
              color: 'var(--subtle)',
              textTransform: 'uppercase',
              border: '1px solid var(--border)',
              borderRadius: 4,
              padding: '2px 5px',
              whiteSpace: 'nowrap',
              marginLeft: 6,
              marginTop: 1,
            }}>{card.spread}</span>
          </div>
          <div style={{
            fontSize: 25,
            fontWeight: 400,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            marginBottom: 9,
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 1,
          }}>{card.value}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, color: 'var(--muted)', fontVariantNumeric: 'tabular-nums' }}>{card.p10}</span>
            <span style={{ fontSize: 10, color: 'var(--muted)', fontVariantNumeric: 'tabular-nums' }}>{card.p90}</span>
          </div>
        </div>
      ))}

      {/* Locked vs Modeled */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '14px 17px 13px',
      }}>
        <div style={{
          fontSize: 9.5,
          fontWeight: 500,
          letterSpacing: '0.13em',
          color: 'var(--muted)',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}>Q3 · LOCKED VS MODELED</div>

        {/* Bar */}
        <div style={{
          height: 6,
          borderRadius: 3,
          background: isDark ? '#252929' : '#e5eaec',
          overflow: 'hidden',
          marginBottom: 11,
        }}>
          <div style={{
            width: '55%',
            height: '100%',
            background: isDark ? '#c8cccc' : '#1e2a2b',
            borderRadius: 3,
          }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 2 }}>LOCKED</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>{locked.locked}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 2 }}>MODELED</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>{locked.modeled}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
