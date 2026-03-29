const mongoose = require('mongoose');

/**
 * 🏛️ AZEEM VAULT: Order Schema v6.5 (Enterprise Edition)
 * Protocol: High-fidelity data retention with flexible ID support.
 * Purpose: To ensure 100% successful writes from both Static & DB inventory.
 * -------------------------------------------------------------------------
 */
const OrderSchema = new mongoose.Schema({
  // 🆔 Unique Deployment ID (For Customer Tracking)
  orderId: {
    type: String,
    // 🔥 FIX: Default generator simplified to match your search pattern (e.g., 883198)
    // Agar aapko ORD- pasand hai toh rehne dein, lekin search hamesha full string se hogi.
    default: () => `${Math.floor(100000 + Math.random() * 900000)}`,
    unique: true,
    index: true,
    trim: true
  },
  
  // 👤 Authorized Personnel (Link to User for "My Orders" logic)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false 
  },

  customerName: { 
    type: String, 
    required: [true, "Identity check failed: Customer name required"],
    trim: true 
  },
  
  email: { 
    type: String, 
    required: [true, "Email is mandatory for digital receipts"],
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },

  phone: { 
    type: String, 
    required: [true, "Comm-link missing: Phone number required"],
    trim: true 
  },

  address: { 
    type: String, 
    required: [true, "Deployment node missing: Address required"],
    trim: true
  },

  city: { 
    type: String, 
    required: [true, "Geospatial error: City node required"],
    trim: true
  },

  // 🛒 Unit Manifest (The Payload)
  cartItems: [
    {
      // 🔥 THE CRITICAL FIX: String allows both '204' and '65f...' formats
      productId: {
        type: String, 
        required: [true, "Product ID is required for Vault tracking"]
      },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, default: 1 },
      image: { type: String, required: true }
    }
  ],

  // 💰 Financial Audit
  productCost: { 
    type: Number, 
    required: [true, "Financial breach: Hardware cost missing"],
    default: 0
  },

  deliveryCharges: { 
    type: Number, 
    required: true,
    default: 300 
  },

  totalAmount: { 
    type: Number, 
    required: [true, "Financial breach: Total extraction value missing"] 
  },

  paymentMethod: {
    type: String,
    enum: ['Cash on Delivery', 'Online Payment'],
    default: 'Cash on Delivery'
  },

  // 🚦 Logistics Pipeline
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'], 
    default: 'Pending' 
  }
}, {
  // Automatically manages 'createdAt' and 'updatedAt' for Admin Analytics
  timestamps: true,
  // 🔥 FIX: Mapping _id to id for frontend compatibility
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create the model
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;