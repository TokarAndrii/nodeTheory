const express = require('express');

const router = express.Router();

const {
    findAllUsers, send, findOneByName, findOneAndUpdate, deleteAll,
    deleteOne, createUser} = require('../controllers/userControllers');

router.get('/', findAllUsers, send); //GET ALL USERS  http://localhost:8080/users

router.get('/:firstname', findOneByName, send); //GET USER BY PARAM, GET http://localhost:8080/users/Tyrion

router.put('/:firstname', findOneAndUpdate, send); //UPDATE USER BY PARAM, PUT http://localhost:8080/users/Jorah raw {"firstName": "NewName"} and set application/json

router.delete('/', deleteAll, send); //DELETE ALL USERS DELETE http://localhost:8080/users

router.delete('/:firstname', deleteOne, findAllUsers, send); //DELETE USER BY PARAM  DELETE http://localhost:8080/users/Jorah

router.post('/:firstname', createUser, findAllUsers, send); //CREATE USER BY PARAM, POST http://localhost:8080/users/HUNTELAAR raw {"lastName": "someLastName", "age": 10} and set application/json


module.exports = router;