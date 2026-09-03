import type { Theme } from '../App'

interface TopNavProps {
  theme: Theme
  onThemeToggle: () => void
}

export function TopNav({ theme, onThemeToggle }: TopNavProps) {
  const isDark = theme === 'dark'

  return (
    <nav style={{
      height: 56,
      background: 'var(--nav-bg)',
      borderBottom: '1px solid var(--nav-border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 48px',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginRight: 38 }}>
        {/* Crescent-like icon */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8" stroke={isDark ? '#4ec8d8' : '#29a0ae'} strokeWidth="1.5" fill="none"/>
          <path d="M10 2.5C7.5 2.5 5.3 4.0 4.2 6.2C5.1 5.8 6.2 5.5 7.5 5.5C11.6 5.5 14.5 8.4 14.5 12.5C14.5 13.8 14.2 14.9 13.8 15.8C15.9 14.7 17.5 12.5 17.5 10C17.5 5.9 14.1 2.5 10 2.5Z"
            fill={isDark ? '#4ec8d8' : '#29a0ae'}/>
        </svg>
        <span style={{
          fontSize: 14.5,
          fontWeight: 600,
          color: isDark ? '#4ec8d8' : '#29a0ae',
          letterSpacing: '-0.02em',
        }}>Goodcast</span>
        <span style={{
          fontSize: 8.5,
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: isDark ? '#4ec8d8' : '#29a0ae',
          border: `1.5px solid ${isDark ? '#4ec8d8' : '#29a0ae'}`,
          borderRadius: 4,
          padding: '1px 4px',
          lineHeight: '13px',
          textTransform: 'uppercase',
        }}>TURBO</span>
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        {['Overview', 'Accounts', 'Forecast', 'Reports'].map(link => {
          const active = link === 'Forecast'
          return (
            <div key={link} style={{ position: 'relative', padding: '0 15px', height: 56, display: 'flex', alignItems: 'center' }}>
              <span style={{
                fontSize: 13,
                fontWeight: active ? 500 : 400,
                color: active ? 'var(--text)' : 'var(--muted)',
                cursor: 'pointer',
                userSelect: 'none',
              }}>{link}</span>
              {active && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 48,
                  height: 2,
                  background: 'var(--text)',
                  borderRadius: '2px 2px 0 0',
                }} />
              )}
            </div>
          )
        })}
      </div>

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: 32,
          width: 192,
          border: '1px solid var(--border)',
          borderRadius: 7,
          background: 'var(--surface)',
          padding: '0 9px',
          gap: 7,
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, opacity: 0.5 }}>
            <circle cx="5" cy="5" r="3.8" stroke="currentColor" strokeWidth="1.2" />
            <line x1="8" y1="8" x2="11" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 12, color: 'var(--subtle)' }}>Search accounts...</span>
        </div>
        <button style={{
          height: 32,
          padding: '0 12px',
          border: '1px solid var(--border)',
          borderRadius: 7,
          background: 'var(--surface)',
          color: 'var(--text)',
          fontSize: 12,
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          fontFamily: 'inherit',
        }}>
          Ask
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M5.5.9l1.1 2.5 2.5.2-1.9 1.7.6 2.5L5.5 6.6 3.2 7.8l.6-2.5L2 3.6l2.4-.1L5.5.9z"
              fill={isDark ? '#4ec8d8' : '#29a0ae'} />
          </svg>
          <span style={{ fontSize: 10, color: 'var(--subtle)', fontFamily: 'monospace', marginLeft: 1 }}>⌘K</span>
        </button>
        <button onClick={onThemeToggle} style={{
          height: 32,
          width: 32,
          border: '1px solid var(--border)',
          borderRadius: 7,
          background: 'var(--surface)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--muted)',
          fontSize: 13,
          fontFamily: 'inherit',
        }} title="Toggle theme">
          {isDark ? '☀' : '◑'}
        </button>
      </div>
    </nav>
  )
}
