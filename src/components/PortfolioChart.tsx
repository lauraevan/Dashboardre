import type { Theme } from '../App'

interface PortfolioChartProps {
  theme: Theme
}

// Chart dimensions
const W = 1270
const H = 360
const PAD_L = 56
const PAD_R = 76
const PAD_T = 36
const PAD_B = 40

// Y axis: 48.5M to 73M — breathing room above $70M
const Y_MIN = 48_500_000
const Y_MAX = 73_000_000

// X axis: -90D to +90D (180 days total), today at center
const X_DAYS_LEFT = 90
const X_DAYS_RIGHT = 90
const TOTAL_DAYS = X_DAYS_LEFT + X_DAYS_RIGHT

const chartW = W - PAD_L - PAD_R
const chartH = H - PAD_T - PAD_B

function xPos(dayOffset: number): number {
  // dayOffset: -90 to +90
  return PAD_L + ((dayOffset + X_DAYS_LEFT) / TOTAL_DAYS) * chartW
}

function yPos(value: number): number {
  return PAD_T + chartH - ((value - Y_MIN) / (Y_MAX - Y_MIN)) * chartH
}

// Actual history data: -90D to 0D (today)
// Starts ~49.1M, irregular upward trend to ~52.5M
const actualPoints: [number, number][] = [
  [-90, 49_120_000],
  [-88, 49_080_000],
  [-86, 49_210_000],
  [-84, 49_160_000],
  [-82, 49_300_000],
  [-80, 49_270_000],
  [-78, 49_380_000],
  [-76, 49_340_000],
  [-74, 49_460_000],
  [-72, 49_520_000],
  [-70, 49_620_000],
  [-68, 49_560_000],
  [-66, 49_700_000],
  [-64, 49_760_000],
  [-62, 49_720_000],
  [-60, 49_860_000],
  [-58, 49_820_000],
  [-56, 49_950_000],
  [-54, 49_910_000],
  [-52, 50_080_000],
  [-50, 50_040_000],
  [-48, 50_160_000],
  [-46, 50_130_000],
  [-44, 50_280_000],
  [-42, 50_250_000],
  [-40, 50_380_000],
  [-38, 50_340_000],
  [-36, 50_470_000],
  [-34, 50_430_000],
  [-32, 50_560_000],
  [-30, 50_700_000],
  [-28, 50_660_000],
  [-26, 50_800_000],
  [-24, 50_770_000],
  [-22, 50_910_000],
  [-20, 50_880_000],
  [-18, 51_020_000],
  [-16, 50_990_000],
  [-14, 51_130_000],
  [-12, 51_100_000],
  [-10, 51_250_000],
  [-8,  51_300_000],
  [-6,  51_450_000],
  [-4,  51_410_000],
  [-2,  51_580_000],
  [0,   52_480_000],
]

// Forecast: today to +90D
// P50 ends at 64.2M (light) / 64.0M (dark)
// P90 ends at 67.1M (light) / 66.8M (dark)
// P10 ends at 61.4M (light) / 61.1M (dark)

function getForecastPoints(isDark: boolean) {
  const p50End = isDark ? 64_000_000 : 64_200_000
  const p90End = isDark ? 66_800_000 : 67_100_000
  const p10End = isDark ? 61_100_000 : 61_400_000
  const start = 52_480_000

  // Generate points with slight curve (quadratic-like)
  const steps = 20
  const points50: [number, number][] = []
  const points90: [number, number][] = []
  const points10: [number, number][] = []

  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const day = t * 90
    const ease = t // linear for now
    points50.push([day, start + (p50End - start) * ease])
    points90.push([day, start + (p90End - start) * ease])
    points10.push([day, start + (p10End - start) * ease])
  }

  return { points50, points90, points10 }
}

function toPath(points: [number, number][]): string {
  return points.map(([d, v], i) =>
    `${i === 0 ? 'M' : 'L'} ${xPos(d).toFixed(2)} ${yPos(v).toFixed(2)}`
  ).join(' ')
}

function toAreaPath(upper: [number, number][], lower: [number, number][]): string {
  const top = upper.map(([d, v], i) =>
    `${i === 0 ? 'M' : 'L'} ${xPos(d).toFixed(2)} ${yPos(v).toFixed(2)}`
  ).join(' ')
  const bottom = [...lower].reverse().map(([d, v]) =>
    `L ${xPos(d).toFixed(2)} ${yPos(v).toFixed(2)}`
  ).join(' ')
  return `${top} ${bottom} Z`
}

const GRID_VALUES = [50_000_000, 60_000_000, 70_000_000]
const X_TICKS = [-90, -60, -30, 0, 30, 60, 90]
const X_LABELS: Record<string, string> = {
  '-90': '-90D',
  '-60': '-60D',
  '-30': '-30D',
  '0':   'TODAY',
  '30':  '+30D',
  '60':  '+60D',
  '90':  '+90D',
}

function fmtM(v: number): string {
  return '$' + (v / 1_000_000).toFixed(1) + 'M'
}

