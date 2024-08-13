const Continent = require('../models/Continent');
const Country = require('../models/Country');
const UserWishlist = require('../models/UserWishlist');

const getDestinationsByContinent = async (req, res) => {
    try {
      const continents = await Continent.findAll({
        include: [
          {
            model: Country,
            as: 'countries', // Ensure this alias matches the frontend usage
            attributes: ['id', 'name', 'image_url']
          }
        ]
      });
  
      // Log the response data for debugging
      console.log('Fetched continents with countries:', JSON.stringify(continents, null, 2));
  
      res.json(continents);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      res.status(500).send('Server error');
    }
  };
  

// Add country to wishlist
const addToWishlist = async (req, res) => {
  const { countryId } = req.body;
  const userId = req.user.id;

  try {
    // Check if the country is already in the wishlist
    const existing = await UserWishlist.findOne({
      where: { user_id: userId, country_id: countryId }
    });

    if (existing) {
      return res.status(400).send('Country already in wishlist');
    }

    // Add to wishlist
    await UserWishlist.create({ user_id: userId, country_id: countryId });
    res.status(200).send('Added to wishlist');
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).send('Server error');
  }
};

// Get wishlist
const getWishlist = async (req, res) => {
  const userId = req.user.id;

  try {
    const wishlistItems = await UserWishlist.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Country,
          as: 'country', // Use the alias defined in the association
          attributes: ['id', 'name', 'image_url']
        }
      ]
    });

    if (!wishlistItems.length) {
      return res.status(404).send('Wishlist not found');
    }

    // Map to get country details
    res.json(wishlistItems.map(item => item.country));
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).send('Server error');
  }
};

// Export functions
module.exports = { getDestinationsByContinent, addToWishlist, getWishlist };
