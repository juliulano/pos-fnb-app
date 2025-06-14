import { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/Nav';
import AddProductForm from './components/AddProductForm';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Dashboard from './components/Dashboard'; // 1. IMPORT KOMPONEN BARU

function App() {
  // 2. STATE UNTUK NAVIGASI, DEFAULT KE 'dashboard' AGAR LANGSUNG TERLIHAT
  const [view, setView] = useState('dashboard');

  // Semua state lainnya tetap sama
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Semua fungsi logic kita (tidak ada yang berubah)
  const fetchProducts = () => { setLoading(true); fetch('http://localhost:5000/api/products').then(res => { if (!res.ok) throw new Error('Network response was not ok'); return res.json(); }).then(data => { setProducts(data); setLoading(false); }).catch(err => { setError(err.message); setLoading(false); }); };
  useEffect(() => { fetchProducts(); }, []);
  const handleDelete = (productId) => { if (!window.confirm("Apakah Anda yakin?")) return; fetch(`http://localhost:5000/api/products/${productId}`, { method: 'DELETE' }).then(res => { if (!res.ok) throw new Error('Gagal menghapus'); return res.json(); }).then(() => fetchProducts()).catch(error => alert(error.message)); };
  const handleOpenModal = (product) => { setEditingProduct(product); setIsModalOpen(true); };
  const handleCloseModal = () => { setIsModalOpen(false); setEditingProduct(null); };
  const handleModalInputChange = (event) => { const { name, value } = event.target; setEditingProduct(prev => ({ ...prev, [name]: value })); };
  const handleUpdateSubmit = (event) => { event.preventDefault(); if (!editingProduct) return; const { _id, name, price, category } = editingProduct; fetch(`http://localhost:5000/api/products/${_id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, price: Number(price), category }) }).then(res => { if (!res.ok) throw new Error('Gagal update'); return res.json(); }).then(() => { handleCloseModal(); fetchProducts(); }).catch(error => alert(error.message)); };
  const handleAddToCart = (productToAdd) => { setCart(prevCart => { const existingItem = prevCart.find(item => item._id === productToAdd._id); if (existingItem) { return prevCart.map(item => item._id === productToAdd._id ? { ...item, quantity: item.quantity + 1 } : item); } return [...prevCart, { ...productToAdd, quantity: 1 }]; }); };
  const handleSaveOrder = () => { if (cart.length === 0) { alert("Keranjang kosong."); return; } const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0); const orderData = { items: cart.map(item => ({ productId: item._id, name: item.name, price: item.price, quantity: item.quantity })), totalPrice: totalPrice, }; fetch('http://localhost:5000/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(orderData), }).then(res => { if (!res.ok) throw new Error('Gagal menyimpan pesanan'); return res.json(); }).then(data => { alert(`Pesanan berhasil disimpan!`); setCart([]); }).catch(error => alert(error.message)); };

  // Fungsi untuk merender tampilan yang sesuai
  const renderView = () => {
    // 3. LOGIKA RENDER DIUPDATE UNTUK MENANGANI 'dashboard'
    switch (view) {
      case 'pos':
        return (
          <div className="pos-container">
            <div className="menu-panel"><ProductList products={products} viewMode="pos" onAddToCart={handleAddToCart} /></div>
            <div className="cart-panel"><Cart cartItems={cart} onSaveOrder={handleSaveOrder} /></div>
          </div>
        );
      case 'admin':
        // Loading & Error check untuk admin view
        if (loading) return <h1>Memuat Produk...</h1>;
        if (error) return <h1>Error: {error}</h1>;
        return (
          <div className="admin-container">
            <AddProductForm onProductAdded={fetchProducts} />
            <hr className="divider" />
            <ProductList products={products} viewMode="admin" onEdit={handleOpenModal} onDelete={handleDelete} />
          </div>
        );
      case 'dashboard':
        return <Dashboard />;
      default:
        return <h1>Halaman tidak ditemukan</h1>;
    }
  };

  return (
    <div className="App">
      <Nav currentView={view} setView={setView} />
      <main className="main-content">
        {renderView()}
      </main>

      {/* Modal Edit tidak berubah */}
      {isModalOpen && editingProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Produk</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="form-group"><label>Nama Produk</label><input type="text" name="name" value={editingProduct.name} onChange={handleModalInputChange} required /></div>
              <div className="form-group"><label>Harga</label><input type="number" name="price" value={editingProduct.price} onChange={handleModalInputChange} required /></div>
              <div className="form-group"><label>Kategori</label><select name="category" value={editingProduct.category} onChange={handleModalInputChange}><option value="Makanan">Makanan</option><option value="Minuman">Minuman</option><option value="Cemilan">Cemilan</option></select></div>
              <div className="modal-actions"><button type="button" onClick={handleCloseModal} className="cancel-button">Batal</button><button type="submit" className="submit-button">Simpan Perubahan</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;