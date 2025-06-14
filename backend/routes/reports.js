const router = require('express').Router();
const Order = require('../models/order.model');

// Endpoint utama untuk ringkasan laporan
router.route('/summary').get(async (req, res) => {
  try {
    // 1. Menghitung Total Pendapatan dan Jumlah Pesanan
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null, // Mengelompokkan semua dokumen menjadi satu
          totalRevenue: { $sum: '$totalPrice' },
          totalOrders: { $sum: 1 } // Menghitung jumlah dokumen (pesanan)
        }
      }
    ]);

    // 2. Menemukan Produk Terlaris
    const topSellingProducts = await Order.aggregate([
      { $unwind: '$items' }, // "Membongkar" array items menjadi dokumen terpisah
      {
        $group: {
          _id: '$items.productId', // Mengelompokkan berdasarkan ID produk
          name: { $first: '$items.name' }, // Ambil nama produk
          totalQuantity: { $sum: '$items.quantity' }, // Jumlahkan total kuantitas penjualan
          totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } } // Jumlahkan total pendapatan per produk
        }
      },
      { $sort: { totalQuantity: -1 } }, // Urutkan dari yang paling banyak terjual
      { $limit: 5 } // Ambil 5 produk teratas
    ]);

    // 3. Gabungkan hasil dan kirim sebagai respons
    res.json({
      totalRevenue: totalSales.length > 0 ? totalSales[0].totalRevenue : 0,
      totalOrders: totalSales.length > 0 ? totalSales[0].totalOrders : 0,
      topSellingProducts: topSellingProducts
    });

  } catch (err) {
    res.status(500).json('Error: ' + err);
  }
});

module.exports = router;