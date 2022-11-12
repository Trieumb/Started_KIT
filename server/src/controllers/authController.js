const bcrypt = require ('bcrypt');
const asyncHandler = require ('express-async-handler');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require ('dotenv');
let fs = require("fs");

dotenv.config ();

const authController = {
  // register
  registerUser: asyncHandler(async (req, res) => {
    try {
      const satl = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, satl);

      const newUser = await new User ({
        userName: req.body.userName,
        email:req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        password: hashed,
      });

     const user =  await newUser.save();
      res.status(200).json(user);
      
    } catch (err) {
        res.status(500).json(err)
    }
  }),
   // login
   loginUser: asyncHandler(async (req, res, next) => {
    try {
      const user = await User.findOne({email: req.body.email});
      if(!user) {
        return res.status(404).json('Email not found!')
      }
      const validPassword = await bcrypt.compare (req.body.password, user.password);
      if (!validPassword){
        return res.status(404).json('Wrong password!')
      }
      if( user && validPassword){
        const accessToken = jwt.sign({
          id: user.id,
          admin: user.admin,
        },
        fs.readFileSync("auth.privateKey"),
        { algorithm: 'RS256',
          expiresIn: '30d'}
        )
        const {password, ...others} = user._doc; 
        res.status(200).json({others,accessToken});
      }
    } catch (err) {
        res.status(500).json(err)
    } 
  }),
  logoutUser: asyncHandler(async(req, res) => {
    try {
      res.status(200).json('Logged out!');
    } catch (error) {
      console.log(error);
    }
    
  })
}
module.exports = authController;