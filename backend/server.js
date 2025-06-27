require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// --- Routes ---
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const reportsRouter = require('./routes/reports');
const usersRouter = require('./routes/users');

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.json({ message: "Selamat datang di API POS F&B!" });
});


// --- KONEKSI DATABASE (Vercel akan menanganinya secara otomatis) ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Koneksi ke MongoDB Atlas Siap."))
  .catch(err => console.error("Koneksi DB Gagal:", err));

// --- EXPORT APP UNTUK VERCEL ---
module.exports = app;