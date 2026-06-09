import { useState } from 'react'

const TABS = ['General', 'Business Info', 'Notifications', 'Security', 'Appearance']

export default function AdminSettings({ auth }) {
  const [tab, setTab] = useState('General')
  const [saved, setSaved] = useState('')

  const save = (section) => {
    setSaved(`✅ ${section} settings saved successfully!`)
    setTimeout(() => setSaved(''), 3000)
  }

  return (
    <div>
      {saved && (
        <div style={{ background: 'rgba(0,184,148,0.12)', border: '1px solid rgba(0,184,148,0.3)', borderRadius: 10, padding: '12px 18px', marginBottom: 16, color: '#00b894', fontWeight: 600, fontSize: 14 }}>
          {saved}
        </div>
      )}

      {/* Tab Nav */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 0 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              padding: '10px 16px', fontSize: 13.5, fontWeight: 600,
              color: tab === t ? '#fff' : 'rgba(255,255,255,0.4)',
              borderBottom: tab === t ? '2px solid #e50914' : '2px solid transparent',
              transition: 'all 0.15s', marginBottom: -1,
            }}>
            {t}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {tab === 'General' && (
        <div>
          <div className="adm-section">
            <div className="adm-section__head"><h3 className="adm-section__title">⚙️ General Settings</h3></div>
            <div className="adm-section__body">
              <div className="adm-form-grid">
                <div className="adm-form-field"><label>Site Name</label><input defaultValue="Ferguson Auto Sales" /></div>
                <div className="adm-form-field"><label>Site Tagline</label><input defaultValue="Drive Your Dream" /></div>
                <div className="adm-form-field"><label>Admin Email</label><input defaultValue="admin@fergusonautosales.com" type="email" /></div>
                <div className="adm-form-field"><label>Support Phone</label><input defaultValue="+44 7823 637286" /></div>
                <div className="adm-form-field"><label>Currency</label>
                  <select defaultValue="GBP"><option value="GBP">GBP (£)</option><option value="USD">USD ($)</option><option value="EUR">EUR (€)</option></select>
                </div>
                <div className="adm-form-field"><label>Timezone</label>
                  <select defaultValue="London"><option>London (GMT+1)</option><option>New York (EST)</option><option>Dubai (GST)</option></select>
                </div>
              </div>
              <button className="adm-btn adm-btn--primary" style={{ marginTop: 20 }} onClick={() => save('General')}>💾 Save General Settings</button>
            </div>
          </div>

          <div className="adm-section">
            <div className="adm-section__head"><h3 className="adm-section__title">🛒 Shop Settings</h3></div>
            <div className="adm-section__body">
              <div className="adm-form-grid">
                <div className="adm-form-field"><label>Items Per Page</label>
                  <select defaultValue="12"><option>6</option><option>12</option><option>24</option><option>48</option></select>
                </div>
                <div className="adm-form-field"><label>Default Sort</label>
                  <select><option>Default</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Newest First</option></select>
                </div>
                <div className="adm-form-field"><label>Show "Out of Stock" items</label>
                  <select><option>Yes</option><option>No</option></select>
                </div>
                <div className="adm-form-field"><label>Allow Cart / Orders</label>
                  <select><option>Enabled</option><option>Disabled</option></select>
                </div>
              </div>
              <button className="adm-btn adm-btn--primary" style={{ marginTop: 20 }} onClick={() => save('Shop')}>💾 Save Shop Settings</button>
            </div>
          </div>
        </div>
      )}

      {/* Business Info */}
      {tab === 'Business Info' && (
        <div className="adm-section">
          <div className="adm-section__head"><h3 className="adm-section__title">🏢 Business Information</h3></div>
          <div className="adm-section__body">
            <div className="adm-form-grid">
              <div className="adm-form-field"><label>Business Name</label><input defaultValue="Ferguson Auto Sales Ltd" /></div>
              <div className="adm-form-field"><label>Company Reg. No.</label><input defaultValue="UK-FAS-2009" /></div>
              <div className="adm-form-field"><label>VAT Number</label><input defaultValue="GB123456789" /></div>
              <div className="adm-form-field"><label>Phone</label><input defaultValue="+44 7823 637286" /></div>
              <div className="adm-form-field"><label>Email</label><input defaultValue="info@fergusonautosales.com" type="email" /></div>
              <div className="adm-form-field"><label>WhatsApp Number</label><input defaultValue="+44 7823 637286" /></div>
            </div>
            <div className="adm-form-field" style={{ marginTop: 16 }}>
              <label>Address</label>
              <textarea defaultValue="45 Regent Street, Mayfair, London, United Kingdom" rows={2}
                style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '10px 12px', color: '#fff', fontFamily: 'inherit', fontSize: 13.5, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div className="adm-form-grid" style={{ marginTop: 16 }}>
              <div className="adm-form-field"><label>Opening Hours</label><input defaultValue="Mon–Sat: 8am–8pm" /></div>
              <div className="adm-form-field"><label>Weekend Hours</label><input defaultValue="Sun: 10am–5pm" /></div>
            </div>
            <button className="adm-btn adm-btn--primary" style={{ marginTop: 20 }} onClick={() => save('Business Info')}>💾 Save Business Info</button>
          </div>
        </div>
      )}

      {/* Notifications */}
      {tab === 'Notifications' && (
        <div className="adm-section">
          <div className="adm-section__head"><h3 className="adm-section__title">🔔 Notification Settings</h3></div>
          <div className="adm-section__body">
            {[
              ['New Order Received', 'Get notified when a customer places a new order'],
              ['New Message Received', 'Get notified when a customer sends a contact form message'],
              ['Low Inventory Alert', 'Alert when available vehicles drop below 5'],
              ['New Customer Registered', 'Notify when a new customer account is created'],
              ['Payment Confirmation', 'Confirm when a payment is processed successfully'],
              ['Test Drive Booked', 'Alert when a test drive is booked'],
            ].map(([label, desc], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{desc}</div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24, flexShrink: 0 }}>
                  <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                  <span style={{ position: 'absolute', cursor: 'pointer', inset: 0, background: '#e50914', borderRadius: 24, transition: '0.3s' }} />
                </label>
              </div>
            ))}
            <div style={{ marginTop: 20 }}>
              <div className="adm-form-field"><label>Notification Email</label><input defaultValue="admin@fergusonautosales.com" type="email" /></div>
            </div>
            <button className="adm-btn adm-btn--primary" style={{ marginTop: 20 }} onClick={() => save('Notifications')}>💾 Save Notification Settings</button>
          </div>
        </div>
      )}

      {/* Security */}
      {tab === 'Security' && (
        <div>
          <div className="adm-section" style={{ marginBottom: 20 }}>
            <div className="adm-section__head"><h3 className="adm-section__title">🔐 Change Password</h3></div>
            <div className="adm-section__body">
              <div className="adm-form-grid">
                <div className="adm-form-field"><label>Current Password</label><input type="password" placeholder="Enter current password" /></div>
                <div className="adm-form-field"><label>New Password</label><input type="password" placeholder="Enter new password" /></div>
                <div className="adm-form-field"><label>Confirm New Password</label><input type="password" placeholder="Re-enter new password" /></div>
              </div>
              <button className="adm-btn adm-btn--primary" style={{ marginTop: 20 }} onClick={() => save('Password')}>🔒 Update Password</button>
            </div>
          </div>

          <div className="adm-section">
            <div className="adm-section__head"><h3 className="adm-section__title">👥 Admin Users</h3></div>
            <div className="adm-section__body">
              {[
                { name: 'Ferguson Admin', username: 'admin', role: 'Super Admin', lastLogin: 'Today, 10:42 AM' },
              ].map((u, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#e50914,#f5c518)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>{u.name[0]}</div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#fff', fontSize: 13 }}>{u.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>@{u.username} · Last login: {u.lastLogin}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span className="adm-badge adm-badge--yellow">{u.role}</span>
                    <button className="adm-btn adm-btn--outline adm-btn--sm">Edit</button>
                  </div>
                </div>
              ))}
              <button className="adm-btn adm-btn--outline" style={{ marginTop: 16 }}>+ Add Admin User</button>
            </div>
          </div>
        </div>
      )}

      {/* Appearance */}
      {tab === 'Appearance' && (
        <div className="adm-section">
          <div className="adm-section__head"><h3 className="adm-section__title">🎨 Appearance Settings</h3></div>
          <div className="adm-section__body">
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 12 }}>Primary Colour</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {['#e50914','#f5c518','#00b894','#1e50ff','#a29bfe','#fd79a8'].map(c => (
                  <div key={c} onClick={() => {}} style={{ width: 36, height: 36, borderRadius: '50%', background: c, cursor: 'pointer', border: c === '#e50914' ? '3px solid #fff' : '3px solid transparent', transition: 'border 0.15s' }} />
                ))}
              </div>
            </div>
            <div className="adm-form-grid">
              <div className="adm-form-field"><label>Font Family</label>
                <select><option>Inter (Current)</option><option>Poppins</option><option>Roboto</option><option>Outfit</option></select>
              </div>
              <div className="adm-form-field"><label>Dashboard Theme</label>
                <select><option>Dark (Current)</option><option>Light</option><option>System Default</option></select>
              </div>
              <div className="adm-form-field"><label>Sidebar Style</label>
                <select><option>Full Width</option><option>Icon Only</option><option>Auto-Collapse</option></select>
              </div>
              <div className="adm-form-field"><label>Card Radius</label>
                <select><option>Rounded (Current)</option><option>Sharp</option><option>Pill</option></select>
              </div>
            </div>
            <button className="adm-btn adm-btn--primary" style={{ marginTop: 20 }} onClick={() => save('Appearance')}>💾 Save Appearance</button>
          </div>
        </div>
      )}
    </div>
  )
}
