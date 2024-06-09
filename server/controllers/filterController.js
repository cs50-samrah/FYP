const Product = require('../models/ProductModel')



exports.getProductsbyCategory = async (req, res) => {
    try {
        const page = Number(req.query.page)
        const skip = (page - 1 || 0) * 20;
        const products = await Product
            .find(
                {
                    $or: [
                        { categories: { $regex: req.params.category, $options: 'i' } },
                    ]
                })
            .populate({
                path: 'publisher',
                select: '-password -confirmPassword -__v -updatedAt',
            })
            .limit(20)
            .skip(skip);

        res.json({ status: true, products, page, nextPage: (page + 1) ?? 2 })

    } catch (err) {
        res.json({ status: false, message: err.message })
    }

}

exports.getProductsByPrice = async (req, res) => {
    try {

        const minPrice = req.params.minPrice;
        const maxPrice = req.params.maxPrice;

        const page = Number(req.query.page)
        const skip = (page - 1 || 0) * 20;
        const products = await Product
            .find({
                $or :[
                    { rent_price: { $gte: minPrice, $lte: maxPrice } },
                    { purchase_price: { $gte: minPrice, $lte: maxPrice } },
                ]
            })
            .populate({
                path: 'publisher',
                select: '-password -confirmPassword -__v -updatedAt',
            })
            .limit(20)
            .skip(skip);
        res.json({ status: true, products, page, nextPage: (page + 1) ?? 2 })

    } catch (err) {
        res.json({ status: false, message: err.message })
    }
}

exports.searchProduct = async (req, res) => {
    try {
        const page = Number(req.query.page)
        const skip = (page - 1 || 0) * 20;
        const products = await Product
            .find({ title: { $regex: req.params.search, $options: 'i' } })
            .populate({
                path: 'publisher',
                select: '-password -confirmPassword -__v -updatedAt',
            })
            .limit(20)
            .skip(skip);
        res.json({ status: true, products, page, nextPage: (page + 1) ?? 2 })

    } catch (err) {
        res.json({ status: false, message: err.message })
    }
}
