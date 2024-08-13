const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Continent = sequelize.define('Continent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Continents', // Ensure this matches the table name in your DB
  timestamps: false
});

module.exports = Continent;
