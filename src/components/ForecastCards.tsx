import type { Theme } from '../App'

interface ForecastCardsProps {
  theme: Theme
}

export function ForecastCards({ theme }: ForecastCardsProps) {
  const isDark = theme === 'dark'

  const cards = isDark
    ? [
        {
          period: '30D',
          spread: '5.6% SPREAD',
          value: '$56.0M',
          p10: 'P10 $54.4M',
          p90: 'P90 $57.6M',
          type: 'forecast',
        },
        {
          period: '60D',
          spread: '7.4% SPREAD',
          value: '$59.5M',
          p10: 'P10 $57.3M',
          p90: 'P90 $61.7M',
          type: 'forecast',
        },
        {
          period: "Q3'26 END · NOV 20",
          spread: '8.8% SPREAD',
          value: '$64.0M',
          p10: 'P10 $61.1M',
          p90: 'P90 $66.8M',
          type: 'forecast',
          highlighted: true,
        },
        {
          period: 'Q3 · LOCKED VS MODELED',
          locked: '$35.3M',
          modeled: '$28.7M',
          lockedPct: 55,
          type: 'locked',
        },
      ]
    : [
        {
          period: '30D',
          spread: '5.6% SPREAD',
          value: '$55.8M',
          p10: 'P10 $54.9M',
          p90: 'P90 $58.1M',
          type: 'forecast',
        },
        {
          period: '60D',
          spread: '7.4% SPREAD',
          value: '$58.2M',
          p10: 'P10 $57.8M',
          p90: 'P90 $62.2M',
          type: 'forecast',
        },
        {
          period: "Q3'26 END · NOV 20",
          spread: '8.8% SPREAD',
          value: '$60.4M',
          p10: 'P10 $61.4M',
          p90: 'P90 $67.1M',
          type: 'forecast',
          highlighted: true,
        },
        {
          period: 'Q3 · LOCKED VS MODELED',
          locked: '$35.3M',
          modeled: '$28.9M',
          lockedPct: 55,
          type: 'locked',
        },
      ]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1.08fr',
      gap: 14,
      marginBottom: 16,
    }}>
      {cards.map((card, i) => {
        if (card.type === 'locked') {
          return (
            <div key={i} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 13,
              padding: '14px 18px',
              boxShadow: 'var(--card-shadow)',
            }}>
              <div style={{
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.14em',
                color: 'var(--muted)',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}>{card.period}</div>

              {/* Progress bar */}
              <div style={{
                height: 7,
                borderRadius: 4,
                background: isDark ? '#2a2e2e' : '#e8ecee',
                overflow: 'hidden',
                marginBottom: 10,
              }}>
                <div style={{
                  width: `${card.lockedPct}%`,
                  height: '100%',
                  background: isDark ? '#d4d8d8' : '#2a3535',
                  borderRadius: 4,
                }} />
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <div style={{
                    fontSize: 9.5,
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    color: 'var(--muted)',
                    textTransform: 'uppercase',
                    marginBottom: 2,
                  }}>LOCKED</div>
                  <div style={{
                    fontSize: 13.5,
                    fontWeight: 500,
                    color: 'var(--text)',
                  }}>{card.locked}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: 9.5,
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    color: 'var(--muted)',
                    textTransform: 'uppercase',
                    marginBottom: 2,
                  }}>MODELED</div>
                  <div style={{
                    fontSize: 13.5,
                    fontWeight: 500,
                    color: 'var(--text)',
                  }}>{card.modeled}</div>
                </div>
              </div>
            </div>
          )
        }

        return (
          <div key={i} style={{
            background: card.highlighted
              ? (isDark ? '#161a1a' : '#ffffff')
              : 'var(--surface)',
            border: card.highlighted
              ? `1.5px solid ${isDark ? '#363c3c' : '#c8d2d5'}`
              : '1px solid var(--border)',
            borderRadius: 13,
            padding: '14px 18px',
            boxShadow: card.highlighted
              ? (isDark ? '0 2px 8px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.07)')
              : 'var(--card-shadow)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: 6,
            }}>
              <div style={{
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.14em',
                color: 'var(--muted)',
                textTransform: 'uppercase',
                lineHeight: 1.3,
              }}>{card.period}</div>
              <div style={{
                fontSize: 8.5,
                fontWeight: 500,
                letterSpacing: '0.10em',
                color: 'var(--muted)',
                textTransform: 'uppercase',
                border: '1px solid var(--border)',
                borderRadius: 4,
                padding: '2px 5px',
                whiteSpace: 'nowrap',
                marginLeft: 4,
              }}>{card.spread}</div>
            </div>

            <div style={{
              fontSize: 26,
              fontWeight: 400,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
              marginBottom: 8,
              fontVariantNumeric: 'tabular-nums',
            }}>{card.value}</div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <div style={{
                fontSize: 10.5,
                color: 'var(--muted)',
                fontVariantNumeric: 'tabular-nums',
              }}>{card.p10}</div>
              <div style={{
                fontSize: 10.5,
                color: 'var(--muted)',
                fontVariantNumeric: 'tabular-nums',
              }}>{card.p90}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
