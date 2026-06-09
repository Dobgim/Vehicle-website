import { useState } from 'react'
import './AdminLogin.css'
import logoImg from '../../assets/logo.jpg'

const ADMIN_USERS = [
  { username: 'admin', password: 'Ferguson@2024', role: 'Super Admin', name: 'Ferguson Admin' },
]

export default function AdminLogin({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      const user = ADMIN_USERS.find(
        u => u.username === form.username && u.password === form.password
      )
      if (user) {
        onLogin({ ...user, loginTime: new Date().toISOString() })
      } else {
        setError('Invalid username or password. Please try again.')
        setLoading(false)
      }
    }, 900)
  }

  return (
    <div className="al-root">
      <div className="al-bg">
        <div className="al-bg-orb al-bg-orb--1" />
        <div className="al-bg-orb al-bg-orb--2" />
        <div className="al-bg-grid" />
      </div>

      <div className="al-card">
        <div className="al-card__header">
          <img src={logoImg} alt="Ferguson Auto Sales" className="al-logo" />
          <h1 className="al-title">Admin Portal</h1>
          <p className="al-subtitle">Ferguson Auto Sales — Secure Access</p>
        </div>

        <form className="al-form" onSubmit={handleSubmit}>
          <div className="al-field">
            <label className="al-label">Username</label>
            <div className="al-input-wrap">
              <span className="al-input-icon">👤</span>
              <input
                className="al-input"
                type="text"
                placeholder="Enter your username"
                value={form.username}
                onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="al-field">
            <label className="al-label">Password</label>
            <div className="al-input-wrap">
              <span className="al-input-icon">🔒</span>
              <input
                className="al-input"
                type={showPass ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                autoComplete="current-password"
                required
              />
              <button type="button" className="al-eye" onClick={() => setShowPass(p => !p)}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {error && <div className="al-error">⚠️ {error}</div>}

          <button className="al-btn" type="submit" disabled={loading}>
            {loading ? <span className="al-spinner" /> : '🔓 Sign In to Dashboard'}
          </button>
        </form>

        <div className="al-hint">
          <p>Demo credentials:</p>
          <code>admin / Ferguson@2024</code>
        </div>

        <a href="#/" className="al-back">← Back to Website</a>
      </div>
    </div>
  )
}
