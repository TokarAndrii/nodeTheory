const passport = require('passport')

const User = require('../model/user')

const LocalStrategy = require('passport-local').Strategy

const express = require('express')

const router = express.Router()

const {sendLoginPage, sendMainPage, getFormDataLogin, send} = require('../controllers/basicControllers')

const {saveUserToDb, findUser} = require('../controllers/userControllers')

router.get('/', sendLoginPage, send)

router.post('/', findUser, sendMainPage, send)
/*
router.post('/', passport.authenticate('local',

    {successRedirect: '/', failureRedirect: '/login'})
)
*/


module.exports = router