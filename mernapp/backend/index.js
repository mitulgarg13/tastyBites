const connectToMongo = require('./db'); // ✅ new db.js exports connectToMongo()
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// ✅ Connect to MongoDB once
connectToMongo();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://tasty-bites-pied.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

// ✅ Use your updated Auth routes (which now query fresh data)
app.use('/api/auth', require('./Routes/Auth'));

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