export function PortfolioChart({ theme }: PortfolioChartProps) {
  const isDark = theme === 'dark'
  const { points50, points90, points10 } = getForecastPoints(isDark)

  const actualPath = toPath(actualPoints)
  const p50Path = toPath(points50)
  const p90Path = toPath(points90)
  const p10Path = toPath(points10)
  const areaPath = toAreaPath(points90, points10)

  const todayX = xPos(0)
  const todayY = yPos(52_480_000)

  const p50EndX = xPos(90)
  const p50EndY = yPos(isDark ? 64_000_000 : 64_200_000)
  const p90EndY = yPos(isDark ? 66_800_000 : 67_100_000)
  const p10EndY = yPos(isDark ? 61_100_000 : 61_400_000)

  const accentColor = isDark ? '#5490a0' : '#6ab4c2'
  const actualColor = isDark ? '#8a9596' : '#1d2527'
  const gridColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'
  const gridLabelColor = isDark ? '#5a6364' : '#adb5b8'
  const fillColor = isDark ? 'rgba(70,110,118,0.08)' : 'rgba(118,184,196,0.11)'

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 13,
      marginBottom: 16,
      boxShadow: 'var(--card-shadow)',
      overflow: 'hidden',
    }}>
      {/* Card header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 22px 0 22px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{
            fontSize: 13.5,
            fontWeight: 600,
            color: 'var(--text)',
            letterSpacing: '-0.01em',
          }}>Portfolio trajectory</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{
              fontSize: 9.5,
              fontWeight: 500,
              letterSpacing: '0.13em',
              color: 'var(--muted)',
              textTransform: 'uppercase',
            }}>TRAILING 90-DAY REVENUE</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 20, height: 1.5, background: actualColor }} />
              <span style={{
                fontSize: 9.5,
                fontWeight: 500,
                letterSpacing: '0.12em',
                color: 'var(--muted)',
                textTransform: 'uppercase',
              }}>ACTUAL</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <svg width="22" height="4" viewBox="0 0 22 4">
                <line x1="0" y1="2" x2="22" y2="2" stroke={accentColor} strokeWidth="1.5" strokeDasharray="3,2" />
              </svg>
              <span style={{
                fontSize: 9.5,
                fontWeight: 500,
                letterSpacing: '0.12em',
                color: 'var(--muted)',
                textTransform: 'uppercase',
              }}>FORECAST · P10–P90</span>
            </div>
          </div>
        </div>
        {/* Last updated capsule */}
        <div style={{
          fontSize: 10,
          color: 'var(--muted)',
          border: '1px solid var(--border)',
          borderRadius: 6,
          padding: '3px 9px',
          letterSpacing: '0.02em',
        }}>
          {isDark ? 'Last updated 06:08 AM' : 'WRITE'}
        </div>
      </div>

      {/* SVG chart */}
      <svg
        width="100%"
        viewBox={`0 0 ${W} ${H}`}
        style={{ display: 'block' }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines */}
        {GRID_VALUES.map(v => {
          const y = yPos(v)
          return (
            <g key={v}>
              <line
                x1={PAD_L} y1={y}
                x2={W - PAD_R} y2={y}
                stroke={gridColor} strokeWidth="1"
              />
              <text
                x={PAD_L - 6} y={y + 4}
                fontSize="10.5" fill={gridLabelColor}
                textAnchor="end"
                fontFamily="Inter, sans-serif"
              >
                {fmtM(v)}
              </text>
            </g>
          )
        })}

        {/* TODAY vertical dashed line */}
        <line
          x1={todayX} y1={PAD_T - 14}
          x2={todayX} y2={H - PAD_B}
          stroke={gridColor.replace('0.04', '0.12').replace('0.05', '0.15')}
          strokeWidth="1"
          strokeDasharray="3,3"
        />

        {/* TODAY label above */}
        <text
          x={todayX} y={PAD_T - 18}
          fontSize="9.5" fill={gridLabelColor}
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          letterSpacing="0.1em"
          fontWeight="500"
        >TODAY</text>

        {/* X axis ticks / labels */}
        {X_TICKS.filter(d => d !== 0).map(d => {
          const x = xPos(d)
          return (
            <text
              key={d} x={x} y={H - PAD_B + 16}
              fontSize="10.5" fill={gridLabelColor}
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
            >{X_LABELS[String(d)]}</text>
          )
        })}

        {/* Forecast area fill */}
        <path d={areaPath} fill={fillColor} />

        {/* P90 forecast boundary */}
        <path
          d={p90Path}
          fill="none"
          stroke={accentColor}
          strokeWidth="1"
          strokeDasharray="4,3"
          opacity="0.45"
        />

        {/* P10 forecast boundary */}
        <path
          d={p10Path}
          fill="none"
          stroke={accentColor}
          strokeWidth="1"
          strokeDasharray="4,3"
          opacity="0.45"
        />

        {/* P50 central forecast */}
        <path
          d={p50Path}
          fill="none"
          stroke={accentColor}
          strokeWidth="1.8"
          strokeDasharray="5,3"
        />

        {/* Actual history line */}
        <path
          d={actualPath}
          fill="none"
          stroke={actualColor}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Today dot */}
        <circle
          cx={todayX} cy={todayY}
          r="4.5"
          fill={isDark ? '#2a3535' : 'white'}
          stroke={actualColor}
          strokeWidth="2"
        />

        {/* Endpoint labels */}
        <text
          x={p50EndX + 6} y={p50EndY + 4}
          fontSize="10.5" fill={accentColor}
          fontFamily="Inter, sans-serif"
          fontWeight="500"
        >P50 {isDark ? '$64.0M' : '$64.2M'}</text>

        <text
          x={p50EndX + 6} y={p90EndY + 4}
          fontSize="10" fill={gridLabelColor}
          fontFamily="Inter, sans-serif"
        >P90 {isDark ? '$66.8M' : '$67.1M'}</text>

        <text
          x={p50EndX + 6} y={p10EndY + 4}
          fontSize="10" fill={gridLabelColor}
          fontFamily="Inter, sans-serif"
        >P10 {isDark ? '$61.1M' : '$61.4M'}</text>
      </svg>
    </div>
  )
}
