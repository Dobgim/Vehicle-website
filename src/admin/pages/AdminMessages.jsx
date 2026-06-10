import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

const tagColors = { Inquiry: 'blue', 'Test Drive': 'green', Finance: 'yellow', 'Trade-In': 'red', General: 'gray' }

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [reply, setReply] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  // Fetch messages from Supabase
  useEffect(() => {
    async function fetchMessages() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false })
        if (error) throw error
        if (data) {
          const mapped = data.map(m => ({
            ...m,
            time: new Date(m.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
            date: new Date(m.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
          }))
          setMessages(mapped)
        }
      } catch (err) {
        console.error('Error fetching messages from Supabase:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMessages()
  }, [])

  const select = async (m) => {
    setSelected(m)
    setReply('')
    
    if (!m.read) {
      try {
        const { error } = await supabase
          .from('messages')
          .update({ read: true })
          .eq('id', m.id)
        if (error) throw error
        
        setMessages(p => p.map(msg => msg.id === m.id ? { ...msg, read: true } : msg))
        setSelected(prev => prev && prev.id === m.id ? { ...prev, read: true } : prev)
      } catch (err) {
        console.error('Error marking message as read in database:', err)
      }
    }
  }

  const sendReply = async () => {
    if (!reply.trim()) return
    try {
      const { error } = await supabase
        .from('messages')
        .update({ replied: true })
        .eq('id', selected.id)
      
      if (error) throw error
      
      setMessages(p => p.map(msg => msg.id === selected.id ? { ...msg, replied: true } : msg))
      setSelected(p => ({ ...p, replied: true }))
      setReply('')
      alert('Reply status updated in database successfully!')
    } catch (err) {
      console.error('Error marking message as replied in database:', err)
      alert('Failed to update reply status.')
    }
  }

  const filtered = messages.filter(m => {
    const q = search.toLowerCase()
    const matchQ = (m.name || '').toLowerCase().includes(q) || (m.subject || '').toLowerCase().includes(q)
    const matchF = filter === 'All' || (filter === 'Unread' && !m.read) || (filter === 'Replied' && m.replied) || m.tag === filter
    return matchQ && matchF
  })

  const unread = messages.filter(m => !m.read).length

  if (loading) {
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
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 20, color: 'rgba(255,255,255,0.25)', fontSize: 13 }}>
                No messages found.
              </div>
            ) : (
              filtered.map(m => (
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
              ))
            )}
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
                    From: {selected.name} &lt;{selected.email}&gt; {selected.phone && `· ${selected.phone}`} · {selected.date}
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
                    <button className="adm-btn adm-btn--primary" onClick={sendReply}>📤 Mark Replied</button>
                    <a href={`mailto:${selected.email}`} className="adm-btn adm-btn--outline" style={{ textDecoration: 'none' }}>📧 Open Email Client</a>
                    {selected.phone && (
                      <a href={`https://wa.me/${selected.phone.replace(/\D/g, '')}?text=Hi ${selected.name}`} target="_blank" rel="noreferrer" className="adm-btn adm-btn--gold" style={{ textDecoration: 'none' }}>💬 WhatsApp</a>
                    )}
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
