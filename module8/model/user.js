const mongoose = require('mongoose');


const UserShema = new mongoose.Schema({
    firstName: {
        type: String,
        unique: true,
        require: true,
    },
    secondName: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        min: 18, max: 65,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    maritalStatus: {
        Boolean,
        default: false,
    },

    position: {
        type: String,
        require: true,
    },

    comments: String,

});

module.exports = mongoose.model("users",UserShema);