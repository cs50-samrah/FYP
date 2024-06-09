const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product Title Required!!"]
    },
    rent_price: {
        type: Number,
        required: [true, "Product Rent Price Required"]
    },
    purchase_price: { type: Number, required: [true, "Product Price Required"] },
    discount: Number,
    thumbnail: { type: String, required: [true, "Product Thumbnail Image Required!!"] },
    images: [String],
    description: { type: String, default: '' },
    brand: { type: String, required: [true, "Product Brand Required!!"] },
    qty: Number,
    categories: {
        type: String
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    onSale: {
        type: Boolean,
        default: false,
    },
    publisher: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }

}, { timestamps: true });

const Product = mongoose.model('product', schema);

module.exports = Product;