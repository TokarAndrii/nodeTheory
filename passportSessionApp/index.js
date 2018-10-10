const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

require('dotenv').config()
require("./src/app-server/utils/dbConnect")

const router = require('./src/app-server/routes/basicRouter')
const aboutRouter = require('./src/app-server/routes/about')
const loginRouter = require('./src/app-server/routes/login')
const registrationRouter = require('./src/app-server/routes/register')
const profileRouter = require('./src/app-server/routes/profile')

const authMiddleware = require('./src/app-server/controllers/authController')
const config = require('./src/app-server/config')
const {connect} = require('./src/app-server/utils/dbConnect')
const User = require('./src/app-server/model/user')

//Auth package
const session = require('express-session')
//const cookieParser = require('cookie-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const MongoDBStore = require('connect-mongodb-session')(session)


const app = express()
// view engine setup
app.set('views', path.join(__dirname, 'view'));

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({extend: true})) // for parsing application/x-www-form-urlencoded


const pass = process.env.DB_PASSWORD.length ?
    `:${process.env.DB_PASSWORD}` : ''
const auth = process.env.DB_USER.length ?
    `${process.env.DB_USER}${pass}@` : ""

const sessionStore = new MongoDBStore({
    uri: `mongodb://${auth}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    collection: 'mySessions'
});

//app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


app.use(session({
    secret: 'ekdqx5a6p2',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
    //cookie: { secure: true }
}))
app.use(passport.initialize())
app.use(passport.session())


passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({username: username}, function (err, user) {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false, {message: 'Incorrect username.'})
            }
            if (!user.validPassword(password)) {
                return done(null, false, {message: 'Incorrect password.'})
            }
            return done(null, 'user');
        })
    }
))


app.use('/', router)
app.use('/about', aboutRouter)
app.use('/login', loginRouter)

/*app.use('/login', passport.authenticate('local',

    {successRedirect: '/', failureRedirect: '/login'}))*/

app.use('/registration', registrationRouter)
app.use('/profile', authMiddleware(), profileRouter)


//Not found error
app.use((req, res, next) => {
    const error = new Error('404 Page Not Found!')
    next(error);
})

//All error
app.use((err, req, res, next) => {
    res.status(500);
    res.json({
        error: err.message,
        stack: err.stack
    });
    //console.error(err.stack)
})

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

app.listen(config.port, () => {
    console.log(`SERVER IS STARTED AT PORT: ${config.port}`)
})


