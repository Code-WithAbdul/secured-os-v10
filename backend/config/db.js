const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // 🛡️ Error Check: Agar URI na mile toh foran batao
    if (!process.env.MONGO_URI) {
      console.error("❌ CRITICAL: MONGO_URI is not defined in .env file!".red.bold);
      process.exit(1);
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // 🔥 Database ka naam print karein taake confusion khatam ho
    const dbName = conn.connection.db.databaseName;
    console.log(`\n🏠 VAULT CONNECTED`.bgCyan.black);
    console.log(`📡 Host: ${conn.connection.host}`.cyan);
    console.log(`📁 Database: ${dbName}`.yellow.bold); // 👈 Ye check karna hai
    console.log(`-----------------------------------\n`.gray);

  } catch (error) {
    console.error(`❌ Connection Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;