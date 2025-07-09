require('./db')(function (err, data, CatData) {
  if (err) console.log(err);
  else {
    global.foodData = data;
    global.foodCategory = CatData;
  }
});

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://tasty-bites-pied.vercel.app' // ✅ Your deployed frontend
  ],
  credentials: true
}));

app.use(express.json());

// ✅ Simple test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ✅ NEW: Add a /ping route to keep your Render server warm
app.get('/ping', (req, res) => {
  res.send('pong');
});

// ✅ Your Auth routes
app.use('/api/auth', require('./Routes/Auth'));

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
