import { useState } from 'react';

// Komponen ini menerima satu prop: sebuah fungsi 'onProductAdded'
function AddProductForm({ onProductAdded }) {
  // State untuk form ini dikelola di sini, tidak lagi di App.jsx
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('Makanan');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = {
      name: newName,
      price: Number(newPrice),
      category: newCategory,
    };
    const apiUrl = 'http://localhost:5000/api/products/add';

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then(response => {
        if (!response.ok) { throw new Error('Gagal menambahkan produk'); }
        return response.json();
      })
      .then(() => {
        setNewName('');
        setNewPrice('');
        setNewCategory('Makanan');
        // Panggil fungsi prop untuk memberitahu App.jsx agar me-refresh daftar produk
        onProductAdded();
      })
      .catch(error => {
        console.error("Error saat menambah produk:", error);
        alert("Gagal menambahkan produk.");
      });
  };

  return (
    <div className="form-container">
      <h2>Tambah Produk Baru</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nama Produk</label>
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Harga</label>
          <input type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Kategori</label>
          <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
            <option value="Cemilan">Cemilan</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Tambah Produk</button>
      </form>
    </div>
  );
}

export default AddProductForm;