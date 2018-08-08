const app = require('express')();
/*
same as:
const express = require('express')
const app = express();
*/

const config = require('./config/development.json');

app.listen(config.port);
console.log(`listen port ${config.port}`);

//Controller
//endpoint url + method
const getUsers = (req, res, next) => {
    req.users = [
        {
            username: "user1",
            password: "pass1"
        },
        {
            username: "user2",
            password: "pass2"
        },
        {
            username: "user3",
            password: "pass3"
        },
        {
            username: "user4",
            password: "pass4"
        },
    ];

    next();
};

//Controllers
const sendUsers = (req, res, next) => {
    //test.a = 1; - to see error at app.use()
    res.status(200);
    res.json(req.users);
};

app.use((req, res, next) => {
    console.log(`${req.url} --> ${req.method}, Date:${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`);
    next();
});


app.get('/users/', getUsers, sendUsers);
//getUsers - middleware

app.post('/users/');
app.put('/users/');
app.delete('/users/');
//app.all('/users/')


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
