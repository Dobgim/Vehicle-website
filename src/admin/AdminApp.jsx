import { useState, useEffect } from 'react'
import AdminLogin from './pages/AdminLogin'
import AdminLayout from './components/AdminLayout'
import './admin.css'

export default function AdminApp() {
  const [auth, setAuth] = useState(() => {
    const stored = sessionStorage.getItem('fas_admin_auth')
    return stored ? JSON.parse(stored) : null
  })

  const login = (user) => {
    sessionStorage.setItem('fas_admin_auth', JSON.stringify(user))
    setAuth(user)
  }

  const logout = () => {
    sessionStorage.removeItem('fas_admin_auth')
    setAuth(null)
  }

  if (!auth) return <AdminLogin onLogin={login} />

  return <AdminLayout auth={auth} onLogout={logout} />
}
