const express = require('express');
const User = require('../models/User');
const Order = require('../models/Orders');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const axios = require('axios');
const fetch = require('../middleware/fetchdetails');
const jwtSecret = "HaHa";

// ✅ Create User
router.post('/createuser', [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  body('name').isLength({ min: 3 })
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  const salt = await bcrypt.genSalt(10);
  let securePass = await bcrypt.hash(req.body.password, salt);
  try {
    await User.create({
      name: req.body.name,
      password: securePass,
      email: req.body.email,
      location: req.body.location
    }).then(user => {
      const data = { user: { id: user.id } };
      const authToken = jwt.sign(data, jwtSecret);
      success = true;
      res.json({ success, authToken });
    }).catch(err => {
      console.log(err);
      res.json({ error: "Please enter a unique value." });
    });
  } catch (error) {
    console.error(error.message);
  }
});

// ✅ Login
router.post('/login', [
  body('email', "Enter a Valid Email").isEmail(),
  body('password', "Password cannot be blank").exists(),
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
    }

    const pwdCompare = await bcrypt.compare(password, user.password);
    if (!pwdCompare) {
      return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
    }

    const data = { user: { id: user.id } };
    success = true;
    const authToken = jwt.sign(data, jwtSecret);
    res.json({ success, authToken });

  } catch (error) {
    console.error(error.message);
    res.send("Server Error");
  }
});

// ✅ Get user details
router.post('/getuser', fetch, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.send("Server Error");
  }
});

// ✅ Get location
router.post('/getlocation', async (req, res) => {
  try {
    let lat = req.body.latlong.lat;
    let long = req.body.latlong.long;
    console.log(lat, long);
    let location = await axios
      .get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=YOUR_API_KEY`)
      .then(async res => {
        let response = res.data.results[0].components;
        let { city_district, city, state, country, postcode } = response;
        return `${city_district || ""}, ${city || ""}, ${state || ""}, ${country || ""} ${postcode || ""}`
          .replace(/\s+/g, ' ')
          .trim();
      })
      .catch(error => {
        console.error(error);
      });
    res.send({ location });
  } catch (error) {
    console.error(error.message);
    res.send("Server Error");
  }
});

// ✅ Get food data — FRESH every time
router.post('/foodData', async (req, res) => {
  try {
    const foodItems = await req.app.locals.db
      ? await req.app.locals.db.collection("food_items").find({}).toArray()
      : await require('mongoose').connection.db.collection("food_items").find({}).toArray();

    const categories = await req.app.locals.db
      ? await req.app.locals.db.collection("Categories").find({}).toArray()
      : await require('mongoose').connection.db.collection("Categories").find({}).toArray();

    res.send({ food_items: foodItems, category: categories });
  } catch (error) {
    console.error(error.message);
    res.send("Server Error");
  }
});

// ✅ Order Data
router.post('/orderData', async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });
  let eId = await Order.findOne({ 'email': req.body.email });
  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data]
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  }
});

// ✅ My Orders
router.post('/myOrderData', async (req, res) => {
  try {
    let eId = await Order.findOne({ 'email': req.body.email });
    res.json({ orderData: eId });
  } catch (error) {
    res.send("Error", error.message);
  }
});

module.exports = router;
