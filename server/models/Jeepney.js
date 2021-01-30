const Sequelize = require("sequelize");
const db = require("../database/database");

const Jeepney = db.define("jeepneys", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  barangayId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  plateNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  jeepCapacity: {
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

module.exports = Jeepney;
