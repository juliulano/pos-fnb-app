require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Koneksi ke Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Berhasil terhubung ke MongoDB"))
  .catch(err => console.error("Koneksi ke MongoDB gagal:", err));

// --- DAFTARKAN ROUTES DI SINI ---
const productsRouter = require('./routes/products');
app.use('/api/products', productsRouter);

// --- UPDATE TERBARU ---
const ordersRouter = require('./routes/orders'); // <-- BARIS BARU
app.use('/api/orders', ordersRouter);

const reportsRouter = require('./routes/reports');
app.use('/api/reports', reportsRouter);// <-- BARIS BARU


// Route dasar untuk pengujian (bisa dihapus nanti)
app.get('/', (req, res) => {
  res.json({ message: "Selamat datang di API POS F&B!" });
});

// Menentukan port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});