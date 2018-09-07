const Sequelize = require('sequelize');

const config = require('../config');

const sequelize = new Sequelize(
    `${config.db.name}`,

    `${config.db.user}`,

    `${config.db.password}`,

    {
        host: `${config.db.host}`,

        dialect: `${config.db.dialect}`,

        operatorsAliases: false,

        // disable logging; default: console.log
        logging: false
    }
);

sequelize.authenticate()

    .then(() => {
        console.log('Connection has been established successfully.');
        return 'Connection has been established successfully';
    })

    .catch(err => console.error('Unable to connect to the database:', err));

module.exports.sequelize = sequelize;
