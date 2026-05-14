// Scrap.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Scrap = sequelize.define("Scrap", {

  assetName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  reason: {
    type: DataTypes.STRING,
    allowNull: false
  }

});

module.exports = Scrap;