// routes/restaurants.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all restaurants
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM restaurants');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching restaurants:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
