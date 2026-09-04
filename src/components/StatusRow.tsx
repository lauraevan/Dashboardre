import { SITES, SYNAPSE_STATS, POLARIS_STATS } from '../data'

const checks = [
  { label: 'DNS',        synapse: 'ok',   polaris: 'ok'   },
  { label: 'SSL',        synapse: 'ok',   polaris: 'ok'   },
  { label: 'HTTP 200',   synapse: 'ok',   polaris: 'ok'   },
  { label: 'CDN',        synapse: 'ok',   polaris: 'ok'   },
  { label: 'Game Loader',synapse: 'ok',   polaris: 'ok'   },
]

function Dot({ status }: { status: string }) {
  const color = status === 'ok' ? 'var(--up)' : status === 'warn' ? 'var(--warn)' : '#ef4444'
  return <div style={{ width: 7, height: 7, borderRadius: '50%', background: color }} />
}

export function StatusRow() {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12,
    }}>
      {/* Uptime summary */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '14px 16px' }}>
        <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 12 }}>
          Uptime · 30D
        </div>
        {[
          { site: SITES.synapse, stats: SYNAPSE_STATS, color: 'var(--syn)' },
          { site: SITES.polaris, stats: POLARIS_STATS, color: 'var(--pol)' },
        ].map(({ site, stats, color }) => (
          <div key={site.name} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 500, color }}>{site.name}</span>
              <span style={{ fontSize: 11, color: 'var(--up)', fontWeight: 500 }}>{stats.uptime}</span>
            </div>
            {/* Uptime bar: 30 segments, mostly green */}
            <div style={{ display: 'flex', gap: 2 }}>
              {Array.from({ length: 30 }, (_, i) => (
                <div key={i} style={{
                  flex: 1, height: 16, borderRadius: 2,
                  background: i === 12 && site.name === 'Polaris' ? 'var(--warn)' : color + 'cc',
                }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Health checks */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '14px 16px' }}>
        <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 12 }}>
          Health Checks
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '5px 14px', alignItems: 'center' }}>
          <div style={{ fontSize: 9, color: 'var(--subtle)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}></div>
          <div style={{ fontSize: 9, color: 'var(--syn)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>SYN</div>
          <div style={{ fontSize: 9, color: 'var(--pol)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>POL</div>
          {checks.map(c => (
            <>
              <div key={c.label} style={{ fontSize: 11, color: 'var(--text)' }}>{c.label}</div>
              <div style={{ display: 'flex', justifyContent: 'center' }}><Dot status={c.synapse} /></div>
              <div style={{ display: 'flex', justifyContent: 'center' }}><Dot status={c.polaris} /></div>
            </>
          ))}
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '14px 16px' }}>
        <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 12 }}>
          Today · Live
        </div>
        {[
          { label: 'Active right now',    value: '284',   unit: 'users' },
          { label: 'Games loading',       value: '31',    unit: 'concurrent' },
          { label: 'Synapse sessions',    value: '168',   unit: 'active' },
          { label: 'Polaris sessions',    value: '116',   unit: 'active' },
          { label: 'Errors last hour',    value: '2',     unit: 'total' },
        ].map(row => (
          <div key={row.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
            <span style={{ fontSize: 10.5, color: 'var(--muted)' }}>{row.label}</span>
            <span style={{ fontSize: 11, color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>
              {row.value} <span style={{ color: 'var(--subtle)', fontSize: 9.5 }}>{row.unit}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
