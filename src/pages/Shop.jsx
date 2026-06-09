import { useState, useMemo, useEffect, useRef } from 'react'
import { useCart } from '../App'
import { FiSearch, FiFilter, FiStar, FiZap, FiShoppingCart, FiCheck } from '../components/Icons'
import { cars, brands, types } from '../data/cars'
import heroBgImg from '../assets/cars/car_porsche.png'
import './Shop.css'

const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $100K', min: 0, max: 100000 },
  { label: '$100K – $200K', min: 100000, max: 200000 },
  { label: '$200K+', min: 200000, max: Infinity },
]

function useReveal() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, vis }
}

function ShopCard({ car, onAdd, added, index }) {
  const { ref, vis } = useReveal()
  return (
    <div
      ref={ref}
      className="shop-card"
      style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)', transition: `opacity 0.5s ease ${index * 60}ms, transform 0.5s ease ${index * 60}ms` }}
    >
      <div className="shop-card__badge" style={{ background: car.badgeColor }}>{car.badge}</div>
      <div className="shop-card__img-wrap">
        <img src={car.image} alt={car.name} className="shop-card__img" />
        <div className="shop-card__img-overlay" />
        <div className="shop-card__fuel-tag">{car.fuel}</div>
      </div>
      <div className="shop-card__body">
        <div className="shop-card__header">
          <div>
            <span className="shop-card__brand">{car.brand}</span>
            <h3 className="shop-card__name">{car.name}</h3>
          </div>
          <div className="shop-card__year">{car.year}</div>
        </div>
        <p className="shop-card__desc">{car.description}</p>
        <div className="shop-card__specs-row">
          <div className="shop-card__spec-item"><span className="shop-card__spec-label">Power</span><span className="shop-card__spec-val">{car.power}</span></div>
          <div className="shop-card__spec-item"><span className="shop-card__spec-label">0–100</span><span className="shop-card__spec-val">{car.acceleration}</span></div>
          <div className="shop-card__spec-item"><span className="shop-card__spec-label">Top Speed</span><span className="shop-card__spec-val">{car.speed}</span></div>
          <div className="shop-card__spec-item"><span className="shop-card__spec-label">Color</span><span className="shop-card__spec-val">{car.color}</span></div>
        </div>
        <div className="shop-card__footer">
          <div className="shop-card__price-wrap">
            <span className="shop-card__price">${car.price.toLocaleString()}</span>
            <div className="shop-card__rating">
              <FiStar className="shop-card__star" /><span>{car.rating}</span>
              <span className="shop-card__reviews">({car.reviews} reviews)</span>
            </div>
          </div>
          <button className={`shop-card__btn ${added ? 'shop-card__btn--added' : ''}`} onClick={() => onAdd(car)}>
            {added ? <><FiCheck /> Added!</> : <><FiShoppingCart /> Add to Cart</>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Shop() {
  const [search, setSearch] = useState('')
  const [activeBrand, setActiveBrand] = useState('All')
  const [activeType, setActiveType] = useState('All')
  const [priceRange, setPriceRange] = useState(0)
  const [sortBy, setSortBy] = useState('default')
  const [added, setAdded] = useState({})
  const [showFilters, setShowFilters] = useState(false)
  const { addToCart } = useCart()

  const handleAdd = (car) => {
    addToCart(car)
    setAdded(p => ({ ...p, [car.id]: true }))
    setTimeout(() => setAdded(p => ({ ...p, [car.id]: false })), 1800)
  }

  const filtered = useMemo(() => {
    let result = [...cars]
    const { min, max } = priceRanges[priceRange]
    if (search) result = result.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.brand.toLowerCase().includes(search.toLowerCase()))
    if (activeBrand !== 'All') result = result.filter(c => c.brand === activeBrand)
    if (activeType !== 'All') result = result.filter(c => c.type === activeType)
    result = result.filter(c => c.price >= min && c.price <= max)
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price)
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating)
    else if (sortBy === 'power') result.sort((a, b) => parseInt(b.power) - parseInt(a.power))
    return result
  }, [search, activeBrand, activeType, priceRange, sortBy])

  const resetFilters = () => { setActiveBrand('All'); setActiveType('All'); setPriceRange(0); setSearch(''); setSortBy('default') }

  return (
    <div className="shop">
      <section className="page-hero shop__hero">
        <div className="hero-blur-bg" style={{ backgroundImage: `url(${heroBgImg})` }} />
        <div className="hero-blur-overlay" />
        <div className="shop__hero-orb" />
        <div className="container">
          <div className="shop__hero-content">
            <div className="section-tag">Our Inventory</div>
            <h1 className="page-hero-title">Browse Our <span className="highlight">Collection</span></h1>
            <p className="page-hero-subtitle">{cars.length} premium vehicles ready for you to drive home today.</p>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="shop__topbar">
          <div className="shop__search">
            <FiSearch className="shop__search-icon" />
            <input type="text" placeholder="Search by name or brand..." value={search} onChange={e => setSearch(e.target.value)} className="shop__search-input" />
            {search && <button className="shop__search-clear" onClick={() => setSearch('')}>✕</button>}
          </div>
          <div className="shop__topbar-right">
            <select className="shop__sort" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="power">Most Powerful</option>
            </select>
            <button className={`shop__filter-btn ${showFilters ? 'shop__filter-btn--active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
              <FiFilter /> Filters
            </button>
          </div>
        </div>

        <div className={`shop__filters ${showFilters ? 'shop__filters--open' : ''}`}>
          <div className="shop__filter-group">
            <label className="shop__filter-label">Brand</label>
            <div className="shop__filter-pills">
              {brands.map(b => <button key={b} className={`shop__pill ${activeBrand === b ? 'shop__pill--active' : ''}`} onClick={() => setActiveBrand(b)}>{b}</button>)}
            </div>
          </div>
          <div className="shop__filter-group">
            <label className="shop__filter-label">Type</label>
            <div className="shop__filter-pills">
              {types.map(t => <button key={t} className={`shop__pill ${activeType === t ? 'shop__pill--active' : ''}`} onClick={() => setActiveType(t)}>{t}</button>)}
            </div>
          </div>
          <div className="shop__filter-group">
            <label className="shop__filter-label">Price Range</label>
            <div className="shop__filter-pills">
              {priceRanges.map((r, i) => <button key={i} className={`shop__pill ${priceRange === i ? 'shop__pill--active' : ''}`} onClick={() => setPriceRange(i)}>{r.label}</button>)}
            </div>
          </div>
          <button className="shop__filter-reset" onClick={resetFilters}>Reset All Filters</button>
        </div>

        <div className="shop__results-bar">
          <span className="shop__results-count">Showing <strong>{filtered.length}</strong> of <strong>{cars.length}</strong> vehicles</span>
          <div className="shop__active-filters">
            {activeBrand !== 'All' && <span className="shop__active-tag">{activeBrand}</span>}
            {activeType !== 'All' && <span className="shop__active-tag">{activeType}</span>}
          </div>
        </div>

        <div className="shop__grid">
          {filtered.length === 0
            ? <div className="shop__empty"><span className="shop__empty-icon">🚗</span><h3>No cars found</h3><p>Try adjusting your search or filters</p></div>
            : filtered.map((car, i) => <ShopCard key={car.id} car={car} onAdd={handleAdd} added={added[car.id]} index={i} />)
          }
        </div>
      </div>
    </div>
  )
}
