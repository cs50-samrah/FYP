const router = require('express').Router();
const revCtrl = require('../controllers/ReviewController');
router.get('/', revCtrl.getTopReviews);
module.exports = router;