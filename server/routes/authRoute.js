const router = require('express').Router();
const regCtrl = require('../controllers/AuthController');


router.post('/register', regCtrl.register);
router.post('/login', regCtrl.login);




module.exports = router;