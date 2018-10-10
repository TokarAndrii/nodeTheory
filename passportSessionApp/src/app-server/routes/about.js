const express = require('express')

const router = express.Router()

const {sendAboutPage, send} = require('../controllers/basicControllers')

router.get('/',sendAboutPage, send)

module.exports = router