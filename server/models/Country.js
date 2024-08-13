const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Continent = require('./Continent'); // Make sure to import the Continent model

const Country = sequelize.define('Country', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  continent_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Continents', // Ensure this matches the name of the Continent table
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  image_url: {
    type: DataTypes.STRING, // Assuming image_url is a string
    allowNull: true // Make it nullable if not every country has an image
  }
}, {
  tableName: 'Countries', // Ensure this matches the table name in your DB
  timestamps: false
});

module.exports = Country;
