import { useState, useEffect } from 'react'
import { useCarStore } from '../../context/CarStore'
import { supabase } from '../../supabaseClient'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const statusColor = (s) => {
  if (s === 'Confirmed') return 'green'
  if (s === 'Pending') return 'yellow'
  if (s === 'Processing') return 'blue'
  if (s === 'Delivered') return 'gray'
  return 'red'
}

export default function AdminDashboard({ navigate }) {
  const { cars, loading: carsLoading } = useCarStore()
  const [orders, setOrders] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        // Fetch all orders
        const { data: ords, error: ordsErr } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
        if (ordsErr) throw ordsErr

        // Fetch all messages
        const { data: msgs, error: msgsErr } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false })
        if (msgsErr) throw msgsErr

        if (ords) setOrders(ords)
        if (msgs) setMessages(msgs)
      } catch (err) {
        console.error('Error loading admin dashboard stats:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading || carsLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          border: '3px solid rgba(255,255,255,0.08)',
          borderTopColor: '#e50914',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  // Calculate stats dynamically
  const completedOrders = orders.filter(o => o.status === 'Delivered' || o.status === 'Confirmed')
  const totalRevenue = completedOrders.reduce((sum, o) => sum + Number(o.amount || 0), 0)

  const currentMonthStr = new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) // e.g. "Jun 2026"
  const currentMonthOrders = completedOrders.filter(o => o.date && o.date.includes(currentMonthStr))
  const monthlyRevenue = currentMonthOrders.reduce((sum, o) => sum + Number(o.amount || 0), 0)

  const uniqueCustomers = new Set(orders.map(o => o.email || o.customer))
  const totalCustomers = uniqueCustomers.size

  const newMessagesCount = messages.filter(m => !m.read).length

  const avgRating = cars.length > 0
    ? (cars.reduce((sum, c) => sum + Number(c.rating || 0), 0) / cars.length).toFixed(1)
    : '5.0'

  const activeOrdersCount = orders.filter(o => o.status === 'Pending' || o.status === 'Processing' || o.status === 'Confirmed').length

  const statsList = [
    { icon: '🚗', label: 'Total Inventory', value: cars.length, change: `${cars.filter(c => c.status === 'Available').length} available`, up: true, color: '#e50914' },
    { icon: '📦', label: 'Active Orders', value: activeOrdersCount, change: `${orders.filter(o => o.status === 'Pending').length} pending`, up: true, color: '#f5c518' },
    { icon: '💷', label: 'Monthly Revenue', value: `£${(monthlyRevenue / 1000).toFixed(1)}K`, change: `£${(totalRevenue / 1000).toFixed(1)}K total`, up: true, color: '#00b894' },
    { icon: '👥', label: 'Total Customers', value: totalCustomers, change: 'Across all time', up: true, color: '#1e50ff' },
    { icon: '💬', label: 'New Messages', value: newMessagesCount, change: `${messages.filter(m => !m.read).length} unread`, up: false, color: '#a29bfe' },
    { icon: '⭐', label: 'Avg. Rating', value: avgRating, change: 'From user reviews', up: true, color: '#fd79a8' },
  ]

  // Chart data for 2026 (or current year)
  const currentYear = new Date().getFullYear().toString()
  const BAR_DATA = MONTHS.map(m => {
    const monthOrders = completedOrders.filter(o => o.date && o.date.includes(`${m} ${currentYear}`))
    const rev = monthOrders.reduce((sum, o) => sum + Number(o.amount || 0), 0)
    return rev / 1000 // In thousands (£K)
  })
  const maxBar = Math.max(...BAR_DATA, 1)

  // Dynamic Activity Feed
  const activityList = []
  orders.slice(0, 5).forEach(o => {
    activityList.push({
      text: `📦 New order ${o.id} placed by ${o.customer} (£${Number(o.amount).toLocaleString()})`,
      time: o.date,
      timestamp: new Date(o.created_at || Date.now()).getTime(),
      color: '#f5c518'
    })
  })
  messages.slice(0, 5).forEach(m => {
    activityList.push({
      text: `💬 Message from ${m.name}: "${m.subject}"`,
      time: new Date(m.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
      timestamp: new Date(m.created_at || Date.now()).getTime(),
      color: '#a29bfe'
    })
  })
  activityList.sort((a, b) => b.timestamp - a.timestamp)
  const recentActivity = activityList.slice(0, 5)

  const recentOrdersList = orders.slice(0, 5)

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
            Here's what's happening at Ferguson Auto Sales live today
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="adm-btn adm-btn--primary" onClick={() => navigate('inventory')}>+ Add Vehicle</button>
          <button className="adm-btn adm-btn--outline" onClick={() => navigate('analytics')}>View Reports</button>
        </div>
      </div>

      {/* Stats */}
      <div className="adm-stat-grid">
        {statsList.map((s, i) => (
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
            <h3 className="adm-section__title">📈 Revenue Overview — {currentYear}</h3>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>£K / month</span>
          </div>
          <div className="adm-section__body">
            <div className="adm-bar-chart">
              {BAR_DATA.map((v, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div
                    className={`adm-bar ${i === 5 || i === 11 ? 'adm-bar--gold' : ''}`}
                    style={{ height: `${(v / maxBar) * 140}px`, width: '100%' }}
                    title={`${MONTHS[i]}: £${v.toFixed(1)}K`}
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
            <button className="adm-btn adm-btn--outline adm-btn--sm" onClick={() => navigate('orders')}>See All</button>
          </div>
          <div className="adm-section__body">
            <div className="adm-activity">
              {recentActivity.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px 0', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>No recent activity.</div>
              ) : (
                recentActivity.map((a, i) => (
                  <div className="adm-activity__item" key={i}>
                    <div className="adm-activity__dot" style={{ background: a.color }} />
                    <span className="adm-activity__text">{a.text}</span>
                    <span className="adm-activity__time">{a.time}</span>
                  </div>
                ))
              )}
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
            {recentOrdersList.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: 20, color: 'rgba(255,255,255,0.3)' }}>
                  No orders placed yet.
                </td>
              </tr>
            ) : (
              recentOrdersList.map(o => (
                <tr key={o.id}>
                  <td><span style={{ color: '#f5c518', fontWeight: 600 }}>{o.id}</span></td>
                  <td>{o.customer}</td>
                  <td style={{ color: 'rgba(255,255,255,0.6)' }}>{o.car}</td>
                  <td style={{ color: '#00b894', fontWeight: 700 }}>£{Number(o.amount).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                  <td style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{o.date}</td>
                  <td><span className={`adm-badge adm-badge--${statusColor(o.status)}`}>{o.status}</span></td>
                </tr>
              ))
            )}
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
