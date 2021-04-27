const Sequelize = require("sequelize");
const db = require("../database/database");

const Title = db.define("titles", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  title: {
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

module.exports = Title;
