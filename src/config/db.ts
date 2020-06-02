const Sequelize = require("sequelize");

import CONFIG from "./config";

module.exports = new Sequelize(CONFIG.DB_NAME, CONFIG.DB_USER, CONFIG.DB_PASSWORD, {
  dialect: CONFIG.DB_DIALECT,
  host: CONFIG.DB_HOST,
  port: CONFIG.DB_PORT
});