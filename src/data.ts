// Simulated dashboard data for Synapse + Polaris UBG sites

export const SITES = {
  synapse: {
    name: 'Synapse',
    url: 'v2.educationcatlearningandtutoring.com',
    color: '#5fc4d4',
    colorDim: 'rgba(95,196,212,0.15)',
  },
  polaris: {
    name: 'Polaris',
    url: 'Polariss.educationcatlearningandtutoring.com',
    color: '#a78bfa',
    colorDim: 'rgba(167,139,250,0.15)',
  },
}

// 30 days of daily visitors (day 0 = oldest, day 29 = today)
export const synapseTraffic: number[] = [
  7840, 8120, 7650, 8340, 8910, 9200, 8600,
  8780, 9100, 8420, 9340, 9680, 9150, 8600,
  9450, 9820, 9200, 10100, 9660, 9040, 8820,
  9600, 10200, 9880, 10540, 10100, 9500, 10840, 11200, 10620,
]

export const polarisTraffic: number[] = [
  4200, 4480, 4120, 4620, 5010, 5240, 4880,
  4940, 5160, 4740, 5280, 5540, 5080, 4760,
  5310, 5640, 5200, 5820, 5540, 5080, 4960,
  5480, 5860, 5640, 6020, 5780, 5340, 6180, 6440, 6080,
]

export const TOP_GAMES = [
  { rank: 1,  name: 'Slope',              synapse: 6840, polaris: 4120, trend: '+12%' },
  { rank: 2,  name: '1v1.LOL',            synapse: 5920, polaris: 3480, trend: '+8%'  },
  { rank: 3,  name: 'Shell Shockers',     synapse: 5100, polaris: 2960, trend: '+5%'  },
  { rank: 4,  name: 'Krunker.io',         synapse: 4680, polaris: 2740, trend: '+3%'  },
  { rank: 5,  name: 'Cookie Clicker',     synapse: 4200, polaris: 2520, trend: '+18%' },
  { rank: 6,  name: 'Run 3',             synapse: 3840, polaris: 2200, trend: '+2%'  },
  { rank: 7,  name: 'Geometry Dash',     synapse: 3540, polaris: 1980, trend: '+7%'  },
  { rank: 8,  name: 'Drift Boss',        synapse: 3120, polaris: 1740, trend: '+14%' },
  { rank: 9,  name: 'Friday Night Funkin\'', synapse: 2880, polaris: 1580, trend: '+9%' },
  { rank: 10, name: 'Minecraft Classic', synapse: 2640, polaris: 1420, trend: '-2%'  },
]

export const SYNAPSE_STATS = {
  visitors30d: 10620,
  visitorsDelta: '+24%',
  plays30d: 68400,
  playsDelta: '+31%',
  avgSession: '9m 42s',
  sessionDelta: '+0:48',
  bounceRate: '28.4%',
  bounceDelta: '-3.1%',
  uptime: '99.94%',
  p50ms: 148,
  p95ms: 312,
  topCountries: [
    { name: 'United States', pct: 58 },
    { name: 'Canada',        pct: 12 },
    { name: 'United Kingdom',pct: 9  },
    { name: 'Australia',     pct: 6  },
    { name: 'Other',         pct: 15 },
  ],
}

export const POLARIS_STATS = {
  visitors30d: 6080,
  visitorsDelta: '+41%',
  plays30d: 39200,
  playsDelta: '+48%',
  avgSession: '7m 15s',
  sessionDelta: '+1:02',
  bounceRate: '31.2%',
  bounceDelta: '-1.8%',
  uptime: '99.87%',
  p50ms: 162,
  p95ms: 388,
  topCountries: [
    { name: 'United States', pct: 62 },
    { name: 'Canada',        pct: 10 },
    { name: 'United Kingdom',pct: 8  },
    { name: 'Germany',       pct: 5  },
    { name: 'Other',         pct: 15 },
  ],
}
