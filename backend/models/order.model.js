const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Ini adalah skema untuk setiap item di dalam pesanan
const orderItemSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId, // Merujuk ke ID dari koleksi Product
    ref: 'Product',
    required: true
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
}, {
  _id: false // Kita tidak butuh ID terpisah untuk setiap sub-item
});

// Ini adalah skema utama untuk pesanan
const orderSchema = new Schema({
  items: [orderItemSchema], // Sebuah array yang berisi item-item pesanan
  totalPrice: {
    type: Number,
    required: true
  },
  // createdAt akan ditambahkan secara otomatis oleh timestamps
}, {
  timestamps: true // Otomatis mencatat kapan pesanan dibuat dan diupdate
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;