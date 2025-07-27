const express = require('express');
const cors = require('cors');
require('dotenv').config();

const restaurantRoutes = require('./routes/restaurants');
const menuItemRoutes = require('./routes/menuItems');
const reviewsRoutes = require('./routes/reviews');

const app = express();

// Configure CORS to allow requests from your frontend domain
app.use(cors({
  origin: ['https://www.reviewsbymenu.com', 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menu-items', menuItemRoutes);
app.use('/api/menu-items/reviews', reviewsRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
