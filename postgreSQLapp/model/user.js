const {sequelize} = require('../utils/connect');

const Sequelize = require('sequelize');


const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true

    },
    lastName: {
        type: Sequelize.STRING,
    },
    age: {
        type: Sequelize.INTEGER
    }
});


module.exports = User;

