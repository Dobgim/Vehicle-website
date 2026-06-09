import { useState, useEffect, createContext, useContext, useReducer } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Services from './pages/Services'
import './App.css'

// ── Cart Context (inline) ──────────────────────────────────────────
const CartContext = createContext()
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const ex = state.find(i => i.id === action.item.id)
      return ex ? state.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i)
                : [...state, { ...action.item, qty: 1 }]
    }
    case 'REMOVE': return state.filter(i => i.id !== action.id)
    case 'QTY': return action.qty <= 0 ? state.filter(i => i.id !== action.id)
                : state.map(i => i.id === action.id ? { ...i, qty: action.qty } : i)
    case 'CLEAR': return []
    default: return state
  }
}
export const useCart = () => useContext(CartContext)

// ── Simple hash router ────────────────────────────────────────────
function useHash() {
  const [hash, setHash] = useState(window.location.hash || '#/')
  useEffect(() => {
    const handler = () => setHash(window.location.hash || '#/')
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])
  return hash
}

const PAGES = { '#/': Home, '#/about': About, '#/shop': Shop, '#/cart': Cart, '#/contact': Contact, '#/services': Services }

export default function App() {
  const [cartItems, dispatch] = useReducer(cartReducer, [])
  const hash = useHash()

  const addToCart   = (item) => dispatch({ type: 'ADD', item })
  const removeFromCart = (id) => dispatch({ type: 'REMOVE', id })
  const updateQty   = (id, qty) => dispatch({ type: 'QTY', id, qty })
  const clearCart   = () => dispatch({ type: 'CLEAR' })
  const totalItems  = cartItems.reduce((s, i) => s + i.qty, 0)
  const totalPrice  = cartItems.reduce((s, i) => s + i.price * i.qty, 0)

  const Page = PAGES[hash] || Home

  return (
    <CartContext.Provider value={{ items: cartItems, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}>
      <div className="app">
        <Navbar currentHash={hash} />
        <main className="main-content">
          <Page />
        </main>
        <Footer />
        <a
          href="https://wa.me/447823637286?text=Hello%20Ferguson%20Auto%20Sales!%20I%20have%20some%20questions%20about%20your%20vehicles."
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <svg className="whatsapp-float__icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.416 9.861-9.855.002-2.632-1.02-5.107-2.881-6.97-1.861-1.862-4.334-2.886-6.972-2.887-5.442 0-9.863 4.418-9.866 9.857-.001 1.696.446 3.35 1.294 4.808L1.97 21.053l4.677-1.899zm12.302-6.837c-.31-.155-1.837-.907-2.122-1.01-.284-.103-.491-.155-.698.155-.207.31-.8.907-.98 1.11-.18.204-.36.228-.67.073-.31-.155-1.31-.483-2.495-1.54-1.185-1.056-1.986-2.36-2.219-2.772-.232-.412-.025-.635.18-.84.185-.185.412-.483.619-.722.207-.24.276-.412.413-.687.137-.275.068-.515-.034-.722-.103-.207-.8-1.928-1.096-2.643-.289-.696-.583-.601-.8-.612-.206-.01-.443-.012-.68-.012-.238 0-.623.089-.95.447-.327.357-1.25 1.222-1.25 2.98 0 1.76 1.279 3.456 1.458 3.7.179.24 2.518 3.845 6.101 5.39 3.583 1.545 3.583 1.03 4.22.969.637-.06 1.837-.75 2.095-1.47.258-.72.258-1.34.18-1.47-.078-.13-.284-.207-.594-.362z" />
          </svg>
        </a>
      </div>
    </CartContext.Provider>
  )
}
