import { useState } from 'react'

const stats = [
  { icon: '🚗', label: 'Total Inventory', value: '47', change: '+3 this week', up: true, color: '#e50914' },
  { icon: '📦', label: 'Active Orders', value: '12', change: '+2 today', up: true, color: '#f5c518' },
  { icon: '💷', label: 'Monthly Revenue', value: '£284K', change: '+18% vs last month', up: true, color: '#00b894' },
  { icon: '👥', label: 'Total Customers', value: '389', change: '+24 this month', up: true, color: '#1e50ff' },
  { icon: '💬', label: 'New Messages', value: '5', change: '3 unread', up: false, color: '#a29bfe' },
  { icon: '⭐', label: 'Avg. Rating', value: '4.8', change: '+0.2 this quarter', up: true, color: '#fd79a8' },
]

const recentOrders = [
  { id: 'ORD-001', customer: 'James Harrison', car: '2023 BMW M5', amount: '£68,500', status: 'Confirmed', date: '09 Jun 2026' },
  { id: 'ORD-002', customer: 'Sarah Mitchell', car: '2022 Mercedes GLE', amount: '£52,000', status: 'Pending', date: '09 Jun 2026' },
  { id: 'ORD-003', customer: 'David Okafor', car: '2024 Porsche Cayenne', amount: '£89,200', status: 'Processing', date: '08 Jun 2026' },
  { id: 'ORD-004', customer: 'Emma Thompson', car: '2023 Audi Q7', amount: '£61,000', status: 'Delivered', date: '07 Jun 2026' },
  { id: 'ORD-005', customer: 'Mark Wilson', car: '2022 Land Rover Defender', amount: '£55,400', status: 'Confirmed', date: '06 Jun 2026' },
]

const activity = [
  { text: 'New order placed by James Harrison for BMW M5', time: '2 min ago', color: '#00b894' },
  { text: 'Sarah Mitchell submitted a test drive request for Mercedes GLE', time: '15 min ago', color: '#f5c518' },
  { text: 'New message received from David Okafor', time: '1 hr ago', color: '#a29bfe' },
  { text: '2024 Porsche Cayenne listing updated — price revised to £89,200', time: '2 hr ago', color: '#e50914' },
  { text: 'Emma Thompson left a 5★ review', time: '3 hr ago', color: '#fd79a8' },
  { text: 'Monthly revenue report generated for May 2026', time: '5 hr ago', color: '#1e50ff' },
]

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const BAR_DATA = [60, 85, 70, 90, 75, 110, 95, 130, 115, 140, 125, 160]
const maxBar = Math.max(...BAR_DATA)

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
