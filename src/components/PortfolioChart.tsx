import type { Theme } from '../App'

interface PortfolioChartProps {
  theme: Theme
}

const W = 1270
const H = 356
const PAD_L = 54
const PAD_R = 80
const PAD_T = 38
const PAD_B = 38

const Y_MIN = 48_200_000
const Y_MAX = 73_500_000

const X_DAYS_LEFT = 90
const X_DAYS_RIGHT = 90
const TOTAL_DAYS = X_DAYS_LEFT + X_DAYS_RIGHT

const chartW = W - PAD_L - PAD_R
const chartH = H - PAD_T - PAD_B

function xPos(dayOffset: number): number {
  return PAD_L + ((dayOffset + X_DAYS_LEFT) / TOTAL_DAYS) * chartW
}

function yPos(value: number): number {
  return PAD_T + chartH - ((value - Y_MIN) / (Y_MAX - Y_MIN)) * chartH
}

// 46 actual data points: start ~49.1M, rise to ~52.5M with organic noise
const actualPoints: [number, number][] = [
  [-90, 49_120_000],
  [-88, 49_075_000],
  [-86, 49_210_000],
  [-84, 49_158_000],
  [-82, 49_295_000],
  [-80, 49_268_000],
  [-78, 49_382_000],
  [-76, 49_338_000],
  [-74, 49_465_000],
  [-72, 49_528_000],
  [-70, 49_625_000],
  [-68, 49_562_000],
  [-66, 49_704_000],
  [-64, 49_762_000],
  [-62, 49_718_000],
  [-60, 49_856_000],
  [-58, 49_818_000],
  [-56, 49_948_000],
  [-54, 49_908_000],
  [-52, 50_072_000],
  [-50, 50_038_000],
  [-48, 50_155_000],
  [-46, 50_128_000],
  [-44, 50_275_000],
  [-42, 50_248_000],
  [-40, 50_375_000],
  [-38, 50_338_000],
  [-36, 50_472_000],
  [-34, 50_428_000],
  [-32, 50_558_000],
  [-30, 50_695_000],
  [-28, 50_658_000],
  [-26, 50_795_000],
  [-24, 50_768_000],
  [-22, 50_905_000],
  [-20, 50_878_000],
  [-18, 51_018_000],
  [-16, 50_985_000],
  [-14, 51_128_000],
  [-12, 51_098_000],
  [-10, 51_242_000],
  [-8,  51_295_000],
  [-6,  51_448_000],
  [-4,  51_408_000],
  [-2,  51_575_000],
  [0,   52_480_000],
]

function getForecastPoints(isDark: boolean) {
  const p50End = isDark ? 64_000_000 : 64_200_000
  const p90End = isDark ? 66_800_000 : 67_100_000
  const p10End = isDark ? 61_100_000 : 61_400_000
  const start  = 52_480_000
  const steps  = 18

  const points50: [number, number][] = []
  const points90: [number, number][] = []
  const points10: [number, number][] = []

  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const day = t * 90
    points50.push([day, start + (p50End - start) * t])
    points90.push([day, start + (p90End - start) * t])
    points10.push([day, start + (p10End - start) * t])
  }
  return { points50, points90, points10 }
}

function toPath(pts: [number, number][]): string {
  return pts.map(([d, v], i) => `${i === 0 ? 'M' : 'L'}${xPos(d).toFixed(1)},${yPos(v).toFixed(1)}`).join(' ')
}

function toAreaPath(upper: [number, number][], lower: [number, number][]): string {
  const top = upper.map(([d, v], i) => `${i === 0 ? 'M' : 'L'}${xPos(d).toFixed(1)},${yPos(v).toFixed(1)}`).join(' ')
  const bot = [...lower].reverse().map(([d, v]) => `L${xPos(d).toFixed(1)},${yPos(v).toFixed(1)}`).join(' ')
  return `${top} ${bot} Z`
}

const GRID_VALUES = [50_000_000, 60_000_000, 70_000_000]
const X_TICKS = [-90, -60, -30, 30, 60, 90]

function fmtM(v: number) {
  return '$' + (v / 1_000_000).toFixed(0) + 'M'
}

