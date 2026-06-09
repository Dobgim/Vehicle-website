import { useState, useEffect, useRef } from 'react'
import { useCart } from '../App'
import { FiArrowRight, FiPlay, FiStar, FiChevronLeft, FiChevronRight, FiZap, FiShield, FiAward, FiHeadphones, FiCheck } from '../components/Icons'
import { useCarStore } from '../context/CarStore'
import { stats, testimonials } from '../data/cars'
import heroImg from '../assets/cars/hero_car.png'
import lamborghiniImg from '../assets/cars/car_lamborghini.png'
import porscheImg from '../assets/cars/car_porsche.png'
import bmwImg from '../assets/cars/car_bmw.png'
import mercedesImg from '../assets/cars/car_mercedes.png'
import './Home.css'
import './HomeSections.css'

const navigate = (hash) => { window.location.hash = hash; window.scrollTo({ top: 0, behavior: 'smooth' }) }

const features = [
  { icon: <FiZap />, title: 'Blazing Performance', desc: 'Every car in our fleet is hand-selected for peak performance and driving excitement.' },
  { icon: <FiShield />, title: 'Certified Quality', desc: 'All vehicles undergo rigorous 200-point inspections before they reach our showroom.' },
  { icon: <FiAward />, title: 'Award Winning', desc: 'Voted #1 luxury car dealership in West Africa for 5 consecutive years.' },
  { icon: <FiHeadphones />, title: '24/7 Support', desc: 'Our expert team is available around the clock to assist you with anything you need.' },
]

function useScrollReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function StatCounter({ target }) {
  const [count, setCount] = useState('0')
  const { ref, visible } = useScrollReveal()
  useEffect(() => {
    if (!visible) return
    const num = parseInt(target.replace(/\D/g, ''))
    const suffix = target.replace(/[0-9]/g, '')
    let start = 0
    const step = num / 60
    const t = setInterval(() => {
      start = Math.min(start + step, num)
      setCount(Math.floor(start) + suffix)
      if (start >= num) clearInterval(t)
    }, 20)
    return () => clearInterval(t)
  }, [visible, target])
  return <span ref={ref} className="stat-item__value">{count || '0'}</span>
}

