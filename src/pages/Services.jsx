import { useEffect, useRef, useState } from 'react'
import { FiShield, FiAward, FiCheck, FiArrowRight, FiZap, FiStar } from '../components/Icons'
import heroBgImg from '../assets/cars/car_mercedes.png'
import './Services.css'

const navigate = (hash) => { window.location.hash = hash; window.scrollTo({ top: 0, behavior: 'smooth' }) }

function useReveal() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, vis }
}

function Reveal({ children, className, delay = 0 }) {
  const { ref, vis } = useReveal()
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  )
}

const services = [
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10" strokeWidth="2"/></svg>,
    title: 'Certified Vehicle Inspection',
    tagline: 'Quality You Can Trust',
    color: '#e50914',
    desc: 'Every car in our inventory undergoes a rigorous 200-point inspection by our certified master technicians. We check everything — engine, transmission, brakes, electrics, body, and interior — so you drive away with complete confidence.',
    features: ['200-point inspection checklist', 'Certified master technicians', 'Full inspection report provided', 'Defect-free guarantee', 'Pre-delivery detailing'],
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    title: 'Nationwide Home Delivery',
    tagline: 'Delivered to Your Doorstep',
    color: '#f5c518',
    desc: 'We deliver your dream car directly to your home or office anywhere in Nigeria and select West African countries. Our white-glove delivery service includes a final vehicle walkthrough at your doorstep.',
    features: ['Delivery to all 36 states', 'White-glove doorstep handover', 'Real-time delivery tracking', 'Insured during transit', 'Same-day Lagos delivery available'],
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    title: 'Flexible Financing Plans',
    tagline: 'Drive Now, Pay Smart',
    color: '#1e50ff',
    desc: 'Our dedicated finance team partners with leading Nigerian banks and financial institutions to create bespoke payment plans that work for your budget. Low deposits, competitive rates, and fast approvals.',
    features: ['0% deposit options available', 'Plans from 12 to 60 months', 'Instant pre-approval online', 'Competitive interest rates', 'No hidden charges ever'],
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    title: 'Trade-In Valuation',
    tagline: 'Best Price for Your Current Car',
    color: '#00b894',
    desc: 'Ready to upgrade? Trade in your current vehicle and get the best market valuation in the industry. Our appraisers use real-time market data to ensure you get maximum value, which can go directly toward your new purchase.',
    features: ['Free no-obligation valuation', 'Same-day appraisal', 'Market-beating valuations', 'All makes and models accepted', 'Value applied instantly to purchase'],
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    title: 'Extended Warranty Packages',
    tagline: 'Total Peace of Mind',
    color: '#a855f7',
    desc: 'Protect your investment with our comprehensive extended warranty packages. Choose from 1, 2, or 3-year plans covering all major mechanical and electrical components, with nationwide service centre access.',
    features: ['1, 2, or 3-year plans', 'Engine & transmission coverage', '300+ nationwide service centres', 'Roadside assistance 24/7', 'Zero excess on claims'],
  },
  {
    icon: <FiAward />,
    title: 'VIP Membership Programme',
    tagline: 'Exclusive Privileges Await',
    color: '#f5c518',
    desc: 'Join the Ferguson VIP Club and unlock a world of exclusive privileges. From priority vehicle reservations and private test drive events to members-only discounts and invitations to exclusive automotive launches.',
    features: ['Priority access to new arrivals', 'Members-only pricing', 'Invitations to exclusive events', 'Free annual service checks', 'Dedicated personal advisor'],
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/></svg>,
    title: 'Test Drive Experience',
    tagline: 'Feel It Before You Buy',
    color: '#e50914',
    desc: 'Book a complimentary test drive at your convenience — at our showroom or at a location of your choice. Experience the power, luxury, and technology of your chosen vehicle with no obligation to buy.',
    features: ['Available 7 days a week', 'Showroom or at-home options', 'Full insurance coverage', 'Expert advisor on hand', 'Multi-car comparison available'],
  },
  {
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    title: 'After-Sales Maintenance',
    tagline: 'Service Beyond the Sale',
    color: '#00b894',
    desc: 'Our relationship doesn\'t end at the sale. Our state-of-the-art service centre is staffed by manufacturer-trained technicians providing scheduled servicing, repairs, detailing, and performance upgrades for your vehicle.',
    features: ['Manufacturer-trained technicians', 'Genuine parts guaranteed', 'Scheduled service reminders', 'Express service available', 'Premium detailing & wrapping'],
  },
]

const plans = [
  { name: 'Basic', price: 'Free', color: '#5a5a72', features: ['Vehicle Inspection', '1-Year Roadside Assist', 'Online Support', 'Basic Trade-In Valuation'] },
  { name: 'Premium', price: '₦150,000/yr', color: '#e50914', badge: 'Most Popular', features: ['Everything in Basic', '3-Year Warranty', 'Priority Test Drives', 'Flexible Finance Access', 'Dedicated Advisor', 'Members Discounts'] },
  { name: 'VIP Elite', price: '₦450,000/yr', color: '#f5c518', features: ['Everything in Premium', 'VIP Event Invitations', 'Free Annual Service', 'White-Glove Delivery', 'Multi-Car Comparisons', 'Personal Concierge'] },
]

