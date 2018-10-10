const bodyParser = require('body-parser')

const authMiddleware = require('./controllers/auth')

require('dotenv').config()

//const epilogue = require('epilogue')

const {promisify} = require('util')

//http = require('http')

const config = require('./config')

const database = require('./utils/connectDb')

const User = require('./model/user')

const userRouter = require('./routes/userRouter')

const express = require('express')

const app = express();

app.use(bodyParser.json()) // for parsing application/json

app.use(bodyParser.urlencoded({extend: true})) // for parsing application/x-www-form-urlencoded

app.use(authMiddleware)

app.use('/users/', userRouter)

//Not found error
app.use((req, res, next) => {

    const error = new Error('404 Not Found!')

    next(error);
});

//All error
app.use((err, req, res, next) => {

    res.status(500);

    res.json({

        error: err.message,

        stack: err.stack
    });

    console.error(err.stack)
});



/*const startServer = async () => {
    // const port = process.env.SERVER_PORT || 3000

    await promisify(app.listen).bind(app)(config.port)

    console.log(`The App is listening on port ${config.port}`)
}*/




/*epilogue.initialize({app: app, sequelize: database})


const userResourse = epilogue.resource({

    model: User,

    endpoints: ['/users', 'users/:id']
})*/

database
    .sync({force: true})
    .then(function () {

        app.listen(config.port, () => {

            console.log(`SERVER IS STARTED AT PORT: ${config.port}`)
        });
    })






