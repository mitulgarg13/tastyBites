require('./db')(function (err, data, CatData) {
  if (err) console.log(err);
  else {
    global.foodData = data;
    global.foodCategory = CatData;
  }
});

const express = require('express');
const cors = require('cors'); // ✅ Import cors
const app = express();
const port = 5000;

// ✅ Use cors middleware properly
app.use(cors({
  origin: 'http://localhost:5173', // 👈 your frontend port
  credentials: true // optional, only needed if using cookies
}));

app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Auth routes
app.use('/api/auth', require('./Routes/Auth'));

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
