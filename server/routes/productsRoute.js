const router = require('express').Router();
const productController = require('../controllers/ProductsController')



router.get('/all' , productController.getProducts )
router.get('/:id', productController.getProduct)


module.exports = router