import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiCheck, FiMessageSquare } from '../components/Icons'
import { supabase } from '../supabaseClient'
import heroBgImg from '../assets/cars/car_bmw.png'
import './Contact.css'

const contactInfo = [
  { icon: <FiMapPin />, label: 'Our Location', value: '1 Barn Church Road, Culloden', sub: 'Inverness, IV2 7WB', color: '#e50914' },
  { icon: <FiPhone />, label: 'Phone Number', value: '+44 7823 637286', sub: 'Mon–Sat: 8am – 8pm', color: '#f5c518' },
  { icon: <FiMail />, label: 'Email Address', value: 'info@fergusonautosales.com', sub: 'sales@fergusonautosales.com', color: '#1e50ff' },
  { icon: <FiClock />, label: 'Working Hours', value: 'Mon – Sat: 8am – 8pm', sub: 'Sun: 10am – 5pm', color: '#00b894' },
]

const faqs = [
  { q: 'Do you offer test drives?', a: 'Absolutely! We offer complimentary test drives for all vehicles in our showroom. Book online or call us to schedule your session at our London showroom.' },
  { q: 'Can I trade in my current vehicle?', a: 'Yes! We accept trade-ins for all makes and models. Our appraisal team will give you a fair market value for your car.' },
  { q: 'Do you offer financing options?', a: 'We partner with leading UK banks and finance providers to offer competitive PCP, HP, and personal loan options tailored to your budget.' },
  { q: 'Do you deliver across the UK?', a: 'Yes, we offer nationwide delivery across the UK and can arrange shipping across Europe. Delivery fees vary by location — contact us for a quote.' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.includes('@')) e.email = 'Valid email required'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (form.message.length < 10) e.message = 'Message must be at least 10 characters'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }))
  }

  const getTag = (subject) => {
    if (subject === 'Vehicle Inquiry') return 'Inquiry'
    if (subject === 'Test Drive Booking') return 'Test Drive'
    if (subject === 'Financing & Payment') return 'Finance'
    if (subject === 'Trade-In Valuation') return 'Trade-In'
    return 'General'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const { error } = await supabase
        .from('messages')
        .insert([{
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
          tag: getTag(form.subject),
          read: false,
          replied: false
        }])
      if (error) throw error
      setSubmitted(true)
    } catch (err) {
      console.error('Error saving message to database:', err)
      alert('Failed to send message. Please check your internet connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact">
      <section className="page-hero contact__hero">
        <div className="hero-blur-bg" style={{ backgroundImage: `url(${heroBgImg})` }} />
        <div className="hero-blur-overlay" />
        <div className="contact__hero-orb contact__hero-orb--1" />
        <div className="contact__hero-orb contact__hero-orb--2" />
        <div className="container">
          <div className="section-tag">Get In Touch</div>
          <h1 className="page-hero-title">Contact <span className="highlight">Us</span></h1>
          <p className="page-hero-subtitle">Our expert team is ready to help you find your perfect vehicle.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact__info-grid">
            {contactInfo.map((info, i) => (
              <div key={i} className="contact-info-card glass-card">
                <div className="contact-info-card__icon" style={{ background: `${info.color}18`, borderColor: `${info.color}40`, color: info.color }}>{info.icon}</div>
                <span className="contact-info-card__label">{info.label}</span>
                <span className="contact-info-card__value">{info.value}</span>
                <span className="contact-info-card__sub">{info.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact__main-section">
        <div className="container">
          <div className="contact__layout">
            <div className="contact__form-wrap">
              <div className="section-tag" style={{ marginBottom: 12 }}>Send a Message</div>
              <h2 className="contact__form-title">How Can We <span className="highlight">Help You?</span></h2>
              <p className="contact__form-desc">Fill in the form and our team will get back to you within 24 hours.</p>

              {submitted ? (
                <div className="contact__success glass-card">
                  <div className="contact__success-icon"><FiCheck /></div>
                  <h3>Message Sent!</h3>
                  <p>Thank you, <strong>{form.name}</strong>! We've received your message and will reach out within 24 hours.</p>
                  <button className="btn btn-outline" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form glass-card" onSubmit={handleSubmit} noValidate>
                  <div className="contact-form__row">
                    <div className={`form-group ${errors.name ? 'form-group--error' : ''}`}>
                      <label>Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
                      {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>
                    <div className={`form-group ${errors.email ? 'form-group--error' : ''}`}>
                      <label>Email Address *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>
                  </div>
                  <div className="contact-form__row">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+44 7000 000000" />
                    </div>
                    <div className={`form-group ${errors.subject ? 'form-group--error' : ''}`}>
                      <label>Subject *</label>
                      <select name="subject" value={form.subject} onChange={handleChange} className="contact-form__select">
                        <option value="">Select a subject...</option>
                        <option>Vehicle Inquiry</option>
                        <option>Test Drive Booking</option>
                        <option>Financing & Payment</option>
                        <option>Trade-In Valuation</option>
                        <option>After Sales Support</option>
                        <option>General Inquiry</option>
                      </select>
                      {errors.subject && <span className="form-error">{errors.subject}</span>}
                    </div>
                  </div>
                  <div className={`form-group ${errors.message ? 'form-group--error' : ''}`}>
                    <label>Your Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us how we can help..." rows={5} className="contact-form__textarea" maxLength={500} />
                    <div className="contact-form__char">{form.message.length}/500</div>
                    {errors.message && <span className="form-error">{errors.message}</span>}
                  </div>
                  <button type="submit" className="btn btn-primary contact-form__submit" disabled={loading}>
                    {loading ? 'Sending...' : <><FiSend /> Send Message</>}
                  </button>
                </form>
              )}
            </div>

            <div className="contact__right">
              <div className="contact__map glass-card">
                <div className="contact__map-inner">
                  <div className="contact__map-pin">📍</div>
                  <p className="contact__map-label">1 Barn Church Road, Culloden</p>
                  <p className="contact__map-sub">Inverness, IV2 7WB</p>
                  <a href="https://maps.google.com/?q=1+Barn+Church+Road+Culloden+Inverness+IV2+7WB" target="_blank" rel="noreferrer" className="btn btn-outline contact__map-btn">Open in Google Maps</a>
                </div>
                <div className="contact__map-grid">{Array(48).fill(0).map((_, i) => <div key={i} className="contact__map-cell" />)}</div>
              </div>
              <div className="contact__socials glass-card">
                <h3 className="contact__socials-title"><FiMessageSquare /> Live Chat Available</h3>
                <p className="contact__socials-desc">Chat with our sales team on WhatsApp for instant assistance.</p>
                <a href="https://wa.me/447823637286?text=Hello%20Ferguson%20Auto%20Sales!%20I%20have%20some%20questions%20about%20your%20vehicles." className="btn btn-gold contact__whatsapp-btn" target="_blank" rel="noreferrer">💬 Chat on WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact__faq-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">FAQ</div>
            <h2 className="section-title">Frequently Asked <span className="highlight">Questions</span></h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item glass-card ${openFaq === i ? 'faq-item--open' : ''}`}>
                <button className="faq-item__question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="faq-item__chevron">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && <div className="faq-item__answer">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
