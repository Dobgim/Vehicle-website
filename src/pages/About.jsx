import { useEffect, useRef, useState } from 'react'
import { FiTarget, FiEye, FiHeart, FiAward, FiUsers, FiTruck } from '../components/Icons'
import { stats } from '../data/cars'
import showroomImg from '../assets/cars/car_mercedes.png'
import heroBgImg from '../assets/cars/car_lamborghini.png'
import './About.css'

import ceoImg from '../assets/person.png'
import salesImg from '../assets/team_sales.png'

const mechanicImg = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&h=400&q=80'
const financeImg = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=400&q=80'

const teamImages = [
  ceoImg,
  salesImg,
  mechanicImg,
  financeImg
]

function useReveal() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.12 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, vis }
}

const timeline = [
  { year: '2009', title: 'Founded', desc: 'Ferguson Autos was born with a single showroom and a vision to redefine automotive luxury in West Africa.' },
  { year: '2013', title: 'Regional Expansion', desc: "Opened 5 new locations across Nigeria, Ghana, and Côte d'Ivoire with over 200 premium vehicles in stock." },
  { year: '2017', title: 'Award Recognition', desc: 'Won "Best Luxury Dealership – West Africa" at the prestigious African Automotive Awards.' },
  { year: '2020', title: 'Digital Launch', desc: 'Launched our online platform enabling clients to browse, configure, and purchase vehicles seamlessly.' },
  { year: '2024', title: 'Ferguson Today', desc: '15+ years of excellence, 12,000+ happy clients, and an ever-growing collection of the world\'s finest automobiles.' },
]

const values = [
  { icon: <FiTarget />, title: 'Excellence', desc: 'We hold ourselves to the highest standards in everything we do — from vehicle selection to after-sales service.' },
  { icon: <FiEye />, title: 'Transparency', desc: 'Honest pricing, clear financing, and zero hidden fees. We believe every client deserves full clarity.' },
  { icon: <FiHeart />, title: 'Passion', desc: 'We are car enthusiasts first. Our love for automobiles drives us to curate only the most extraordinary vehicles.' },
  { icon: <FiUsers />, title: 'Community', desc: 'Building lasting relationships with our clients, partners, and the broader automotive community.' },
]

const team = [
  { name: 'William Ferguson', role: 'CEO & Founder', avatarIdx: 0, bio: '20+ years in luxury automotive. Visionary entrepreneur and car enthusiast.' },
  { name: 'Emily Smith', role: 'Head of Sales', avatarIdx: 1, bio: 'Former brand executive with expertise in matching clients with their perfect vehicle.' },
  { name: 'Jack Harrison', role: 'Chief Mechanic', avatarIdx: 2, bio: 'Certified master technician with experience at premier luxury brand service centres.' },
  { name: 'Sarah Connor', role: 'Finance Director', avatarIdx: 3, bio: 'Specialist in automotive financing with tailored solutions for every budget.' },
]

function Reveal({ children, className, style = {}, delay = 0 }) {
  const { ref, vis } = useReveal()
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(30px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  )
}

export default function About() {
  return (
    <div className="about">
      <section className="page-hero about__hero">
        <div className="hero-blur-bg" style={{ backgroundImage: `url(${heroBgImg})` }} />
        <div className="hero-blur-overlay" />
        <div className="about__hero-orb" />
        <div className="container about__hero-content">
          <div className="section-tag">Our Story</div>
          <h1 className="page-hero-title">About <span className="highlight">BILLZ</span> Autos</h1>
          <p className="page-hero-subtitle">15 years of passion, precision, and premium automotive experiences.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about__story">
            <Reveal className="about__story-content">
              <div className="section-tag">Who We Are</div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 20 }}>
                West Africa's Premier<br /><span className="highlight">Luxury Car Dealer</span>
              </h2>
              <p className="about__story-text">
                Ferguson Autos was founded in 2009 with one simple belief: every driver deserves to experience the thrill and prestige of a world-class automobile. What started as a single showroom in Lagos has grown into a network of premier dealerships across West Africa.
              </p>
              <p className="about__story-text">
                We partner exclusively with the world's most coveted automotive brands — Lamborghini, Ferrari, Porsche, BMW, and Mercedes-AMG — to bring you a curated selection of vehicles that represent the pinnacle of engineering, design, and performance.
              </p>
              <div className="about__story-highlights">
                {[{ icon: <FiAward />, text: '5x Award Winning Dealer' }, { icon: <FiUsers />, text: '12,000+ Satisfied Clients' }, { icon: <FiTruck />, text: 'Nationwide Delivery' }].map((h, i) => (
                  <div key={i} className="about__story-highlight">
                    <span className="about__story-highlight-icon">{h.icon}</span>
                    <span>{h.text}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className="about__story-visual" delay={150}>
              <div className="about__story-img-wrap">
                <img src={showroomImg} alt="Ferguson Showroom" className="about__story-img" />
                <div className="about__story-img-badge">
                  <span className="about__story-img-badge-val">15+</span>
                  <span className="about__story-img-badge-label">Years of Excellence</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section about__timeline-section">
        <div className="container">
          <Reveal className="section-header">
            <div className="section-tag">Our Journey</div>
            <h2 className="section-title">Built on <span className="highlight">15 Years</span> of Excellence</h2>
          </Reveal>
          <div className="timeline">
            {timeline.map((item, i) => (
              <Reveal key={i} className={`timeline-item ${i % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right'}`} delay={i * 80}>
                <div className="timeline-card glass-card">
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
                <div className="timeline-dot" />
              </Reveal>
            ))}
            <div className="timeline-line" />
          </div>
        </div>
      </section>

      <section className="section about__values-section">
        <div className="container">
          <Reveal className="section-header">
            <div className="section-tag">Core Values</div>
            <h2 className="section-title">What <span className="highlight">Drives</span> Us</h2>
          </Reveal>
          <div className="values-grid">
            {values.map((v, i) => (
              <Reveal key={i} className="value-card glass-card" delay={i * 80}>
                <div className="value-card__icon">{v.icon}</div>
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__desc">{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-header">
            <div className="section-tag">The Team</div>
            <h2 className="section-title">Meet Our <span className="highlight">Experts</span></h2>
            <p className="section-subtitle">Our passionate team of automotive professionals are here to guide you every step of the way.</p>
          </Reveal>
          <div className="team-grid">
            {team.map((member, i) => (
              <Reveal key={i} className="team-card glass-card" delay={i * 80}>
                <div className="team-card__avatar-wrap">
                  <img src={teamImages[member.avatarIdx]} alt={member.name} className="team-card__img-avatar" />
                </div>
                <h3 className="team-card__name">{member.name}</h3>
                <span className="team-card__role">{member.role}</span>
                <p className="team-card__bio">{member.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about__stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <Reveal key={i} className="stat-item" delay={i * 80}>
                <span className="stat-item__value">{s.value}</span>
                <span className="stat-item__label">{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
