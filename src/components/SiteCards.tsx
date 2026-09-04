import { SYNAPSE_STATS, POLARIS_STATS, SITES, TOP_GAMES } from '../data'

function Stat({ label, value, delta, good = true }: { label: string; value: string; delta?: string; good?: boolean }) {
  const isNeg = delta?.startsWith('-')
  const deltaColor = delta ? ((good ? !isNeg : isNeg) ? 'var(--up)' : 'var(--warn)') : undefined
  return (
    <div style={{ minWidth: 90 }}>
      <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 400, color: 'var(--text)', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}>
        {value}
        {delta && <span style={{ fontSize: 10, color: deltaColor, marginLeft: 5 }}>{delta}</span>}
      </div>
    </div>
  )
}

function MiniBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'var(--border)', overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 2 }} />
    </div>
  )
}

function SiteCard({ site, stats, accentColor }: { site: typeof SITES.synapse; stats: typeof SYNAPSE_STATS; accentColor: string }) {
  const topGames = TOP_GAMES.slice(0, 5)
  return (
    <div style={{ background: 'var(--surface)', border: `1px solid var(--border2)`, borderRadius: 6, overflow: 'hidden' }}>
      {/* Card header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 18px 12px', borderBottom: '1px solid var(--border)',
        background: 'var(--surface2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--up)' }} />
          <span style={{ fontSize: 13.5, fontWeight: 600, color: accentColor, letterSpacing: '-0.015em' }}>{site.name}</span>
          <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'monospace' }}>{site.url}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ fontSize: 10, color: 'var(--up)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 3, padding: '2px 7px', fontWeight: 500 }}>
            {stats.uptime} uptime
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 18px' }}>
        {/* Stat grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
          <Stat label="Visitors · 30D" value={stats.visitors30d.toLocaleString()} delta={stats.visitorsDelta} />
          <Stat label="Game Plays · 30D" value={stats.plays30d.toLocaleString()} delta={stats.playsDelta} />
          <Stat label="Avg Session" value={stats.avgSession} delta={stats.sessionDelta} />
          <Stat label="Bounce Rate" value={stats.bounceRate} delta={stats.bounceDelta} good={false} />
        </div>

        {/* Perf + geo row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {/* Latency */}
          <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 5, padding: '12px 14px' }}>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 10 }}>Response Time</div>
            {[
              { label: 'P50', ms: stats.p50ms, pct: (stats.p50ms / 500) * 100, color: accentColor },
              { label: 'P95', ms: stats.p95ms, pct: (stats.p95ms / 500) * 100, color: accentColor + '88' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 9.5, color: 'var(--muted)', width: 24, flexShrink: 0 }}>{row.label}</span>
                <MiniBar pct={row.pct} color={row.color} />
                <span style={{ fontSize: 10, color: 'var(--text)', width: 38, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{row.ms}ms</span>
              </div>
            ))}
          </div>

          {/* Geography */}
          <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 5, padding: '12px 14px' }}>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 10 }}>Top Countries</div>
            {stats.topCountries.map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 9.5, color: 'var(--muted)', width: 90, flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
                <MiniBar pct={c.pct} color={accentColor} />
                <span style={{ fontSize: 10, color: 'var(--text)', width: 28, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 games for this site */}
        <div style={{ marginTop: 12, background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 5, padding: '12px 14px' }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8 }}>Top Games</div>
          {topGames.map((g, i) => {
            const plays = site.name === 'Synapse' ? g.synapse : g.polaris
            const max = site.name === 'Synapse' ? TOP_GAMES[0].synapse : TOP_GAMES[0].polaris
            return (
              <div key={g.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: i < 4 ? 5 : 0 }}>
                <span style={{ fontSize: 9, color: 'var(--subtle)', width: 14, textAlign: 'right', flexShrink: 0 }}>{g.rank}</span>
                <span style={{ fontSize: 10.5, color: 'var(--text)', flex: 1 }}>{g.name}</span>
                <MiniBar pct={(plays / max) * 100} color={accentColor} />
                <span style={{ fontSize: 10, color: 'var(--muted)', width: 42, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                  {plays.toLocaleString()}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function SiteCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
      <SiteCard site={SITES.synapse} stats={SYNAPSE_STATS} accentColor="var(--syn)" />
      <SiteCard site={SITES.polaris} stats={POLARIS_STATS} accentColor="var(--pol)" />
    </div>
  )
}
