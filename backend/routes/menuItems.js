// routes/menuItems.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/menu-items/restaurant/:restaurantId
router.get('/restaurant/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM menu_items WHERE restaurant_id = $1',
      [restaurantId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching menu items by restaurant ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
