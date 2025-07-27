const express = require('express');
const cors = require('cors');
require('dotenv').config();

const restaurantRoutes = require('./routes/restaurants');
const menuItemRoutes = require('./routes/menuItems');
const reviewsRoutes = require('./routes/reviews');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menu-items', menuItemRoutes);
app.use('/api/menu-items/reviews', reviewsRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
