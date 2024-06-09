const mongoose = require('mongoose');


const schema = new mongoose.Schema({

    products: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'product'
        }
    ],
    user : {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }

}, { timestamps: true });

const Wishlist = mongoose.model('wishlist', schema);

module.exports = Wishlist;