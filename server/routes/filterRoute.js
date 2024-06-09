const router = require('express').Router();
const filterCtrl = require('../controllers/filterController');


router.get('/:category', filterCtrl.getProductsbyCategory)
router.get('/search/:search', filterCtrl.searchProduct)
router.get('/price/:minPrice/:maxPrice', filterCtrl.getProductsByPrice)

module.exports = router;