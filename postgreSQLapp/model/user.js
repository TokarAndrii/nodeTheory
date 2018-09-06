const {sequelize} = require('../utils/connect');

const Sequelize = require('sequelize');


const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
    age: {
        type: Sequelize.INTEGER
    }
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
    return User.bulkCreate([
        {
            firstName: 'Tyrion',

            lastName: 'Lannister',

            age: 25
        },
        {
            firstName: 'Barristan',

            lastName: 'Selmy',

            age: 45
        },
        {
            firstName: 'Daenerys',

            lastName: 'Targaryen',

            age: 18
        },
        {
            firstName: 'Jorah',

            lastName: 'Mormont',

            age: 40
        },

        {
            firstName: 'Davos',

            lastName: 'Seaworth',

            age: 55
        },

        {
            firstName: 'House',

            lastName: 'Stark',

            age: 14
        },

        {
            firstName: 'Samwell',

            lastName: 'Tarly',

            age: 19
        },

    ]

);

});

module.exports = User;