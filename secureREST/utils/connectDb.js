const Sequelize = require('sequelize')

const config = require('../config')

const database = new Sequelize(
    `${config.db.name}`, `${config.db.user}`, `${config.db.password}`,

    {
        host: `${config.db.host}`,

        dialect: `${config.db.dialect}`,

        logging: false,

        operatorsAliases: false
    }
)

database

    .authenticate()

    .then(() => {

        console.log('Connection has been established successfully.')
    })
    .catch(err => {

        console.error('Unable to connect to the database:', err)
    });

module.exports = database
