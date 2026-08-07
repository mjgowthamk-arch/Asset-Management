// database.js

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("asset_db", "postgres", "user", {
  host: "localhost",
  dialect: "postgres"
});

module.exports = sequelize; 