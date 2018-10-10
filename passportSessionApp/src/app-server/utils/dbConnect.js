const mongoose = require('mongoose')

const pass = process.env.DB_PASSWORD.length ?

    `:${process.env.DB_PASSWORD}` : ''

const auth = process.env.DB_USER.length ?

    `${process.env.DB_USER}${pass}@` : ""


module.exports =  mongoose.connect(`mongodb://${auth}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,

    {useNewUrlParser: true}, () => {

        console.log('mongoose connected to db')

    })