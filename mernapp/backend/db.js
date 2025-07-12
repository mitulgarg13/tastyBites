// db.js
const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://goFood13:mitul1333@cluster0.rurjoym.mongodb.net/goFoodmern?retryWrites=true&w=majority&appName=Cluster0';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectToMongo;
