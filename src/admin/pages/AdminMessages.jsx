import { useState } from 'react'

const initialMessages = [
  { id: 1, name: 'James Harrison', email: 'james@email.com', subject: 'Vehicle Inquiry', message: 'I am very interested in the 2023 BMW M5. Can you arrange a test drive for this Saturday? Also, is there any flexibility on the price?', time: '10:42 AM', date: '09 Jun 2026', read: false, replied: false, tag: 'Inquiry' },
  { id: 2, name: 'Sarah Mitchell', email: 'sarah@email.com', subject: 'Test Drive Booking', message: 'Hello, I would like to book a test drive for the Mercedes GLE 450 at your earliest convenience. I am available Mon-Wed mornings.', time: '9:15 AM', date: '09 Jun 2026', read: false, replied: false, tag: 'Test Drive' },
  { id: 3, name: 'David Okafor', email: 'david@email.com', subject: 'Financing & Payment', message: 'Good morning! I am interested in PCP finance on the Porsche Cayenne. Could you send over the finance details and monthly payment breakdown?', time: 'Yesterday', date: '08 Jun 2026', read: true, replied: true, tag: 'Finance' },
  { id: 4, name: 'Emma Thompson', email: 'emma@email.com', subject: 'Trade-In Valuation', message: 'I currently own a 2020 Audi A6 (32,000 miles, full service history) and would like a trade-in valuation before purchasing the Q7.', time: 'Yesterday', date: '08 Jun 2026', read: true, replied: false, tag: 'Trade-In' },
  { id: 5, name: 'Priya Sharma', email: 'priya@email.com', subject: 'General Inquiry', message: 'Hi, I saw your listing for the Tesla Model S Plaid. Does it come with a full UK warranty? Also, what charging options are available?', time: '07 Jun', date: '07 Jun 2026', read: true, replied: true, tag: 'General' },
]

const tagColors = { Inquiry: 'blue', 'Test Drive': 'green', Finance: 'yellow', 'Trade-In': 'red', General: 'gray' }

export default function AdminMessages() {
  const [messages, setMessages] = useState(initialMessages)
  const [selected, setSelected] = useState(null)
  const [reply, setReply] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const select = (m) => {
    setSelected(m)
    setMessages(p => p.map(msg => msg.id === m.id ? { ...msg, read: true } : msg))
    setReply('')
  }

  const sendReply = () => {
    if (!reply.trim()) return
    setMessages(p => p.map(msg => msg.id === selected.id ? { ...msg, replied: true } : msg))
    setSelected(p => ({ ...p, replied: true }))
    setReply('')
    alert('Reply sent successfully!')
  }

  const filtered = messages.filter(m => {
    const q = search.toLowerCase()
    const matchQ = m.name.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q)
    const matchF = filter === 'All' || (filter === 'Unread' && !m.read) || (filter === 'Replied' && m.replied) || m.tag === filter
    return matchQ && matchF
  })

  const unread = messages.filter(m => !m.read).length

  return (
    <div>
      <div className="adm-stat-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 20 }}>
        {[
          { icon: '💬', label: 'Total Messages', value: messages.length, color: '#a29bfe' },
          { icon: '🔴', label: 'Unread', value: unread, color: '#e50914' },
          { icon: '↩️', label: 'Replied', value: messages.filter(m => m.replied).length, color: '#00b894' },
          { icon: '⏳', label: 'Awaiting Reply', value: messages.filter(m => !m.replied).length, color: '#f5c518' },
        ].map((s, i) => (
          <div className="adm-stat" key={i}>
            <span className="adm-stat__icon">{s.icon}</span>
            <span className="adm-stat__value">{s.value}</span>
            <span className="adm-stat__label">{s.label}</span>
            <div className="adm-stat__accent" style={{ background: s.color }} />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 20, height: 600 }}>
        {/* Message List */}
        <div style={{ width: 340, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="adm-toolbar" style={{ marginBottom: 0 }}>
            <div className="adm-search" style={{ flex: 1 }}>
              <span className="adm-search__icon">🔍</span>
              <input placeholder="Search messages..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          <select className="adm-select" value={filter} onChange={e => setFilter(e.target.value)}>
            {['All','Unread','Replied','Inquiry','Test Drive','Finance','Trade-In','General'].map(f => <option key={f}>{f}</option>)}
          </select>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', flex: 1 }}>
            {filtered.map(m => (
              <div key={m.id}
                onClick={() => select(m)}
                style={{
                  background: selected?.id === m.id ? 'rgba(229,9,20,0.1)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${selected?.id === m.id ? 'rgba(229,9,20,0.3)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 10, padding: 14, cursor: 'pointer', transition: 'all 0.15s',
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <span style={{ fontWeight: m.read ? 500 : 700, color: '#fff', fontSize: 13 }}>{m.name}</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{m.time}</span>
                </div>
                <div style={{ fontSize: 12, color: '#f5c518', fontWeight: 600, marginBottom: 4 }}>{m.subject}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.message}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 8, alignItems: 'center' }}>
                  <span className={`adm-badge adm-badge--${tagColors[m.tag] || 'gray'}`} style={{ fontSize: 10 }}>{m.tag}</span>
                  {!m.read && <span className="adm-badge adm-badge--red" style={{ fontSize: 10 }}>New</span>}
                  {m.replied && <span className="adm-badge adm-badge--green" style={{ fontSize: 10 }}>Replied</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {selected ? (
            <div className="adm-section" style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: 0 }}>
              <div className="adm-section__head">
                <div>
                  <h3 className="adm-section__title">{selected.subject}</h3>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
                    From: {selected.name} &lt;{selected.email}&gt; · {selected.date}
                  </div>
                </div>
                <span className={`adm-badge adm-badge--${tagColors[selected.tag] || 'gray'}`}>{selected.tag}</span>
              </div>
              <div className="adm-section__body" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: 16, border: '1px solid rgba(255,255,255,0.07)', fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
                  {selected.message}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8 }}>
                    ↩️ Reply to {selected.name}
                  </div>
                  <textarea
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    placeholder={`Write your reply to ${selected.name}...`}
                    rows={5}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px 14px', color: '#fff', fontFamily: 'inherit', fontSize: 13.5, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                  />
                  <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                    <button className="adm-btn adm-btn--primary" onClick={sendReply}>📤 Send Reply</button>
                    <a href={`mailto:${selected.email}`} className="adm-btn adm-btn--outline" style={{ textDecoration: 'none' }}>📧 Open Email Client</a>
                    <a href={`https://wa.me/447823637286?text=Hi ${selected.name}`} target="_blank" rel="noreferrer" className="adm-btn adm-btn--gold" style={{ textDecoration: 'none' }}>💬 WhatsApp</a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: 14 }}>
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>💬</div>
                <div style={{ fontSize: 15 }}>Select a message to read and reply</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
