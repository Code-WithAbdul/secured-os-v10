const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const path = require('path');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const User = require('./models/User');

// 1. CONFIGURATION
dotenv.config();

// 2. DATABASE CONNECTION
connectDB();

const app = express();

// 3. MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔥 PRODUCTION CORS: Har device (Mobile/Web) se access ke liye
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// ---------------------------------------------------------
// 🔥 MASTER ADMIN CREATOR (Azeem's Secret Entry)
// ---------------------------------------------------------
app.get('/api/auth/create-master-admin', async (req, res) => {
    try {
        const masterEmail = 'mehmoodalias12@gmail.com';
        const adminExists = await User.findOne({ userId: masterEmail.toLowerCase() });
        
        if (adminExists) {
            return res.send(`
                <div style="background:#0a0a0a; color:white; padding:50px; font-family:sans-serif; border-radius:30px; text-align:center; border: 2px solid #3b82f6; max-width:500px; margin:50px auto; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                    <h1 style="color:#3b82f6; font-style:italic; letter-spacing:-1px;">🛰️ VAULT STATUS</h1>
                    <p style="font-size:1.1rem; opacity:0.8;">Admin <b style="color:#fbbf24;">${masterEmail}</b> is already active.</p>
                    <hr style="border:0; border-top:1px solid #333; margin:20px 0;">
                    <p style="color:#666; font-size:0.9rem;">Protocol: Master Node Secure</p>
                </div>
            `);
        }

        await User.create({
            name: "Master Azeem",
            userId: masterEmail.toLowerCase(),
            password: "AZEEMK1234", 
            role: "admin"
        });

        res.send(`
            <div style="background:#0a0a0a; color:white; padding:50px; font-family:sans-serif; border-radius:30px; text-align:center; border: 2px solid #10b981; max-width:500px; margin:50px auto; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                <h1 style="color:#10b981; font-style:italic;">✅ ACCESS GRANTED</h1>
                <p style="font-size:1.1rem; opacity:0.8;">Master Admin hardcoded into the Vault.</p>
                <hr style="border:0; border-top:1px solid #333; margin:20px 0;">
                <p><b>Access ID:</b> mehmoodalias12@gmail.com</p>
                <p><b>Password:</b> AZEEMK1234</p>
            </div>
        `);
    } catch (err) {
        res.status(500).send("<h1 style='color:red;'>❌ Vault Write Error: " + err.message + "</h1>");
    }
});

// 4. ROUTES MAPPING
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Root Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: "Alive", owner: "Azeem", message: "Vault API is Operational" });
});

// 5. AUTO-SEEDER LOGIC (FIXED: Numeric IDs added to prevent Validation Error)
const seedDatabase = async () => {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            console.log("Empty Vault! Seeding Inventory...".yellow);
            await Product.create([
                { 
                    id: 1, // FIX: Added numeric id
                    name: "iPhone 15 Pro Max", 
                    price: 450000, 
                    category: "Mobiles", 
                    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=2070", 
                    stock: 10 
                },
                { 
                    id: 2, // FIX: Added numeric id
                    name: "MacBook Pro M3", 
                    price: 550000, 
                    category: "Laptops", 
                    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2070", 
                    stock: 5 
                }
            ]);
            console.log("✅ Inventory Seeded Successfully!".green);
        }
    } catch (err) {
        console.log("❌ Seeding Error:".red, err.message);
    }
};

// Seeder call
seedDatabase();

// 6. GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// 7. START SERVER LOGIC
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`\n🚀 AZEEM STORE IS LIVE!`.yellow.bold);
        console.log(`📡 Port: ${PORT}`.cyan);
        console.log(`🏠 Mode: Network Discovery Active`.green);
    });
}

// 🛡️ VERCEL EXPORT
module.exports = app;