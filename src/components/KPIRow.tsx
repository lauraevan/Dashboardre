import { SYNAPSE_STATS, POLARIS_STATS } from '../data'

function Delta({ val, good = true }: { val: string; good?: boolean }) {
  const isNeg = val.startsWith('-')
  const color = (good ? !isNeg : isNeg) ? 'var(--up)' : 'var(--warn)'
  return (
    <span style={{ fontSize: 10.5, color, marginLeft: 6, fontVariantNumeric: 'tabular-nums' }}>{val}</span>
  )
}

const totalVisitors = (SYNAPSE_STATS.visitors30d + POLARIS_STATS.visitors30d).toLocaleString()
const totalPlays = (SYNAPSE_STATS.plays30d + POLARIS_STATS.plays30d).toLocaleString()

export function KPIRow() {
  return (
    <div style={{ paddingTop: 24, paddingBottom: 20 }}>
      {/* Page title row */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--text)', marginBottom: 4 }}>
            Sites Overview
          </h1>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>
            Last 30 days · Sep 4, 2026 · auto-refresh 5 min
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--up)' }} />
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>2 sites online</span>
        </div>
      </div>

      {/* KPI tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
        {[
          { label: 'TOTAL VISITORS · 30D', value: totalVisitors, delta: '+31%', sub: 'across both sites' },
          { label: 'TOTAL GAME PLAYS · 30D', value: totalPlays, delta: '+38%', sub: 'across both sites' },
          { label: 'SYNAPSE DAILY PEAK', value: '11,200', delta: '+24%', sub: 'visitors today' },
          { label: 'POLARIS DAILY PEAK',  value: '6,440',  delta: '+41%', sub: 'visitors today' },
          { label: 'COMBINED AVG SESSION', value: '8m 49s', delta: '+0:54', sub: 'per user' },
        ].map((kpi, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 6, padding: '14px 16px',
          }}>
            <div style={{
              fontSize: 9, fontWeight: 600, letterSpacing: '0.13em',
              color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 6,
            }}>{kpi.label}</div>
            <div style={{
              fontSize: 26, fontWeight: 400, color: 'var(--text)',
              letterSpacing: '-0.02em', lineHeight: 1, fontVariantNumeric: 'tabular-nums',
              marginBottom: 4,
            }}>
              {kpi.value}
              <Delta val={kpi.delta} />
            </div>
            <div style={{ fontSize: 10, color: 'var(--subtle)' }}>{kpi.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
