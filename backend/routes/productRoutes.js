const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware'); // 🔥 Added Middleware

/**
 * 🌍 @route   GET /api/products
 * @desc    Get all products (Public access)
 */
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: products.length,
      data: products 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * 🔍 @route   GET /api/products/:id
 * @desc    Get single product (Hybrid Lookup)
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let product;

    // 1. Check if valid MongoDB Hex ID
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    }

    // 2. If not found, check numeric custom id field
    if (!product) {
      product = await Product.findOne({ id: id });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: "Unit not found in Vault." });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * 🛠️ @route   POST /api/products
 * @desc    Create product (ADMIN ONLY)
 */
router.post('/', protect, admin, async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json({ success: true, data: createdProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * 📝 @route   PUT /api/products/:id
 * @desc    Update product (ADMIN ONLY)
 * 🔥 NEW: Added this because AdminPanel needs to edit products
 */
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { id } = req.params;
    let query = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { id: id };

    const updatedProduct = await Product.findOneAndUpdate(
      query,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Unit not found." });
    }

    res.json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * 🗑️ @route   DELETE /api/products/:id
 * @desc    Delete product (ADMIN ONLY)
 */
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const { id } = req.params;
    let query = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { id: id };

    const product = await Product.findOneAndDelete(query);
    
    if (!product) {
      return res.status(404).json({ success: false, message: "Unit not found in Vault." });
    }
    res.json({ success: true, message: "Product Purged Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;