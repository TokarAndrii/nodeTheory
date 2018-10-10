const express = require('express')

const router = express.Router()

const {sendProfilePage, send} = require('../controllers/basicControllers')

router.get('/',sendProfilePage, send)

module.exports = router