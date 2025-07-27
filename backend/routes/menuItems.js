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
// Get a single menu item by its ID
router.get('/:menuItemId', async (req, res) => {
  const { menuItemId } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM menu_items WHERE id = $1',
      [menuItemId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching menu item by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;
