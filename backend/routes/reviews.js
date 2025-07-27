const express = require('express');
const router = express.Router();
const pool = require('../db');
// Get reviews for a specific menu item using alphanumeric ID
router.get('/:menu_item_id', async (req, res) => {
  const { menu_item_id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM reviews WHERE menu_item_id = $1',
      [menu_item_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;
