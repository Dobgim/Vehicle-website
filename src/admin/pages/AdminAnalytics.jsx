const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const revenue =   [48, 62, 71, 88, 95, 112, 104, 138, 121, 145, 132, 168]
const unitsSold = [2,  3,  3,  4,  4,  5,   5,   6,   5,   7,   6,   8  ]
const maxRev = Math.max(...revenue)
const maxUnits = Math.max(...unitsSold)

const topVehicles = [
  { name: '2024 Porsche Cayenne Turbo', sales: 8, revenue: '£713,600', pct: 92 },
  { name: '2023 BMW M5 Competition',    sales: 6, revenue: '£411,000', pct: 74 },
  { name: '2023 Bentley Bentayga EWB',  sales: 4, revenue: '£696,000', pct: 58 },
  { name: '2023 Audi RS Q8',            sales: 5, revenue: '£482,000', pct: 65 },
  { name: '2022 Tesla Model S Plaid',   sales: 7, revenue: '£616,000', pct: 82 },
]

const trafficSources = [
  { label: 'Direct / Website',  pct: 38, color: '#e50914' },
  { label: 'Google Search',     pct: 27, color: '#f5c518' },
  { label: 'WhatsApp Referral', pct: 18, color: '#00b894' },
  { label: 'Social Media',      pct: 12, color: '#a29bfe' },
  { label: 'Other',             pct: 5,  color: '#636e72' },
]

const kpis = [
  { label: 'Total Revenue (YTD)',      value: '£1.284M', change: '+22%', up: true,  icon: '💷', color: '#00b894' },
  { label: 'Vehicles Sold (YTD)',      value: '58',      change: '+14%', up: true,  icon: '🚗', color: '#e50914' },
  { label: 'Avg. Sale Price',          value: '£22.1K',  change: '+6%',  up: true,  icon: '📊', color: '#f5c518' },
  { label: 'Conversion Rate',          value: '3.4%',    change: '-0.2%',up: false, icon: '🎯', color: '#a29bfe' },
  { label: 'Customer Satisfaction',    value: '4.8 / 5', change: '+0.2', up: true,  icon: '⭐', color: '#fd79a8' },
  { label: 'Return Customers',         value: '34%',     change: '+8%',  up: true,  icon: '🔄', color: '#1e50ff' },
]

export default function AdminAnalytics() {
  return (
    <div>
      {/* KPI Row */}
      <div className="adm-stat-grid" style={{ marginBottom: 24 }}>
        {kpis.map((k, i) => (
          <div className="adm-stat" key={i}>
            <span className="adm-stat__icon">{k.icon}</span>
            <span className="adm-stat__value" style={{ fontSize: 22 }}>{k.value}</span>
            <span className="adm-stat__label">{k.label}</span>
            <div className={`adm-stat__change adm-stat__change--${k.up ? 'up' : 'down'}`}>
              {k.up ? '↑' : '↓'} {k.change} vs last year
            </div>
            <div className="adm-stat__accent" style={{ background: k.color }} />
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="adm-two-col">
        {/* Revenue Bar Chart */}
        <div className="adm-section">
          <div className="adm-section__head">
            <h3 className="adm-section__title">📈 Monthly Revenue (£K)</h3>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>2026</span>
          </div>
          <div className="adm-section__body">
            <div className="adm-bar-chart">
              {revenue.map((v, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>£{v}K</span>
                  <div className="adm-bar" style={{ height: `${(v / maxRev) * 120}px`, width: '100%' }} title={`${MONTHS[i]}: £${v}K`} />
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{MONTHS[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Units Sold Bar Chart */}
        <div className="adm-section">
          <div className="adm-section__head">
            <h3 className="adm-section__title">🚗 Units Sold Per Month</h3>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>2026</span>
          </div>
          <div className="adm-section__body">
            <div className="adm-bar-chart">
              {unitsSold.map((v, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{v}</span>
                  <div className="adm-bar adm-bar--gold" style={{ height: `${(v / maxUnits) * 120}px`, width: '100%' }} title={`${MONTHS[i]}: ${v} sold`} />
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{MONTHS[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Vehicles + Traffic Sources */}
      <div className="adm-two-col">
        {/* Top Vehicles */}
        <div className="adm-section">
          <div className="adm-section__head">
            <h3 className="adm-section__title">🏆 Top Selling Vehicles</h3>
          </div>
          <div className="adm-section__body">
            {topVehicles.map((v, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>{v.name}</span>
                  <span style={{ fontSize: 12, color: '#f5c518', fontWeight: 700 }}>{v.revenue}</span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${v.pct}%`, background: 'linear-gradient(90deg, #e50914, #f5c518)', borderRadius: 10, transition: 'width 0.5s' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{v.sales} units sold</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{v.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="adm-section">
          <div className="adm-section__head">
            <h3 className="adm-section__title">🌐 Lead Sources</h3>
          </div>
          <div className="adm-section__body">
            {/* Donut-style visual */}
            <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              <div style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
                <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                  {trafficSources.reduce((acc, s, i) => {
                    const prev = acc.offset
                    const dash = (s.pct / 100) * 289
                    acc.elements.push(
                      <circle key={i} cx="60" cy="60" r="46" fill="none" stroke={s.color}
                        strokeWidth="16" strokeDasharray={`${dash} ${289 - dash}`}
                        strokeDashoffset={-prev} opacity="0.85" />
                    )
                    acc.offset += dash
                    return acc
                  }, { elements: [], offset: 0 }).elements}
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>100%</span>
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>Total</span>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                {trafficSources.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, background: s.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', flex: 1 }}>{s.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly targets */}
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 12 }}>Monthly Targets</div>
              {[
                { label: 'Revenue Target', current: 112, target: 130, unit: '£K' },
                { label: 'Units Sold', current: 5, target: 8, unit: '' },
                { label: 'New Customers', current: 24, target: 30, unit: '' },
              ].map((t, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{t.label}</span>
                    <span style={{ fontSize: 12, color: '#fff', fontWeight: 600 }}>{t.current}{t.unit} / {t.target}{t.unit}</span>
                  </div>
                  <div style={{ height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 10 }}>
                    <div style={{ height: '100%', width: `${(t.current / t.target) * 100}%`, background: '#00b894', borderRadius: 10 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="adm-section">
        <div className="adm-section__head">
          <h3 className="adm-section__title">📥 Export Reports</h3>
        </div>
        <div className="adm-section__body">
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['Sales Report (PDF)', 'Revenue Report (CSV)', 'Inventory Report (CSV)', 'Customer Report (Excel)', 'Monthly Summary (PDF)'].map((r, i) => (
              <button key={i} className="adm-btn adm-btn--outline" onClick={() => alert(`Generating: ${r}`)}>
                📄 {r}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
