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

// GET a single restaurant by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching restaurant:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
