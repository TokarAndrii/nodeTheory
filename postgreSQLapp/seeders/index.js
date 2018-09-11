const connect = require('../utils/connect');
const User = require('../model/user');
const userList = require('../utils/userList');

// force: true will drop the table if it already exists
//module.exports.create = User.sync({force: true}).then(() => {
const seedFunction = async function () {
    try {
        await User.bulkCreate(userList)
    }

    catch (err) {
        console.log(err)
    }
};

module.exports = seedFunction;