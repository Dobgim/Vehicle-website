import { useState } from 'react'
import { useCart } from '../App'
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiArrowRight, FiCheck, FiShield, FiTruck } from '../components/Icons'
import './Cart.css'

const navigate = (hash) => { window.location.hash = hash; window.scrollTo({ top: 0, behavior: 'smooth' }) }

export default function Cart() {
  const { items, removeFromCart, updateQty, clearCart, totalPrice } = useCart()
  const [step, setStep] = useState(0)
  const [orderId] = useState('#BZ-' + Math.random().toString(36).slice(2, 8).toUpperCase())

  const tax = totalPrice * 0.075
  const shipping = totalPrice > 0 ? 2500 : 0
  const grand = totalPrice + tax + shipping

  const handleWhatsAppCheckout = () => {
    const number = '447823637286'
    let message = `Hello, I'd like to place an order from Ferguson Autos:\n\n`
    items.forEach(item => {
      message += `• *${item.name}* (Qty: ${item.qty}) - £${(item.price * item.qty).toLocaleString()}\n`
    })
    message += `\n*Subtotal:* £${totalPrice.toLocaleString()}`
    message += `\n*Tax (7.5%):* £${tax.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    message += `\n*Delivery:* £${shipping.toLocaleString()}`
    message += `\n*Total Order Amount:* £${grand.toLocaleString(undefined, { maximumFractionDigits: 2 })}\n\n`
    message += `Please confirm availability and instructions for final payment and delivery.`

    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
    clearCart()
    setStep(1)
  }

  if (items.length === 0 && step !== 1) return (
    <div className="cart">
      <section className="page-hero cart__hero"><div className="container">
        <div className="section-tag">Your Cart</div>
        <h1 className="page-hero-title">Shopping <span className="highlight">Cart</span></h1>
      </div></section>
      <div className="container">
        <div className="cart__empty">
          <div className="cart__empty-icon">🛒</div>
          <h2 className="cart__empty-title">Your Cart is Empty</h2>
          <p className="cart__empty-desc">Looks like you haven't added any cars yet. Browse our collection to find your dream ride.</p>
          <button className="btn btn-primary" onClick={() => navigate('#/shop')}><FiArrowLeft /> Browse Cars</button>
        </div>
      </div>
    </div>
  )

  if (step === 1) return (
    <div className="cart">
      <div className="container">
        <div className="cart__success">
          <div className="cart__success-icon"><FiCheck /></div>
          <h2 className="cart__success-title">Order Submitted! 🎉</h2>
          <p className="cart__success-desc">Thank you for your order! We have redirected you to WhatsApp to finalize the delivery and payment details.</p>
          <div className="cart__success-details glass-card">
            <div className="cart__success-detail"><span>Order ID</span><strong>{orderId}</strong></div>
            <div className="cart__success-detail"><span>Total Value</span><strong>£{grand.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong></div>
            <div className="cart__success-detail"><span>Expected Delivery</span><strong>5–10 Business Days</strong></div>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('#/shop')}>Continue Shopping <FiArrowRight /></button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="cart">
      <section className="page-hero cart__hero">
        <div className="container">
          <div className="section-tag">Your Cart</div>
          <h1 className="page-hero-title">Shopping <span className="highlight">Cart</span></h1>
          <p className="page-hero-subtitle">{items.length} vehicle{items.length > 1 ? 's' : ''} selected</p>
        </div>
      </section>

      <div className="container">
        <div className="cart__steps">
          {['Cart Review', 'Confirmation'].map((s, i) => (
            <div key={i} className={`cart__step ${step === i ? 'cart__step--active' : ''} ${step > i ? 'cart__step--done' : ''}`}>
              <div className="cart__step-num">{step > i ? <FiCheck /> : i + 1}</div>
              <span>{s}</span>
              {i < 1 && <div className="cart__step-line" />}
            </div>
          ))}
        </div>

        <div className="cart__layout">
          <div className="cart__main">
            <div>
              <div className="cart__items">
                {items.map(item => (
                  <div key={item.id} className="cart-item glass-card">
                    <div className="cart-item__img-wrap"><img src={item.image} alt={item.name} className="cart-item__img" /></div>
                    <div className="cart-item__info">
                      <span className="cart-item__brand">{item.brand}</span>
                      <h3 className="cart-item__name">{item.name}</h3>
                      <div className="cart-item__specs"><span>{item.power}</span><span>·</span><span>{item.color}</span><span>·</span><span>{item.year}</span></div>
                    </div>
                    <div className="cart-item__qty">
                      <button className="cart-item__qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}><FiMinus /></button>
                      <span className="cart-item__qty-val">{item.qty}</span>
                      <button className="cart-item__qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}><FiPlus /></button>
                    </div>
                    <div className="cart-item__right">
                      <span className="cart-item__price">£{(item.price * item.qty).toLocaleString()}</span>
                      <button className="cart-item__remove" onClick={() => removeFromCart(item.id)}><FiTrash2 /></button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart__actions-row">
                <button className="btn btn-outline" onClick={() => navigate('#/shop')}><FiArrowLeft /> Continue Shopping</button>
                <button className="cart__clear-btn" onClick={clearCart}>Clear Cart</button>
              </div>
            </div>
          </div>

          <div className="cart__summary glass-card">
            <h3 className="cart__summary-title">Order Summary</h3>
            <div className="cart__summary-items">
              {items.map(item => (
                <div key={item.id} className="cart__summary-item">
                  <span className="cart__summary-item-name">{item.name} <span className="cart__summary-item-qty">×{item.qty}</span></span>
                  <span className="cart__summary-item-price">£{(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="cart__summary-divider" />
            <div className="cart__summary-line"><span>Subtotal</span><span>£{totalPrice.toLocaleString()}</span></div>
            <div className="cart__summary-line"><span>Tax (7.5%)</span><span>£{tax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
            <div className="cart__summary-line"><span className="cart__summary-delivery"><FiTruck /> Delivery</span><span>£{shipping.toLocaleString()}</span></div>
            <div className="cart__summary-divider" />
            <div className="cart__summary-total"><span>Total</span><span>£{grand.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
            {step === 0 && (
              <button className="btn btn-primary cart__checkout-btn" onClick={handleWhatsAppCheckout}>
                Proceed to Checkout <FiArrowRight />
              </button>
            )}
            <div className="cart__summary-trust">
              <div><FiShield /> Secure Payment</div>
              <div><FiTruck /> Fast Delivery</div>
              <div><FiCheck /> Quality Guaranteed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
