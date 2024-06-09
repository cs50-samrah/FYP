const router = require('express').Router()
const AdminController = require('../controllers/AdminController')
const OrderCtrl = require('../controllers/OrderController')


router.get('/stats', AdminController.getStats)


router.delete('/remove/user/:id',AdminController.removeUser)

router.get('/products' , AdminController.getProducts)
router.get('/users',AdminController.getUsers)
router.post('/update/product', AdminController.updateProduct)
router.post('/remove/product', AdminController.removeProduct)

router.get('/brands',AdminController.getBrands)
router.post('/add/brand', AdminController.createBrand)
router.put('/update/brand',AdminController.updateBrand)
router.delete('/remove/brand/:id',AdminController.removeBrand)

router.get('/categories',AdminController.getCategories)
router.post('/add/category',AdminController.createCategory)
router.put('/update/category',AdminController.updateCategory)
router.delete('/remove/category/:id',AdminController.removeCategory)


router.get('/orders', AdminController.adminGetAllOrders)
router.put('/order/:id', AdminController.adminUpdateOrder)

module.exports = router