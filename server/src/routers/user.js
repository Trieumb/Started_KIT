const authentication = require('../middleware/authenticate');
const userController = require('../controllers/userController');

const route = require('express').Router();

route.get('/', authentication.verifyToken , userController.getAllUsers);
route.delete('/:id', authentication.verifytokenAdmin, userController.deleteUser);


module.exports = route;