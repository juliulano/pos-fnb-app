import { useState, useEffect } from 'react';

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'http://localhost:5000/api/reports/summary';
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error('Gagal mengambil data laporan');
        return res.json();
      })
      .then(data => {
        setSummary(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Hanya dijalankan sekali saat komponen dimuat

  if (loading) return <h2>Memuat Laporan...</h2>;
  if (error) return <h2>Error: {error}</h2>;
  if (!summary) return <h2>Tidak ada data untuk ditampilkan.</h2>;

  return (
    <div className="dashboard-container">
      <h1>Dashboard Penjualan</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Pendapatan</h4>
          <p>Rp {summary.totalRevenue.toLocaleString('id-ID')}</p>
        </div>
        <div className="stat-card">
          <h4>Total Pesanan</h4>
          <p>{summary.totalOrders} Transaksi</p>
        </div>
      </div>
      <div className="top-products-container">
        <h3>5 Produk Terlaris (Berdasarkan Kuantitas)</h3>
        <ul className="top-products-list">
          {summary.topSellingProducts.map(product => (
            <li key={product._id}>
              <span className="product-name">{product.name}</span>
              <span className="product-quantity">{product.totalQuantity} Terjual</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;