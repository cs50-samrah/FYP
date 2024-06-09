const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String,
    confirmPassword: String,
    address: String,
    avatar: String,
    dob: String,
    isBanned : {
        type : Boolean,
        default : false
    }
} , { timestamps: true });

const User = mongoose.model('users', schema);

module.exports = User;