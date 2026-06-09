import { useState, useRef } from 'react'
import { useCarStore } from '../../context/CarStore'

const EMPTY = {
  name: '', brand: '', year: new Date().getFullYear(), price: '',
  mileage: '', status: 'Available', category: 'Luxury Sedan',
  fuel: 'Petrol', color: '', description: '', power: '', speed: '',
  acceleration: '', badge: 'New', type: 'Sedan',
}

const statusColor = (s) => {
  if (s === 'Available') return 'green'
  if (s === 'Reserved') return 'yellow'
  if (s === 'Sold') return 'red'
  return 'gray'
}

export default function AdminInventory() {
  const { cars, addCar, updateCar, deleteCar, resetToDefaults } = useCarStore()
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [view, setView] = useState('table')
  const [modal, setModal] = useState(null) // null | 'add' | 'edit'
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [previewImg, setPreviewImg] = useState(null)
  const [success, setSuccess] = useState('')
  const fileRef = useRef()

  const filtered = cars.filter(c => {
    const matchSearch = (c.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.brand || '').toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'All' || c.status === filterStatus
    return matchSearch && matchStatus
  })

  const openAdd = () => {
    setForm(EMPTY)
    setEditId(null)
    setPreviewImg(null)
    setModal('add')
  }

  const openEdit = (car) => {
    setForm({
      name: car.name || '', brand: car.brand || '', year: car.year || '',
      price: String(car.price || ''), mileage: car.mileage || '',
      status: car.status || 'Available', category: car.category || '',
      fuel: car.fuel || 'Petrol', color: car.color || '',
      description: car.description || '', power: car.power || '',
      speed: car.speed || '', acceleration: car.acceleration || '',
      badge: car.badge || 'New', type: car.type || 'Sedan',
    })
    setPreviewImg(typeof car.image === 'string' ? car.image : null)
    setEditId(car.id)
    setModal('edit')
  }

  const closeModal = () => {
    setModal(null)
    setForm(EMPTY)
    setEditId(null)
    setPreviewImg(null)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setPreviewImg(ev.target.result)
      setForm(p => ({ ...p, _imageData: ev.target.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.price) {
      alert('Please fill in Vehicle Name and Price at minimum.')
      return
    }
    const carData = {
      ...form,
      price: Number(form.price),
      year: Number(form.year) || new Date().getFullYear(),
      image: previewImg || form._imageData || '🚗',
      rating: form.rating || 4.5,
      reviews: form.reviews || 0,
    }
    delete carData._imageData

    if (modal === 'add') {
      addCar(carData)
      setSuccess(`✅ "${form.name}" has been added to the website shop!`)
    } else {
      updateCar(editId, carData)
      setSuccess(`✅ "${form.name}" has been updated successfully!`)
    }
    closeModal()
    setTimeout(() => setSuccess(''), 4000)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Remove "${name}" from inventory?`)) {
      deleteCar(id)
      setSuccess(`🗑️ "${name}" removed from inventory.`)
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  const field = (key, label, placeholder, type = 'text') => (
    <div className="adm-form-field">
      <label>{label}</label>
      <input
        type={type}
        value={form[key] || ''}
        placeholder={placeholder}
        onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
      />
    </div>
  )

  const adminCars = cars.filter(c => c.adminAdded)
  const available = cars.filter(c => c.status === 'Available').length
  const reserved  = cars.filter(c => c.status === 'Reserved').length
  const sold      = cars.filter(c => c.status === 'Sold').length

  return (
    <div>
      {/* Success Banner */}
      {success && (
        <div style={{ background: 'rgba(0,184,148,0.12)', border: '1px solid rgba(0,184,148,0.3)', borderRadius: 10, padding: '12px 18px', marginBottom: 16, color: '#00b894', fontWeight: 600, fontSize: 14 }}>
          {success}
        </div>
      )}

      {/* Live Posting Banner */}
      <div style={{ background: 'linear-gradient(135deg, rgba(229,9,20,0.1), rgba(245,197,24,0.08))', border: '1px solid rgba(229,9,20,0.2)', borderRadius: 12, padding: '14px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontWeight: 700, color: '#fff', fontSize: 14, marginBottom: 2 }}>🚀 Live Inventory Management</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
            Cars you add here appear <strong style={{ color: '#00b894' }}>instantly</strong> on the website Shop page. {adminCars.length > 0 && `${adminCars.length} admin-posted car(s) live.`}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="adm-btn adm-btn--primary" onClick={openAdd}>🚗 + Post New Car to Website</button>
          <a href="#/shop" target="_blank" rel="noreferrer" className="adm-btn adm-btn--outline" style={{ textDecoration: 'none' }}>🌐 Preview Shop</a>
        </div>
      </div>

      {/* Stats */}
      <div className="adm-stat-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 20 }}>
        {[
          { label: 'Total Vehicles', value: cars.length, color: '#e50914', icon: '🚗' },
          { label: 'Available', value: available, color: '#00b894', icon: '✅' },
          { label: 'Reserved', value: reserved, color: '#f5c518', icon: '🔖' },
          { label: 'Sold', value: sold, color: '#a29bfe', icon: '💰' },
        ].map((s, i) => (
          <div className="adm-stat" key={i}>
            <span className="adm-stat__icon">{s.icon}</span>
            <span className="adm-stat__value">{s.value}</span>
            <span className="adm-stat__label">{s.label}</span>
            <div className="adm-stat__accent" style={{ background: s.color }} />
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="adm-toolbar">
        <div className="adm-search">
          <span className="adm-search__icon">🔍</span>
          <input placeholder="Search vehicles..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="adm-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option>All</option><option>Available</option><option>Reserved</option><option>Sold</option>
        </select>
        <button className="adm-btn adm-btn--outline" onClick={() => setView(v => v === 'table' ? 'grid' : 'table')}>
          {view === 'table' ? '⊞ Grid' : '☰ Table'}
        </button>
        <button className="adm-btn adm-btn--outline adm-btn--sm"
          style={{ color: '#f5c518', borderColor: 'rgba(245,197,24,0.3)' }}
          onClick={() => { if (window.confirm('Reset inventory to default cars? Admin-added cars will be removed.')) resetToDefaults() }}>
          ↩️ Reset to Defaults
        </button>
        <button className="adm-btn adm-btn--primary" onClick={openAdd}>+ Post Car to Website</button>
      </div>

      {/* Table View */}
      {view === 'table' && (
        <div className="adm-table-wrap">
          <div className="adm-table-header">
            <h3 className="adm-table-title">🚗 Inventory ({filtered.length})</h3>
          </div>
          <table className="adm-table">
            <thead>
              <tr>
                <th>Vehicle</th><th>Year</th><th>Category</th><th>Fuel</th>
                <th>Price</th><th>Status</th><th>Source</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {typeof c.image === 'string' && c.image.startsWith('data:') ? (
                        <img src={c.image} alt={c.name} style={{ width: 44, height: 34, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
                      ) : typeof c.image === 'string' && c.image.startsWith('http') ? (
                        <img src={c.image} alt={c.name} style={{ width: 44, height: 34, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
                      ) : (
                        <div style={{ width: 44, height: 34, borderRadius: 6, background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🚗</div>
                      )}
                      <div>
                        <div style={{ fontWeight: 600, color: '#fff', fontSize: 13 }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{c.color || c.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.year}</td>
                  <td><span className="adm-badge adm-badge--blue">{c.category || c.type}</span></td>
                  <td style={{ color: 'rgba(255,255,255,0.55)' }}>{c.fuel}</td>
                  <td style={{ color: '#f5c518', fontWeight: 700, fontFamily: 'Orbitron,sans-serif', fontSize: 13 }}>
                    £{Number(c.price).toLocaleString()}
                  </td>
                  <td><span className={`adm-badge adm-badge--${statusColor(c.status)}`}>{c.status || 'Available'}</span></td>
                  <td>
                    {c.adminAdded
                      ? <span className="adm-badge adm-badge--green">Admin Posted</span>
                      : <span className="adm-badge adm-badge--gray">Default</span>}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="adm-btn adm-btn--outline adm-btn--sm" onClick={() => openEdit(c)}>✏️ Edit</button>
                      <button className="adm-btn adm-btn--sm" style={{ background: 'rgba(229,9,20,0.15)', color: '#ff6b6b', border: '1px solid rgba(229,9,20,0.3)' }}
                        onClick={() => handleDelete(c.id, c.name)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Grid View */}
      {view === 'grid' && (
        <div className="adm-car-grid">
          {filtered.map(c => (
            <div className="adm-car-card" key={c.id}>
              {typeof c.image === 'string' && (c.image.startsWith('data:') || c.image.startsWith('http')) ? (
                <img src={c.image} alt={c.name} className="adm-car-card__img" style={{ objectFit: 'cover' }} />
              ) : (
                <div className="adm-car-card__img">🚗</div>
              )}
              <div className="adm-car-card__body">
                <div className="adm-car-card__name">{c.name}</div>
                <div className="adm-car-card__meta">{c.year} · {c.fuel}</div>
                <div className="adm-car-card__price">£{Number(c.price).toLocaleString()}</div>
                <div style={{ marginBottom: 10, display: 'flex', gap: 6 }}>
                  <span className={`adm-badge adm-badge--${statusColor(c.status)}`}>{c.status}</span>
                  {c.adminAdded && <span className="adm-badge adm-badge--green" style={{ fontSize: 10 }}>Live</span>}
                </div>
                <div className="adm-car-card__actions">
                  <button className="adm-btn adm-btn--outline adm-btn--sm" onClick={() => openEdit(c)}>✏️ Edit</button>
                  <button className="adm-btn adm-btn--sm" style={{ background: 'rgba(229,9,20,0.12)', color: '#ff6b6b', border: '1px solid rgba(229,9,20,0.25)' }}
                    onClick={() => handleDelete(c.id, c.name)}>🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {modal && (
        <div className="adm-modal-backdrop" onClick={closeModal}>
          <div className="adm-modal" style={{ maxWidth: 680 }} onClick={e => e.stopPropagation()}>
            <h3 className="adm-modal__title">
              {modal === 'add' ? '🚗 Post New Car to Website' : '✏️ Edit Vehicle Listing'}
            </h3>
            <button className="adm-modal__close" onClick={closeModal}>✕</button>

            {/* Image Upload Section */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', marginBottom: 8 }}>
                📸 Car Image (shown on website)
              </label>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div
                  onClick={() => fileRef.current.click()}
                  style={{
                    width: 160, height: 110, borderRadius: 10, overflow: 'hidden', cursor: 'pointer', flexShrink: 0,
                    border: previewImg ? '2px solid rgba(0,184,148,0.4)' : '2px dashed rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}>
                  {previewImg ? (
                    <img src={previewImg} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
                      <div style={{ fontSize: 28, marginBottom: 4 }}>📷</div>
                      <div style={{ fontSize: 11 }}>Click to upload</div>
                    </div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                  <button className="adm-btn adm-btn--outline" onClick={() => fileRef.current.click()} style={{ marginBottom: 8, width: '100%', justifyContent: 'center' }}>
                    📁 Browse Image File
                  </button>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}>
                    Supported: JPG, PNG, WebP, GIF<br />
                    Recommended: 800×500px or wider<br />
                    This image will appear on the Shop page
                  </div>
                  {previewImg && (
                    <button className="adm-btn adm-btn--sm" style={{ marginTop: 8, background: 'rgba(229,9,20,0.1)', color: '#ff6b6b', border: '1px solid rgba(229,9,20,0.25)' }}
                      onClick={() => { setPreviewImg(null); setForm(p => ({ ...p, _imageData: null })) }}>
                      ✕ Remove Image
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="adm-form-grid">
              {field('name', 'Vehicle Name *', 'e.g. 2024 BMW M5 Competition')}
              {field('brand', 'Brand *', 'e.g. BMW')}
              {field('year', 'Year', '2024', 'number')}
              {field('price', 'Price (£) *', '65000', 'number')}
              {field('mileage', 'Mileage', 'e.g. 5,000 mi')}
              {field('color', 'Color', 'e.g. Midnight Black')}
              {field('power', 'Power (HP)', 'e.g. 510 HP')}
              {field('speed', 'Top Speed', 'e.g. 305 km/h')}
              {field('acceleration', '0–100 km/h', 'e.g. 3.5s')}
              <div className="adm-form-field">
                <label>Status</label>
                <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                  <option>Available</option><option>Reserved</option><option>Sold</option>
                </select>
              </div>
              <div className="adm-form-field">
                <label>Fuel Type</label>
                <select value={form.fuel} onChange={e => setForm(p => ({ ...p, fuel: e.target.value }))}>
                  <option>Petrol</option><option>Diesel</option><option>Hybrid</option><option>Electric</option>
                </select>
              </div>
              <div className="adm-form-field">
                <label>Vehicle Type</label>
                <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                  {['Supercar','Sports Car','Sedan','Grand Tourer','Electric','Electric SUV','Electric Sedan','SUV','Luxury Sedan','Convertible'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="adm-form-field">
                <label>Badge Label</label>
                <select value={form.badge} onChange={e => setForm(p => ({ ...p, badge: e.target.value }))}>
                  {['New','Bestseller','New Arrival','Popular','Limited','Exclusive','EV','Featured'].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="adm-form-field" style={{ marginTop: 16 }}>
              <label>Description (shown on website) *</label>
              <textarea
                value={form.description || ''}
                placeholder="Write a compelling description that will appear on the Shop page..."
                rows={4}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '10px 12px', color: '#fff', fontFamily: 'inherit', fontSize: 13.5, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
              />
            </div>

            {/* Preview hint */}
            <div style={{ background: 'rgba(0,184,148,0.06)', border: '1px solid rgba(0,184,148,0.15)', borderRadius: 8, padding: '10px 14px', marginTop: 14, fontSize: 12, color: 'rgba(0,184,148,0.8)' }}>
              ℹ️ After saving, this car will <strong>immediately appear</strong> on the website Shop page for customers to view and add to cart.
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button className="adm-btn adm-btn--primary" onClick={handleSave} style={{ flex: 1, justifyContent: 'center' }}>
                {modal === 'add' ? '🚀 Post to Website Now' : '💾 Save Changes'}
              </button>
              <button className="adm-btn adm-btn--outline" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
