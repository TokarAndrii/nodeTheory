const User = require('../model/user');

User.create({
    firstName: "Andrii",
    secondName: "Tokar",
    age: 35,
    date: Date.now(),
    maritalStatus: true,
    position: "developer",
    comments: "some comments"
})

module.exports = {

    async sendUser(req, res, next) {

        const {users, greeting} = req;

        res.json({

            users: users,

            greeting: greeting
        });
    },

    async getAllUsers(req, res, next) {

        const users = await User.find();

        console.log(users, 'users find');

        req.users = users;

        next();
    },

    getGreeting(req, res, next) {
        res.status(200);

        const greeting = {

            date: Date.now(),

            message: "Hello from my app, user:"
        };

        req.greeting = {greeting};

        next();
    }

};

