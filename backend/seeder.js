const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product'); // Aapka backend wala model
// 🔥 Important: Aapne jo 73 products merge kiye hain, unka data yahan chahiye
const productsData = require('./data/products_json'); 

dotenv.config();
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/azeem-gadgets');

const importData = async () => {
  try {
    await Product.deleteMany(); // Purane 6 products saaf
    await Product.insertMany(productsData); // 73 products dakhil!
    
    console.log('✅ 73 Units Successfully Injected into Vault!');
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

importData();