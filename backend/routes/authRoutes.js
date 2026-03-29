const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'azeem_vault_secret_99', {
    expiresIn: '30d',
  });
};

// @desc    Commander Login
router.post('/login', async (req, res) => {
  try {
    // 🔥 FIXED: Destructuring both userId and email to prevent 400 error
    const { userId, email, password } = req.body;
    
    // Identifier select karo (jo bhi frontend se aaye)
    const loginId = userId || email;

    console.log(`📡 Login Request for: ${loginId}`.cyan);

    // 🔥 Validation check now uses the combined identifier
    if (!loginId || !password) {
      return res.status(400).json({ success: false, message: "⚠️ ID and Password required" });
    }

    const normalizedId = loginId.trim().toLowerCase();
    
    // 🔥 Search in Database: User model ke 'userId' field mein lookup
    const user = await User.findOne({ userId: normalizedId });

    if (!user) {
      console.log(`❌ User NOT found: ${normalizedId}`.red);
      return res.status(401).json({ success: false, message: "⚠️ Invalid ID or Password" });
    }

    const isMatch = await user.matchPassword(password);
    
    if (isMatch) {
      console.log(`✅ Password Match! Access Granted to: ${user.name}`.green);
      res.json({
        success: true,
        _id: user._id,
        name: user.name,
        userId: user.userId,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      console.log(`❌ Password MISMATCH for: ${normalizedId}`.red);
      res.status(401).json({ success: false, message: "⚠️ Invalid ID or Password" });
    }
  } catch (error) {
    console.error("🛰️ LOGIN ERROR:".red, error.message);
    res.status(500).json({ success: false, message: "Server Communication Error" });
  }
});

// @desc    Register Master Admin
router.post('/register-master', async (req, res) => {
  try {
    const { name, userId, password } = req.body;
    const normalizedId = userId.trim().toLowerCase();
    
    const userExists = await User.findOne({ userId: normalizedId });
    if (userExists) {
      return res.status(400).json({ success: false, message: "Master Node already active" });
    }

    const user = await User.create({ 
      name, 
      userId: normalizedId, 
      password, 
      role: 'admin' 
    });

    res.status(201).json({ success: true, message: "✅ Master Node Created" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;