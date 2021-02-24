const Sequelize = require("sequelize");
const db = require("../database/database");

const Funfact = db.define("funfacts", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  smImagePath: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  mdImagePath: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  lgImagePath: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = Funfact;
