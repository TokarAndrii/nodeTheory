const express = require('express')

const router = express.Router()

const {sendMainPage, send} = require('../controllers/basicControllers')

router.get('/',sendMainPage, send)

module.exports = router