const Sequelize = require("sequelize");
const db = require("../database/database");

const Driver = db.define("drivers", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  middleName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  contactNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  generatePassword: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  email: {
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

module.exports = Driver;
