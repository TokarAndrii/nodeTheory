const bodyParser = require('body-parser');

const config = require('./config');

const app = require('express')();

const userRouter = require('./routes/userRoutes');

const connect = require('./utils/connect');


console.log(process.env.NODE_ENV, ' - process.env.NODE_ENV');


app.use(bodyParser.json());                     //for parsing application/json

app.use(bodyParser.urlencoded({extend: true})); // for parsing application/x-www-form-urlencoded


app.use('/users/', userRouter);


//Not found error
app.use((req, res, next) => {

    const error = new Error('404 Not Found!');

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

if (!module.parent) {

    app.listen(config.port, () => {

        console.log(`SERVER IS STARTED AT PORT: ${config.port}`)
    });

}

module.exports = app;



