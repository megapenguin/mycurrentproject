const Sequelize = require("sequelize");
const db = require("../database/database");

const Instruction = db.define("instructions", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  titleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  stepNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  stepInstruction: {
    type: Sequelize.TEXT("long"),
    allowNull: false,
    unique: true,
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

module.exports = Instruction;
