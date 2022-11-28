const User = require('../models/user');
const asyncHandler = require('express-async-handler');

const userController = {
  getAllUsers: asyncHandler(async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }),

  getUserById: asyncHandler(async (req, res) => {
    const { email } = req.params;
    try {
      const user = await User.find({ email: email });
      res.json({ dataParams: user }).status(200);
    } catch (error) {
      res.status(500).json(error);
    }
  }),
  updateUserInformation: asyncHandler(async (req, res) => {
    const user = {
      email: req.body.email,
      name: req.body.userName,
      phone: req.body.phone,
    };

    // verify info
    try {
      let result = await User.findOne({
        email: user.email,
      });
      if (result === null) {
        res.status(404).json('Email not exist!');
      }
      await User.updateOne(
        { email: user.email },
        {
          $set: {
            userName: user.name,
            phone: user.phone,
          },
        }
      );
      res.json({
        message: 'User updated!',
      });
    } catch (error) {
      console.log(error);
    }
  }),
  deleteUser: asyncHandler(async (req, res) => {
    try {
      let result = await User.findOne({
        email: req.body.email,
      });
      if (result === null) {
        res.status(404).json('Email not exist!');
      } else {
        await User.remove({ email: result.email });
        res.status(200).json({
          message: 'deleted!',
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  })
}
module.exports = userController;