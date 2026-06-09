import { useState, useEffect } from 'react'
import { useCart } from '../App'
import { FiShoppingCart, FiMenu, FiX } from './Icons'
import logoImg from '../assets/logo.jpg'
import './Navbar.css'

const navLinks = [
  { hash: '#/', label: 'Home' },
  { hash: '#/about', label: 'About' },
  { hash: '#/shop', label: 'Shop' },
  { hash: '#/services', label: 'Services' },
  { hash: '#/contact', label: 'Contact' },
]

export default function Navbar({ currentHash }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navigate = (hash) => {
    window.location.hash = hash
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`navbar navbar--anim ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__container">
          <a href="#/" className="navbar__logo" onClick={() => window.scrollTo(0,0)}>
            <img src={logoImg} alt="Ferguson Autos" className="navbar__logo-img" />
          </a>

          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.hash}>
                <a
                  href={link.hash}
                  className={`navbar__link ${currentHash === link.hash ? 'navbar__link--active' : ''}`}
                  onClick={(e) => { e.preventDefault(); navigate(link.hash) }}
                >
                  {link.label}
                  <span className="navbar__link-underline" />
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar__actions">
            <a href="#/cart" className="navbar__cart" onClick={(e) => { e.preventDefault(); navigate('#/cart') }}>
              <FiShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="navbar__cart-badge">{totalItems}</span>
              )}
            </a>

            <a href="#/shop" className="btn btn-primary navbar__cta"
               onClick={(e) => { e.preventDefault(); navigate('#/shop') }}>
              Buy Now
            </a>

            <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <ul className="mobile-menu__links">
          {navLinks.map((link) => (
            <li key={link.hash}>
              <a
                href={link.hash}
                className={`mobile-menu__link ${currentHash === link.hash ? 'mobile-menu__link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); navigate(link.hash) }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#/cart" className="mobile-menu__link"
               onClick={(e) => { e.preventDefault(); navigate('#/cart') }}>
              Cart {totalItems > 0 && <span className="mobile-menu__badge">{totalItems}</span>}
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
