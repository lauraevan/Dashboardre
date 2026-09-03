export function ForecastHeader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start',
      justifyContent: 'space-between', paddingTop: 26, paddingBottom: 22,
    }}>
      <div>
        <h1 style={{
          fontSize: 27, fontWeight: 600, color: 'var(--text)',
          letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 6,
        }}>Forecast</h1>
        <div style={{ fontSize: 11.5, color: 'var(--muted)', letterSpacing: '0.005em' }}>
          Data as of Aug 30, 2026 · Run #470
        </div>
      </div>

      <div style={{
        width: 238, border: '1px solid var(--border)', borderRadius: 7,
        background: 'var(--surface)', padding: '11px 14px 10px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#687070', flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.005em' }}>
            Claude · nightly forecast
          </span>
        </div>
        <div style={{ fontSize: 10.5, color: 'var(--muted)', paddingLeft: 14 }}>
          Scheduled 3:00 AM · est 3h 10m
        </div>
      </div>
    </div>
  )
}
