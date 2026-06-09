import { useState } from 'react'

const stats = [
  { icon: '🚗', label: 'Total Inventory', value: '0', change: 'No change', up: true, color: '#e50914' },
  { icon: '📦', label: 'Active Orders', value: '0', change: 'No change', up: true, color: '#f5c518' },
  { icon: '💷', label: 'Monthly Revenue', value: '£0', change: 'No change', up: true, color: '#00b894' },
  { icon: '👥', label: 'Total Customers', value: '0', change: 'No change', up: true, color: '#1e50ff' },
  { icon: '💬', label: 'New Messages', value: '0', change: 'No messages', up: false, color: '#a29bfe' },
  { icon: '⭐', label: 'Avg. Rating', value: '5.0', change: 'No reviews', up: true, color: '#fd79a8' },
]

const recentOrders = []

const activity = []

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const BAR_DATA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
const maxBar = 1

const statusColor = (s) => {
  if (s === 'Confirmed') return 'green'
  if (s === 'Pending') return 'yellow'
  if (s === 'Processing') return 'blue'
  if (s === 'Delivered') return 'gray'
  return 'red'
}

export default function AdminDashboard({ navigate }) {
  return (
    <div>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(229,9,20,0.12) 0%, rgba(245,197,24,0.08) 100%)',
        border: '1px solid rgba(229,9,20,0.2)',
        borderRadius: 14,
        padding: '20px 24px',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div>
          <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 800, color: '#fff' }}>
            👋 Good day, Admin
          </h2>
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
            Here's what's happening at Ferguson Auto Sales today
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="adm-btn adm-btn--primary" onClick={() => navigate('inventory')}>+ Add Vehicle</button>
          <button className="adm-btn adm-btn--outline" onClick={() => navigate('analytics')}>View Reports</button>
        </div>
      </div>

      {/* Stats */}
      <div className="adm-stat-grid">
        {stats.map((s, i) => (
          <div className="adm-stat" key={i}>
            <span className="adm-stat__icon">{s.icon}</span>
            <span className="adm-stat__value">{s.value}</span>
            <span className="adm-stat__label">{s.label}</span>
            <div className={`adm-stat__change adm-stat__change--${s.up ? 'up' : 'down'}`}>
              {s.up ? '↑' : '↓'} {s.change}
            </div>
            <div className="adm-stat__accent" style={{ background: s.color }} />
          </div>
        ))}
      </div>

      {/* Revenue Chart + Activity */}
      <div className="adm-two-col">
        <div className="adm-section">
          <div className="adm-section__head">
            <h3 className="adm-section__title">📈 Revenue Overview — 2026</h3>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>£K / month</span>
          </div>
          <div className="adm-section__body">
            <div className="adm-bar-chart">
              {BAR_DATA.map((v, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div
                    className={`adm-bar ${i === 5 || i === 11 ? 'adm-bar--gold' : ''}`}
                    style={{ height: `${(v / maxBar) * 140}px`, width: '100%' }}
                    title={`${MONTHS[i]}: £${v}K`}
                  />
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{MONTHS[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="adm-section">
          <div className="adm-section__head">
            <h3 className="adm-section__title">🔔 Recent Activity</h3>
            <button className="adm-btn adm-btn--outline adm-btn--sm">See All</button>
          </div>
          <div className="adm-section__body">
            <div className="adm-activity">
              {activity.map((a, i) => (
                <div className="adm-activity__item" key={i}>
                  <div className="adm-activity__dot" style={{ background: a.color }} />
                  <span className="adm-activity__text">{a.text}</span>
                  <span className="adm-activity__time">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="adm-table-wrap">
        <div className="adm-table-header">
          <h3 className="adm-table-title">📦 Recent Orders</h3>
          <button className="adm-btn adm-btn--outline adm-btn--sm" onClick={() => navigate('orders')}>View All Orders</button>
        </div>
        <table className="adm-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(o => (
              <tr key={o.id}>
                <td><span style={{ color: '#f5c518', fontWeight: 600 }}>{o.id}</span></td>
                <td>{o.customer}</td>
                <td style={{ color: 'rgba(255,255,255,0.6)' }}>{o.car}</td>
                <td style={{ color: '#00b894', fontWeight: 700 }}>{o.amount}</td>
                <td style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{o.date}</td>
                <td><span className={`adm-badge adm-badge--${statusColor(o.status)}`}>{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
        {[
          { label: '+ Add Vehicle', icon: '🚗', action: 'inventory', color: '#e50914' },
          { label: 'View Messages', icon: '💬', action: 'messages', color: '#a29bfe' },
          { label: 'Manage Orders', icon: '📦', action: 'orders', color: '#f5c518' },
          { label: 'Customer List', icon: '👥', action: 'customers', color: '#00b894' },
          { label: 'Analytics', icon: '📈', action: 'analytics', color: '#1e50ff' },
          { label: 'Settings', icon: '⚙️', action: 'settings', color: '#fd79a8' },
        ].map((q, i) => (
          <button key={i} className="adm-stat" style={{ cursor: 'pointer', border: `1px solid ${q.color}22`, textAlign: 'center' }}
            onClick={() => navigate(q.action)}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{q.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{q.label}</div>
            <div className="adm-stat__accent" style={{ background: q.color }} />
          </button>
        ))}
      </div>
    </div>
  )
}
