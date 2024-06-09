const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    brand_name : String,
    isActive : {
        type : Boolean,
        default : true
    }
} , { timestamps: true });

const Brand = mongoose.model('brand', schema);

module.exports = Brand;