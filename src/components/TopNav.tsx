import type { Theme } from '../App'

interface TopNavProps {
  theme: Theme
  onThemeToggle: () => void
}

export function TopNav({ theme, onThemeToggle }: TopNavProps) {
  const isDark = theme === 'dark'

  return (
    <nav style={{
      height: 58,
      background: 'var(--nav-bg)',
      borderBottom: '1px solid var(--nav-border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 48px',
      gap: 0,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 36 }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 2C6.03 2 2 6.03 2 11s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm-1 14.5V5.5c3.59.49 6.35 3.56 6.35 7.13S13.59 16.01 10 16.5z"
            fill={isDark ? '#5ec8d8' : '#3aabb8'} />
        </svg>
        <span style={{
          fontSize: 15,
          fontWeight: 600,
          color: isDark ? '#5ec8d8' : '#2a9baa',
          letterSpacing: '-0.01em',
        }}>Goodcast</span>
        <span style={{
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: '0.10em',
          color: isDark ? '#5ec8d8' : '#2a9baa',
          border: `1px solid ${isDark ? '#5ec8d8' : '#2a9baa'}`,
          borderRadius: 4,
          padding: '1px 5px',
          lineHeight: '14px',
          textTransform: 'uppercase',
        }}>TURBO</span>
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
        {['Overview', 'Accounts', 'Forecast', 'Reports'].map(link => {
          const active = link === 'Forecast'
          return (
            <div key={link} style={{ position: 'relative', padding: '0 14px' }}>
              <span style={{
                fontSize: 13.5,
                fontWeight: active ? 600 : 400,
                color: active ? 'var(--text)' : 'var(--muted)',
                cursor: 'pointer',
                lineHeight: '58px',
                display: 'block',
              }}>{link}</span>
              {active && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 52,
                  height: 2,
                  background: 'var(--text)',
                  borderRadius: '2px 2px 0 0',
                }} />
              )}
            </div>
          )
        })}
      </div>

      {/* Right: Search + Ask + Theme toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: 34,
          width: 200,
          border: '1px solid var(--border)',
          borderRadius: 8,
          background: 'var(--surface)',
          padding: '0 10px',
          gap: 6,
        }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="5.5" cy="5.5" r="4.5" stroke="var(--muted)" strokeWidth="1.2" />
            <line x1="9" y1="9" x2="12" y2="12" stroke="var(--muted)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 12.5, color: 'var(--subtle)', flex: 1 }}>Search accounts...</span>
        </div>
        <button style={{
          height: 34,
          padding: '0 14px',
          border: '1px solid var(--border)',
          borderRadius: 8,
          background: 'var(--surface)',
          color: 'var(--text)',
          fontSize: 12.5,
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontFamily: 'inherit',
        }}>
          Ask
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1l1.2 2.8 2.8.2-2.1 1.9.7 2.8L6 7.3 3.4 8.7l.7-2.8L2 3.9l2.8-.1L6 1z"
              fill={isDark ? '#5ec8d8' : '#3aabb8'} />
          </svg>
          <span style={{ fontSize: 10.5, color: 'var(--muted)', fontFamily: 'monospace', marginLeft: 2 }}>⌘K</span>
        </button>
        {/* Theme toggle */}
        <button onClick={onThemeToggle} style={{
          height: 30,
          width: 30,
          border: '1px solid var(--border)',
          borderRadius: 7,
          background: 'var(--surface)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--muted)',
          fontSize: 14,
        }} title="Toggle theme">
          {isDark ? '☀' : '◑'}
        </button>
      </div>
    </nav>
  )
}
