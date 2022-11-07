const express = require ('express');
const router = express.Router ();
const authController = require('../controllers/authController');
const authentication = require('../middleware/authenticate');

router.post ('/register', authController.registerUser );
router.post ('/login', authController.loginUser );
router.post('/logout', authentication.verifyToken, authController.logoutUser);
 

module.exports = router;
