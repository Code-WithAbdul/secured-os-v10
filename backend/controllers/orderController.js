const Order = require('../models/Order');
const colors = require('colors');

/**
 * 👤 PROTOCOL: Get My Orders (Extraction Logs)
 */
exports.getMyOrders = async (req, res) => {
  try {
    const { email } = req.params;

    // 🔥 SECURITY: Agar email aur user dono missing hon
    if (!email && (!req.user || !req.user._id)) {
      return res.status(400).json({ success: false, error: "Identification nodes missing." });
    }

    const query = {
      $or: [
        { email: email },
        { user: req.user ? req.user._id : null }
      ].filter(clause => clause.email || clause.user)
    };

    const orders = await Order.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders || [] // Empty array as fallback
    });
  } catch (error) {
    console.error("❌ Extraction Logs Sync Error:".red, error.message);
    res.status(500).json({ success: false, error: "Vault Communication Error" });
  }
};

/**
 * 🛰️ PROTOCOL: Place New Order
 */
exports.placeOrder = async (req, res) => {
  try {
    const { 
      customerName, email, phone, address, city, 
      cartItems, productCost, deliveryCharges, totalAmount, paymentMethod 
    } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Vault Error: Cart is empty!" });
    }

    const order = new Order({
      user: req.user ? req.user._id : null, 
      customerName,
      email,
      phone,
      address,
      city,
      cartItems,
      productCost,
      deliveryCharges: deliveryCharges || 300,
      totalAmount,
      paymentMethod: paymentMethod || 'Cash on Delivery'
    });

    const savedOrder = await order.save();
    console.log(`✅ ORDER SECURED: ${savedOrder.orderId}`.green.bold);

    res.status(201).json({
      success: true,
      message: "🔥 Azeem Gadgets: Order Deployed Successfully!",
      data: savedOrder
    });

  } catch (error) {
    console.error("❌ VAULT WRITE ERROR:".red.bold, error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * 👑 PROTOCOL: Get All Orders (Admin Intelligence)
 * --------------------------------------------------
 * Ye function Admin Panel (Vault Extractions) ko data bhejta hai.
 */
exports.getOrders = async (req, res) => {
  try {
    // 🛡️ Fetches EVERYTHING without limit for Admin view
    const orders = await Order.find({}).sort({ createdAt: -1 });
    
    res.status(200).json({ 
      success: true, 
      count: orders.length, 
      data: orders 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * 🔍 PROTOCOL: Get Single Order Detail (Tracking)
 */
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const query = {
      $or: [
        { orderId: String(id) },
        { orderId: id.startsWith('ORD-') ? id : `ORD-${id}` }
      ]
    };

    // MongoDB ObjectID check
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      query.$or.push({ _id: id });
    }

    const order = await Order.findOne(query);
    
    if (!order) {
      return res.status(404).json({ success: false, message: "NODE NOT FOUND." });
    }
    
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, error: "Invalid Protocol." });
  }
};

/**
 * 🚥 PROTOCOL: Update Order Status
 */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const query = id.match(/^[0-9a-fA-F]{24}$/) 
      ? { _id: id } 
      : { $or: [{ orderId: id }, { orderId: id.startsWith('ORD-') ? id : `ORD-${id}` }] };

    const order = await Order.findOneAndUpdate(
      query, 
      { status }, 
      { new: true, runValidators: true }
    );

    if (!order) return res.status(404).json({ success: false, error: "Order Not Found" });
    
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * 🗑️ PROTOCOL: Purge Order
 */
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const query = id.match(/^[0-9a-fA-F]{24}$/) 
      ? { _id: id } 
      : { $or: [{ orderId: id }, { orderId: id.startsWith('ORD-') ? id : `ORD-${id}` }] };

    const order = await Order.findOneAndDelete(query);
    if (!order) return res.status(404).json({ success: false, error: "Node not found." });
    
    res.status(200).json({ success: true, message: "Record permanently deleted." });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};