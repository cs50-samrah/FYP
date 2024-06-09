const Product = require('../models/ProductModel')



exports.getProducts = async (req , res) => {
    try {
        const page = Number(req.query.page)
        const skip = (page - 1 || 0) * 20;
        const products = await Product
            .find({ isPublished : true })
            .populate({
                path: 'publisher',
                select: '-password -confirmPassword -__v -updatedAt',
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


exports.getProduct = async (req, res) =>{
    try {
        const product = await Product.findById(req.params.id);
        res.json({
            product,
            status: true,
        })
    } catch (error) {
        res.json({ status: false, message: error.message })
    }
}