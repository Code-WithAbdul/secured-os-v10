const Product = require('../models/Product');

// @desc    Get Single Product by ID
// @route   GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // 🔍 Step 1: Check if it's a valid MongoDB ObjectId
    let product;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    }

    // 🔍 Step 2: Agar MongoDB ID se nahi mila, toh numeric 'id' field se dhoondo (e.g., 204)
    if (!product) {
      product = await Product.findOne({ id: id });
    }

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Unit not found in Central Archive." 
      });
    }

    res.status(200).json({ success: true, data: product });

  } catch (error) {
    console.error("❌ VAULT READ ERROR:".red, error.message);
    res.status(500).json({ success: false, message: "Internal Vault Failure" });
  }
};