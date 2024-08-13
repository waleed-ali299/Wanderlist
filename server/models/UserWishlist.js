const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Ensure this imports the User model

const UserWishlist = sequelize.define('UserWishlist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', // Ensure this matches the name of the User table
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  // other fields
}, {
  tableName: 'UserWishlists', // Ensure this matches the table name in your DB
  timestamps: false
});

module.exports = UserWishlist;
