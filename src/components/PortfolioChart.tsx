const W = 1270, H = 356
const PAD_L = 54, PAD_R = 80, PAD_T = 38, PAD_B = 38
const Y_MIN = 48_200_000, Y_MAX = 73_500_000
const chartW = W - PAD_L - PAD_R
const chartH = H - PAD_T - PAD_B

function xPos(d: number) { return PAD_L + ((d + 90) / 180) * chartW }
function yPos(v: number) { return PAD_T + chartH - ((v - Y_MIN) / (Y_MAX - Y_MIN)) * chartH }

const actual: [number, number][] = [
  [-90,49_120_000],[-88,49_075_000],[-86,49_210_000],[-84,49_158_000],
  [-82,49_295_000],[-80,49_268_000],[-78,49_382_000],[-76,49_338_000],
  [-74,49_465_000],[-72,49_528_000],[-70,49_625_000],[-68,49_562_000],
  [-66,49_704_000],[-64,49_762_000],[-62,49_718_000],[-60,49_856_000],
  [-58,49_818_000],[-56,49_948_000],[-54,49_908_000],[-52,50_072_000],
  [-50,50_038_000],[-48,50_155_000],[-46,50_128_000],[-44,50_275_000],
  [-42,50_248_000],[-40,50_375_000],[-38,50_338_000],[-36,50_472_000],
  [-34,50_428_000],[-32,50_558_000],[-30,50_695_000],[-28,50_658_000],
  [-26,50_795_000],[-24,50_768_000],[-22,50_905_000],[-20,50_878_000],
  [-18,51_018_000],[-16,50_985_000],[-14,51_128_000],[-12,51_098_000],
  [-10,51_242_000],[-8,51_295_000],[-6,51_448_000],[-4,51_408_000],
  [-2,51_575_000],[0,52_480_000],
]

function makeFan(steps = 18) {
  const s = 52_480_000
  const p50e = 64_000_000, p90e = 66_800_000, p10e = 61_100_000
  const p50: [number,number][] = [], p90: [number,number][] = [], p10: [number,number][] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps, d = t * 90
    p50.push([d, s + (p50e - s) * t])
    p90.push([d, s + (p90e - s) * t])
    p10.push([d, s + (p10e - s) * t])
  }
  return { p50, p90, p10 }
}

function path(pts: [number,number][]) {
  return pts.map(([d,v],i) => `${i===0?'M':'L'}${xPos(d).toFixed(1)},${yPos(v).toFixed(1)}`).join(' ')
}
function area(upper: [number,number][], lower: [number,number][]) {
  return path(upper) + ' ' + [...lower].reverse().map(([d,v]) => `L${xPos(d).toFixed(1)},${yPos(v).toFixed(1)}`).join(' ') + ' Z'
}

const GRIDS = [50_000_000, 60_000_000, 70_000_000]
const X_TICKS = [-90, -60, -30, 30, 60, 90]

export function PortfolioChart() {
  const { p50, p90, p10 } = makeFan()
  const todayX = xPos(0), todayY = yPos(52_480_000)
  const endX = xPos(90)

  const accent  = '#5290a0'
  const actual_ = '#8c9898'
  const grid    = 'rgba(255,255,255,0.038)'
  const lbl     = '#535c5c'
  const fill    = 'rgba(68,108,116,0.07)'
  const vline   = 'rgba(255,255,255,0.07)'

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 6, marginBottom: 14,
      boxShadow: '0 1px 4px rgba(0,0,0,0.22)', overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '15px 20px 0 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em' }}>
            Portfolio trajectory
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.13em', color: 'var(--muted)', textTransform: 'uppercase' }}>
              TRAILING 90-DAY REVENUE
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 18, height: 1.5, background: actual_, borderRadius: 1 }} />
              <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.11em', color: 'var(--muted)', textTransform: 'uppercase' }}>ACTUAL</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="20" height="4" viewBox="0 0 20 4">
                <line x1="0" y1="2" x2="20" y2="2" stroke={accent} strokeWidth="1.5" strokeDasharray="3,2.5"/>
              </svg>
              <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.11em', color: 'var(--muted)', textTransform: 'uppercase' }}>FORECAST · P10–P90</span>
            </div>
          </div>
        </div>
        <div style={{
          fontSize: 9.5, color: 'var(--muted)', border: '1px solid var(--border)',
          borderRadius: 4, padding: '3px 8px', letterSpacing: '0.02em',
        }}>Last updated 06:08 AM</div>
      </div>

      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }} preserveAspectRatio="xMidYMid meet">
        {GRIDS.map(v => {
          const y = yPos(v)
          return (
            <g key={v}>
              <line x1={PAD_L} y1={y} x2={W-PAD_R} y2={y} stroke={grid} strokeWidth="1"/>
              <text x={PAD_L-7} y={y+3.5} fontSize="10" fill={lbl} textAnchor="end" fontFamily="Geist,sans-serif">
                ${v/1_000_000}M
              </text>
            </g>
          )
        })}

        <line x1={todayX} y1={PAD_T-16} x2={todayX} y2={H-PAD_B} stroke={vline} strokeWidth="1" strokeDasharray="3,3"/>
        <text x={todayX} y={PAD_T-20} fontSize="9" fill={lbl} textAnchor="middle"
          fontFamily="Geist,sans-serif" letterSpacing="0.12em" fontWeight="500">TODAY</text>

        {X_TICKS.map(d => (
          <text key={d} x={xPos(d)} y={H-PAD_B+15} fontSize="10" fill={lbl}
            textAnchor="middle" fontFamily="Geist,sans-serif">
            {d < 0 ? `${d}D` : `+${d}D`}
          </text>
        ))}

        <path d={area(p90, p10)} fill={fill}/>
        <path d={path(p90)} fill="none" stroke={accent} strokeWidth="1" strokeDasharray="4,3" opacity="0.42"/>
        <path d={path(p10)} fill="none" stroke={accent} strokeWidth="1" strokeDasharray="4,3" opacity="0.42"/>
        <path d={path(p50)} fill="none" stroke={accent} strokeWidth="1.7" strokeDasharray="5,3"/>
        <path d={path(actual)} fill="none" stroke={actual_} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>

        <circle cx={todayX} cy={todayY} r="4" fill="#1a1e1e" stroke={actual_} strokeWidth="1.8"/>

        <text x={endX+6} y={yPos(66_800_000)+4} fontSize="9.5" fill={lbl} fontFamily="Geist,sans-serif">P90 $66.8M</text>
        <text x={endX+6} y={yPos(64_000_000)+4} fontSize="10" fill={accent} fontFamily="Geist,sans-serif" fontWeight="500">P50 $64.0M</text>
        <text x={endX+6} y={yPos(61_100_000)+4} fontSize="9.5" fill={lbl} fontFamily="Geist,sans-serif">P10 $61.1M</text>
      </svg>
    </div>
  )
}