export function PortfolioChart({ theme }: PortfolioChartProps) {
  const isDark = theme === 'dark'
  const { points50, points90, points10 } = getForecastPoints(isDark)

  const actualPath = toPath(actualPoints)
  const p50Path    = toPath(points50)
  const p90Path    = toPath(points90)
  const p10Path    = toPath(points10)
  const areaPath   = toAreaPath(points90, points10)

  const todayX = xPos(0)
  const todayY = yPos(52_480_000)

  const p50EndX  = xPos(90)
  const p50EndY  = yPos(isDark ? 64_000_000 : 64_200_000)
  const p90EndY  = yPos(isDark ? 66_800_000 : 67_100_000)
  const p10EndY  = yPos(isDark ? 61_100_000 : 61_400_000)

  const accent      = isDark ? '#5290a0' : '#68b4c2'
  const actualColor = isDark ? '#8c9898' : '#1c2425'
  const gridColor   = isDark ? 'rgba(255,255,255,0.038)' : 'rgba(0,0,0,0.048)'
  const gridLabel   = isDark ? '#535c5c' : '#b0b8ba'
  const fillColor   = isDark ? 'rgba(68,108,116,0.07)' : 'rgba(115,182,194,0.10)'
  const vlineColor  = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.10)'

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      marginBottom: 14,
      boxShadow: isDark ? '0 1px 4px rgba(0,0,0,0.22)' : '0 1px 3px rgba(0,0,0,0.035)',
      overflow: 'hidden',
    }}>
      {/* Header row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px 20px 0 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--text)',
            letterSpacing: '-0.01em',
          }}>Portfolio trajectory</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: '0.13em',
              color: 'var(--muted)',
              textTransform: 'uppercase',
            }}>TRAILING 90-DAY REVENUE</span>

            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 18, height: 1.5, background: actualColor, borderRadius: 1 }} />
              <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.11em', color: 'var(--muted)', textTransform: 'uppercase' }}>ACTUAL</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="20" height="4" viewBox="0 0 20 4">
                <line x1="0" y1="2" x2="20" y2="2" stroke={accent} strokeWidth="1.5" strokeDasharray="3,2.5" />
              </svg>
              <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.11em', color: 'var(--muted)', textTransform: 'uppercase' }}>FORECAST · P10–P90</span>
            </div>
          </div>
        </div>

        <div style={{
          fontSize: 9.5,
          color: 'var(--muted)',
          border: '1px solid var(--border)',
          borderRadius: 5,
          padding: '3px 8px',
          letterSpacing: '0.02em',
        }}>
          {isDark ? 'Last updated 06:08 AM' : 'WRITE'}
        </div>
      </div>

      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }} preserveAspectRatio="xMidYMid meet">
        {/* Y grid + labels */}
        {GRID_VALUES.map(v => {
          const y = yPos(v)
          return (
            <g key={v}>
              <line x1={PAD_L} y1={y} x2={W - PAD_R} y2={y} stroke={gridColor} strokeWidth="1" />
              <text x={PAD_L - 7} y={y + 3.5} fontSize="10" fill={gridLabel} textAnchor="end" fontFamily="Inter,sans-serif">{fmtM(v)}</text>
            </g>
          )
        })}

        {/* TODAY vertical dotted line */}
        <line
          x1={todayX} y1={PAD_T - 16}
          x2={todayX} y2={H - PAD_B}
          stroke={vlineColor} strokeWidth="1" strokeDasharray="3,3"
        />

        {/* TODAY label */}
        <text x={todayX} y={PAD_T - 20} fontSize="9" fill={gridLabel} textAnchor="middle"
          fontFamily="Inter,sans-serif" letterSpacing="0.12em" fontWeight="500">TODAY</text>

        {/* X labels */}
        {X_TICKS.map(d => (
          <text key={d} x={xPos(d)} y={H - PAD_B + 15} fontSize="10" fill={gridLabel}
            textAnchor="middle" fontFamily="Inter,sans-serif">
            {d < 0 ? `${d}D` : `+${d}D`}
          </text>
        ))}

        {/* Forecast area */}
        <path d={areaPath} fill={fillColor} />

        {/* P90 boundary */}
        <path d={p90Path} fill="none" stroke={accent} strokeWidth="1" strokeDasharray="4,3" opacity="0.42" />

        {/* P10 boundary */}
        <path d={p10Path} fill="none" stroke={accent} strokeWidth="1" strokeDasharray="4,3" opacity="0.42" />

        {/* P50 central line */}
        <path d={p50Path} fill="none" stroke={accent} strokeWidth="1.7" strokeDasharray="5,3" />

        {/* Actual history line */}
        <path d={actualPath} fill="none" stroke={actualColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Today dot */}
        <circle cx={todayX} cy={todayY} r="4" fill={isDark ? '#1a1e1e' : '#ffffff'} stroke={actualColor} strokeWidth="1.8" />

        {/* Endpoint labels */}
        <text x={p50EndX + 6} y={p90EndY + 4} fontSize="9.5" fill={gridLabel} fontFamily="Inter,sans-serif">
          P90 {isDark ? '$66.8M' : '$67.1M'}
        </text>
        <text x={p50EndX + 6} y={p50EndY + 4} fontSize="10" fill={accent} fontFamily="Inter,sans-serif" fontWeight="500">
          P50 {isDark ? '$64.0M' : '$64.2M'}
        </text>
        <text x={p50EndX + 6} y={p10EndY + 4} fontSize="9.5" fill={gridLabel} fontFamily="Inter,sans-serif">
          P10 {isDark ? '$61.1M' : '$61.4M'}
        </text>
      </svg>
    </div>
  )
}
