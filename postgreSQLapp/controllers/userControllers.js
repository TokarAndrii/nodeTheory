const User = require('../model/user');
const Sequelize = require('sequelize');


module.exports = {

    findAllUsers(req, res, next) {

        User.findAll()


            .then(users => {

                users.length === 0 ? req.users = [] : req.users = users;

                next()
            })

            .catch(err => {
                console.log("some wrong at findAllUsers!", err)
            })


    },


    async send(req, res) {

        res.status(200);

        res.json(req.users)
    },

    findOneByName(req, res, next) {

        User.findOne({where: {firstName: req.params.firstname}})

            .then(users => {

                req.users = users;

                next()
            })

            .catch(err => {
                console.log("some wrong at findAllUsers!", err)
            })


    },

    findOneAndUpdate(req, res, next) {

        User.update({firstName: req.body.firstName},

            {returning: true, where: {firstName: req.params.firstname}})

            .then(updatedUser => {
                req.users = updatedUser;

                next();
            })
            .catch(err => {
                console.log("some wrong at findOneAndUpdate!", err)
            })
    },


    deleteAll(req, res, next) {

        //options.force If set to true, paranoid models will actually be deleted
        User.destroy({

            where: {},

            force: true
        })
            .then(() => {
                console.log('all users are deleted!!!');

                req.users = [];

                next();
            })


            .catch(err => {

                console.log("some wrong at deleteAll!", err)
            })
    },

    deleteOne(req, res, next) {

        User.destroy({

            where: {firstName: req.params.firstname},

            force: true
        })
            .then(() => {
                console.log('user deleted dropped!!!');

                req.users = [];

                next();
            })


            .catch(err => {

                console.log("some wrong at deleteAll!", err)
            })
    },

    createUser(req, res, next) {

        const {id, age, lastName} = req.body;

        req.users = User.bulkCreate([{

            firstName: req.params.firstname,

            lastName: lastName,

            age: age
        }])
            .then(() => {
                console.log('user created!!');
                next();
                return null;
            })
            .catch(err => {

                console.log("some wrong at deleteAll!", err)
            })
    }

};
