import { useState } from 'react'

const initialCustomers = []

const statusColor = (s) => {
  if (s === 'VIP') return 'yellow'
  if (s === 'Active') return 'green'
  if (s === 'New') return 'blue'
  if (s === 'Inactive') return 'gray'
  return 'gray'
}

export default function AdminCustomers() {
  const [customers] = useState(initialCustomers)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = customers.filter(c => {
    const q = search.toLowerCase()
    return (c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.location.toLowerCase().includes(q)) &&
      (filterStatus === 'All' || c.status === filterStatus)
  })

  return (
    <div>
      <div className="adm-stat-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 20 }}>
        {[
          { icon: '👥', label: 'Total Customers', value: customers.length, color: '#e50914' },
          { icon: '⭐', label: 'VIP Customers', value: customers.filter(c => c.status === 'VIP').length, color: '#f5c518' },
          { icon: '🆕', label: 'New This Month', value: customers.filter(c => c.status === 'New').length, color: '#00b894' },
          { icon: '💷', label: 'Total Spent', value: `£${(customers.reduce((a, c) => a + c.spent, 0) / 1000).toFixed(0)}K`, color: '#a29bfe' },
        ].map((s, i) => (
          <div className="adm-stat" key={i}>
            <span className="adm-stat__icon">{s.icon}</span>
            <span className="adm-stat__value">{s.value}</span>
            <span className="adm-stat__label">{s.label}</span>
            <div className="adm-stat__accent" style={{ background: s.color }} />
          </div>
        ))}
      </div>

      <div className="adm-toolbar">
        <div className="adm-search">
          <span className="adm-search__icon">🔍</span>
          <input placeholder="Search customers by name, email or location..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="adm-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          {['All','VIP','Active','New','Inactive'].map(s => <option key={s}>{s}</option>)}
        </select>
        <button className="adm-btn adm-btn--outline">📥 Export</button>
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <div className="adm-table-wrap">
            <div className="adm-table-header">
              <h3 className="adm-table-title">👥 Customers ({filtered.length})</h3>
            </div>
            <table className="adm-table">
              <thead>
                <tr><th>Customer</th><th>Location</th><th>Orders</th><th>Total Spent</th><th>Joined</th><th>Last Activity</th><th>Status</th></tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(c)}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #e50914, #f5c518)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: '#fff', flexShrink: 0 }}>{c.name[0]}</div>
                        <div>
                          <div style={{ fontWeight: 600, color: '#fff', fontSize: 13 }}>{c.name}</div>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12 }}>{c.location}</td>
                    <td style={{ fontWeight: 700, color: '#fff' }}>{c.orders}</td>
                    <td style={{ color: '#00b894', fontWeight: 700 }}>£{c.spent.toLocaleString()}</td>
                    <td style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{c.joined}</td>
                    <td style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{c.lastActivity}</td>
                    <td><span className={`adm-badge adm-badge--${statusColor(c.status)}`}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selected && (
          <div style={{ width: 290, flexShrink: 0 }}>
            <div className="adm-section">
              <div className="adm-section__head">
                <h3 className="adm-section__title">👤 Profile</h3>
                <button className="adm-btn adm-btn--outline adm-btn--sm" onClick={() => setSelected(null)}>✕</button>
              </div>
              <div className="adm-section__body">
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #e50914, #f5c518)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 24, color: '#fff', margin: '0 auto 10px' }}>{selected.name[0]}</div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>{selected.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{selected.email}</div>
                  <div style={{ marginTop: 8 }}><span className={`adm-badge adm-badge--${statusColor(selected.status)}`}>{selected.status}</span></div>
                </div>
                {[
                  ['📞 Phone', selected.phone],
                  ['📍 Location', selected.location],
                  ['📦 Orders', selected.orders],
                  ['💷 Total Spent', `£${selected.spent.toLocaleString()}`],
                  ['📅 Joined', selected.joined],
                  ['🕐 Last Active', selected.lastActivity],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{k}</span>
                    <span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                  <button className="adm-btn adm-btn--primary adm-btn--sm" style={{ flex: 1, justifyContent: 'center' }}>💬 Message</button>
                  <button className="adm-btn adm-btn--outline adm-btn--sm" style={{ flex: 1, justifyContent: 'center' }}>📋 View Orders</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
