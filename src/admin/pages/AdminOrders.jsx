import { useState } from 'react'

const initialOrders = [
  { id: 'ORD-001', customer: 'James Harrison', email: 'james@email.com', car: '2023 BMW M5 Competition', amount: 68500, status: 'Confirmed', date: '09 Jun 2026', payment: 'Bank Transfer', phone: '+44 7700 900123' },
  { id: 'ORD-002', customer: 'Sarah Mitchell', email: 'sarah@email.com', car: '2022 Mercedes-Benz GLE 450', amount: 52000, status: 'Pending', date: '09 Jun 2026', payment: 'Finance', phone: '+44 7700 900456' },
  { id: 'ORD-003', customer: 'David Okafor', email: 'david@email.com', car: '2024 Porsche Cayenne Turbo', amount: 89200, status: 'Processing', date: '08 Jun 2026', payment: 'Bank Transfer', phone: '+44 7700 900789' },
  { id: 'ORD-004', customer: 'Emma Thompson', email: 'emma@email.com', car: '2023 Audi RS Q8', amount: 96400, status: 'Delivered', date: '07 Jun 2026', payment: 'Cash', phone: '+44 7700 900321' },
  { id: 'ORD-005', customer: 'Mark Wilson', email: 'mark@email.com', car: '2022 Land Rover Defender 110', amount: 55400, status: 'Confirmed', date: '06 Jun 2026', payment: 'Finance', phone: '+44 7700 900654' },
  { id: 'ORD-006', customer: 'Priya Sharma', email: 'priya@email.com', car: '2022 Tesla Model S Plaid', amount: 88000, status: 'Pending', date: '05 Jun 2026', payment: 'Bank Transfer', phone: '+44 7700 900987' },
  { id: 'ORD-007', customer: 'Chris Brown', email: 'chris@email.com', car: '2023 Bentley Bentayga EWB', amount: 174000, status: 'Delivered', date: '03 Jun 2026', payment: 'Cash', phone: '+44 7700 900111' },
]

const STATUS_OPTIONS = ['All', 'Confirmed', 'Pending', 'Processing', 'Delivered', 'Cancelled']

const statusColor = (s) => {
  if (s === 'Confirmed') return 'green'
  if (s === 'Pending') return 'yellow'
  if (s === 'Processing') return 'blue'
  if (s === 'Delivered') return 'gray'
  if (s === 'Cancelled') return 'red'
  return 'gray'
}

export default function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = orders.filter(o => {
    const q = search.toLowerCase()
    return (o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.car.toLowerCase().includes(q)) &&
      (filterStatus === 'All' || o.status === filterStatus)
  })

  const updateStatus = (id, status) => {
    setOrders(p => p.map(o => o.id === id ? { ...o, status } : o))
    if (selected?.id === id) setSelected(p => ({ ...p, status }))
  }

  const totalRevenue = orders.filter(o => o.status === 'Delivered' || o.status === 'Confirmed').reduce((a, o) => a + o.amount, 0)

  return (
    <div>
      <div className="adm-stat-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 20 }}>
        {[
          { icon: '📦', label: 'Total Orders', value: orders.length, color: '#e50914' },
          { icon: '⏳', label: 'Pending', value: orders.filter(o => o.status === 'Pending').length, color: '#f5c518' },
          { icon: '✅', label: 'Confirmed', value: orders.filter(o => o.status === 'Confirmed').length, color: '#00b894' },
          { icon: '💷', label: 'Revenue', value: `£${(totalRevenue / 1000).toFixed(0)}K`, color: '#a29bfe' },
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
          <input placeholder="Search order ID, customer, or vehicle..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="adm-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
        </select>
        <button className="adm-btn adm-btn--outline">📥 Export CSV</button>
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <div className="adm-table-wrap">
            <div className="adm-table-header">
              <h3 className="adm-table-title">📦 Orders ({filtered.length})</h3>
            </div>
            <table className="adm-table">
              <thead>
                <tr><th>Order ID</th><th>Customer</th><th>Vehicle</th><th>Amount</th><th>Payment</th><th>Date</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {filtered.map(o => (
                  <tr key={o.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(o)}>
                    <td><span style={{ color: '#f5c518', fontWeight: 700 }}>{o.id}</span></td>
                    <td>{o.customer}</td>
                    <td style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12 }}>{o.car}</td>
                    <td style={{ color: '#00b894', fontWeight: 700 }}>£{o.amount.toLocaleString()}</td>
                    <td><span className="adm-badge adm-badge--blue">{o.payment}</span></td>
                    <td style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{o.date}</td>
                    <td><span className={`adm-badge adm-badge--${statusColor(o.status)}`}>{o.status}</span></td>
                    <td>
                      <select className="adm-select" style={{ padding: '4px 8px', fontSize: 12 }}
                        value={o.status} onClick={e => e.stopPropagation()}
                        onChange={e => updateStatus(o.id, e.target.value)}>
                        {['Confirmed','Pending','Processing','Delivered','Cancelled'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Detail Panel */}
        {selected && (
          <div style={{ width: 300, flexShrink: 0 }}>
            <div className="adm-section">
              <div className="adm-section__head">
                <h3 className="adm-section__title">📋 Order Detail</h3>
                <button className="adm-btn adm-btn--outline adm-btn--sm" onClick={() => setSelected(null)}>✕</button>
              </div>
              <div className="adm-section__body">
                {[
                  ['Order ID', selected.id],
                  ['Customer', selected.customer],
                  ['Email', selected.email],
                  ['Phone', selected.phone],
                  ['Vehicle', selected.car],
                  ['Amount', `£${selected.amount.toLocaleString()}`],
                  ['Payment', selected.payment],
                  ['Date', selected.date],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{k}</span>
                    <span style={{ fontSize: 13, color: '#fff', fontWeight: 600, textAlign: 'right', maxWidth: 160 }}>{v}</span>
                  </div>
                ))}
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Status</span>
                  <div style={{ marginTop: 6 }}>
                    <span className={`adm-badge adm-badge--${statusColor(selected.status)}`}>{selected.status}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
                  <button className="adm-btn adm-btn--primary" style={{ justifyContent: 'center' }}
                    onClick={() => updateStatus(selected.id, 'Confirmed')}>✅ Confirm Order</button>
                  <button className="adm-btn adm-btn--gold" style={{ justifyContent: 'center' }}
                    onClick={() => updateStatus(selected.id, 'Delivered')}>🚚 Mark Delivered</button>
                  <button className="adm-btn adm-btn--outline" style={{ justifyContent: 'center', color: '#ff6b6b', borderColor: 'rgba(229,9,20,0.3)' }}
                    onClick={() => updateStatus(selected.id, 'Cancelled')}>❌ Cancel Order</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
