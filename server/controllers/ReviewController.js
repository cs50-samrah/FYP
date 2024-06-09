const Review = require('../models/ReviewModel');

exports.createReview = async (req, res) => {
    try {
        const review = await Review.create({ ...req.body, user: req.user });
        res.status(201).json({
            status: true,
            message: 'Review created successfully',
            review
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
}


exports.getReview = async (req, res) => {
    try {
        const review = await Review.find({ product: req.params.id }).populate('user');
        if (review.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'Review not found'
            });
        }
        res.status(200).json({
            status: true,
            message: 'Review found',
            review
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
}

exports.getTopReviews = async (req, res) => {
    try {
        const reviews = await Review.find({
            rating: { $gt: 3 }
        })
            .limit(3)
            .populate('user');
        if (reviews.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'Reviews not found'
            });
        }
        res.status(200).json({
            status: true,
            message: 'Reviews found',
            reviews
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
}
