import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from './Icons'
import logoImg from '../assets/logo.jpg'
import './Footer.css'

const footerLinks = {
  company: [
    { label: 'Home', hash: '#/' },
    { label: 'About Us', hash: '#/about' },
    { label: 'Shop', hash: '#/shop' },
    { label: 'Services', hash: '#/services' },
    { label: 'Contact', hash: '#/contact' },
  ],
  services: [
    { label: 'Vehicle Inspection', hash: '#/services' },
    { label: 'Home Delivery', hash: '#/services' },
    { label: 'Car Financing', hash: '#/services' },
    { label: 'Trade-In Service', hash: '#/services' },
    { label: 'Extended Warranty', hash: '#/services' },
    { label: 'VIP Membership', hash: '#/services' },
  ],
}

const navigate = (hash) => {
  window.location.hash = hash
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__glow" />
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <a href="#/" className="footer__logo" onClick={() => navigate('#/')}>
              <img src={logoImg} alt="Ferguson Autos" className="footer__logo-img" />
            </a>
            <p className="footer__tagline">
              Your premier destination for luxury and performance vehicles. Drive your dream today.
            </p>
            <div className="footer__socials">
              {[
                { icon: <FiFacebook />, href: '#', label: 'Facebook' },
                { icon: <FiTwitter />, href: '#', label: 'Twitter' },
                { icon: <FiInstagram />, href: '#', label: 'Instagram' },
                { icon: <FiYoutube />, href: '#', label: 'YouTube' },
              ].map((s) => (
                <a key={s.label} href={s.href} className="footer__social" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Company</h4>
            <ul className="footer__col-links">
              {footerLinks.company.map((l) => (
                <li key={l.label}>
                  <a href={l.hash} className="footer__col-link" onClick={() => navigate(l.hash)}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Services</h4>
            <ul className="footer__col-links">
              {footerLinks.services.map((l) => (
                <li key={l.label}>
                  <a href={l.hash} className="footer__col-link" onClick={() => navigate(l.hash)}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Contact</h4>
            <ul className="footer__contact-list">
              <li><FiMapPin className="footer__contact-icon" /><span>45 Regent Street, London, UK</span></li>
              <li><FiPhone className="footer__contact-icon" /><span>+44 7823 637286</span></li>
              <li><FiMail className="footer__contact-icon" /><span>info@fergusonautosales.com</span></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} <span className="footer__logo-accent">Ferguson</span> Autos. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <a href="#/admin" className="footer__bottom-link">🔐 Admin Portal</a>
            <a href="#" className="footer__bottom-link">Privacy Policy</a>
            <a href="#" className="footer__bottom-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
