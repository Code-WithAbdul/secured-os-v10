const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  // 🔥 THE CRITICAL FIX: Numeric IDs (204, 101, etc.) ke liye ye field lazmi hai
  id: { 
    type: String, 
    required: [true, 'Please add a numeric product ID for vault tracking'],
    unique: true, // Takay duplicate IDs na banen
    trim: true
  },
  name: { 
    type: String, 
    required: [true, 'Please add a name'],
    trim: true 
  },
  price: { 
    type: Number, 
    required: [true, 'Please add a price'] 
  },
  category: { 
    type: String, 
    required: [true, 'Please specify a category (Mobiles/Laptops)'] 
  },
  image: { 
    type: String, 
    required: [true, 'Please add an image URL'] 
  },
  description: { 
    type: String,
    default: "Premium high-performance unit from Azeem Vault."
  },
  // Specs field add kar di hai taake ProductDetails mein khali nazar na aaye
  specs: {
    type: Map,
    of: String
  },
  stock: { 
    type: Number, 
    default: 1 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  // Is se JSON output mein thori safai rehti hai
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Product', mongoose.models.Product || ProductSchema);