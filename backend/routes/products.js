const router = require('express').Router();
let Product = require('../models/product.model');

// Route untuk GET (mendapatkan semua produk)
// URL: /products/
router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route untuk POST (menambahkan produk baru)
// URL: /products/add
router.route('/add').post((req, res) => {
  const { name, price, category } = req.body;

  const newProduct = new Product({
    name,
    price: Number(price), // Pastikan harga adalah angka
    category,
  });

  newProduct.save()
    .then(() => res.json('Produk berhasil ditambahkan!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json('Produk berhasil dihapus.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      if (!product) {
        return res.status(404).json('Error: Produk tidak ditemukan.');
      }

      product.name = req.body.name;
      product.price = Number(req.body.price);
      product.category = req.body.category;

      product.save()
        .then(() => res.json('Produk berhasil diperbarui!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;