export default function Home() {
  const { cars } = useCarStore()
  const [activeTest, setActiveTest] = useState(0)
  const [added, setAdded] = useState({})
  const { addToCart } = useCart()
  const featuredCars = cars.slice(0, 4)

  const handleAdd = (car) => {
    addToCart(car)
    setAdded(p => ({ ...p, [car.id]: true }))
    setTimeout(() => setAdded(p => ({ ...p, [car.id]: false })), 1500)
  }

  return (
    <div className="home">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__orb hero__orb--red" />
        <div className="hero__orb hero__orb--blue" />
        <div className="hero__grid container">
          <div className="hero__content hero__content--anim">
            <h1 className="hero__title">
              Drive The<br />
              <span className="hero__title-accent">Future</span>
              <br />Today
            </h1>
            <p className="hero__desc">
              Discover an unparalleled collection of the world's most coveted luxury and performance cars. Your dream vehicle is waiting.
            </p>
            <div className="hero__actions">
              <a href="#/shop" className="btn btn-primary hero__btn-primary" onClick={(e) => { e.preventDefault(); navigate('#/shop') }}>
                Explore Cars <FiArrowRight />
              </a>
              <button className="hero__play-btn">
                <span className="hero__play-icon"><FiPlay /></span>
                Watch Showroom
              </button>
            </div>
            <div className="hero__stats">
              {stats.slice(0, 3).map((s, i) => (
                <div key={i} className="hero__stat">
                  <span className="hero__stat-value">{s.value}</span>
                  <span className="hero__stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero__visual hero__visual--anim">
            <div className="hero__car-wrap">
              <div className="hero__car-glow" />
              <img src={heroImg} alt="Luxury Sports Car" className="hero__car-img" />
              <div className="hero__car-shadow" />
            </div>
            <div className="hero__badge hero__badge--speed">
              <span className="hero__badge-val">325</span>
              <span className="hero__badge-unit">km/h</span>
              <span className="hero__badge-label">Top Speed</span>
            </div>
            <div className="hero__badge hero__badge--power">
              <span className="hero__badge-val">640</span>
              <span className="hero__badge-unit">HP</span>
              <span className="hero__badge-label">Engine Power</span>
            </div>
          </div>
        </div>
        <div className="hero__scroll">
          <div className="hero__scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── FEATURED CARS ── */}
      <section className="section featured">
        <div className="container">
          <RevealDiv className="section-header">
            <div className="section-tag">Our Collection</div>
            <h2 className="section-title">Featured <span className="highlight">Vehicles</span></h2>
            <p className="section-subtitle">Hand-picked supercars and luxury vehicles from the world's most prestigious brands.</p>
          </RevealDiv>

          <div className="cars-grid">
            {featuredCars.map((car, i) => (
              <RevealDiv key={car.id} className="car-card" delay={i * 100}>
                <div className="car-card__badge" style={{ background: car.badgeColor }}>{car.badge}</div>
                <div className="car-card__img-wrap">
                  <img src={car.image} alt={car.name} className="car-card__img" />
                  <div className="car-card__img-overlay" />
                </div>
                <div className="car-card__body">
                  <div className="car-card__meta">
                    <span className="car-card__brand">{car.brand}</span>
                    <span className="car-card__type">{car.type}</span>
                  </div>
                  <h3 className="car-card__name">{car.name}</h3>
                  <div className="car-card__specs">
                    <div className="car-card__spec"><FiZap />{car.power}</div>
                    <div className="car-card__spec"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> {car.acceleration}</div>
                    <div className="car-card__spec"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> {car.speed}</div>
                  </div>
                  <div className="car-card__footer">
                    <div>
                      <span className="car-card__price">£{car.price.toLocaleString()}</span>
                      <div className="car-card__rating">
                        <FiStar className="car-card__star" /><span>{car.rating}</span>
                        <span className="car-card__reviews">({car.reviews})</span>
                      </div>
                    </div>
                    <button
                      className={`btn ${added[car.id] ? 'btn-gold' : 'btn-primary'} car-card__btn`}
                      onClick={() => handleAdd(car)}
                    >
                      {added[car.id] ? '✓ Added' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>

          <div className="featured__cta">
            <a href="#/shop" className="btn btn-outline" onClick={(e) => { e.preventDefault(); navigate('#/shop') }}>
              View All Cars <FiArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ── BRAND MARQUEE ── */}
      <section className="brands-section">
        <div className="brands-track">
          {['Lamborghini', 'Ferrari', 'Porsche', 'BMW', 'Mercedes', 'Audi', 'Maserati', 'Bentley', 'Rolls Royce', 'McLaren',
            'Lamborghini', 'Ferrari', 'Porsche', 'BMW', 'Mercedes', 'Audi', 'Maserati', 'Bentley', 'Rolls Royce', 'McLaren'].map((b, i) => (
            <span key={i} className="brands-item">{b}</span>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section features-section">
        <div className="container">
          <RevealDiv className="section-header">
            <div className="section-tag">Why Ferguson</div>
            <h2 className="section-title">The <span className="highlight">Ferguson</span> Difference</h2>
            <p className="section-subtitle">We don't just sell cars — we deliver an unmatched automotive experience.</p>
          </RevealDiv>
          <div className="features-grid">
            {features.map((f, i) => (
              <RevealDiv key={i} className="feature-card" delay={i * 100}>
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-item">
                <StatCounter target={s.value} />
                <span className="stat-item__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section testimonials-section">
        <div className="container">
          <RevealDiv className="section-header">
            <div className="section-tag">Testimonials</div>
            <h2 className="section-title">What Our <span className="highlight">Clients Say</span></h2>
          </RevealDiv>
          <div className="testimonials-wrap">
            <button className="testimonials__arrow" onClick={() => setActiveTest(i => (i - 1 + testimonials.length) % testimonials.length)}>
              <FiChevronLeft />
            </button>
            <div className="testimonial-card glass-card">
              <div className="testimonial-card__stars">
                {Array(testimonials[activeTest].rating).fill(0).map((_, i) => <FiStar key={i} className="testimonial-card__star" />)}
              </div>
              <p className="testimonial-card__text">"{testimonials[activeTest].text}"</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">
                  <img src={testimonials[activeTest].avatar} alt={testimonials[activeTest].name} className="testimonial-card__avatar-img" />
                </div>
                <div>
                  <div className="testimonial-card__name">{testimonials[activeTest].name}</div>
                  <div className="testimonial-card__role">{testimonials[activeTest].role}</div>
                </div>
              </div>
            </div>
            <button className="testimonials__arrow" onClick={() => setActiveTest(i => (i + 1) % testimonials.length)}>
              <FiChevronRight />
            </button>
          </div>
          <div className="testimonials-dots">
            {testimonials.map((_, i) => (
              <button key={i} className={`testimonials-dot ${i === activeTest ? 'testimonials-dot--active' : ''}`} onClick={() => setActiveTest(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section process-section">
        <div className="container">
          <RevealDiv className="section-header">
            <div className="section-tag">Our Process</div>
            <h2 className="section-title">How It <span className="highlight">Works</span></h2>
            <p className="section-subtitle">From browsing to driving, we make the entire journey effortless and enjoyable.</p>
          </RevealDiv>
          <div className="process-grid">
            {[
              { step: '01', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>, title: 'Browse & Select', desc: 'Explore our curated fleet of luxury and performance vehicles online or visit our showroom in person.' },
              { step: '02', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>, title: 'Test Drive', desc: 'Schedule a complimentary test drive and experience the thrill firsthand before you commit.' },
              { step: '03', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>, title: 'Easy Financing', desc: 'Choose from flexible payment plans and financing options tailored to your budget and needs.' },
              { step: '04', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="16 12 12 8 8 12"/><line x1="12" y1="16" x2="12" y2="8"/></svg>, title: 'Drive Home', desc: 'We handle all the paperwork while you enjoy doorstep delivery or pick up your new car from our showroom.' },
            ].map((p, i) => (
              <RevealDiv key={i} className="process-card" delay={i * 100}>
                <div className="process-card__step">{p.step}</div>
                <div className="process-card__icon">{p.icon}</div>
                <h3 className="process-card__title">{p.title}</h3>
                <p className="process-card__desc">{p.desc}</p>
                {i < 3 && <div className="process-card__arrow"><FiArrowRight /></div>}
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOWCASE GALLERY ── */}
      <section className="section showcase-section">
        <div className="container">
          <RevealDiv className="section-header">
            <div className="section-tag">Our Fleet</div>
            <h2 className="section-title">Iconic Cars, <span className="highlight">Iconic Moments</span></h2>
            <p className="section-subtitle">Every vehicle in our collection tells a story of engineering mastery and timeless design.</p>
          </RevealDiv>
          <div className="showcase-grid">
            <RevealDiv className="showcase-item showcase-item--large">
              <img src={lamborghiniImg} alt="Lamborghini" className="showcase-img" />
              <div className="showcase-overlay"><span className="showcase-label">Lamborghini Huracán</span></div>
            </RevealDiv>
            <RevealDiv className="showcase-item" delay={100}>
              <img src={porscheImg} alt="Porsche" className="showcase-img" />
              <div className="showcase-overlay"><span className="showcase-label">Porsche 911 GT3</span></div>
            </RevealDiv>
            <RevealDiv className="showcase-item" delay={150}>
              <img src={bmwImg} alt="BMW" className="showcase-img" />
              <div className="showcase-overlay"><span className="showcase-label">BMW M8 Competition</span></div>
            </RevealDiv>
            <RevealDiv className="showcase-item showcase-item--wide" delay={200}>
              <img src={mercedesImg} alt="Mercedes" className="showcase-img" />
              <div className="showcase-overlay"><span className="showcase-label">Mercedes-AMG GT</span></div>
            </RevealDiv>
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <a href="#/shop" className="btn btn-primary" onClick={(e) => { e.preventDefault(); navigate('#/shop') }}>View Full Collection <FiArrowRight /></a>
          </div>
        </div>
      </section>

      {/* ── SERVICES PROMO ── */}
      <section className="services-promo-section">
        <div className="services-promo__bg" />
        <div className="container services-promo-content">
          <RevealDiv>
            <div className="section-tag">What We Offer</div>
            <h2 className="section-title">Premium <span className="highlight">Services</span> for Every Driver</h2>
          </RevealDiv>
          <div className="services-promo-grid">
            {[
              { icon: <FiShield />, title: 'Vehicle Inspection', desc: '200-point certified inspection on every car we sell.' },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, title: 'Home Delivery', desc: 'Your new car delivered to your doorstep, nationwide.' },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: 'Extended Warranty', desc: 'Full coverage warranty packages for total peace of mind.' },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>, title: 'Flexible Finance', desc: 'Bespoke financing plans with competitive interest rates.' },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: 'Trade-In Service', desc: 'Get the best market value for your current vehicle.' },
              { icon: <FiAward />, title: 'VIP Membership', desc: 'Exclusive perks, priority service & members-only events.' },
            ].map((s, i) => (
              <RevealDiv key={i} className="services-promo-card" delay={i * 80}>
                <div className="services-promo-card__icon">{s.icon}</div>
                <h3 className="services-promo-card__title">{s.title}</h3>
                <p className="services-promo-card__desc">{s.desc}</p>
                <div className="services-promo-card__check"><FiCheck /> Included</div>
              </RevealDiv>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <a href="#/services" className="btn btn-outline" onClick={(e) => { e.preventDefault(); navigate('#/services') }}>Explore All Services <FiArrowRight /></a>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="newsletter-section">
        <div className="container">
          <RevealDiv className="newsletter-card glass-card">
            <div className="newsletter-glow" />
            <div className="newsletter-content">
              <div className="section-tag">Stay Updated</div>
              <h2 className="newsletter-title">Get Exclusive <span className="highlight">Deals & News</span></h2>
              <p className="newsletter-desc">Be the first to know about new arrivals, limited-time offers, and exclusive automotive events.</p>
              <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); e.target.reset(); alert('Thanks for subscribing!') }}>
                <input type="email" required placeholder="Enter your email address..." className="newsletter-input" />
                <button type="submit" className="btn btn-primary newsletter-btn">Subscribe <FiArrowRight /></button>
              </form>
              <p className="newsletter-note">No spam ever. Unsubscribe at any time.</p>
            </div>
            <div className="newsletter-visual">
              <img src={heroImg} alt="Luxury Car" className="newsletter-img" />
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-section__orb" />
        <div className="container cta-content">
          <div className="section-tag">Ready to Drive?</div>
          <h2 className="cta-title">Find Your Perfect<br /><span className="highlight">Dream Car</span> Today</h2>
          <p className="cta-desc">Browse our exclusive collection and let our experts help you find the car that matches your lifestyle and ambition.</p>
          <div className="cta-actions">
            <a href="#/shop" className="btn btn-primary" onClick={(e) => { e.preventDefault(); navigate('#/shop') }}>Shop Now <FiArrowRight /></a>
            <a href="#/contact" className="btn btn-outline" onClick={(e) => { e.preventDefault(); navigate('#/contact') }}>Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  )
}

function RevealDiv({ children, className, delay = 0 }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
