const Product = require('../models/ProductModel')
const User = require('../models/UserModel')
const Brand = require('../models/BrandModel')
const Category = require('../models/CategoryModel')
const Order = require('../models/OrderModel')



exports.adminGetAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.json({
            status: true,
            orders
        })
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}

exports.adminUpdateOrder = async (req, res) => {
    try {
        const stat = await  Order.updateOne({ _id: req.params.id }, { $set: req.body })
        res.json({ status: true, stat })

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}


// Stats

exports.getStats = async (req, res) => {
    try {
        const users = await User.find({}).countDocuments();
        const products = await Product.find({}).countDocuments();
        const brands = await Brand.find({}).countDocuments();
        const categories = await Category.find({}).countDocuments();
        const orders = await Order.find({}).countDocuments();
        const orderscompleted = await Order.find({ status : 'approved' , delivery_status : 'delivered' }).countDocuments();
        res.json({
            users,
            products,
            brands,
            categories,
            orders,
            orderscompleted,
            status: true
        })
    } catch (err) {
        res.json({ status: false, message: err.message })
    }
}

// Users
exports.getUsers = async (req, res) => {
    try {
        const page = Number(req.query.page)
        const skip = (page - 1 || 0) * 20;
        const users = await User.find({}, { password: 0, confirmPassword: 0 })
            .limit(20)
            .skip(skip);
        res.json({
            users,
            status: true,
            currentPage: page ?? 1,
            nextPage: (page + 1) ?? 2
        })
    } catch (err) {
        res.json({ status: false, message: err.message })
    }
}

exports.removeUser = async (req, res) => {
    try {
        const stat = await User.deleteOne({ _id: req.params.id })
        res.json({ status: true, stat })
    }catch (err) {
        res.json({ status: false, message: err.message })
    }
}
// Products
exports.getProducts = async (req, res) => {
    try {
        const page = Number(req.query.page)
        const skip = (page - 1 || 0) * 20;
        const products = await Product.find()
            .populate({
                path: 'publisher',
                select: '-password -confirmPassword -__v -updatedAt -dob',
            })
            .limit(20)
            .skip(skip);
        res.json({
            products,
            status: true,
            currentPage: page ?? 1,
            nextPage: (page + 1) ?? 2
        })
    } catch (err) {
        res.json({ status: false, message: err.message })
    }
}
exports.updateProduct = async (req, res) => {
    const stat = await Product.findByIdAndUpdate(req.body.id, { ...req.body })
    res.json({ status: true, stat })
}
exports.removeProduct = async (req, res) => {
    const stat = await Product.deleteOne({ _id: req.body.id })
    res.json({ status: true, stat })
}

// Brand Controller 
exports.createBrand = async (req, res) => {
    console.log(req.body)
    try {
        const brand = await Brand.create(req.body)
        res.json({ status: true, brand })
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}
exports.getBrands = async (req, res) => {
    const brands = await Brand.find()
    res.json({ status: true, brands })
}
exports.updateBrand = async (req, res) => {
    try {
        const brand = await Brand.findByIdAndUpdate(req.body.id, { ...req.body })
        res.json({ status: true, brand })
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}
exports.removeBrand = async (req, res) => {
    const brand = await Brand.deleteOne({ _id: req.params.id })
    res.json({ status: true, brand })
}
// Category Controller
exports.createCategory = async (req, res) => {
    const category = await Category.create(req.body)
    res.json({ status: true, category })
}
exports.getCategories = async (req, res) => {
    const categories = await Category.find()
    res.json({ status: true, categories })
}
exports.updateCategory = async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.body.id, { ...req.body })
    res.json({ status: true, category })
}
exports.removeCategory = async (req, res) => {
    const category = await Category.deleteOne({ _id: req.params.id })
    res.json({ status: true, category })
}