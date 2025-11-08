import { useEffect, useMemo, useState } from "react";
import "./pizza.css";

export default function PizzaMenu({ pizzaArray = [] }) {
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");

  const [modalItem, setModalItem] = useState(null);
  const [qty, setQty] = useState(1);

  const [showCheckout, setShowCheckout] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [note, setNote] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const visible = useMemo(() => {
    const q = query.toLowerCase();
    let list = pizzaArray.filter(
      (p) =>
        (p.name || "").toLowerCase().includes(q) ||
        (p.ingredients || "").toLowerCase().includes(q)
    );
    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "name-desc") list.sort((a, b) => b.name.localeCompare(a.name));
    if (sortBy === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [pizzaArray, query, sortBy]);

  const openModal = (item) => { setModalItem(item); setQty(1); };
  const closeModal = () => setModalItem(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        closeModal();
        setShowCheckout(false);
        setShowClearConfirm(false);
        setShowSuccess(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const confirmAdd = () => {
    if (!modalItem) return;
    const entry = { ...modalItem, qty, lineTotal: modalItem.price * qty };
    setCart((prev) => [...prev, entry]);
    closeModal();
  };

  const subtotal = cart.reduce((s, p) => s + p.lineTotal, 0);
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  const openCheckout = () => setShowCheckout(true);
  const closeCheckout = () => setShowCheckout(false);
  const openClearConfirm = () => setShowClearConfirm(true);
  const closeClearConfirm = () => setShowClearConfirm(false);

  const doClearBasket = () => {
    setCart([]);
    closeClearConfirm();
  };

  const confirmOrder = (e) => {
    e.preventDefault();
    const orderId = Math.floor(Math.random() * 900000 + 100000);
    setOrderNumber(orderId);
    closeCheckout();
    setCart([]);
    setCustomerName("");
    setNote("");
    setShowSuccess(true);
  };

  const closeSuccess = () => setShowSuccess(false);

  return (
    <section className="pizza-section">
      {/* === Promo Banner === */}

      <div className="pizza-controls">
        <input
          className="pz-input"
          type="text"
          placeholder="Search pizza..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="pz-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name-asc">Name A → Z</option>
          <option value="name-desc">Name Z → A</option>
          <option value="price-asc">Price Low → High</option>
          <option value="price-desc">Price High → Low</option>
        </select>
      </div>

      <p className="pizza-count">
        Showing <strong>{visible.length}</strong> of {pizzaArray.length} pizzas
      </p>

      {/* Grid */}
      <div className="pizza-menu">
        {visible.map((item, index) => (
          <div className="pizza-card" key={index}>
            <img src={item.image} alt={item.name} className="pizza-img" />
            <div className="pizza-info">
              <h2 className="pizza-name">{item.name}</h2>
              <p className="pizza-ingredients">{item.ingredients}</p>
              <p className="pizza-price">${item.price.toFixed(2)}</p>
              <button className="add-btn" onClick={() => openModal(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart summary */}
      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>🛒 Your Cart</h3>
          <ul className="cart-list">
            {cart.map((p, i) => (
              <li key={i}>
                <span>{p.qty}× {p.name}</span>
                <span>${p.lineTotal.toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="cart-totals-wrap">
            <p className="cart-line"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></p>
            <p className="cart-line"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></p>
            <p className="cart-line cart-total-strong"><span>Total</span><span>${total.toFixed(2)}</span></p>
          </div>

          <div className="cart-actions">
            <button className="btn-ghost" onClick={openClearConfirm}>Clear Basket</button>
            <button className="btn-primary" onClick={openCheckout}>Checkout</button>
          </div>
        </div>
      )}

      {/* Add-to-cart Modal */}
      {modalItem && (
        <div className="modal-backdrop" onClick={(e) => e.target.classList.contains("modal-backdrop") && closeModal()}>
          <div className="modal-card">
            <div className="modal-head">
              <h3>Add to Cart</h3>
              <button className="modal-x" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <img src={modalItem.image} alt={modalItem.name} />
              <div className="modal-info">
                <h4 className="modal-name">{modalItem.name}</h4>
                <p className="modal-desc">{modalItem.ingredients}</p>

                <div className="qty-row">
                  <label>Quantity</label>
                  <div className="qty-ctrl">
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                    <input type="number" value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))} />
                    <button onClick={() => setQty((q) => q + 1)}>+</button>
                  </div>
                </div>

                <div className="price-row total">
                  <span>Total:</span>
                  <strong>${(modalItem.price * qty).toFixed(2)}</strong>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-ghost" onClick={closeModal}>Cancel</button>
              <button className="btn-primary" onClick={confirmAdd}>
                Add {qty} to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="modal-backdrop" onClick={(e) => e.target.classList.contains("modal-backdrop") && closeCheckout()}>
          <div className="modal-card">
            <div className="modal-head">
              <h3>Checkout</h3>
              <button className="modal-x" onClick={closeCheckout}>×</button>
            </div>
            <div className="modal-body modal-body--stack">
              <div className="checkout-box">
                <h4 className="modal-name">Order Summary</h4>
                <ul className="cart-list">
                  {cart.map((p, i) => (
                    <li key={i}>
                      <span>{p.qty}× {p.name}</span>
                      <span>${p.lineTotal.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="cart-totals-wrap">
                  <p className="cart-line"><span>Total</span><span>${total.toFixed(2)}</span></p>
                </div>
              </div>
              <form className="checkout-form" onSubmit={confirmOrder}>
                <div className="form-row">
                  <label>Name</label>
                  <input type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                </div>
                <div className="form-row">
                  <label>Notes (optional)</label>
                  <textarea rows="3" value={note} onChange={(e) => setNote(e.target.value)} />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-ghost" onClick={closeCheckout}>Cancel</button>
                  <button type="submit" className="btn-primary">Confirm Order</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="modal-backdrop" onClick={(e) => e.target.classList.contains("modal-backdrop") && closeSuccess()}>
          <div className="modal-card">
            <div className="modal-head">
              <h3>Order Successful</h3>
              <button className="modal-x" onClick={closeSuccess}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-info">
                <p className="modal-desc">Thank you <strong>{customerName || "Guest"}</strong>!</p>
                <p className="modal-desc">Your order <strong>#{orderNumber}</strong> has been placed successfully.</p>
                <p className="modal-desc">You’ll receive your pizzas soon</p>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={closeSuccess}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Clear Basket Confirm Modal */}
      {showClearConfirm && (
        <div className="modal-backdrop" onClick={(e) => e.target.classList.contains("modal-backdrop") && closeClearConfirm()}>
          <div className="modal-card">
            <div className="modal-head">
              <h3>Clear Basket?</h3>
              <button className="modal-x" onClick={closeClearConfirm}>×</button>
            </div>
            <div className="modal-body">
              <p className="modal-desc">This will remove all items from your cart.</p>
            </div>
            <div className="modal-actions">
              <button className="btn-ghost" onClick={closeClearConfirm}>Cancel</button>
              <button className="btn-primary" onClick={doClearBasket}>Clear Basket</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
