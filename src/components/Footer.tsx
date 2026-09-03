import type { Theme } from '../App'

interface FooterProps {
  theme: Theme
}

export function Footer({ theme }: FooterProps) {
  const isDark = theme === 'dark'
  return (
    <footer style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 48px 16px 48px',
    }}>
      <span style={{
        fontSize: 9.5,
        fontWeight: 500,
        letterSpacing: '0.14em',
        color: 'var(--subtle)',
        textTransform: 'uppercase',
      }}>
        GOODCAST TURBO · {isDark ? 'BUILT ON CLAUDE' : 'BUILT WITH CLAUDE'}
      </span>
      <span style={{
        fontSize: 10,
        color: 'var(--subtle)',
        letterSpacing: '0.05em',
      }}>v2.41</span>
    </footer>
  )
}
