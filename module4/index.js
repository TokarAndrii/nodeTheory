const bodyParser = require('body-parser');

const slug = require('slug');

const _ = require('lodash');

const config = require('./config/development.json');

const app = require('express')();
/*same as:const express = require('express')
const app = express();
*/
const USERS = require('./mock-data/users');


app.listen(config.port);

console.log(`listen port ${config.port}`);

app.use((req, res, next) => {
    console.log(`${req.url} --> ${req.method}, Date:${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`);
    next();
});


app.use(bodyParser.json()); //for parsing application/json

app.use(bodyParser.urlencoded({extended: true})); //for parsing application/

/* ******************************************************************* */
//Controllers

//endpoint url + method

//Users - middleware
const getUsers = (req, res, next) => {
    req.users = USERS;
    next();
};

const getOneUser = (req, res, next) => {
    const {index} = req.params;

    req.users = USERS[index];

    req.index = index;//set index for get it at next middleware

    next();
};

const updateUser = (req, res, next) => {
    const user = req.body;

    const newUser = _.merge(req.users, user);

    //get index from getOneUser
    USERS[req.index] = newUser;

    req.users = USERS;

    next();

};

const deleteUser = (req, res, next) => {
    USERS.splice(req.index, 1);
    req.users = USERS;
    next();
};


const sendUsers = (req, res, next) => {
    //test.a = 1; - to see error at app.use()
    res.status(200);
    res.json(req.users);
};


const addUser = (req, res, next) => {
    const user = req.body;
    USERS.push(user);
    req.users = USERS;
    next();
};

//Books - middleware
const getBooks = (req, res, next) => {

    const {index} = req.params;

    console.log(`user index - ${index}`);

    req.books = USERS[index].books;

    next();
};

const addBooks = (req, res, next) => {
    const {index} = req.params;

    const book = req.body;

    console.log(`user index - ${index}`);

    USERS[index].books.push(book);

    req.books = USERS[index].books;

    next();
};

const sendBooks = (req, res, next) => {

    res.status(200);

    res.json(req.books);

    next();
};

const getBookBySlug = (req, res, next) => {

    const {index, title} = req.params;

    const user = USERS[index];

    const books = [...user.books];

    req.books = books.find(current =>
        slug(current.title) === title);

    next();
};

const removeBookBySlug = (req, res, next) => {
    const {index, title} = req.params;

    const user = USERS[index];

    const books = [...user.books];

    let indexRemoval;

    req.books = books.filter(current =>
        slug(current.title) !== title);

    USERS[index].books = req.books;

    req.users = user;

    next();
};

const updateBookBySlug = (req, res, next) => {
    const {index, title} = req.params;

    const updateTo = req.body;

    const user = USERS[index];

    const books = [...user.books];


    const found = books.find(current =>
        slug(current.title) === title);


    const updatedBook = _.merge(found, updateTo);


    req.books = [...USERS[index].books];

    next();
};

/* ******************************************************************* */
//Routes


//Users
app.get('/users/', getUsers, sendUsers);

app.post('/users/', addUser, sendUsers);

app.put('/users/:index', getOneUser, updateUser, sendUsers); //use Lodash _.merge

app.delete('/users/:index', getOneUser, deleteUser, sendUsers);
//app.all('/users/')


//Books
app.get('/users/:index/books', getBooks, sendBooks);

app.post('/users/:index/books', addBooks, sendBooks);

app.put('/users/:index/books/:title', updateBookBySlug, sendBooks);

app.delete('/users/:index/books/:title', removeBookBySlug, sendUsers);

app.get('/users/:index/books/:title', getBookBySlug, sendBooks);


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
