function ProductList({ products, viewMode, onAddToCart, onEdit, onDelete }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        // Jika mode 'pos', buat kartu bisa diklik. Jika tidak, jangan.
        <div
          key={product._id}
          className={`product-card ${viewMode === 'pos' ? 'clickable' : ''}`}
          onClick={viewMode === 'pos' ? () => onAddToCart(product) : null}
        >
          <h3>{product.name}</h3>
          <p>Rp {product.price.toLocaleString('id-ID')}</p>
          <span className="category-badge">{product.category}</span>

          {/* Hanya tampilkan tombol Edit/Hapus jika dalam mode 'admin' */}
          {viewMode === 'admin' && (
            <div className="card-actions">
              <button onClick={(e) => { e.stopPropagation(); onEdit(product); }} className="edit-button">Edit</button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(product._id); }} className="delete-button">Hapus</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
// e.stopPropagation() penting agar saat mengklik tombol, event klik di kartu tidak ikut terpicu.

export default ProductList;