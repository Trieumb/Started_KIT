const authentication = require('../middleware/authenticate');
const userController = require('../controllers/userController');

const route = require('express').Router();

route.get('/', authentication.verifyToken , userController.getAllUsers);
route.get('/:id', authentication.verifyToken, userController.getUserById);
route.put('/update', authentication.verifyToken, userController.updateUserInformation)
route.delete('/delete', authentication.verifyToken, userController.deleteUser);


module.exports = route; 