export default function Services() {
  const [activeService, setActiveService] = useState(null)

  return (
    <div className="services-page">
      {/* HERO */}
      <section className="page-hero services__hero">
        <div className="hero-blur-bg" style={{ backgroundImage: `url(${heroBgImg})` }} />
        <div className="hero-blur-overlay" />
        <div className="services__hero-orb" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-tag">What We Offer</div>
          <h1 className="page-hero-title">Our Premium <span className="highlight">Services</span></h1>
          <p className="page-hero-subtitle">Everything you need for a complete, world-class automotive experience — from first browse to the open road.</p>
          <div className="services__hero-pills">
            {['Inspection', 'Financing', 'Delivery', 'Warranty', 'Trade-In', 'VIP Club'].map(p => (
              <span key={p} className="services__hero-pill">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="section">
        <div className="container">
          <Reveal className="section-header">
            <div className="section-tag">All Services</div>
            <h2 className="section-title">Complete <span className="highlight">Automotive Care</span></h2>
            <p className="section-subtitle">Eight premium services designed to make owning a luxury car effortless from day one.</p>
          </Reveal>

          <div className="services-grid">
            {services.map((svc, i) => (
              <Reveal key={i} className={`service-card glass-card ${activeService === i ? 'service-card--open' : ''}`} delay={i * 70}>
                <div className="service-card__top">
                  <div className="service-card__icon" style={{ color: svc.color, background: `${svc.color}15`, borderColor: `${svc.color}30` }}>
                    {svc.icon}
                  </div>
                  <div className="service-card__header">
                    <span className="service-card__tagline" style={{ color: svc.color }}>{svc.tagline}</span>
                    <h3 className="service-card__title">{svc.title}</h3>
                  </div>
                </div>
                <p className="service-card__desc">{svc.desc}</p>
                <ul className="service-card__features">
                  {svc.features.map((f, j) => (
                    <li key={j} className="service-card__feature">
                      <FiCheck style={{ color: svc.color, flexShrink: 0 }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className="service-card__btn"
                  style={{ borderColor: `${svc.color}40`, color: svc.color }}
                  onClick={() => navigate('#/contact')}
                >
                  Enquire About This Service <FiArrowRight />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY FERGUSON SERVICES */}
      <section className="section services-why-section">
        <div className="services-why__bg" />
        <div className="container">
          <Reveal className="section-header">
            <div className="section-tag">Why Choose Us</div>
            <h2 className="section-title">The <span className="highlight">Ferguson</span> Service Promise</h2>
          </Reveal>
          <div className="services-why-grid">
            {[
              { icon: <FiShield />, title: 'No Hidden Fees', desc: 'Complete price transparency across all our services. What you see is exactly what you pay.' },
              { icon: <FiStar />, title: '5-Star Rated', desc: 'Over 12,000 satisfied clients with an average 4.9/5 star rating across all service touchpoints.' },
              { icon: <FiZap />, title: 'Fast & Efficient', desc: 'We respect your time. Our processes are streamlined so you spend less time waiting and more time driving.' },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: 'Expert Team', desc: 'Our staff are manufacturer-certified specialists with decades of combined experience in luxury automotive.' },
            ].map((w, i) => (
              <Reveal key={i} className="services-why-card glass-card" delay={i * 80}>
                <div className="services-why-card__icon">{w.icon}</div>
                <h3 className="services-why-card__title">{w.title}</h3>
                <p className="services-why-card__desc">{w.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="section">
        <div className="container">
          <Reveal className="section-header">
            <div className="section-tag">Membership Plans</div>
            <h2 className="section-title">Choose Your <span className="highlight">Plan</span></h2>
            <p className="section-subtitle">Unlock exclusive benefits and priority services with our annual membership programmes.</p>
          </Reveal>
          <div className="plans-grid">
            {plans.map((plan, i) => (
              <Reveal key={i} className={`plan-card glass-card ${plan.badge ? 'plan-card--featured' : ''}`} delay={i * 100}>
                {plan.badge && <div className="plan-card__badge">{plan.badge}</div>}
                <h3 className="plan-card__name" style={{ color: plan.color }}>{plan.name}</h3>
                <div className="plan-card__price">{plan.price}</div>
                <ul className="plan-card__features">
                  {plan.features.map((f, j) => (
                    <li key={j} className="plan-card__feature">
                      <FiCheck style={{ color: plan.color }} /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  className="btn plan-card__btn"
                  style={plan.badge ? { background: `linear-gradient(135deg, ${plan.color}, #b00610)`, color: 'white', width: '100%', justifyContent: 'center' } : { border: `1px solid ${plan.color}40`, color: plan.color, width: '100%', justifyContent: 'center' }}
                  onClick={() => navigate('#/contact')}
                >
                  Get Started <FiArrowRight />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta-section">
        <div className="services-cta__orb" />
        <div className="container services-cta-content">
          <Reveal>
            <div className="section-tag">Ready to Start?</div>
            <h2 className="cta-title" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, marginBottom: 16 }}>
              Experience Services<br /><span className="highlight">Built Around You</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
              Contact our team today to discuss your requirements and get started with any of our world-class services.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#/contact" className="btn btn-primary" onClick={e => { e.preventDefault(); navigate('#/contact') }}>Book a Service <FiArrowRight /></a>
              <a href="#/shop" className="btn btn-outline" onClick={e => { e.preventDefault(); navigate('#/shop') }}>Browse Cars</a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
