const express = require('express')

const router = express.Router()

const {sendRegPage,sendLoginPage, sendMainPage, send} = require('../controllers/basicControllers')

const {saveUserToDb} = require('../controllers/userControllers')

router.get('/', sendRegPage, send)

router.post('/', saveUserToDb,sendLoginPage, send)


module.exports = router