import { TOP_GAMES } from '../data'

export function TopGamesTable() {
  const totalMax = TOP_GAMES[0].synapse + TOP_GAMES[0].polaris

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 6, marginBottom: 12, overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '13px 18px 12px', borderBottom: '1px solid var(--border)',
        background: 'var(--surface2)',
      }}>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em' }}>
          Top Games · Combined
        </span>
        <span style={{ fontSize: 10, color: 'var(--muted)' }}>plays in last 30 days</span>
      </div>

      {/* Column headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '32px 1fr 100px 100px 120px 80px',
        padding: '8px 18px',
        borderBottom: '1px solid var(--border)',
        gap: 12,
      }}>
        {['#', 'GAME', 'SYNAPSE', 'POLARIS', 'COMBINED', 'TREND'].map(h => (
          <div key={h} style={{
            fontSize: 9, fontWeight: 600, letterSpacing: '0.12em',
            color: 'var(--muted)', textTransform: 'uppercase',
            textAlign: h === '#' ? 'center' : h === 'SYNAPSE' || h === 'POLARIS' || h === 'COMBINED' || h === 'TREND' ? 'right' : 'left',
          }}>{h}</div>
        ))}
      </div>

      {/* Rows */}
      {TOP_GAMES.map((g, i) => {
        const combined = g.synapse + g.polaris
        const barPct = (combined / totalMax) * 100
        const isPos = g.trend.startsWith('+')

        return (
          <div key={g.name} style={{
            display: 'grid',
            gridTemplateColumns: '32px 1fr 100px 100px 120px 80px',
            padding: '9px 18px',
            gap: 12,
            alignItems: 'center',
            borderBottom: i < TOP_GAMES.length - 1 ? '1px solid var(--border)' : 'none',
          }}>
            <div style={{ fontSize: 10, color: 'var(--subtle)', textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{g.rank}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: 500 }}>{g.name}</span>
              <div style={{ flex: 1, maxWidth: 160, height: 3, borderRadius: 2, background: 'var(--border)', overflow: 'hidden' }}>
                <div style={{
                  width: `${barPct}%`, height: '100%', borderRadius: 2,
                  background: `linear-gradient(90deg, var(--syn) ${(g.synapse/combined*100).toFixed(0)}%, var(--pol) ${(g.synapse/combined*100).toFixed(0)}%)`,
                }}/>
              </div>
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--syn)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
              {g.synapse.toLocaleString()}
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--pol)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
              {g.polaris.toLocaleString()}
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text)', textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
              {combined.toLocaleString()}
            </div>
            <div style={{ fontSize: 11, color: isPos ? 'var(--up)' : 'var(--warn)', textAlign: 'right', fontWeight: 500 }}>
              {g.trend}
            </div>
          </div>
        )
      })}
    </div>
  )
}
