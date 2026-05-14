// Category.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define("Category", {
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Category;