const router = require('express').Router();
const authController = require ('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.logIn);
/*router.post('/forgetPassword',authController.forgetPassword);
router.post('/reset-password/:id/:resetLink',authController.ResetPassword);*/

module.exports = router;