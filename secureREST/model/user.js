const database = require('../utils/connectDb')

const Sequelize = require('sequelize')

const User = database.define('users', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true

  },
  lastName: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  }
})

module.exports = User
