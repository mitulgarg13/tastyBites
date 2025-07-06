const mongoose = require('mongoose');


 // Load .env

const mongoURI = 'mongodb+srv://goFood13:mitul1333@cluster0.rurjoym.mongodb.net/goFoodmern?retryWrites=true&w=majority&appName=Cluster0';

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
