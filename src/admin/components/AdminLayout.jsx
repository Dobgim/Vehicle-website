import { useState } from 'react'
import AdminDashboard from '../pages/AdminDashboard'
import AdminInventory from '../pages/AdminInventory'
import AdminOrders from '../pages/AdminOrders'
import AdminCustomers from '../pages/AdminCustomers'
import AdminMessages from '../pages/AdminMessages'
import AdminAnalytics from '../pages/AdminAnalytics'
import AdminSettings from '../pages/AdminSettings'
import logoImg from '../../assets/logo.jpg'
import './AdminLayout.css'

const NAV = [
  { id: 'dashboard',  label: 'Dashboard',   icon: '📊', badge: null },
  { id: 'inventory',  label: 'Inventory',    icon: '🚗', badge: null },
  { id: 'orders',     label: 'Orders',       icon: '📦', badge: null },
  { id: 'customers',  label: 'Customers',    icon: '👥', badge: null },
  { id: 'messages',   label: 'Messages',     icon: '💬', badge: null },
  { id: 'analytics',  label: 'Analytics',    icon: '📈', badge: null },
  { id: 'settings',   label: 'Settings',     icon: '⚙️',  badge: null },
]

const PAGES = {
  dashboard: AdminDashboard,
  inventory: AdminInventory,
  orders: AdminOrders,
  customers: AdminCustomers,
  messages: AdminMessages,
  analytics: AdminAnalytics,
  settings: AdminSettings,
}

export default function AdminLayout({ auth, onLogout }) {
  const [active, setActive] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const Page = PAGES[active]

  return (
    <div className={`adm-shell ${sidebarOpen ? 'adm-shell--open' : 'adm-shell--collapsed'}`}>
      {/* Sidebar */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar__top">
          <div className="adm-sidebar__brand">
            <img src={logoImg} alt="Ferguson" className="adm-sidebar__logo" />
            {sidebarOpen && (
              <div className="adm-sidebar__brand-text">
                <span className="adm-sidebar__brand-name">Ferguson</span>
                <span className="adm-sidebar__brand-sub">Admin Portal</span>
              </div>
            )}
          </div>
          <button className="adm-sidebar__toggle" onClick={() => setSidebarOpen(p => !p)}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="adm-nav">
          {NAV.map(item => (
            <button
              key={item.id}
              className={`adm-nav__item ${active === item.id ? 'adm-nav__item--active' : ''}`}
              onClick={() => setActive(item.id)}
              title={!sidebarOpen ? item.label : ''}
            >
              <span className="adm-nav__icon">{item.icon}</span>
              {sidebarOpen && <span className="adm-nav__label">{item.label}</span>}
              {item.badge && sidebarOpen && (
                <span className="adm-nav__badge">{item.badge}</span>
              )}
              {item.badge && !sidebarOpen && (
                <span className="adm-nav__badge adm-nav__badge--dot" />
              )}
            </button>
          ))}
        </nav>

        <div className="adm-sidebar__footer">
          <div className="adm-user">
            <div className="adm-user__avatar">{auth.name[0]}</div>
            {sidebarOpen && (
              <div className="adm-user__info">
                <span className="adm-user__name">{auth.name}</span>
                <span className="adm-user__role">{auth.role}</span>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button className="adm-logout-btn" onClick={onLogout}>
              🚪 Logout
            </button>
          )}
          {!sidebarOpen && (
            <button className="adm-logout-btn adm-logout-btn--icon" onClick={onLogout} title="Logout">
              🚪
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="adm-main">
        <header className="adm-topbar">
          <div className="adm-topbar__left">
            <h2 className="adm-topbar__page">{NAV.find(n => n.id === active)?.label}</h2>
            <span className="adm-topbar__breadcrumb">Admin / {NAV.find(n => n.id === active)?.label}</span>
          </div>
          <div className="adm-topbar__right">
            <div className="adm-topbar__time">
              🕐 {new Date().toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
            </div>
            <a href="#/" className="adm-topbar__site-link" target="_blank">
              🌐 View Site
            </a>
            <div className="adm-topbar__notif">
              🔔 <span className="adm-topbar__notif-dot" />
            </div>
          </div>
        </header>

        <div className="adm-content">
          <Page auth={auth} navigate={setActive} />
        </div>
      </main>
    </div>
  )
}
