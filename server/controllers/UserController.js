const User = require('../models/UserModel');
const Product = require('../models/ProductModel');
const Wishlist = require('../models/WishlistModel');


exports.getUser = async (req, res) => {
    console.log(`req.user : ${req.user}`);
    const user = await User.findOne({ _id: req.user }, { password: 0, confirmPassword: 0 });
    res.json({
        status: true,
        user
    })
}
exports.updateUser = async (req, res) => {
    console.log(req.body)
    const user = await User.updateOne({ _id: req.user }, {
        $set: req.body
    }, { new: true });
    res.json({
        status: true,
        user
    })
}

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create({
            ...req.body,
            publisher: req.user
        })
        res.json({ status: true, product })

    } catch (err) {
        res.json({ status: false, message: err.message })

    }
}

exports.myProdutcs = async (req, res) => {
    try {
        const products = await Product.find({ publisher: req.user })
            .populate({
                path: 'publisher',
                select: '-password -confirmPassword -__v -updatedAt -dob',
            })
            .limit(20);
        res.json({ status: true, products })
    } catch (err) {
        res.json({ status: false, message: err.message })
    }
}
exports.removeProduct = async (req , res) =>{
    try{
        const stat = await Product.deleteOne({ _id : req.body.id , publisher : req.user })
        res.json({status : true , stat})
    }catch(err){
        res.json({status : false , message : err.message})
    }
}



exports.getWishList = async (req, res) =>{
    try {
        const wishlists = await Wishlist.find({ user: req.user }).populate({
            path: 'products',
            populate: {
              path: 'publisher',
              model: 'users',
              select: 'id firstName lastName email'
            }
        });

        const products = wishlists.flatMap(wishlist => wishlist.products);

        res.json({status : true , wishlists : products})
    } catch (error) {
        res.json({status : false , message : error.message})
    }
}
exports.addtoWishList = async (req, res) =>{
    try {
        const userId = req.user; 
        const productId = req.body.productId; 
    
        const wishlist = await Wishlist.findOne({ user: userId });
    
        if (wishlist) {
            // User record exists, check if the product ID already exists in the wishlist
            if (wishlist.products.includes(productId)) {
              return res.json({ status: false, message: 'Product already in wishlist' });
            }
      
            // Product ID doesn't exist, update the wishlist
            await Wishlist.findByIdAndUpdate(wishlist._id, {
              $push: { products: productId }
            });
          } else {
            // User record doesn't exist, create a new wishlist
            await Wishlist.create({
              user: userId,
              products: [productId]
            });
          }
      
          res.json({ status: true, message: 'Product added to wishlist' });

    } catch (error) {
        res.json({status : false , message : error.message})
    }
}

exports.removeProductFromWishlist = async (req, res) => {
    try {
      const userId = req.user;
      const productId = req.params.productId;
  
      // Find the wishlist for the given user
      const wishlist = await Wishlist.findOne({ user: userId });
  
      // Remove the product from the wishlist
      wishlist.products.pull(productId);
      await wishlist.save();
  
      res.json({ status: true, message: 'Product removed from wishlist successfully' });
    } catch (error) {
      res.json({ status: false, message: error.message });
    }
  };