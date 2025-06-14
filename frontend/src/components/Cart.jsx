// Terima prop baru: onSaveOrder
function Cart({ cartItems, onSaveOrder }) {
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  return (
    <div className="cart-container">
      <h2>Pesanan Saat Ini</h2>
      {cartItems.length === 0 ? (
        <p>Keranjang masih kosong.</p>
      ) : (
        <>
          <ul className="cart-items-list">
            {cartItems.map(item => (
              <li key={item._id} className="cart-item">
                <span className="item-name">{item.name} (x{item.quantity})</span>
                <span className="item-price">
                  Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                </span>
              </li>
            ))}
          </ul>
          <hr className="divider" />
          <div className="cart-total">
            <strong>Total:</strong>
            <strong>Rp {totalPrice.toLocaleString('id-ID')}</strong>
          </div>
          {/* Tombol ini sekarang memanggil fungsi onSaveOrder dari App.jsx */}
          {/* Tombol akan nonaktif jika keranjang kosong */}
          <button 
            className="checkout-button" 
            onClick={onSaveOrder}
            disabled={cartItems.length === 0}
          >
            Simpan & Cetak Struk
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;