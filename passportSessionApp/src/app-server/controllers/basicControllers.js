const path = require("path");


module.exports = {

    sendMainPage(req, res, next) {
        console.log('sendMainPage...');

        //res.status(200);

        res.sendFile('index.html', {root: path.join(__dirname, '../view/')})

        //next()

    },

    sendLoginPage(req, res, next) {
        console.log('sendLoginPage...');

        //res.status(200);

        res.sendFile('login.html', {root: path.join(__dirname, '../view/')})

        next()

    },

    sendRegPage(req, res, next) {
        console.log('sendLoginPage...');

        //res.status(200);

        res.sendFile('registration.html', {root: path.join(__dirname, '../view/')})

        next()

    },

    send(req, res) {

        res.status(200);

    },

    sendAboutPage(req, res, next) {

        //res.status(200);

        res.sendFile('about.html', {root: path.join(__dirname, '../view/')})

        //next()

    },

    getFormDataLogin(req, res, next) {

       next()
    },


    sendProfilePage(req, res, next) {

        //res.status(200);

        res.sendFile('profile.html', {root: path.join(__dirname, '../view/')})

        //next()

    },


}
