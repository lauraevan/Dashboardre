import { synapseTraffic, polarisTraffic } from '../data'

const W = 1200, H = 220
const PAD_L = 52, PAD_R = 16, PAD_T = 20, PAD_B = 36
const cW = W - PAD_L - PAD_R
const cH = H - PAD_T - PAD_B

const allVals = [...synapseTraffic, ...polarisTraffic]
const Y_MAX = Math.ceil(Math.max(...allVals) / 1000) * 1000 + 1000
const Y_MIN = 0

function xp(i: number, n: number) { return PAD_L + (i / (n - 1)) * cW }
function yp(v: number) { return PAD_T + cH - ((v - Y_MIN) / (Y_MAX - Y_MIN)) * cH }

function linePath(data: number[]) {
  return data.map((v, i) => `${i === 0 ? 'M' : 'L'}${xp(i, data.length).toFixed(1)},${yp(v).toFixed(1)}`).join(' ')
}

function areaPath(data: number[]) {
  const line = linePath(data)
  const n = data.length
  const bot = `L${xp(n-1, n).toFixed(1)},${(PAD_T + cH).toFixed(1)} L${PAD_L},${(PAD_T + cH).toFixed(1)} Z`
  return line + ' ' + bot
}

const GRID_Y = [0, 4000, 8000, 12000]
// Label every 7 days
const xLabels = [0, 6, 13, 20, 27, 29]
const labelDates = ['Aug 6', 'Aug 12', 'Aug 19', 'Aug 26', 'Sep 2', 'Today']

export function TrafficChart() {
  const synLine = linePath(synapseTraffic)
  const polLine = linePath(polarisTraffic)

  const lbl = '#3a4444'

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 6, marginBottom: 12, overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 18px 0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em' }}>
            Daily Visitors · 30 Days
          </span>
          {[
            { label: 'Synapse', color: 'var(--syn)' },
            { label: 'Polaris', color: 'var(--pol)' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 16, height: 2, background: s.color, borderRadius: 1 }} />
              <span style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <span style={{ fontSize: 10, color: 'var(--muted)' }}>Sep 4, 2026</span>
      </div>

      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }} preserveAspectRatio="xMidYMid meet">
        {/* Grid */}
        {GRID_Y.map(v => {
          const y = yp(v)
          return (
            <g key={v}>
              {v > 0 && <line x1={PAD_L} y1={y} x2={W-PAD_R} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>}
              <text x={PAD_L - 6} y={y + 3.5} fontSize="9.5" fill={lbl} textAnchor="end" fontFamily="Geist,sans-serif">
                {v === 0 ? '' : `${(v/1000).toFixed(0)}K`}
              </text>
            </g>
          )
        })}

        {/* X labels */}
        {xLabels.map((idx, li) => (
          <text key={idx} x={xp(idx, 30)} y={H - 8} fontSize="9.5" fill={lbl}
            textAnchor="middle" fontFamily="Geist,sans-serif">{labelDates[li]}</text>
        ))}

        {/* Area fills */}
        <path d={areaPath(synapseTraffic)} fill="rgba(95,196,212,0.06)"/>
        <path d={areaPath(polarisTraffic)} fill="rgba(167,139,250,0.06)"/>

        {/* Lines */}
        <path d={synLine} fill="none" stroke="#5fc4d4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d={polLine} fill="none" stroke="#a78bfa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Today endpoint dots */}
        <circle cx={xp(29, 30)} cy={yp(synapseTraffic[29])} r="3.5" fill="#0d1010" stroke="#5fc4d4" strokeWidth="1.6"/>
        <circle cx={xp(29, 30)} cy={yp(polarisTraffic[29])} r="3.5" fill="#0d1010" stroke="#a78bfa" strokeWidth="1.6"/>

        {/* Endpoint labels */}
        <text x={xp(29, 30) + 7} y={yp(synapseTraffic[29]) + 4} fontSize="9.5" fill="#5fc4d4" fontFamily="Geist,sans-serif" fontWeight="500">
          {synapseTraffic[29].toLocaleString()}
        </text>
        <text x={xp(29, 30) + 7} y={yp(polarisTraffic[29]) + 4} fontSize="9.5" fill="#a78bfa" fontFamily="Geist,sans-serif" fontWeight="500">
          {polarisTraffic[29].toLocaleString()}
        </text>
      </svg>
    </div>
  )
}
