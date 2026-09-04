import './index.css'
import { Nav } from './components/Nav'
import { KPIRow } from './components/KPIRow'
import { TrafficChart } from './components/TrafficChart'
import { SiteCards } from './components/SiteCards'
import { TopGamesTable } from './components/TopGamesTable'
import { StatusRow } from './components/StatusRow'
import { DashFooter } from './components/DashFooter'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--page-bg)' }}>
      <Nav />
      <main style={{ padding: '0 44px 40px' }}>
        <KPIRow />
        <TrafficChart />
        <SiteCards />
        <TopGamesTable />
        <StatusRow />
      </main>
      <DashFooter />
    </div>
  )
}
