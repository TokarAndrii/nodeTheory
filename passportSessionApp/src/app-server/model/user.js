const mongoose = require('mongoose');


const UserShema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },

    email: {
        type: String,
        require: true,
        trim: true
    }

});

module.exports = mongoose.model("users",UserShema);