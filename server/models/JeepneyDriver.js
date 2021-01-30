const Sequelize = require("sequelize");
const db = require("../database/database");

const JeepneyDriver = db.define("jeepneydrivers", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  driverId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  jeepneyId: {
    type: Sequelize.INTEGER,
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

module.exports = JeepneyDriver;
