const router = require('express').Router();
const userCtrl = require('../controllers/UserController');
const orderCtrl = require('../controllers/OrderController')
const reviewCtrl = require('../controllers/ReviewController')
const authMiddleware = require('../middleware/auth');


router.get('/', authMiddleware, userCtrl.getUser);
router.post('/update', authMiddleware, userCtrl.updateUser)
router.post('/create/product', authMiddleware, userCtrl.createProduct)
router.post('/remove/product', authMiddleware, userCtrl.removeProduct)
router.get('/products',authMiddleware , userCtrl.myProdutcs)

router.get('/wishlist', authMiddleware, userCtrl.getWishList)
router.post('/wishlist', authMiddleware, userCtrl.addtoWishList)
router.delete('/wishlist/:productId', authMiddleware, userCtrl.removeProductFromWishlist)



router.get('/orders', authMiddleware, orderCtrl.userGetAllOrders)
router.post('/order', authMiddleware, orderCtrl.userCreateOrder)
router.put('/order/cancel/:id', authMiddleware, orderCtrl.userCancelOrder)



router.get('/reviews/:id', authMiddleware, reviewCtrl.getReview)
router.post('/review', authMiddleware, reviewCtrl.createReview)

module.exports = router;