const Sequelize = require("sequelize")
const db = require("../database/database")

const Image = db.define("images", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  imageOwnerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  imageReferenceId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  imagePath: {
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
})

module.exports = Image
