const sequelize = require('../config/database');
const Continent = require('./Continent');
const Country = require('./Country');
const User = require('./User');
const UserWishlist = require('./UserWishlist');

// Define associations after importing all models
Continent.hasMany(Country, { foreignKey: 'continent_id', as: 'countries' });
Country.belongsTo(Continent, { foreignKey: 'continent_id', as: 'continent' });

Country.hasMany(UserWishlist, { foreignKey: 'country_id', as: 'userWishlists' });
UserWishlist.belongsTo(Country, { foreignKey: 'country_id', as: 'country' });

User.hasMany(UserWishlist, { foreignKey: 'user_id', as: 'userWishlists' });
UserWishlist.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = {
  sequelize,
  Continent,
  Country,
  User,
  UserWishlist
};
