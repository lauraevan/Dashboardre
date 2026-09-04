export function DashFooter() {
  return (
    <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 44px 16px' }}>
      <span style={{ fontSize: 9.5, fontWeight: 500, letterSpacing: '0.14em', color: 'var(--subtle)', textTransform: 'uppercase' }}>
        UBG DASHBOARD · BUILT ON CLAUDE
      </span>
      <span style={{ fontSize: 10, color: 'var(--subtle)' }}>v1.0 · Sep 4, 2026</span>
    </footer>
  )
}
