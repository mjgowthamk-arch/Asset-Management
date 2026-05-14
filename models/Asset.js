// Asset.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Asset = sequelize.define("Asset", {

  assetName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  serialNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false
  },

  model: {
    type: DataTypes.STRING
  },

  value: {
    type: DataTypes.FLOAT
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "AVAILABLE"
  }

});

module.exports = Asset;