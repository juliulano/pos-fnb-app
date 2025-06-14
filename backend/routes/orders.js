const router = require('express').Router();
let Order = require('../models/order.model');

// Route untuk GET (melihat semua riwayat pesanan) - Opsional untuk sekarang
router.route('/').get((req, res) => {
  Order.find()
    .sort({ createdAt: -1 }) // Urutkan dari yang paling baru
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route untuk POST (membuat pesanan baru)
router.route('/').post((req, res) => {
  const { items, totalPrice } = req.body;

  const newOrder = new Order({
    items,
    totalPrice,
  });

  newOrder.save()
    .then(savedOrder => res.status(201).json({ message: 'Pesanan berhasil disimpan!', order: savedOrder }))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;