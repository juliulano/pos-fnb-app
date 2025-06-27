const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Setiap username harus unik
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'kasir'], // Peran hanya boleh salah satu dari ini
    default: 'kasir' // Nilai default jika tidak ditentukan
  }
}, {
  timestamps: true,
});

// Middleware Mongoose: Dijalankan SEBELUM .save()
userSchema.pre('save', async function(next) {
  // Hanya jalankan fungsi ini jika password diubah (atau baru)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate "salt" untuk membuat hash lebih aman
    const salt = await bcrypt.genSalt(10);
    // Hash password dengan salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;