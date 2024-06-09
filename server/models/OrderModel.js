const mongoose = require('mongoose');


const schema = new mongoose.Schema({

    orderid: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        required: true,
    },
    total_amount: {
        type: Number,
        required: true
    },
    shipping_address: {
        type: Object,
        required: true
    },
    contact: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'canceled'],
        default: 'pending'
    },
    delivery_status: {
        type: String,
        enum: ['pending', 'shipping', 'delivered'],
        default: 'pending'
    },
    products: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'product'
        }
    ],
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }

}, { timestamps: true });

const Order = mongoose.model('orders', schema);

module.exports = Order;