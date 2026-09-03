import './index.css'
import { TopNav } from './components/TopNav'
import { ForecastHeader } from './components/ForecastHeader'
import { KPIGrid } from './components/KPIGrid'
import { PortfolioChart } from './components/PortfolioChart'
import { ForecastCards } from './components/ForecastCards'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--page-bg)' }}>
      <TopNav />
      <main style={{ padding: '0 48px 32px' }}>
        <ForecastHeader />
        <KPIGrid />
        <PortfolioChart />
        <ForecastCards />
      </main>
      <Footer />
    </div>
  )
}
