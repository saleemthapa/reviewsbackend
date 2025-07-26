// routes/menuItems.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all menu items
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu_items');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching menu items:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
