const express = require('express');
const router = express.Router();

// 🎮 Controller Imports (Ensure getMyOrders is added here)
const { 
  placeOrder, 
  getOrders, 
  getOrderById, 
  updateOrderStatus, 
  deleteOrder,
  getMyOrders // 🔥 FIXED: Added this missing import
} = require('../controllers/orderController');

// 🛡️ Middleware Imports
const { protect, admin } = require('../middleware/authMiddleware');

/**
 * 👤 PROTOCOL: Dashboard Order Sync
 * @route   GET /api/orders/user/:email
 * Logic: Must be BEFORE /:id route to avoid conflict.
 */
router.get('/user/:email', protect, getMyOrders); // 🔥 FIXED: Positioned correctly

/**
 * 🛰️ @route   /api/orders
 * Operations: Admin list access & Public order placement.
 */
router.route('/')
  .get(protect, admin, getOrders) 
  .post(placeOrder);              

/**
 * 🛰️ @route   /api/orders/:id
 * Operations: Public tracking (GET) & Admin management (PUT/DELETE).
 */
router.route('/:id')
  .get(getOrderById)                       
  .put(protect, admin, updateOrderStatus)  
  .delete(protect, admin, deleteOrder);    

module.exports = router;