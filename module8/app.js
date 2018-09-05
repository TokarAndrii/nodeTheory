const bodyParser = require('body-parser');

const userRoute = require('./routes/users');

const app = require('express')();

const config = require('./config');

const connect = require('./utils/connect');

app.use(bodyParser.json());                     //for parsing application/json

app.use(bodyParser.urlencoded({extend: true})); // for parsing application/x-www-form-urlencoded

console.log(process.env.NODE_ENV);

app.use("/users/", userRoute);


if (!module.parent) {

    app.listen(config.port, () => {

        console.log(`SERVER IS STARTED AT PORT: ${config.port}`)
    });

}

module.exports = app;






