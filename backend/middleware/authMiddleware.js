const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * 🛡️ PROTECT: Identity Verification Protocol
 * Ensures the requester has a valid JWT from the Vault.
 */
const protect = async (req, res, next) => {
  let token;

  // 1. Check if Authorization header exists and starts with Bearer
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token: "Bearer <token_string>" -> "<token_string>"
      token = req.headers.authorization.split(' ')[1];

      // 🔥 MALFORMATION GUARD: Check if token is garbage
      if (!token || token === 'undefined' || token === 'null' || token.length < 10) {
        console.error("🛰️ SECURITY ALERT: Malformed Token received!".red);
        return res.status(401).json({ 
          success: false, 
          message: "⚠️ Authorization Protocol Failed: Malformed Token." 
        });
      }

      // 2. Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'azeem_vault_secret_99');

      // 3. Extract User Data (Excluding password for security)
      // decoded.id wahi hai jo humne token generate karte waqt sign kiya tha
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ 
          success: false, 
          message: "⚠️ Identity Theft Detected: User no longer exists in Vault." 
        });
      }

      next(); // Protocol Cleared: Proceed to Controller
    } catch (error) {
      console.error(`🛰️ VAULT ERROR [JWT]: ${error.message}`.red);
      
      // Specific error messages for debugging
      const msg = error.message === 'jwt malformed' 
        ? "⚠️ Token structure is corrupted." 
        : "⚠️ Session Expired: Please login again.";

      res.status(401).json({ success: false, message: msg });
    }
  }

  // 4. No Token Scenario
  if (!token) {
    res.status(401).json({ 
      success: false, 
      message: "⚠️ Access Denied: No Security Token provided." 
    });
  }
};

/**
 * 👑 ADMIN: Master Commander Authorization
 * Restricts access to Master Azeem (Admin/SuperAdmin) only.
 */
const admin = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
    next();
  } else {
    console.warn(`⚠️ UNAUTHORIZED ACCESS ATTEMPT by: ${req.user?.userId}`.yellow);
    res.status(403).json({ 
      success: false, 
      message: "❌ Access Denied: Commander-level clearance required." 
    });
  }
};

module.exports = { protect, admin };