const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  userId: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    lowercase: true 
  },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'superadmin', 'customer'], 
    default: 'customer' 
  }
}, { timestamps: true });

/**
 * 🛡️ THE MASTER LOCK
 * This logic ensures 'admin' role is ONLY assigned if 
 * Email is 'mehmoodalias12@gmail.com'.
 */
userSchema.pre('save', async function(next) {
  const ADMIN_EMAIL = 'mehmoodalias12@gmail.com';

  // 1. Role Assignment Logic
  if (this.userId === ADMIN_EMAIL) {
    this.role = 'admin';
  } else {
    this.role = 'customer'; // Baqi sab customer rahenge
  }

  // 2. Password Hashing (Crucial for AZEEMK to work)
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔑 Password Match Method (Used in Login)
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);