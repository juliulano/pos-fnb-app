const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true // Menghapus spasi di awal/akhir
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Makanan', 'Minuman', 'Cemilan'] // Hanya boleh salah satu dari ini
  }
}, {
  timestamps: true, // Otomatis membuat field createdAt dan updatedAt
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;