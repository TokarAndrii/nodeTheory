const User = require('../model/user')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

module.exports = {

    async saveUserToDb(req, res, next) {
        console.log('receiving data...');
        const {userName, userPass, userEmail} = req.body

        const saltRounds = 10
        await bcrypt.hash(userPass, saltRounds, function (err, hash) {
            // Store user credential and hash in your DB.
            const userToDb = new User({name: userName, password: hash, email: userEmail})
            User.create(userToDb)
        });
        next()
    },


    async findUser(req, res, next) {
        try {
            const {userName, userPass} = req.body
            console.log(userName, '- userName; ', userPass, "- userPass")
            if (userName && userPass) {
                //... fetch user from a db etc.
                const foundUser = await User.findOne({name: userName})
                console.log(foundUser, ' - foundUser')
                const match = await bcrypt.compare(userPass, foundUser.password);
                if (match) {
                    //login
                    req.login(foundUser.id, function(err) {
                        if (err) { return next(err); }
                        return next();
                    })
                    console.log('pass correct')
                    //send info data to user about success
                    next()
                }
                else {
                    //redirect to login page again and send info data to user
                    console.log('pass incorrect')
                    next(new Error('pass entered is not correct'))
                }
            }
            else {
                //redirect to login page again and send info name or pass not inputed
                next(new Error('not entered name or pass'))
            }
        }
        catch (err) {
            next(err)
        }

    }
}

passport.serializeUser(function (user_id, done) {
    done(null, user_id);
})

passport.deserializeUser(function (user_id, done) {
        done(null, user_id);
})