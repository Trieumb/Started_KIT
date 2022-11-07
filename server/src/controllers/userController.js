const User = require('../models/user');
const asyncHandler = require ('express-async-handler');

const userController = {
    getAllUsers: asyncHandler(async(req, res) => {
        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }),

    deleteUser: asyncHandler(async(req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Delete sucessfully!');
        } catch (error) {
            res.status(500).json(error);
        }
    })
}
module.exports = userController;