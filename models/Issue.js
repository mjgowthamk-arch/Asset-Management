// Issue.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Issue = sequelize.define("Issue", {
  employeeName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  assetName: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Issue;