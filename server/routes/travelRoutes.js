const express = require('express');
const { getDestinationsByContinent, addToWishlist, getWishlist } = require('../controllers/travelController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

// Route to get destinations by continent
router.get('/countries', authenticateToken, getDestinationsByContinent);

// Route to add a country to the wishlist
router.post('/wishlist', authenticateToken, addToWishlist);

// Route to get the user's wishlist
router.get('/wishlist', authenticateToken, getWishlist);

module.exports = router;
