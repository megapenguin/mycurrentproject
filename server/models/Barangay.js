const Sequelize = require("sequelize");
const db = require("../database/database");

const Barangay = db.define("barangays", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  barangayName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  barangayDescription: {
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

module.exports = Barangay;
