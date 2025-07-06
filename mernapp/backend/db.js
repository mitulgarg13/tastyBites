const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load .env

const mongoURI = process.env.MONGODB_URI;
console.log("MongoDB URI:", mongoURI); // Log the MongoDB URI for debugging

const connectToMongo = async (callback) => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    const foodCollection = mongoose.connection.db.collection("food_items");
    const categoryCollection = mongoose.connection.db.collection("Categories");

    const foodItems = await foodCollection.find({}).toArray();
    const categories = await categoryCollection.find({}).toArray();

    callback(null, foodItems, categories);

  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    callback(err);
  }
};

module.exports = connectToMongo;
