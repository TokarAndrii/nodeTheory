const express = require('express');

const router = express.Router();

const {getGreeting, getAllUsers, sendUser} = require('../controllers/index');

router.get('/', getGreeting, getAllUsers, sendUser);


module.exports = router;