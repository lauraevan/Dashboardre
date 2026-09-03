import { useState } from 'react'
import './index.css'
import { TopNav } from './components/TopNav'
import { ForecastHeader } from './components/ForecastHeader'
import { KPIGrid } from './components/KPIGrid'
import { PortfolioChart } from './components/PortfolioChart'
import { ForecastCards } from './components/ForecastCards'
import { Footer } from './components/Footer'

export type Theme = 'light' | 'dark'

export default function App() {
  const [theme, setTheme] = useState<Theme>('light')

  return (
    <div data-theme={theme} style={{ minHeight: '100vh', background: 'var(--page-bg)' }}>
      <TopNav theme={theme} onThemeToggle={() => setTheme(t => t === 'light' ? 'dark' : 'light')} />
      <main style={{ padding: '0 48px', paddingBottom: '32px' }}>
        <ForecastHeader theme={theme} />
        <KPIGrid theme={theme} />
        <PortfolioChart theme={theme} />
        <ForecastCards theme={theme} />
      </main>
      <Footer theme={theme} />
    </div>
  )
}
