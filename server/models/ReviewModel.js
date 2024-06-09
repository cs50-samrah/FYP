const mongoose = require('mongoose');


const schema = new mongoose.Schema({

    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        enum: [1,2,3,4,5],
        default: 1
    },
    product: 
        {
            type: mongoose.Types.ObjectId,
            ref: 'product'
        }
    ,
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }

}, { timestamps: true });

const Review = mongoose.model('reviews', schema);

module.exports = Review;