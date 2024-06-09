const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    cat_name : String,
    isActive : {
        type : Boolean,
        default : true
    },
    thumbnail : String,
} , { timestamps: true });

const Category = mongoose.model('category', schema);

module.exports = Category;