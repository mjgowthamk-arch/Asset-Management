// Return.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Return = sequelize.define("Return", {
  employeeName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  assetName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  reason: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Return;